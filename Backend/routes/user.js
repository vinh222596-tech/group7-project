import express from 'express';
const userRoutes = express.Router();


import {postUsers, updateUsers, register, login, logout, getProfile, updateProfileName} from '../controllers/userController.js';

import { checkJWT } from '../middleware/checkJWT.js';

userRoutes.post("/users", postUsers);
userRoutes.put("/users/:id", updateUsers);

userRoutes.get("/profile/me", checkJWT, getProfile);
userRoutes.put("/profile/me/name", checkJWT, updateProfileName);

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);



export default userRoutes;
