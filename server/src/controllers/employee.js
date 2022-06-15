const router = require('express').Router();
const connectDB = require('../utils/connectDB');
const bcrypt = require('bcrypt');

//Employee
//สมัครสมาชิก
router.post("/register", function (req, res) {
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
router.post("/updateEmployee", function (req, res) {
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

//testดึงข้อมูล
router.post("/testDB", function (req, res) {
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

module.exports = router;