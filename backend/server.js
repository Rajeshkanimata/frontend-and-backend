const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection (RDS)
const db = mysql.createConnection({
  host: process.env.DB_HOST || "your-rds-endpoint.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASS || "password123",
  database: process.env.DB_NAME || "userdb"
});

db.connect(err => {
  if (err) console.error("❌ DB connection failed:", err);
  else console.log("✅ Connected to MySQL");
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Missing name/email" });
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User added", id: result.insertId });
  });
});

app.listen(4000, () => console.log("Backend running on port 4000"));
