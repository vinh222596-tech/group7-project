import express from 'express';
const userRoutes = express.Router();

import {
    getUsers,
    postUsers,
    deleteUsers,
    updateUsers,
} from '../controllers/userController.js';

userRoutes.get("/users", getUsers);
userRoutes.post("/users", postUsers);
userRoutes.delete("/users/:id", deleteUsers);
userRoutes.put("/users/:id", updateUsers);



export default userRoutes;
