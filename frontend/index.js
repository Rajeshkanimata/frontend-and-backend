const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");
const { BACKEND_URL, PORT } = require("./config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Backend not reachable" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

app.listen(PORT, () => console.log(`🚀 Frontend running on port ${PORT}`));
