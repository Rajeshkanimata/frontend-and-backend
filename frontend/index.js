const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Backend not reachable" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

app.listen(3000, () => console.log("Frontend running on port 3000"));
