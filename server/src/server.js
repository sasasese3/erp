const express = require("express");
const cors = require("cors");
const { uploadAP3, uploadPO, uploadPV, uploadRV } = require("./utils/fileUpload");
const connectDB = require('./utils/connectDB');
const router = require('./controllers/router');

const app = express();

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
