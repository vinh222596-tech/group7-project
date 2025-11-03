import express from 'express';
const userRoutes = express.Router();




import {postUsers,  updateUsers, register, login, logout} from '../controllers/userController.js';


userRoutes.post("/users", postUsers);
userRoutes.put("/users/:id", updateUsers);

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);




export default userRoutes;
