const router = require('express').Router();
const { join } = require('path');
const { body, validationResult, param } = require('express-validator');
const { readFileSync } = require('fs');
const { UniqueConstraintError, } = require('sequelize');

const { createPDF, pdfFolder } = require('../../utils/pdfPrinter');
const userRoles = require("../../utils/userRoles");
const { IB, IB_Product, Product, Employee, Supplier, sequelize } = require('../../utils/sequelize');

const type = 'ib';
const ibPDFFolder = join(pdfFolder, type);

router.post('/', [
    body('SupplierId').notEmpty().isInt(),
    body('createdAt').notEmpty().isDate(),
    body('companyName').notEmpty().isString(),
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
        const { SupplierId, createdAt, total_price, products, id, companyName } = req.body;

        //* create filepath
        const date = new Date();
        const filePath = join(ibPDFFolder, `${date.getTime()}.pdf`);

        //* create rv
        const ib = await IB.create({
            total_price, file_path: filePath, createdAt, EmployeeId: req.user.id, SupplierId, id, companyName
        }, { transaction: t });

        const ibId = ib.toJSON().ib_id;
        //* create rv-product
        await IB_Product.bulkCreate(
            products.map((product) => ({
                ...product,
                ibId
            })), { transaction: t }
        );
        //* commit transaction
        await t.commit();

        //* get query
        const data = await IB.findByPk(ibId, { include: [Supplier, Product, Employee], order: [[Product, IB_Product, 'no', 'ASC']] });

        //* create pdf
        createPDF(type, data.toJSON(), true, filePath);


        return res.json({ msg: 'Create IB Success' });

    } catch (error) {
        console.log(error);
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
        let ibs;
        if (req.user.role == userRoles.INSPECTOR[0]) {
            ibs = await IB.findAll({ include: [Supplier, { model: Employee, attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        } else {
            ibs = await IB.findAll({ where: { EmployeeId: req.user.id }, include: [Supplier, { model: Employee, as: 'inspector', attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        }
        return res.json({ msg: 'Get IB Success', data: ibs });

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
        let ib;
        if (req.user.role === userRoles.EMPLOYEE[0]) {
            ib = await IB.findOne({ where: { ib_id: id, EmployeeId: req.user.id } });
        }
        else {
            ib = await IB.findByPk(id);
        }
        if (!ib) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        const data = readFileSync(ib.toJSON().file_path);
        res.contentType("application/pdf");
        res.send(data);

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

module.exports = router;