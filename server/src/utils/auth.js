const passport = require('passport');
const LocalStrategy = require('passport-local');
const { compare } = require('bcrypt');

const { Employee } = require('../utils/sequelize');


passport.use(new LocalStrategy(async (username, password, cb) => {
    const employee = await Employee.findOne({
        where: { username: username }
    });

    if (!employee) {
        return cb(null, false, { message: 'Incorrect username or password' });
    }

    if (!(await compare(password, employee.password))) {
        return cb(null, false, { message: 'Incorrect username or password' });
    }
    const result = employee.toJSON();
    delete result.password;
    return cb(null, result);
}));

passport.serializeUser((user, cb) => {
    return cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    const employee = await Employee.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!employee) {
        cb(null, false);
    }
    cb(null, employee);
});

module.exports = passport;