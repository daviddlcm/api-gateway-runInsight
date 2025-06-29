const userService = require("../services/user.service")
const createUser = async (req,res) => {
    const user = req.body;
    try {
        const createdUser = await userService.createUser(user);
        return res.status(201).json(createdUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserById = async (req,res) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUserById(userId);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateUser = async (req,res) => {
    const userId = req.params.id;
    const updateUser = req.body;
    try {
        const updatedUser = await userService.updateUser(userId, updateUser);
        // if (!updatedUser) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    createUser,
    getUserById,
    updateUser
}