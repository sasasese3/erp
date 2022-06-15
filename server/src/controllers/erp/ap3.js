const router = require('express').Router();
const connectDB = require('../../utils/connectDB');
const { ConvertToArray, ConvertToDetailProductQuery } = require("../../utils/convert");
const { route } = require("../admin");

//AP3
router.route('/')
    //SelectAP3
    .get(function (req, res) {
        // Store hash in your password DB.
        connectDB.query("SELECT * FROM  ap3", [], function (err, AP3data) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            }
            res.json({ status: "ok", AP3data });
        });
    })
    //CreateAP3
    .post(function (req, res) {
        // Store hash in your password DB.
        connectDB.query(
            "INSERT INTO erp_systems.ap3 (AP3_ID,CUSTOMER_ID,EMPLOYEE_ID_CREATOR,AP3_CREATOR,EMPLOYEE_ID_APPROVER,AP3_APPROVER,AP3_DETAIL,AP3_AMOUNTPRODUCT,AP3_DATE,AP3_STATUS) VALUES (?,? ,? ,? ,? ,? ,? ,? ,? ,? )",
            [
                req.body.AP3_ID,
                req.body.CUSTOMER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.AP3_CREATOR,
                req.body.EMPLOYEE_ID_APPROVER,
                req.body.AP3_APPROVER,
                req.body.AP3_DETAIL, //รายการสินค้า
                req.body.AP3_AMOUNTPRODUCT, //จำนวนสินค้า
                req.body.AP3_DATE,
                req.body.AP3_STATUS,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.AP3_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.AP3_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.AP3_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
                        let PriceArray = [];
                        for (let i = 0; i < AmountArray.length; i++) {
                            let Ans = PriceOneArray[i] * AmountArray[i];
                            PriceArray.push(Ans);
                        }
                        //ราคารวมทั้งหมด
                        let PriceTotal = 0;
                        for (let i = 0; i < PriceArray.length; i++) {
                            PriceTotal += PriceArray[i];
                        }
                        //เอาราคารวมเข้าไปเก็บ
                        connectDB.query(
                            "UPDATE erp_systems.ap3 SET AP3_PRICETOTAL = ? where AP3_ID = ? ",
                            [PriceTotal, req.body.AP3_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert AP3_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "INSERT AP3 success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    })
    //update AP3
    .patch(function (req, res) {
        // Store hash in your password DB.
        connectDB.query(
            "UPDATE erp_systems.ap3 SET CUSTOMER_ID =? , EMPLOYEE_ID_CREATOR =? , AP3_CREATOR = ? , EMPLOYEE_ID_APPROVER =? , AP3_APPROVER =? , AP3_DETAIL =? , AP3_AMOUNTPRODUCT =? , AP3_DATE =?  ,  AP3_STATUS =?  where AP3_ID  = ? ",
            [
                req.body.CUSTOMER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.AP3_CREATOR,
                req.body.EMPLOYEE_ID_APPROVER,
                req.body.AP3_APPROVER,
                req.body.AP3_DETAIL, //รายการสินค้า
                req.body.AP3_AMOUNTPRODUCT, //จำนวนสินค้า
                req.body.AP3_DATE,
                req.body.AP3_STATUS,
                req.body.AP3_ID,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.AP3_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.AP3_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.AP3_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
                        let PriceArray = [];
                        for (let i = 0; i < AmountArray.length; i++) {
                            let Ans = PriceOneArray[i] * AmountArray[i];
                            PriceArray.push(Ans);
                        }
                        //ราคารวมทั้งหมด
                        let PriceTotal = 0;
                        for (let i = 0; i < PriceArray.length; i++) {
                            PriceTotal += PriceArray[i];
                        }
                        //เอาราคารวมเข้าไปเก็บ
                        connectDB.query(
                            "UPDATE erp_systems.ap3 SET AP3_PRICETOTAL = ? where AP3_ID = ? ",
                            [PriceTotal, req.body.AP3_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert AP3_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "Update AP3 success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    });

//DeleteAP3
router.delete('/:AP3_ID', function (req, res) {
    connectDB.execute(
        "DELETE FROM erp_systems.ap3 WHERE AP3_ID  = ?",
        //ส่ง EMPLOYEE_ID มากับ Path
        [req.params.AP3_ID],

        function (err) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            } else {
                res.json({ status: "ok", message: "Delete success" });
            }
        }
    );
});
//เรียกดูใบสำคัญที่ยังไม่ได้!!อนุมัติ
router.get("/SelectNonApproveAP3", function (req, res) {
    // Store hash in your password DB.
    connectDB.query("SELECT * FROM  ap3 Where AP3_STATUS = 0 ", [], function (err, ap3data) {
        if (err) {
            res.json({ status: "error", message: err });
            return;
        }
        res.json({ status: "ok", ap3data });
    });
});

module.exports = router;