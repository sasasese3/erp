const express = require("express");
const cors = require("cors");
const connectDB = require('./utils/connectDB');
const { sequelize } = require('./utils/sequelize');
const router = require('./controllers/router');

const app = express();


//uplode

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use express static folder
app.use(
  express.static(__dirname + "./Signature")
);

//checkDBconnect
// connectDB.connect(function (err) {
//   if (err) {
//     return console.error("error: " + err.message);
//   }
//   console.log("Connected to the MySQL server.");
// });

sequelize.sync({ alter: true })
  .then(console.log('Connect to the MySQL server, All models were synchronized successfully.'))
  .catch((error) => console.error('Unable to sync to the models:', error));
// app.use(router);

//StartServer
app.listen(3333, () => {
  console.log("Server Start At Port 3333");
});
