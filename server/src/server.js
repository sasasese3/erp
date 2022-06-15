const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { uploadAP3, uploadPO, uploadPV, uploadRV } = require("./utils/fileUpload");
const { ConvertToArray, ConvertToDetailProductQuery } = require("./utils/convert");
const connectDB = require('./utils/connectDB');
const router = require('./controllers/router');

const app = express();
const saltRounds = 10;

//User Type
const Typeadmin = "admin";
const Typeuser = "user";
const Typeinspector = "inspector";
//uplode

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use express static folder
app.use(
  express.static(__dirname + "./Signature")
);

//cherkDBconnect
connectDB.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});


app.use(router);

//ERP Main func

//IB
//CreateIB
app.post("/CreateIB", function (req, res) {
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
});

//SelectIB
app.post("/SelectIB", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  ib", [], function (err, IBdata) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", IBdata });
  });
});

//UpdateIB
app.post("/UpdateIB", function (req, res) {
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
app.post("/DeleteIB/:IB_ID", function (req, res) {
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

//PO
//CreatePO
app.post("/CreatePO", function (req, res) {
  // Store hash in your password DB.
  connectDB.query(
    "INSERT INTO erp_systems.po (PO_ID,SUPPLIER_ID,CUSTOMER_ID,EMPLOYEE_ID_CREATOR,PO_CREATOR,EMPLOYEE_ID_APPROVER,PO_APPROVER,PO_DETAIL,PO_AMOUNTPRODUCT,PO_DATE,PO_STATUS) VALUES (? ,? ,? ,?,?,?,?,?,?,?,?)",
    [
      req.body.PO_ID,
      req.body.SUPPLIER_ID,
      req.body.CUSTOMER_ID,
      req.body.EMPLOYEE_ID_CREATOR,
      req.body.PO_CREATOR,
      req.body.EMPLOYEE_ID_APPROVER,
      req.body.PO_APPROVER,
      req.body.PO_DETAIL,
      req.body.PO_AMOUNTPRODUCT,
      req.body.PO_DATE,
      req.body.PO_STATUS,
    ],

    function (err) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      connectDB.query(
        "SELECT * FROM product WHERE PRODUCT_ID =" +
        ConvertToDetailProductQuery(req.body.PO_DETAIL), //Detailของแต่ละใบ
        function (err, DataProduct) {
          if (err) {
            res.json({ status: "error", message: err });
          }
          //เอาราคาของแต่ละสินค้าออกมา
          let PriceOneArray = [];
          for (let i = 0; i < ConvertToArray(req.body.PO_DETAIL).length; i++) {
            //Detailของแต่ละใบ
            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
          }
          //ราคารวมของแต่ละชิ้น
          let AmountArray = ConvertToArray(req.body.PO_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
            "UPDATE erp_systems.po SET PO_PRICETOTAL = ? where PO_ID = ? ",
            [PriceTotal, req.body.PO_ID], //ID ของใบนั้นๆ
            function (err) {
              if (err) {
                res.json({
                  status: "error insert PO_PRICETOTAL ",
                  message: err,
                });
              } else {
                res.json({
                  status: "ok",
                  message: "INSERT PO success",
                });
              }
            }
          );
        }
      );
    }
  );
});

//SelectPO
app.post("/SelectPO", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  po", [], function (err, POdata) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", POdata });
  });
});

//UpdatePO
app.post("/UpdatePO", function (req, res) {
  // Store hash in your password DB.
  connectDB.query(
    "UPDATE erp_systems.po SET SUPPLIER_ID = ? ,CUSTOMER_ID = ? ,EMPLOYEE_ID_CREATOR = ? ,PO_CREATOR = ? ,EMPLOYEE_ID_APPROVER = ? , PO_APPROVER = ? ,PO_DETAIL = ? ,PO_AMOUNTPRODUCT = ? ,PO_DATE = ? ,PO_STATUS = ?  where PO_ID  = ? ",
    [
      req.body.SUPPLIER_ID,
      req.body.CUSTOMER_ID,
      req.body.EMPLOYEE_ID_CREATOR,
      req.body.CREATOR,
      req.body.EMPLOYEE_ID_APPROVER,
      req.body.APPROVER,
      req.body.PO_DETAIL,
      req.body.PO_AMOUNTPRODUCT,
      req.body.PO_DATE,
      req.body.PO_STATUS,
      req.body.PO_ID,
    ],

    function (err) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      connectDB.query(
        "SELECT * FROM product WHERE PRODUCT_ID =" +
        ConvertToDetailProductQuery(req.body.PO_DETAIL), //Detailของแต่ละใบ
        function (err, DataProduct) {
          if (err) {
            res.json({ status: "error", message: err });
          }
          //เอาราคาของแต่ละสินค้าออกมา
          let PriceOneArray = [];
          for (let i = 0; i < ConvertToArray(req.body.PO_DETAIL).length; i++) {
            //Detailของแต่ละใบ
            PriceOneArray.push(DataProduct[i].PRODUCT_PRICE);
          }
          //ราคารวมของแต่ละชิ้น
          let AmountArray = ConvertToArray(req.body.PO_AMOUNTPRODUCT); //AMOUNTPRODUCT ของแต่ละใบ
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
            "UPDATE erp_systems.po SET PO_PRICETOTAL = ? where PO_ID = ? ",
            [PriceTotal, req.body.PO_ID], //ID ของใบนั้นๆ
            function (err) {
              if (err) {
                res.json({
                  status: "error insert PO_PRICETOTAL ",
                  message: err,
                });
              } else {
                res.json({
                  status: "ok",
                  message: "Update PO success",
                });
              }
            }
          );
        }
      );
    }
  );
});

//DeletePO
app.post("/DeletePO/:PO_ID", function (req, res) {
  connectDB.execute(
    "DELETE FROM erp_systems.po WHERE PO_ID  = ?",
    //ส่ง EMPLOYEE_ID มากับ Path
    [req.params.PO_ID],

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

//PV
//CreatePV
app.post("/CreatePV", function (req, res) {
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
});

//SelectPV
app.post("/SelectPV", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  pv", [], function (err, PVdata) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", PVdata });
  });
});

//UpdatePV
app.post("/UpdatePV", function (req, res) {
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
app.post("/DeletePV/:PV_ID", function (req, res) {
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

//RV
//CreateRV
app.post("/CreateRV", function (req, res) {
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
});

//SelectRV
app.post("/SelectRV", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  rv", [], function (err, RVdata) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", RVdata });
  });
});

//UpdateRV
app.post("/UpdateRV", function (req, res) {
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
app.post("/DeleteRV/:RV_ID", function (req, res) {
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


//เรียกดูใบสำคัญที่ยังไม่ได้!!อนุมัติ
//AP3
app.post("/SelectNonApproveAP3", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  ap3 Where AP3_STATUS = 0 ", [], function (err, ap3data) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", ap3data });
  });
});
//PO
app.post("/SelectNonApprovePO", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  po Where PO_STATUS = 0 ", [], function (err, POdata) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", POdata });
  });
});
//PV
app.post("/SelectNonApprovePV", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  pv Where PV_STATUS = 0 ", [], function (err, PVdata) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", PVdata });
  });
});
//RV
app.post("/SelectNonApproveRV", function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  rv Where RV_STATUS = 0 ", [], function (err, RVdata) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", RVdata });
  });
});

//อัพโหดไฟล์รูปลายเซ็นต์
// UploadfileSignatureAP3
app.post("/uploadAP3", uploadAP3.single("fileupload"), (req, res) => {
  let Filename = "file-" + "-" + req.file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/AP3/" + Filename;
  var insertData = "UPDATE ap3 SET AP3_PATHSIGNATURE = ? WHERE AP3_ID = ? ";
  connectDB.query(insertData, [imgsrc, req.body.AP3_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});
// UploadfileSignaturePO
app.post("/uploadPO", uploadPO.single("fileupload"), (req, res) => {
  let Filename = "file-" + "-" + req.file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/PO/" + Filename;
  var insertData = "UPDATE PO SET PO_PATHSIGNATURE = ? WHERE PO_ID = ? ";
  connectDB.query(insertData, [imgsrc, req.body.PO_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});
// UploadfileSignaturePV
app.post("/uploadPV", uploadPV.single("fileupload"), (req, res) => {
  let Filename = "file-" + "-" + req.file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/PV/" + Filename;
  var insertData = "UPDATE pv SET PV_PATHSIGNATURE = ? WHERE PV_ID = ? ";
  connectDB.query(insertData, [imgsrc, req.body.PV_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});
// UploadfileSignatureRV
app.post("/uploadRV", uploadRV.single("fileupload"), (req, res) => {
  let Filename = "file-" + "-" + req.file.originalname.split(".")[0] + new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-Time-" + new Date().getHours() + "-" + new Date().getMinutes() + "." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/PV/" + Filename;
  var insertData = "UPDATE rv SET RV_PATHSIGNATURE = ? WHERE RV_ID = ? ";
  connectDB.query(insertData, [imgsrc, req.body.RV_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});



//StartServer
app.listen(3333, () => {
  console.log("Sever Start At Port 3333");
});
