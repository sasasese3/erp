const router = require('express').Router();
const { join } = require('path');
const { body, validationResult, param } = require('express-validator');
const { readFileSync } = require('fs');

const { createPDF, pdfFolder } = require('../../utils/pdfPrinter');
const userRoles = require("../../utils/userRoles");
const { AP3, Employee, } = require('../../utils/sequelize');

const file_type = 'ap3';
const rvPDFFolder = join(pdfFolder, file_type);

router.post('/', [
    body('createdAt').notEmpty().isDate(),
    body('customerName').notEmpty().isString(),
    body('id').notEmpty().isString(),
    body('price').notEmpty().isNumeric(),
    body('tax').notEmpty().isNumeric(),
    body('priceWithTax').notEmpty().isNumeric(),
    body('type').notEmpty().isString(),
], async (req, res) => {
    try {
        //* error input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //* get body data
        const { createdAt, customerName, id, price, tax, priceWithTax, type } = req.body;

        //* create filepath
        const date = new Date();
        const filePath = join(rvPDFFolder, `${date.getTime()}.pdf`);

        //* create AP3
        const ap3 = await AP3.create({ file_path: filePath, createdAt, EmployeeId: req.user.id, id, customerName, price, tax, priceWithTax, type });
        const ap3Id = ap3.toJSON().ap3_id;

        //* get query
        const data = await AP3.findByPk(ap3Id, { include: [Employee] });

        //* create pdf
        createPDF(file_type, data.toJSON(), true, filePath);

        return res.json({ msg: 'Create AP3 Success' });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        let ap3s;
        if (req.user.role == userRoles.INSPECTOR[0]) {
            ap3s = await AP3.findAll({ include: [{ model: Employee, attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        } else {
            ap3s = await AP3.findAll({ where: { EmployeeId: req.user.id }, include: [{ model: Employee, as: 'inspector', attributes: ['id', 'firstname', 'lastname'] }], attributes: { exclude: ['file_path'] } });
        }
        return res.json({ msg: 'Get AP3 Success', data: ap3s });

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
        let ap3;
        if (req.user.role === userRoles.EMPLOYEE[0]) {
            ap3 = await AP3.findOne({ where: { ap3_id: id, EmployeeId: req.user.id } });
        }
        else {
            ap3 = await AP3.findByPk(id);
        }
        if (!ap3) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        const data = readFileSync(ap3.toJSON().file_path);
        res.contentType("application/pdf");
        res.send(data);

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

module.exports = router;