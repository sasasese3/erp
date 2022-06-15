const router = require('express').Router();
const connectDB = require('../../utils/connectDB');
const { ConvertToArray, ConvertToDetailProductQuery } = require("../../utils/convert");

//PV
router.route('/')
    //SelectPV
    .get(function (req, res) {
        // Store hash in your password DB.
        connectDB.query("SELECT * FROM  pv", [], function (err, PVdata) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            }
            res.json({ status: "ok", PVdata });
        });
    })
    //CreatePV
    .post(function (req, res) {
        // Store hash in your password DB.
        connectDB.query(
            "INSERT INTO erp_systems.pv (PV_ID,SUPPLIER_ID,CUSTOMER_ID,EMPLOYEE_ID_CREATOR,PV_CREATOR,EMPLOYEE_ID_APPROVER,PV_APPROVER,PV_DETAIL,PV_AMOUNTPRODUCT,PV_DATE,PV_STATUS) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [
                req.body.PV_ID,
                req.body.SUPPLIER_ID,
                req.body.CUSTOMER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.PV_CREATOR,
                req.body.EMPLOYEE_ID_APPROVER,
                req.body.PV_APPROVER,
                req.body.PV_DETAIL,
                req.body.PV_AMOUNTPRODUCT,
                req.body.PV_DATE,
                req.body.PV_STATUS,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.PV_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.PV_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.PV_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
                            "UPDATE erp_systems.pv SET PV_PRICETOTAL = ? where PV_ID = ? ",
                            [PriceTotal, req.body.PV_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert PV_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "INSERT PV success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    })
    //UpdatePV
    .patch(function (req, res) {
        // Store hash in your password DB.
        connectDB.query(
            "UPDATE erp_systems.pv SET SUPPLIER_ID = ? ,CUSTOMER_ID = ? ,EMPLOYEE_ID_CREATOR = ? ,PV_CREATOR = ? ,EMPLOYEE_ID_APPROVER = ? ,PV_APPROVER = ? ,PV_DETAIL = ? ,PV_AMOUNTPRODUCT = ?, PV_DATE=? ,PV_STATUS = ?  where PV_ID  = ? ",
            [
                req.body.SUPPLIER_ID,
                req.body.CUSTOMER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.PV_CREATOR,
                req.body.EMPLOYEE_ID_APPROVER,
                req.body.PV_APPROVER,
                req.body.PV_DETAIL,
                req.body.PV_AMOUNTPRODUCT,
                req.body.PV_DATE,
                req.body.PV_STATUS,
                req.body.PV_ID,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.PV_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.PV_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.PV_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
                            "UPDATE erp_systems.pv SET PV_PRICETOTAL = ? where PV_ID = ? ",
                            [PriceTotal, req.body.PV_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert PV_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "Update PV success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    });

//DeletePV
router.delete("/:PV_ID", function (req, res) {
    connectDB.execute(
        "DELETE FROM erp_systems.pv WHERE PV_ID  = ?",
        //ส่ง EMPLOYEE_ID มากับ Path
        [req.params.PV_ID],

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
router.get("/SelectNonApprovePV", function (req, res) {
    // Store hash in your password DB.
    connectDB.query("SELECT * FROM  pv Where PV_STATUS = 0 ", [], function (err, PVdata) {
        if (err) {
            res.json({ status: "error", message: err });
            return;
        }
        res.json({ status: "ok", PVdata });
    });
});

module.exports = router;