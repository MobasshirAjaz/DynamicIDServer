const express = require("express");
const cors = require("cors");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

app.use(cors());
app.use(express.json());

//Database connection. Change according to the database you are using.

const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "dynamicid",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//Database connected.

app.post("/entry", (req, res) => {
  console.log("request received");
  roll = req.body.roll;
  con.query(`select inside from user where roll=${roll}`, (err, result) => {
    if (result.length == 0) {
      console.log("sent invalid");
      res.json({ status: "invalid" });
    }
    if (err) throw err;
    console.log(result);
    console.log(roll);
    try {
      if (!result[0].inside) {
        con.query(
          `update user set inside=1 where roll=${roll}`,
          (err, result) => {
            if (err) throw err;
          }
        );
        res.json({ status: "allow" });
      } else {
        res.json({ status: "dont_allow" });
      }
    } catch (err) {
      console.log("invalid roll no.");
      console.log(err);
    }
  });
});

app.post("/exit", (req, res) => {
  roll = req.body.roll;
  con.query(`select inside from user where roll=${roll}`, (err, result) => {
    if (result.length == 0) {
      console.log("sent invalid");
      res.json({ status: "invalid" });
    }
    if (err) throw err;
    console.log(result);
    console.log(roll);
    try {
      if (result[0].inside) {
        con.query(
          `update user set inside=0 where roll=${roll}`,
          (err, result) => {
            if (err) throw err;
          }
        );
        res.json({ status: "allow" });
      } else {
        res.json({ status: "dont_allow" });
      }
    } catch (err) {
      console.log("invalid roll no.");
      console.log(err);
    }
  });
});
