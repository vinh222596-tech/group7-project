import userModel from '../models/useModel.js';
export const getUsers = async (req, res) => { 
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postUsers = async (req, res) => { 
    try {
        const { name, email } = req.body;
        const user = await userModel.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteUsers = async (req, res) => { 
    try {
        const { id } = req.params;
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
        const user = await userModel.findByIdAndUpdate(id, { name, email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}