var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const { hash } = require("bcrypt");
const saltRounds = 10;
var nodemailer = require("nodemailer");
//Token
var jwt = require("jsonwebtoken");
const Typeadmin = "admin";
const Typeuser = "user";
const Typeinspector = "inspector";
//uplode
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use express static folder
app.use(
  express.static(__dirname + "./Signature")
);

//create the connection to database
const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Teerapat230842",
  database: "erp_systems",
});

//cherkDBconnect
connectDB.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});
//Function
//แปลง text col Detail เป็น SQL
function ConvertToDetailProductQuery(Data) {
  let TextDetail = Data; //รับ Detail_Product_id;
  const MakeArray = TextDetail.split(",");
  let QueryTextArray = [];
  let QueryText = " ";

  for (let i = 0; i < MakeArray.length; i++) {
    if (i === MakeArray.length - 1) {
      let ArrayProductDetail = MakeArray[i];
      let Query = "PRODUCT_ID=" + " " + ArrayProductDetail + " ";
      QueryTextArray.push(Query);
    } else if (i !== 0) {
      let ArrayProductDetail = MakeArray[i];
      let Query = "PRODUCT_ID=" + " " + ArrayProductDetail + " " + "OR" + " ";
      QueryTextArray.push(Query);
    } else {
      let ArrayProductDetail = MakeArray[i];
      let Query = " " + ArrayProductDetail + " " + "OR" + " ";
      QueryTextArray.push(Query);
    }
  }
  for (let i = 0; i < QueryTextArray.length; i++) {
    QueryText += QueryTextArray[i];
  }
  return QueryText;
}
//ส่ง text from "1,2,3,4" มาแปลงเป็น Array
function ConvertToArray(Data) {
  let TextDetail = Data; //รับ Detail_Product_id;
  const MakeArray = TextDetail.split(",");
  let AnsArray = [];
  for (let i = 0; i < MakeArray.length; i++) {
    let getAns = MakeArray[i];
    Number(getAns);
    AnsArray.push(getAns);
  }
  return AnsArray;
}
//Fileupload
//AP3
const SignatureAP3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Signature/AP3");
  },
  filename: (req, file, cb) => { 
    cb(null,"file-"+"-"+file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
  },
});
const uploadAP3 = multer({ storage: SignatureAP3 });
//PO
const SignaturePO = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Signature/PO");
  },
  filename: (req, file, cb) => {
    cb(null,"file-"+"-"+file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
  },
});
const uploadPO = multer({ storage: SignaturePO });
//PV
const SignaturePV = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Signature/PV");
  },
  filename: (req, file, cb) => {
    cb(null,"file-"+"-"+file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
  },
});
const uploadPV = multer({ storage: SignaturePV });
//RV
const SignatureRV = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Signature/RV");
  },
  filename: (req, file, cb) => {
    cb(null,"file-"+"-"+file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + file.originalname.split(".")[file.originalname.split(".").length - 1]);
  },
});
const uploadRV = multer({ storage: SignatureRV });

//Admin //แก้ไข status ของ Employee
//เรียกดูรายชื่อพนักงานทั้งหมด
app.post("/SelectEmployeeforAdmin", jsonParser, function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  employee", [], function (err, EmployeeData) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", EmployeeData });
  });
});
//แก้ไข STATUS พนักงาน
app.post("/UpdateEmployeeforAdmin", jsonParser, function (req, res) {
  // Store hash in your password DB.
  connectDB.query("UPDATE employee SET STATUS = ? where EMPLOYEE_ID = ? ", [req.body.STATUS,req.body.EMPLOYEE_ID], function (err, EmployeeData) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", EmployeeData });
  });
});


//Employee
//สมัครสมาชิก
app.post("/register", jsonParser, function (req, res) {
  bcrypt.hash(req.body.PASSWORD, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    connectDB.query(
      "INSERT INTO employee (EMPLOYEE_ID,EMPLOYEE_PERSONAL_ID,EMPLOYEE_FNAME,EMPLOYEE_LNAME,POSITION,DEPARTMENT,BIRTHDATE,AGE,ADDRESS,PHONE_NUM,EMAIL,USERNAME,PASSWORD,STATUS) VALUES (?,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? )",
      [
        req.body.EMPLOYEE_ID,
        req.body.EMPLOYEE_PERSONAL_ID,
        req.body.EMPLOYEE_FNAME,
        req.body.EMPLOYEE_LNAME,
        req.body.POSITION,
        req.body.DEPARTMENT,
        req.body.BIRTHDATE,
        req.body.AGE,
        req.body.ADDRESS,
        req.body.PHONE_NUM,
        req.body.EMAIL,
        req.body.USERNAME,
        hash,
        req.body.STATUS,
      ],

      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", err });
          return;
        } else res.json({ status: "ok", message: "register success" });
      }
    );
  });
});

//แก้ไขโปรไฟล์Employee(update)
app.post("/updateEmployee", jsonParser, function (req, res) {
  connectDB.query(
    "UPDATE employee SET EMPLOYEE_PERSONAL_ID = ? ,EMPLOYEE_FNAME = ? , EMPLOYEE_LNAME = ? , POSITION = ? , DEPARTMENT = ? , BIRTHDATE = ? , AGE = ? , ADDRESS = ? , PHONE_NUM = ? , EMAIL = ? , USERNAME = ?   WHERE EMPLOYEE_ID = ?",

    [
      req.body.EMPLOYEE_PERSONAL_ID,
      req.body.EMPLOYEE_FNAME,
      req.body.EMPLOYEE_LNAME,
      req.body.POSITION,
      req.body.DEPARTMENT,
      req.body.BIRTHDATE,
      req.body.AGE,
      req.body.ADDRESS,
      req.body.PHONE_NUM,
      req.body.EMAIL,
      req.body.USERNAME,
      req.body.EMPLOYEE_ID,
    ],

    function (err) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } else {
        res.json({ status: "ok", message: "Update success" });
      }
    }
  );
});

//ลบข้อมูลสมาชิก(Employee) //adminจัดการ
app.post("/DeleteEmployee/:EMPLOYEE_ID", jsonParser, function (req, res) {
  connectDB.query(
    "DELETE FROM employee WHERE EMPLOYEE_ID  = ?",
    //ส่ง EMPLOYEE_ID มากับ Path
    [req.params.EMPLOYEE_ID],

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

//testดึงข้อมูล
app.post("/testDB", jsonParser, function (req, res) {
  connectDB.execute(
    "SELECT * FROM employee Where username=?",
    [req.body.USERNAME],

    function (err, employee, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      console.log(employee);
    }
  );
});

//เข้าสู่ระบบ
app.post("/login", jsonParser, function (req, res) {
  connectDB.query(
    "SELECT * FROM employee Where username=?",
    [req.body.USERNAME],

    function (err, employee, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      } 

      if (employee.length == 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      } 

      //ตรวจสอบว่ารหัสถูกมั้ย
      bcrypt.compare(
        req.body.PASSWORD,
        employee[0].PASSWORD,
        //sign Token ให้ User ที่มีต่ำแหน่งต่างกัน
        function (err, islogin) {
          if (islogin) {
            if (employee[0].STATUS === "user") {
              var token = jwt.sign(
                { USERNAME: employee[0].USERNAME },
                Typeuser,
                {
                  expiresIn: "1h",
                }
              );
            } else if (employee[0].STATUS === "inspector") {
              var token = jwt.sign(
                { USERNAME: employee[0].USERNAME },
                Typeinspector,
                {
                  expiresIn: "1h",
                }
              );
            } else if (employee[0].STATUS === "admin") {
              var token = jwt.sign(
                { USERNAME: employee[0].USERNAME },
                Typeadmin,
                {
                  expiresIn: "1h",
                }
              );
            }

            res.json({ status: "ok", employee , token});
          } else res.json({ status: "err", message: "login failed" });
        }
      );
    }
  );
});

//authen การเข้าถึงว่ามีสิทธิ์เข้าถึงมั้ย
app.post("/authenUser", jsonParser, function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, Typeuser);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.post("/authenInspector", jsonParser, function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, Typeinspector);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.post("/authenAdmin", jsonParser, function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, Typeadmin);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

//Verify
//ส่งเมลOTPเปลี่ยนรหัส
app.post("/sendEmail", jsonParser, function (req, res) {
  var USERNAME = req.body.USERNAME;
  var PasswordOTP = String(Math.floor(Math.random() * 1000000));
  bcrypt.hash(PasswordOTP, saltRounds, function (err, hash) {
    console.log(USERNAME);
    console.log(PasswordOTP);

    //เอาOTPเข้าไปเก็บDB
    connectDB.execute(
      "INSERT INTO dataotp (USERNAME,OTP) VALUES (?,?) ",
      [USERNAME, hash],

      function (err) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          //ตั้งเวลาลบOTP3นาที
          setTimeout(() => {
            connectDB.execute("DELETE FROM dataotp WHERE USERNAME = ?", [
              USERNAME,
            ]);
          }, 180000);
        }
      }
    );
  });

  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testproject.erp.01@gmail.com", // Your email id
      pass: "testpro01", // Your password
    },
  });
  var mailOptions = {
    from: "ERP_Project_CS-kmitl",
    to: USERNAME,
    subject: "verification Password",
    html:
      "<p>You requested for email verification use this Password<p>" +
      PasswordOTP,
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json({ status: "error", message: error.message });
    } else {
      res.json({ status: "ok" });
    }
  });
});
//ยืนยีนOTPเปลี่ยนรหัส
app.post("/sendVerify", jsonParser, function (req, res) {
  //จับคู่OTP
  var USERNAME = req.body.USERNAME;
  var OTP_verify = req.body.OTP_verify;
  var Newpassword = String(req.body.Newpassword);

  console.log(USERNAME + " " + OTP_verify + " " + Newpassword);
  bcrypt.hash(Newpassword, saltRounds, function (err, hash) {
    connectDB.execute(
      "SELECT * FROM dataotp Where USERNAME =?",
      [USERNAME],

      function (err, dataotp, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        } else {
          //จับคู่ของเมลที่ส่งมา
          bcrypt.hash(Newpassword, saltRounds, function (err, hash) {
            if (OTP_verify.length === 6) {
              bcrypt.compare(
                //จับคู่ OTP
                OTP_verify,
                dataotp[0].OTP,

                function (err, forgot) {
                  if (forgot) {
                    connectDB.execute(
                      "UPDATE employee SET PASSWORD = ? where USERNAME = ? ",
                      [hash, USERNAME]
                    );
                    //ลบOTPเมื่อสำเร็จแล้ว
                    connectDB.execute(
                      "DELETE FROM dataotp WHERE USERNAME = ?",
                      [USERNAME]
                    );

                    res.json({
                      status: "ok",
                      message: "ResetPassword success",
                    });
                  } else {
                    res.json({
                      status: "err",
                      message: "OTP is not ture",
                    });
                  }
                }
              );
            } else if (OTP_verify === " ") {
              res.json({
                status: "err",
                message: "OTP is not define",
              });
            } else {
              res.json({
                status: "err",
                message: "OTP is not ture",
              });
            }
          });
        }
      }
    );
  });
});

//ERP Main func
//AP3
//CreateAP3
app.post("/CreateAP3", jsonParser, function (req, res) {
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
});

//SelectAP3
app.post("/SelectAP3", jsonParser, function (req, res) {
  // Store hash in your password DB.
  connectDB.query("SELECT * FROM  ap3", [], function (err, AP3data) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    res.json({ status: "ok", AP3data });
  });
});

//UpdateAP3
app.post("/UpdateAP3", jsonParser, function (req, res) {
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
app.post("/DeleteAP3/:AP3_ID", jsonParser, function (req, res) {
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

//IB
//CreateIB
app.post("/CreateIB", jsonParser, function (req, res) {
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
app.post("/SelectIB", jsonParser, function (req, res) {
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
app.post("/UpdateIB", jsonParser, function (req, res) {
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
app.post("/DeleteIB/:IB_ID", jsonParser, function (req, res) {
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
app.post("/CreatePO", jsonParser, function (req, res) {
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
app.post("/SelectPO", jsonParser, function (req, res) {
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
app.post("/UpdatePO", jsonParser, function (req, res) {
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
app.post("/DeletePO/:PO_ID", jsonParser, function (req, res) {
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
app.post("/CreatePV", jsonParser, function (req, res) {
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
app.post("/SelectPV", jsonParser, function (req, res) {
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
app.post("/UpdatePV", jsonParser, function (req, res) {
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
app.post("/DeletePV/:PV_ID", jsonParser, function (req, res) {
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
app.post("/CreateRV", jsonParser, function (req, res) {
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
app.post("/SelectRV", jsonParser, function (req, res) {
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
app.post("/UpdateRV", jsonParser, function (req, res) {
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
app.post("/DeleteRV/:RV_ID", jsonParser, function (req, res) {
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
app.post("/SelectNonApproveAP3", jsonParser, function (req, res) {
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
app.post("/SelectNonApprovePO", jsonParser, function (req, res) {
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
app.post("/SelectNonApprovePV", jsonParser, function (req, res) {
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
app.post("/SelectNonApproveRV", jsonParser, function (req, res) {
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
  let Filename = "file-"+"-"+req.file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/AP3/"+Filename
  var insertData = "UPDATE ap3 SET AP3_PATHSIGNATURE = ? WHERE AP3_ID = ? ";
  connectDB.query(insertData, [imgsrc,req.body.AP3_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});
// UploadfileSignaturePO
app.post("/uploadPO", uploadPO.single("fileupload"), (req, res) => {
  let Filename = "file-"+"-"+req.file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/PO/"+Filename
  var insertData = "UPDATE PO SET PO_PATHSIGNATURE = ? WHERE PO_ID = ? ";
  connectDB.query(insertData, [imgsrc,req.body.PO_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});
// UploadfileSignaturePV
app.post("/uploadPV", uploadPV.single("fileupload"), (req, res) => {
  let Filename = "file-"+"-"+req.file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/PV/"+Filename
  var insertData = "UPDATE pv SET PV_PATHSIGNATURE = ? WHERE PV_ID = ? ";
  connectDB.query(insertData, [imgsrc,req.body.PV_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});
// UploadfileSignatureRV
app.post("/uploadRV", uploadRV.single("fileupload"), (req, res) => {
  let Filename = "file-"+"-"+req.file.originalname.split(".")[0]+ new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+"-Time-"+new Date().getHours()+"-"+new Date().getMinutes()+"." + req.file.originalname.split(".")[req.file.originalname.split(".").length - 1]
  var imgsrc = "D:/Project_จบ/Fullstack-Project/server/Signature/PV/"+Filename
  var insertData = "UPDATE rv SET RV_PATHSIGNATURE = ? WHERE RV_ID = ? ";
  connectDB.query(insertData, [imgsrc,req.body.RV_ID], (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
  });
});



//StartServer
app.listen(3333, () => {
  console.log("Sever Start At Port 3333");
});
