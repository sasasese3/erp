const router = require('express').Router();
const permit = require("../middlewares/authorization");
const userRoles = require('../utils/userRoles');
const passport = require('../utils/auth');

//เข้าสู่ระบบ
router.post("/login",
    passport.authenticate('local'),
    function (req, res) {
        return res.json({ msg: "Login success", data: req.user });
    }
);

//ออกจากระบบ
router.delete('/logout',
    permit(userRoles.ALL),
    function (req, res) {
        req.logOut((err) => {
            if (err) {
                return res.json({ msg: 'Invalid', data: err });
            }
        });
        req.session.cookie.maxAge = 0;
        return res.json({ msg: 'Logout success' });

    }
);

module.exports = router;