const router = require('express').Router();
const connectDB = require('../utils/connectDB');

//IB
router.route("/")
    //SelectIB
    .get(function (req, res) {
        // Store hash in your password DB.
        connectDB.query("SELECT * FROM  ib", [], function (err, IBdata) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            }
            res.json({ status: "ok", IBdata });
        });
    })
    //CreateIB
    .post(function (req, res) {
        // Store hash in your password DB.
        connectDB.query(
            "INSERT INTO erp_systems.ib (IB_ID,SUPPLIER_ID,EMPLOYEE_ID_CREATOR,IB_CREATOR,IB_DETAIL,IB_AMOUNTPRODUCT,IB_DATE) VALUES (?,?,? ,? ,? ,? ,?   )",
            [
                req.body.IB_ID,
                req.body.SUPPLIER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.IB_CREATOR,
                req.body.IB_DETAIL, //รายการสินค้า
                req.body.IB_AMOUNTPRODUCT, //จำนวนสินค้า
                req.body.IB_DATE,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.IB_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.IB_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.IB_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
                            "UPDATE erp_systems.ib SET IB_PRICETOTAL = ? where IB_ID = ? ",
                            [PriceTotal, req.body.IB_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert IB_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "INSERT IB success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    })

    //UpdateIB
    .patch(function (req, res) {
        // Store hash in your password DB.
        connectDB.execute(
            "UPDATE erp_systems.ib SET SUPPLIER_ID = ? ,EMPLOYEE_ID_CREATOR = ?, IB_CREATOR =? ,IB_DETAIL = ? ,IB_AMOUNTPRODUCT = ? ,IB_DATE = ?  where IB_ID  = ? ",
            [
                req.body.SUPPLIER_ID,
                req.body.EMPLOYEE_ID_CREATOR,
                req.body.IB_CREATOR,
                req.body.IB_DETAIL, //รายการสินค้า
                req.body.IB_AMOUNTPRODUCT, //จำนวนสินค้า
                req.body.IB_DATE,
                req.body.IB_ID,
            ],

            function (err) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                connectDB.query(
                    "SELECT * FROM product WHERE PRODUCT_ID =" +
                    ConvertToDetailProductQuery(req.body.IB_DETAIL), //Detailของแต่ละใบ
                    function (err, DataProduct) {
                        if (err) {
                            res.json({ status: "error", message: err });
                        }
                        //เอาราคาของแต่ละสินค้าออกมา
                        let PriceOneArray = [];
                        for (let i = 0; i < ConvertToArray(req.body.IB_DETAIL).length; i++) {
                            //Detailของแต่ละใบ
                            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
                        }
                        //ราคารวมของแต่ละชิ้น
                        let AmountArray = ConvertToArray(req.body.IB_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
                            "UPDATE erp_systems.ib SET IB_PRICETOTAL = ? where IB_ID = ? ",
                            [PriceTotal, req.body.IB_ID], //ID ของใบนั้นๆ
                            function (err) {
                                if (err) {
                                    res.json({
                                        status: "error insert IB_PRICETOTAL ",
                                        message: err,
                                    });
                                } else {
                                    res.json({
                                        status: "ok",
                                        message: "Update IB success",
                                    });
                                }
                            }
                        );
                    }
                );
            }
        );
    });


//DeleteIB
router.delete("/:IB_ID", function (req, res) {
    connectDB.execute(
        "DELETE FROM erp_systems.ib WHERE IB_ID  = ?",
        //ส่ง EMPLOYEE_ID มากับ Path
        [req.params.IB_ID],

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