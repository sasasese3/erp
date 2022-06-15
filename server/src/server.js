const express = require("express");
const cors = require("cors");
const connectDB = require('./utils/connectDB');
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

//cherkDBconnect
connectDB.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});


app.use(router);

//StartServer
app.listen(3333, () => {
  console.log("Sever Start At Port 3333");
});
