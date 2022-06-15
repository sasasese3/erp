const express = require("express");
const session = require('express-session');
const cors = require("cors");
const router = require('./controllers/router');
const { sequelize } = require('./utils/sequelize');
const morgan = require('morgan');
const passport = require('passport');

//redis for session
const RedisStore = require('connect-redis')(session);
const { createClient } = require('redis');
const redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`, legacyMode: true });
redisClient.connect()
  .then(console.log('Connect to Redis server'))
  .catch(console.error);

const app = express();


//cors
app.use(cors());
//json
app.use(express.json());
//other body type
app.use(express.urlencoded({ extended: false }));
//logger
app.use(morgan('dev'));
//use express static folder
app.use(
  express.static(__dirname + "./Signature")
);
//session
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


sequelize.sync({ alter: { drop: false } })
  .then(console.log('Connect to MySQL server, All models were synchronized successfully.'))
  .catch((error) => console.error('Unable to sync to the models:', error));

// sequelize.define("sfd", "", {

// });

app.use(router);
//StartServer
app.listen(3333, () => {
  console.log("Server Start At Port 3333");
});
