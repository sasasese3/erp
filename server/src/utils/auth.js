const passport = require('passport');
const LocalStrategy = require('passport-local');
const { compare } = require('bcrypt');

const { Employee } = require('../utils/sequelize');


passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, cb) => {
    const employee = await Employee.findOne({
        where: { email: email }
    });

    if (!employee) {
        return cb(null, false, { message: 'Incorrect email or password' });
    }

    if (!(await compare(password, employee.password))) {
        return cb(null, false, { message: 'Incorrect email or password' });
    }
    const result = employee.toJSON();
    delete result.password;
    return cb(null, result);
}));

passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        const { password, ...other } = user;
        return cb(null, { ...other });
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});

module.exports = passport;