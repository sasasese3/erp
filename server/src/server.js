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
