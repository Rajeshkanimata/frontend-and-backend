const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { PORT, DB_HOST, DB_USER, DB_PASS, DB_NAME } = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL RDS");
});

app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], err => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User added successfully" });
  });
});

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
