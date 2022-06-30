const router = require('express').Router();
const { body, validationResult, param } = require('express-validator');
const { PO, RV, PV, AP3, IB, Supplier, Product, Employee, PO_Product, PV_Product, RV_Product, IB_Product } = require('../utils/sequelize');
const { createPDF } = require('../utils/pdfPrinter');
const { unlinkSync } = require('fs');


router.patch('/po/:id', [
    param('id').notEmpty().isInt(),
    body('approved').notEmpty().isBoolean(),
], async (req, res) => {
    try {
        //* check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //* get param and body data
        const id = parseInt(req.params.id);
        const { approved } = req.body;

        //* get po data
        const po = await PO.findByPk(id, { include: [Supplier, Product, Employee], order: [[Product, PO_Product, 'no', 'ASC']] });
        if (!po) {
            return res.status(400).json({ msg: 'id is invalid' });
        }

        //* change it to js object
        const po_data = po.toJSON();

        if (!approved) {
            //* update db
            po.status = 'rejected';
            po.file_path = "";
        }
        else {
            //* create new pdf
            const newFilePath = createPDF('po', po_data, false, null);
            //* update db
            po.status = 'approved';
            po.file_path = newFilePath;
        }

        unlinkSync(po_data.file_path);
        po.inspectorId = req.user.id;

        //* save to db
        await po.save();

        return res.json({ msg: 'Update PO Success' });
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.patch('/rv/:id', [
    param('id').notEmpty().isInt(),
    body('approved').notEmpty().isBoolean(),
], async (req, res) => {
    try {
        //* check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //* get param and body data
        const id = parseInt(req.params.id);
        const { approved } = req.body;

        //* get rv data
        const rv = await RV.findByPk(id, { include: [Supplier, Product, Employee], order: [[Product, RV_Product, 'no', 'ASC']] });
        if (!rv) {
            return res.status(400).json({ msg: 'id is invalid' });
        }

        //* change it to js object
        const rv_data = rv.toJSON();

        if (!approved) {
            //* update db
            rv.status = 'rejected';
            rv.file_path = "";
        }
        else {
            //* create new pdf 
            const newFilePath = createPDF('rv', rv_data, false, null);
            //* update db
            rv.status = 'approved';
            rv.file_path = newFilePath;
        }

        unlinkSync(rv_data.file_path);
        rv.inspectorId = req.user.id;

        //* save to db
        await rv.save();

        return res.json({ msg: 'Update RV Success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.patch('/pv/:id', [
    param('id').notEmpty().isInt(),
    body('approved').notEmpty().isBoolean(),
], async (req, res) => {
    try {
        //* check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //* get param and body data
        const id = parseInt(req.params.id);
        const { approved } = req.body;

        //* get pv data
        const pv = await PV.findByPk(id, { include: [Supplier, Product, Employee], order: [[Product, PV_Product, 'no', 'ASC']] });
        if (!pv) {
            return res.status(400).json({ msg: 'id is invalid' });
        }

        //* change it to js object
        const pv_data = pv.toJSON();

        if (!approved) {
            //* update db
            pv.status = 'rejected';
            pv.file_path = "";
        }
        else {
            //* edit existing pdf
            const newFilePath = createPDF('pv', pv_data, false, null);
            //* update db
            pv.status = 'approved';
            pv.file_path = newFilePath;
        }

        unlinkSync(pv_data.file_path);
        pv.inspectorId = req.user.id;

        //* save to db
        await pv.save();

        return res.json({ msg: 'Update PV Success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.patch('/ap3/:id', [
    param('id').notEmpty().isInt(),
    body('approved').notEmpty().isBoolean(),
], async (req, res) => {
    try {
        //* check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //* get param and body data
        const id = parseInt(req.params.id);
        const { approved } = req.body;

        //* get pv data
        const ap3 = await AP3.findByPk(id, { include: [Employee] });
        if (!ap3) {
            return res.status(400).json({ msg: 'id is invalid' });
        }

        //* change it to js object
        const ap3_data = ap3.toJSON();

        if (!approved) {
            //* update db
            ap3.status = 'rejected';
            ap3.file_path = "";
        }
        else {
            //* edit existing pdf
            const newFilePath = createPDF('ap3', ap3_data, false, null);
            //* update db
            ap3.status = 'approved';
            ap3.file_path = newFilePath;
        }

        unlinkSync(ap3_data.file_path);
        ap3.inspectorId = req.user.id;

        //* save to db
        await ap3.save();

        return res.json({ msg: 'Update PV Success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.patch('/ib/:id', [
    param('id').notEmpty().isInt(),
    body('approved').notEmpty().isBoolean(),
], async (req, res) => {
    try {
        //* check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //* get param and body data
        const id = parseInt(req.params.id);
        const { approved } = req.body;

        //* get pv data
        const ib = await IB.findByPk(id, { include: [Supplier, Product, Employee], order: [[Product, IB_Product, 'no', 'ASC']] });
        if (!ib) {
            return res.status(400).json({ msg: 'id is invalid' });
        }

        //* change it to js object
        const ib_data = ib.toJSON();

        if (!approved) {
            //* update db
            ib.status = 'rejected';
            ib.file_path = "";
        }
        else {
            //* edit existing pdf
            const newFilePath = createPDF('ib', ib_data, false, null);
            //* update db
            ib.status = 'approved';
            ib.file_path = newFilePath;
        }

        unlinkSync(ib_data.file_path);
        ib.inspectorId = req.user.id;

        //* save to db
        await ib.save();

        return res.json({ msg: 'Update IB Success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});


module.exports = router;