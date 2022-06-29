const router = require('express').Router();
const { join } = require('path');
const { body, validationResult, param } = require('express-validator');
const { createWriteStream, readFileSync } = require('fs');
const { UniqueConstraintError, } = require('sequelize');

const { printer, pdfFolder } = require('../../utils/pdfPrinter');
const userRoles = require("../../utils/userRoles");
const { PV, PV_Product, Product, Employee, Supplier, sequelize } = require('../../utils/sequelize');
const { PVPdfDeifinition } = require("../../utils/erp/PVPdfDefinition");

//pdf file path
const pvPDFFolder = join(pdfFolder, 'pv');

router.post('/', [
    body('SupplierId').notEmpty().isInt(),
    body('createdAt').notEmpty().isDate(),
    body('customerName').notEmpty().isString(),
    body('detail').optional().isString(),
    body('id').notEmpty().isString(),
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
        const { SupplierId, createdAt, total_price, products, id, detail, customerName } = req.body;

        //* create filepath
        const date = new Date();
        const filePath = join(pvPDFFolder, `${date.getTime()}.pdf`);

        //* create rv
        const pv = await PV.create({
            total_price, file_path: filePath, createdAt, EmployeeId: req.user.id, SupplierId, id, detail, customerName
        }, { transaction: t });

        const pvId = pv.toJSON().pv_id;
        //* create rv-product
        await PV_Product.bulkCreate(
            products.map((product) => ({
                ...product,
                pvId
            })), { transaction: t }
        );
        //* commit transaction
        await t.commit();

        //* get query
        const data = await PV.findByPk(pvId, { include: [Product, Employee], order: [[Product, PV_Product, 'no', 'ASC']] });

        //* create pdf
        const doc = printer.createPdfKitDocument(PVPdfDeifinition(data.toJSON()));
        doc.pipe(createWriteStream(filePath));
        doc.end();


        return res.json({ msg: 'Create PV Success' });

    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            //* revert transaction
            await t.rollback();
            return res.status(400).json({ msg: "กรุณาไม่เลือกสินค้าซ้ำ" });
        }
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        let pvs;
        if (req.user.role == userRoles.INSPECTOR[0]) {
            pvs = await PV.findAll({ include: [Supplier, { model: Employee, attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        } else {
            pvs = await PV.findAll({ where: { EmployeeId: req.user.id }, include: [Supplier, { model: Employee, as: 'inspector', attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        }
        return res.json({ msg: 'Get PV Success', data: pvs });

    } catch (error) {
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
        let pv;
        if (req.user.role === userRoles.EMPLOYEE[0]) {
            pv = await PV.findOne({ where: { pv_id: id, EmployeeId: req.user.id } });
        }
        else {
            pv = await PV.findByPk(id);
        }
        if (!pv) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        const data = readFileSync(pv.toJSON().file_path);
        res.contentType("application/pdf");
        res.send(data);

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

module.exports = router;