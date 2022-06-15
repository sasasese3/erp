const router = require('express').Router();
const connectDB = require('../../utils/connectDB');
const { ConvertToArray, ConvertToDetailProductQuery } = require("../../utils/convert");

//RV
router.route('/')
    //SelectRV
    .get(function (req, res) {
        // Store hash in your password DB.
        connectDB.query("SELECT * FROM  rv", [], function (err, RVdata) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            }
            res.json({ status: "ok", RVdata });
        });
    })
    //CreateRV
    .post(function (req, res) {
        // Store hash in your password DB.
        connectDB.query(
            "INSERT INTO erp_systems.rv (RV_ID,CUSTOMER_ID,EMPLOYEE_ID_CREATOR,RV_CREATOR,EMPLOYEE_ID_APPROVER,RV_APPROVER,RV_DETAIL,RV_AMOUNTPRODUCT,RV_DATE,RV_STATUS) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [
                req.body.RV_ID,
                req.body.CUSTOMER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.RV_CREATOR,
                req.body.EMPLOYEE_ID_APPROVER,
                req.body.RV_APPROVER,
                req.body.RV_DETAIL,
                req.body.RV_AMOUNTPRODUCT,
                req.body.RV_DATE,
                req.body.RV_STATUS,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.RV_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.RV_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.RV_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
                            "UPDATE erp_systems.rv SET RV_PRICETOTAL = ? where RV_ID = ? ",
                            [PriceTotal, req.body.RV_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert RV_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "INSERT RV success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    })
    //UpdateRV
    .patch(function (req, res) {
        // Store hash in your password DB.
        connectDB.query(
            "UPDATE erp_systems.rv SET CUSTOMER_ID = ? ,EMPLOYEE_ID_CREATOR = ? ,RV_CREATOR = ? ,EMPLOYEE_ID_APPROVER = ? ,RV_APPROVER = ? ,RV_DETAIL = ? ,RV_AMOUNTPRODUCT = ? ,RV_DATE = ? ,RV_STATUS = ?  where RV_ID  = ? ",
            [
                req.body.CUSTOMER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.RV_CREATOR,
                req.body.EMPLOYEE_ID_APPROVER,
                req.body.RV_APPROVER,
                req.body.RV_DETAIL,
                req.body.RV_AMOUNTPRODUCT,
                req.body.RV_DATE,
                req.body.RV_STATUS,
                req.body.RV_ID,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.RV_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.RV_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.RV_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
                            "UPDATE erp_systems.rv SET RV_PRICETOTAL = ? where RV_ID = ? ",
                            [PriceTotal, req.body.RV_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert RV_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "Update RV success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    });


//DeleteRV
router.delete("/:RV_ID", function (req, res) {
    connectDB.execute(
        "DELETE FROM erp_systems.rv WHERE RV_ID  = ?",
        //ส่ง EMPLOYEE_ID มากับ Path
        [req.params.RV_ID],

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

module.exports = router;