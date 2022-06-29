const router = require('express').Router();
const { join } = require('path');
const { body, validationResult, param } = require('express-validator');
const { createWriteStream, readFileSync } = require('fs');
const { UniqueConstraintError, } = require('sequelize');

const { printer, pdfFolder } = require('../../utils/pdfPrinter');
const { POPdfDeifinition } = require('../../utils/POPdfDefinition');
const userRoles = require("../../utils/userRoles");
const { PO, PO_Product, Product, Employee, Supplier, sequelize } = require('../../utils/sequelize');

//pdf file path
const poPDFFolder = join(pdfFolder, 'po');

router.post('/', [
    body('SupplierId').notEmpty().isInt(),
    body('createdAt').notEmpty().isDate(),
    body('total_price').notEmpty().isNumeric(),
    body('products').notEmpty().isArray(),
    body('products.*.ProductId').notEmpty().isInt(),
    body('products.*.amount').notEmpty().isInt(),
    body('products.*.no').notEmpty().isInt(),
    body('products.*.price').notEmpty().isInt()

], async (req, res) => {
    const t = await sequelize.transaction();

    try {

        //* error input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //* get body data
        const { SupplierId, createdAt, total_price, products } = req.body;

        //* create filepath
        const date = new Date();
        const filePath = join(poPDFFolder, `${date.getTime()}.pdf`);

        //* create po
        const po = await PO.create({
            total_price, file_path: filePath, createdAt, EmployeeId: req.user.id, SupplierId
        }, { transaction: t });

        //* create po-product
        await PO_Product.bulkCreate(
            products.map((product) => ({
                ...product,
                POId: po.id
            })), { transaction: t }
        );
        //* commit transaction
        await t.commit();

        //* get query
        const data = await PO.findByPk(po.id, { include: [Product, Employee], order: [[Product, PO_Product, 'no', 'ASC']] });

        //* create pdf
        const doc = printer.createPdfKitDocument(POPdfDeifinition(data.toJSON()));
        doc.pipe(createWriteStream(filePath));
        doc.end();


        return res.json({ msg: 'Create PO Success' });

    } catch (error) {
        //* revert transaction
        if (error instanceof UniqueConstraintError) {
            await t.rollback();
            return res.status(400).json({ msg: "กรุณาไม่เลือกสินค้าซ้ำ" });
        }
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        let pos;
        if (req.user.role == userRoles.INSPECTOR[0]) {
            pos = await PO.findAll({ include: [Supplier, { model: Employee, attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        } else {
            pos = await PO.findAll({ where: { EmployeeId: req.user.id }, include: [Supplier, { model: Employee, as: 'inspector', attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        }
        // const pos = await PO.findAll({ where: { EmployeeId: req.user.id }, include: [Product, Supplier], attributes: { exclude: ['file_path'] } });
        return res.json({ msg: 'Get PO Success', data: pos });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.get('/pdf/:id', [
    param('id').notEmpty().isInt()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }
        const id = parseInt(req.params.id);
        let po;
        if (req.user.role === userRoles.EMPLOYEE[0]) {
            po = await PO.findOne({ where: { id: id, EmployeeId: req.user.id } });
        }
        else {
            po = await PO.findByPk(id);
        }
        if (!po) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        const data = readFileSync(po.toJSON().file_path);
        res.contentType("application/pdf");
        res.send(data);

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

module.exports = router;