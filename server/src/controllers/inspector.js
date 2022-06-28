const router = require('express').Router();
const { body, validationResult, param } = require('express-validator');
const { PO } = require('../utils/sequelize');
const { pdfEditor } = require('../utils/pdfEditor');
const { unlinkSync } = require('fs');


router.patch('/po/:id', [
    param('id').notEmpty().isInt(),
    body('approved').notEmpty().isBoolean(),
], async (req, res) => {
    try {

        //check error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }

        //get param and body data
        const id = parseInt(req.params.id);
        const { approved } = req.body;

        //get po data
        const po = await PO.findByPk(id);
        if (!po) {
            return res.status(400).json({ msg: 'id is invalid' });
        }

        //change it to js object
        const date = new Date();
        const po_data = po.toJSON();

        if (!approved) {
            //update db
            po.status = 'rejected';
            po.file_path = "";
            unlinkSync(po_data.file_path);
        }
        else {
            //edit existing pdf
            const newFilePath = await pdfEditor(po_data.file_path, 'po', date);
            //update db
            po.status = 'approved';
            po.file_path = newFilePath;
        }
        po.inspectorId = req.user.id;

        //save to db
        await po.save();

        return res.json({ msg: 'Update PO Success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });

    }

});


module.exports = router;