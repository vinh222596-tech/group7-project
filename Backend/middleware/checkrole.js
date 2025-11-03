import userModel from '../models/useModel.js';
export const checkRole = async (req, res, next) => { 
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.role !== "admin") {
            return res.status(400).json({ message: "User is not an admin" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}