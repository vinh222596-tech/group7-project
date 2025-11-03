import express from 'express';
const userRoutes = express.Router();
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';  
import { v2 as cloudinary } from 'cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'social-media',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'],
    resource_type: 'auto',
  }
});
const uploadCloudinary = multer({ storage: storage });
import {getUsers, postUsers, deleteUsers, updateUsers, register, login, logout, getProfile, updateProfileName, forgotPassword, resetPassword, uploadAvatar} from '../controllers/userController.js';

import { checkJWT } from '../middleware/checkJWT.js';
import { checkRole } from '../middleware/checkrole.js';
userRoutes.post("/users", postUsers);
userRoutes.put("/users/:id", updateUsers);
userRoutes.get("/admin/users",checkJWT, checkRole, getUsers);
userRoutes.delete("/admin/users/:id",checkJWT, checkRole, deleteUsers);
userRoutes.get("/profile/me", checkJWT, getProfile);
userRoutes.put("/profile/me/name", checkJWT, updateProfileName);
userRoutes.put("/profile/me/avatar", checkJWT, uploadCloudinary.single('image'), uploadAvatar);
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:resetPasswordToken", resetPassword);



export default userRoutes;
