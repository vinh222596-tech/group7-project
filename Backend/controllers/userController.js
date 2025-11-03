import userModel from '../models/useModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
export const getUsers = async (req, res) => { 
    try {
        const users = await userModel.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postUsers = async (req, res) => { 
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        const user = await userModel.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteUsers = async (req, res) => { 
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const user = await userModel.findByIdAndDelete(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateUsers = async (req, res) => { 
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        const user = await userModel.findByIdAndUpdate(id, { name, email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const register = async (req, res) => { 
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            name: name,
            email: email,
            password:hashedPassword,
        });
        user.save();
        if (user) {
            return res.status(201).json({ message: "User created successfully" });
        } else {
            return res.status(400).json({ message: "User not created" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, "group7", { expiresIn: "3d" });
        res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3 * 60 * 60 * 1000 });
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const logout = async (req, res) => { 
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getProfile = async (req, res) => { 
    try {
        const user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            user: user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateProfileName = async (req, res) => { 
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const user = await userModel.findByIdAndUpdate(req.userId, { name });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "Profile updated successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteUser = async (req, res) => {
    try {
       
    
        const user = await userModel.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          message: "Email not found"
        });
      }
      const resetPasswordToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
      await user.save();
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "kakaluno3@gmail.com",
          pass: "mdjl vnjz dxwo eejr",
        },
      });
      const resetLink = `http://localhost:5173/reset-password/${resetPasswordToken}`;
      await transporter.sendMail({
        from: "admin@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đặt lại mật khẩu</title>
  <style>
    body {
      font-family: Tahoma, sans-serif;
      background-color: #eaeaea;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 500px;
      margin: 30px auto;
      background: #fff;
      border: 1px solid #ccc;
      padding: 20px;
    }
    h2 {
      text-align: center;
      background: #0073e6;
      color: white;
      padding: 10px;
      margin: -20px -20px 20px -20px;
    }
    p {
      font-size: 14px;
      color: #222;
    }
    .btn {
      display: inline-block;
      background: #0073e6;
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      margin-top: 15px;
      border: 1px solid #005bb5;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      margin-top: 30px;
      border-top: 1px solid #ccc;
      padding-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Đặt lại mật khẩu</h2>
    <p>Chào <b>${email}</b>,</p>
    <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
    <p>Bấm vào liên kết bên dưới để tiếp tục (có hiệu lực trong 15 phút):</p>
    <p><a href="${resetLink}" class="btn">Đặt lại mật khẩu</a></p>
    <p>Nếu bạn không yêu cầu điều này, hãy bỏ qua email.</p>
   
  </div>
</body>
</html>
  ${resetLink}`,
      });
      res.status(200).json({
        message: "Gửi Link Reset Mật Khẩu Thành Công",
      });
    } catch (error) {
      res.status(500).json({
        message: "Gửi Link Reset Mật Khẩu Thất Bại",
        error: error
      });
    }
  };
  
  export const resetPassword = async (req, res) => {
    try {
      const { resetPasswordToken } = req.params;
      const { newPassword } = req.body;
      const user = await userModel.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({
          message: "Token không hợp lệ hoặc đã hết hạn",
        });
      }
      if (!newPassword) {
        return res.status(400).json({
          message: "Vui lòng nhập mật khẩu mới"
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      user.resetPasswordToken = "";
      user.resetPasswordExpire = Date.now();
  
      await user.save();
  
  
      return res.status(200).json({
        message: "Đặt lại mật khẩu thành công",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi server khi đặt lại mật khẩu",
        error: error.message,
      });
    }
  };
export const uploadAvatar = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "File is required" });
        }

        
        const user = await userModel.findByIdAndUpdate(req.userId, { avatar: file.path });
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Avatar uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}