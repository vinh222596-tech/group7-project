// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// let users = [];

// app.get("/users", (req, res) => {
//   res.json(users);
// });

// app.post("/users", (req, res) => {
//   const user = req.body;
//   users.push(user);
//   console.log("✅ User received:", user);
//   res.status(201).json(user);
// });

// app.listen(5000, "0.0.0.0", () => {
//   console.log("✅ Server running on port 5000");
// });
// server.js
// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import routes (chỉ 1 lần thôi)
const userRoutes = require("./routes/user");
console.log("📦 Đã nạp userRoutes:", userRoutes);

// ✅ Route kiểm tra server
app.get("/", (req, res) => res.send("Server đang chạy OK!"));

// ✅ Route cho /users
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log("This is from backend branch");
});
