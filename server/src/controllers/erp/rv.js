const router = require('express').Router();
const { join } = require('path');
const { body, validationResult, param } = require('express-validator');
const { createWriteStream, readFileSync } = require('fs');
const { UniqueConstraintError, } = require('sequelize');

const { printer, pdfFolder } = require('../../utils/pdfPrinter');
const userRoles = require("../../utils/userRoles");
const { RV, RV_Product, Product, Employee, Supplier, sequelize } = require('../../utils/sequelize');
const { RVPdfDeifinition } = require("../../utils/erp/RVPdfDefinition");

//pdf file path
const rvPDFFolder = join(pdfFolder, 'rv');

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
        const filePath = join(rvPDFFolder, `${date.getTime()}.pdf`);

        //* create rv
        const rv = await RV.create({
            total_price, file_path: filePath, createdAt, EmployeeId: req.user.id, SupplierId, id, detail, customerName
        }, { transaction: t });

        const rvId = rv.toJSON().rv_id;
        //* create rv-product
        await RV_Product.bulkCreate(
            products.map((product) => ({
                ...product,
                rvId
            })), { transaction: t }
        );
        //* commit transaction
        await t.commit();

        //* get query
        const data = await RV.findByPk(rvId, { include: [Product, Employee], order: [[Product, RV_Product, 'no', 'ASC']] });

        //* create pdf
        const doc = printer.createPdfKitDocument(RVPdfDeifinition(data.toJSON()));
        doc.pipe(createWriteStream(filePath));
        doc.end();


        return res.json({ msg: 'Create RV Success' });

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
        let rvs;
        if (req.user.role == userRoles.INSPECTOR[0]) {
            rvs = await RV.findAll({ include: [Supplier, { model: Employee, attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        } else {
            rvs = await RV.findAll({ where: { EmployeeId: req.user.id }, include: [Supplier, { model: Employee, as: 'inspector', attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        }
        return res.json({ msg: 'Get RV Success', data: rvs });

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
        let rv;
        if (req.user.role === userRoles.EMPLOYEE[0]) {
            rv = await RV.findOne({ where: { rv_id: id, EmployeeId: req.user.id } });
        }
        else {
            rv = await RV.findByPk(id);
        }
        if (!rv) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        const data = readFileSync(rv.toJSON().file_path);
        res.contentType("application/pdf");
        res.send(data);

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

module.exports = router;