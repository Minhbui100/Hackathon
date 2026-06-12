const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors");
const config = require("./config.json");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
  user: config.user,
  host: "localhost",
  database: "recycle",
  password: config.password,
  port: config.port,
});

app.get("/neighborhood", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM neighborhood");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/route", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM route");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/street", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM street");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/plaza", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM plaza ORDER BY streetid");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/recycle", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recycle ORDER BY plaza_id, recycleid");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/recyclePerform", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recycleperform LIMIT 500");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/recyclePerform/:month", async (req, res) => {
  const { month } = req.params;
  try {
    let query;
    let values = [];

    if (month === "all") {
      query = "SELECT * FROM recycleperform ORDER BY perform_date LIMIT 500";
    } else {
      query = `
        SELECT * FROM recycleperform
        WHERE EXTRACT(MONTH FROM perform_date) = $1
        ORDER BY perform_date
        LIMIT 500
      `;
      values = [month];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
