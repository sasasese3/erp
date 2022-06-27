const router = require('express').Router();
const path = require('path');
const { printer, pdfFolder } = require('../../utils/pdfPrinter');
const { POPdfDeifinition } = require('../../utils/POPdfDefinition');
const { body, validationResult, param } = require('express-validator');
const fs = require('fs');
const { PO, PO_Product, Product, Employee, Supplier } = require('../../utils/sequelize');

const { ConvertToArray, ConvertToDetailProductQuery } = require("../../utils/convert");
const { uploadPO } = require("../../utils/fileUpload");
const { Op } = require("sequelize");

//pdf file path
const poPDFFolder = path.join(pdfFolder, 'po');

router.post('/', [
    body('SupplierId').notEmpty().isInt(),
    body('createdAt').notEmpty().isDate(),
    body('total_price').notEmpty().isNumeric(),
    body('products').notEmpty().isArray(),
    body('products.*.ProductId').notEmpty().isInt(),
    body('products.*.amount').notEmpty().isInt(),

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
        }
        const { SupplierId, createdAt, total_price, products } = req.body;

        const date = new Date();
        const filePath = path.join(poPDFFolder, `${date.getTime()}.pdf`);

        const po = await PO.create({
            total_price, file_path: filePath, createdAt, EmployeeId: req.user.id, SupplierId
        });

        await PO_Product.bulkCreate(
            products.map((product) => ({
                ...product,
                POId: po.id
            }))
        );

        const data = await PO.findByPk(po.id, { include: [Product, Employee], order: [[Product, PO_Product, 'no', 'ASC']] });
        const doc = printer.createPdfKitDocument(POPdfDeifinition(data.toJSON()));
        doc.pipe(fs.createWriteStream(filePath));
        doc.end();
        return res.json({ msg: 'Create PO Success' });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const pos = await PO.findAll({ where: { EmployeeId: req.user.id }, include: [Product, Supplier], attributes: { exclude: ['file_path'] } });
        return res.json({ msg: 'Get PO Success', data: pos });

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
        const po = await PO.findOne({ where: { id: id, EmployeeId: req.user.id } });
        if (!po) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        const data = fs.readFileSync(po.toJSON().file_path);
        res.contentType("application/pdf");
        res.send(data);

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});
// router.route('/')
//     //SelectPO
//     .get(function (req, res) {
//         // Store hash in your password DB.
//         connectDB.query("SELECT * FROM  po", [], function (err, POdata) {
//             if (err) {
//                 res.json({ status: "error", message: err });
//                 return;
//             }
//             res.json({ status: "ok", POdata });
//         });
//     })
//     //CreatePO
//     .post(function (req, res) {
//         // Store hash in your password DB.
//         connectDB.query(
//             "INSERT INTO erp_systems.po (PO_ID,SUPPLIER_ID,CUSTOMER_ID,EMPLOYEE_ID_CREATOR,PO_CREATOR,EMPLOYEE_ID_APPROVER,PO_APPROVER,PO_DETAIL,PO_AMOUNTPRODUCT,PO_DATE,PO_STATUS) VALUES (? ,? ,? ,?,?,?,?,?,?,?,?)",
//             [
//                 req.body.PO_ID,
//                 req.body.SUPPLIER_ID,
//                 req.body.CUSTOMER_ID,
//                 req.body.EMPLOYEE_ID_CREATOR,
//                 req.body.PO_CREATOR,
//                 req.body.EMPLOYEE_ID_APPROVER,
//                 req.body.PO_APPROVER,
//                 req.body.PO_DETAIL,
//                 req.body.PO_AMOUNTPRODUCT,
//                 req.body.PO_DATE,
//                 req.body.PO_STATUS,
//             ],

//             function (err) {
//                 if (err) {
//                     res.json({ status: "error", message: err });
//                     return;
//                 }
//                 connectDB.query(
//                     "SELECT * FROM product WHERE PRODUCT_ID =" +
//                     ConvertToDetailProductQuery(req.body.PO_DETAIL), //Detailของแต่ละใบ
//                     function (err, DataProduct) {
//                         if (err) {
//                             res.json({ status: "error", message: err });
//                         }
//                         //เอาราคาของแต่ละสินค้าออกมา
//                         let PriceOneArray = [];
//                         for (let i = 0; i < ConvertToArray(req.body.PO_DETAIL).length; i++) {
//                             //Detailของแต่ละใบ
//                             PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
//                         }
//                         //ราคารวมของแต่ละชิ้น
//                         let AmountArray = ConvertToArray(req.body.PO_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
//                         let PriceArray = [];
//                         for (let i = 0; i < AmountArray.length; i++) {
//                             let Ans = PriceOneArray[i] * AmountArray[i];
//                             PriceArray.push(Ans);
//                         }
//                         //ราคารวมทั้งหมด
//                         let PriceTotal = 0;
//                         for (let i = 0; i < PriceArray.length; i++) {
//                             PriceTotal += PriceArray[i];
//                         }
//                         //เอาราคารวมเข้าไปเก็บ
//                         connectDB.query(
//                             "UPDATE erp_systems.po SET PO_PRICETOTAL = ? where PO_ID = ? ",
//                             [PriceTotal, req.body.PO_ID], //ID ของใบนั้นๆ
//                             function (err) {
//                                 if (err) {
//                                     res.json({
//                                         status: "error insert PO_PRICETOTAL ",
//                                         message: err,
//                                     });
//                                 } else {
//                                     res.json({
//                                         status: "ok",
//                                         message: "INSERT PO success",
//                                     });
//                                 }
//                             }
//                         );
//                     }
//                 );
//             }
//         );
//     })
//     //UpdatePO
//     .patch(function (req, res) {
//         // Store hash in your password DB.
//         connectDB.query(
//             "UPDATE erp_systems.po SET SUPPLIER_ID = ? ,CUSTOMER_ID = ? ,EMPLOYEE_ID_CREATOR = ? ,PO_CREATOR = ? ,EMPLOYEE_ID_APPROVER = ? , PO_APPROVER = ? ,PO_DETAIL = ? ,PO_AMOUNTPRODUCT = ? ,PO_DATE = ? ,PO_STATUS = ?  where PO_ID  = ? ",
//             [
//                 req.body.SUPPLIER_ID,
//                 req.body.CUSTOMER_ID,
//                 req.body.EMPLOYEE_ID_CREATOR,
//                 req.body.CREATOR,
//                 req.body.EMPLOYEE_ID_APPROVER,
//                 req.body.APPROVER,
//                 req.body.PO_DETAIL,
//                 req.body.PO_AMOUNTPRODUCT,
//                 req.body.PO_DATE,
//                 req.body.PO_STATUS,
//                 req.body.PO_ID,
//             ],

//             function (err) {
//                 if (err) {
//                     res.json({ status: "error", message: err });
//                     return;
//                 }
//                 connectDB.query(
//                     "SELECT * FROM product WHERE PRODUCT_ID =" +
//                     ConvertToDetailProductQuery(req.body.PO_DETAIL), //Detailของแต่ละใบ
//                     function (err, DataProduct) {
//                         if (err) {
//                             res.json({ status: "error", message: err });
//                         }
//                         //เอาราคาของแต่ละสินค้าออกมา
//                         let PriceOneArray = [];
//                         for (let i = 0; i < ConvertToArray(req.body.PO_DETAIL).length; i++) {
//                             //Detailของแต่ละใบ
//                             PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
//                         }
//                         //ราคารวมของแต่ละชิ้น
//                         let AmountArray = ConvertToArray(req.body.PO_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
//                         let PriceArray = [];
//                         for (let i = 0; i < AmountArray.length; i++) {
//                             let Ans = PriceOneArray[i] * AmountArray[i];
//                             PriceArray.push(Ans);
//                         }
//                         //ราคารวมทั้งหมด
//                         let PriceTotal = 0;
//                         for (let i = 0; i < PriceArray.length; i++) {
//                             PriceTotal += PriceArray[i];
//                         }
//                         //เอาราคารวมเข้าไปเก็บ
//                         connectDB.query(
//                             "UPDATE erp_systems.po SET PO_PRICETOTAL = ? where PO_ID = ? ",
//                             [PriceTotal, req.body.PO_ID], //ID ของใบนั้นๆ
//                             function (err) {
//                                 if (err) {
//                                     res.json({
//                                         status: "error insert PO_PRICETOTAL ",
//                                         message: err,
//                                     });
//                                 } else {
//                                     res.json({
//                                         status: "ok",
//                                         message: "Update PO success",
//                                     });
//                                 }
//                             }
//                         );
//                     }
//                 );
//             }
//         );
//     });

//DeletePO
// router.delete('/:PO_ID', function (req, res) {
//     connectDB.execute(
//         "DELETE FROM erp_systems.po WHERE PO_ID  = ?",
//         //ส่ง EMPLOYEE_ID มากับ Path
//         [req.params.PO_ID],

//         function (err) {
//             if (err) {
//                 res.json({ status: "error", message: err });
//                 return;
//             } else {
//                 res.json({ status: "ok", message: "Delete success" });
//             }
//         }
//     );
// });

//เรียกดูใบสำคัญที่ยังไม่ได้!!อนุมัติ
// router.get("/SelectNonApprovePO", function (req, res) {
//     // Store hash in your password DB.
//     connectDB.query("SELECT * FROM  po Where PO_STATUS = 0 ", [], function (err, POdata) {
//         if (err) {
//             res.json({ status: "error", message: err });
//             return;
//         }
//         res.json({ status: "ok", POdata });
//     });
// });

//อัพโหดไฟล์รูปลายเซ็นต์
// router.post("/uploadPO", uploadPO.single("fileupload"), (req, res) => {
//     let Filename = "file-" + "-" + req.file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
//     var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/PO/" + Filename;
//     var insertData = "UPDATE PO SET PO_PATHSIGNATURE = ? WHERE PO_ID = ? ";
//     connectDB.query(insertData, [imgsrc, req.body.PO_ID], (err, result) => {
//         if (err) throw err;
//         console.log("file uploaded");
//     });
// });
module.exports = router;