const router = require("express").Router();
const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');
const userRoles = require('../utils/userRoles');
const { Employee } = require('../utils/sequelize');

//Admin
router.get('/employee', async function (req, res) {
    // Store hash in your password DB.
    try {
        const employees = await Employee.findAll({ where: { id: { [Op.ne]: req.user.id } }, attributes: ['id', 'email', 'username', 'firstname', 'lastname', 'role', 'verified'] });
        return res.json({ msg: "Get all employee", data: employees });

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: error });
    }
});

router.patch('/employee', [
    body('id').notEmpty().isInt().custom((value, { req }) => {
        if (req.user.id === value) {
            throw new Error("Could not change yourself role");
        }
        return true;
    }),
    body('role').notEmpty().isIn(userRoles.ALL)
],
    async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ msg: "Invalid Body", error: errors.array() });
            }

            const employee = await Employee.findByPk(req.body.id);
            if (!employee) {
                return res.status(400).json({ msg: 'Invalid ID' });
            }

            await employee.update({ role: req.body.role });

            return res.json({ msg: 'Change role success' });
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error: error });
        }
    });

//ลบข้อมูลสมาชิก(Employee)
// router.delete('/employee:/:EMPLOYEE_ID', function (req, res) {
//     connectDB.query(
//         "DELETE FROM employee WHERE EMPLOYEE_ID  = ?",
//         //ส่ง EMPLOYEE_ID มากับ Path
//         [req.params.EMPLOYEE_ID],

//         function (err) {
//             if (err) {
//                 res.json({ status: "error", message: err });
//                 return;
//             } else {
//                 res.json({ status: "ok", message: "Delete success" });
//             }
//         }
//     );
// });

module.exports = router;