const router = require("express").Router();
const connectDB = require("../utils/connectDB");

//Admin
router.route('/employee')
    //เรียกดูรายชื่อพนักงานทั้งหมด
    .get(function (req, res) {
        // Store hash in your password DB.
        connectDB.query("SELECT * FROM  employee", [], function (err, EmployeeData) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            }
            res.json({ status: "ok", EmployeeData });
        });
    }
    )
    //แก้ไข status ของ Employee
    .post(function (req, res) {
        // Store hash in your password DB.
        connectDB.query("UPDATE employee SET STATUS = ? where EMPLOYEE_ID = ? ", [req.body.STATUS, req.body.EMPLOYEE_ID], function (err, EmployeeData) {
            if (err) {
                res.json({ status: "error", message: err });
                return;
            }
            res.json({ status: "ok", EmployeeData });
        });
    });

//ลบข้อมูลสมาชิก(Employee)
router.delete('/employee:/:EMPLOYEE_ID', function (req, res) {
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

module.exports = router;