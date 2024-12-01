const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

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
  roll = req.body.roll;
  con.query(`select inside from user where roll=${roll}`, (err, result) => {
    if (err) throw err;

    if (!result[0].inside) {
      con.query(
        `update user set inside=1 where roll=${roll}`,
        (err, result) => {
          if (err) throw err;
        }
      );
      res.send("allow");
    } else {
      res.send("dont_allow");
    }
  });
});

app.post("/exit", (req, res) => {
  roll = req.body.roll;
  con.query(`select inside from user where roll=${roll}`, (err, result) => {
    if (err) throw err;

    if (result[0].inside) {
      con.query(
        `update user set inside=0 where roll=${roll}`,
        (err, result) => {
          if (err) throw err;
        }
      );
      res.send("allow");
    } else {
      res.send("dont_allow");
    }
  });
});
