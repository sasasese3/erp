const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('../utils/auth');

//เข้าสู่ระบบ
router.post("/login", passport.authenticate('local'), (req, res) => {
    return res.json(req.user);
});

router.delete('/logout', passport.authenticate('session'), (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.json({ msg: 'Invalid', data: err });
        }
    });
    req.session.cookie.maxAge = 0;
    return res.json({ msg: 'Logout success' });

});
// router.post("/login", function (req, res) {
//     connectDB.query(
//         "SELECT * FROM employee Where username=?",
//         [req.body.USERNAME],

//         function (err, employee, fields) {
//             if (err) {
//                 res.json({ status: "error", message: err });
//                 return;
//             }

//             if (employee.length == 0) {
//                 res.json({ status: "error", message: "no user found" });
//                 return;
//             }

//             //ตรวจสอบว่ารหัสถูกมั้ย
//             bcrypt.compare(
//                 req.body.PASSWORD,
//                 employee[0].PASSWORD,
//                 //sign Token ให้ User ที่มีต่ำแหน่งต่างกัน
//                 function (err, islogin) {
//                     if (islogin) {
//                         if (employee[0].STATUS === "user") {
//                             var token = jwt.sign(
//                                 { USERNAME: employee[0].USERNAME },
//                                 Typeuser,
//                                 {
//                                     expiresIn: "1h",
//                                 }
//                             );
//                         } else if (employee[0].STATUS === "inspector") {
//                             var token = jwt.sign(
//                                 { USERNAME: employee[0].USERNAME },
//                                 Typeinspector,
//                                 {
//                                     expiresIn: "1h",
//                                 }
//                             );
//                         } else if (employee[0].STATUS === "admin") {
//                             var token = jwt.sign(
//                                 { USERNAME: employee[0].USERNAME },
//                                 Typeadmin,
//                                 {
//                                     expiresIn: "1h",
//                                 }
//                             );
//                         }

//                         res.json({ status: "ok", employee, token });
//                     } else res.json({ status: "err", message: "login failed" });
//                 }
//             );
//         }
//     );
// });

// //authen การเข้าถึงว่ามีสิทธิ์เข้าถึงมั้ย
// router.post("/authenUser", function (req, res) {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         var decoded = jwt.verify(token, Typeuser);
//         res.json({ status: "ok", decoded });
//     } catch (err) {
//         res.json({ status: "error", message: err.message });
//     }
// });

// router.post("/authenInspector", function (req, res) {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         var decoded = jwt.verify(token, Typeinspector);
//         res.json({ status: "ok", decoded });
//     } catch (err) {
//         res.json({ status: "error", message: err.message });
//     }
// });

// router.post("/authenAdmin", function (req, res) {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         var decoded = jwt.verify(token, Typeadmin);
//         res.json({ status: "ok", decoded });
//     } catch (err) {
//         res.json({ status: "error", message: err.message });
//     }
// });


module.exports = router;