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
