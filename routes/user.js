// // routes/user.js
// const express = require('express');
// const router = express.Router();

// const userController = require('../controllers/userController');

// // GET /users  (note: since server uses app.use('/users', userRoutes), here path is '/')
// router.get('/', userController.getUsers);

// // POST /users
// router.post('/', userController.createUser);

// module.exports = router;
// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /users
router.get("/", userController.getUsers);

// POST /users
router.post("/", userController.createUser);

module.exports = router;
