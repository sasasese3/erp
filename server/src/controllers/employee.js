const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { UniqueConstraintError } = require('sequelize');
const nodemailer = require('nodemailer');

const permit = require("../middlewares/authorization");
const userRoles = require('../utils/userRoles');
const { Employee, Supplier } = require('../utils/sequelize');
const { Op } = require("sequelize");

//Employee
//สมัครสมาชิก
router.post("/register", [
    body('id').notEmpty().isString(),
    body('email').notEmpty().withMessage('Email not empty').isEmail(),
    body('password').notEmpty().isString(),
    body('username').notEmpty().isString(),
    body('ssn').notEmpty().isString().default(null),
    body('firstname').optional().isString().default(null),
    body('lastname').optional().isString().default(null),
    body('position').optional().isString().default(null),
    body('department').optional().isString().default(null),
    body('birthdate').optional().isISO8601().default(null),
    body('address').optional().isString().default(null),
    body('phone_no').optional().isString().default(null),
],
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
            }

            const employee = await Employee.create({ ...req.body });
            const { password, ...other } = employee.toJSON();

            return res.json({ msg: "Register Success", data: other });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                for (key in error.fields) {
                    const responseKey = key === 'PRIMARY' ? 'Employee ID' : key;
                    return res.status(409).json({ msg: `${responseKey} is already used`, value: error.fields[key] });
                }
            }

            return res.status(400).json({ msg: "Something went wrong", error: error });
        }
    }
);

router.get("/", permit(userRoles.ALL), async function (req, res) {
    return res.json({ msg: 'Get current user', data: req.user });
});

router.patch("/", permit(userRoles.ADMIN), async function (req, res) {
    return res.json("Hello");
});


router.get('/supplier', permit(userRoles.EMPLOYEE), async function (req, res) {
    const q = req.query.q || "";
    try {
        const suppliers = await Supplier.findAll({
            where: {
                name: {
                    [Op.like]: `%${q}%`
                }
            },
            attributes: ['id', 'name']
        });
        return res.json({ msg: "Get suppliers success", data: suppliers });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
}
);

//แก้ไขโปรไฟล์Employee(update)
// router.post("/updateEmployee", function (req, res) {
//     connectDB.query(
//         "UPDATE employee SET EMPLOYEE_PERSONAL_ID = ? ,EMPLOYEE_FNAME = ? , EMPLOYEE_LNAME = ? , POSITION = ? , DEPARTMENT = ? , BIRTHDATE = ? , AGE = ? , ADDRESS = ? , PHONE_NUM = ? , EMAIL = ? , USERNAME = ?   WHERE EMPLOYEE_ID = ?",

//         [
//             req.body.EMPLOYEE_PERSONAL_ID,
//             req.body.EMPLOYEE_FNAME,
//             req.body.EMPLOYEE_LNAME,
//             req.body.POSITION,
//             req.body.DEPARTMENT,
//             req.body.BIRTHDATE,
//             req.body.AGE,
//             req.body.ADDRESS,
//             req.body.PHONE_NUM,
//             req.body.EMAIL,
//             req.body.USERNAME,
//             req.body.EMPLOYEE_ID,
//         ],

//         function (err) {
//             if (err) {
//                 res.json({ status: "error", message: err });
//                 return;
//             } else {
//                 res.json({ status: "ok", message: "Update success" });
//             }
//         }
//     );
// });

// //testดึงข้อมูล
// router.post("/testDB", function (req, res) {
//     connectDB.execute(
//         "SELECT * FROM employee Where username=?",
//         [req.body.USERNAME],

//         function (err, employee, fields) {
//             if (err) {
//                 res.json({ status: "error", message: err });
//                 return;
//             }

//             console.log(employee);
//         }
//     );
// });

// //Verify
// //ส่งเมลOTPเปลี่ยนรหัส
// router.post("/sendEmail", function (req, res) {
//     var USERNAME = req.body.USERNAME;
//     var PasswordOTP = String(Math.floor(Math.random() * 1000000));
//     bcrypt.hash(PasswordOTP, saltRounds, function (err, hash) {
//         console.log(USERNAME);
//         console.log(PasswordOTP);

//         //เอาOTPเข้าไปเก็บDB
//         connectDB.execute(
//             "INSERT INTO dataotp (USERNAME,OTP) VALUES (?,?) ",
//             [USERNAME, hash],

//             function (err) {
//                 if (err) {
//                     res.json({ status: "error", message: err });
//                     return;
//                 } else {
//                     //ตั้งเวลาลบOTP3นาที
//                     setTimeout(() => {
//                         connectDB.execute("DELETE FROM dataotp WHERE USERNAME = ?", [
//                             USERNAME,
//                         ]);
//                     }, 180000);
//                 }
//             }
//         );
//     });

//     var mail = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "testproject.erp.01@gmail.com", // Your email id
//             pass: "testpro01", // Your password
//         },
//     });
//     var mailOptions = {
//         from: "ERP_Project_CS-kmitl",
//         to: USERNAME,
//         subject: "verification Password",
//         html:
//             "<p>You requested for email verification use this Password<p>" +
//             PasswordOTP,
//     };
//     mail.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             res.json({ status: "error", message: error.message });
//         } else {
//             res.json({ status: "ok" });
//         }
//     });
// });
// //ยืนยีนOTPเปลี่ยนรหัส
// router.post("/sendVerify", function (req, res) {
//     //จับคู่OTP
//     var USERNAME = req.body.USERNAME;
//     var OTP_verify = req.body.OTP_verify;
//     var Newpassword = String(req.body.Newpassword);

//     console.log(USERNAME + " " + OTP_verify + " " + Newpassword);
//     bcrypt.hash(Newpassword, saltRounds, function (err, hash) {
//         connectDB.execute(
//             "SELECT * FROM dataotp Where USERNAME =?",
//             [USERNAME],

//             function (err, dataotp, fields) {
//                 if (err) {
//                     res.json({ status: "error", message: err });
//                     return;
//                 } else {
//                     //จับคู่ของเมลที่ส่งมา
//                     bcrypt.hash(Newpassword, saltRounds, function (err, hash) {
//                         if (OTP_verify.length === 6) {
//                             bcrypt.compare(
//                                 //จับคู่ OTP
//                                 OTP_verify,
//                                 dataotp[0].OTP,

//                                 function (err, forgot) {
//                                     if (forgot) {
//                                         connectDB.execute(
//                                             "UPDATE employee SET PASSWORD = ? where USERNAME = ? ",
//                                             [hash, USERNAME]
//                                         );
//                                         //ลบOTPเมื่อสำเร็จแล้ว
//                                         connectDB.execute(
//                                             "DELETE FROM dataotp WHERE USERNAME = ?",
//                                             [USERNAME]
//                                         );

//                                         res.json({
//                                             status: "ok",
//                                             message: "ResetPassword success",
//                                         });
//                                     } else {
//                                         res.json({
//                                             status: "err",
//                                             message: "OTP is not ture",
//                                         });
//                                     }
//                                 }
//                             );
//                         } else if (OTP_verify === " ") {
//                             res.json({
//                                 status: "err",
//                                 message: "OTP is not define",
//                             });
//                         } else {
//                             res.json({
//                                 status: "err",
//                                 message: "OTP is not ture",
//                             });
//                         }
//                     });
//                 }
//             }
//         );
//     });
// });

module.exports = router;