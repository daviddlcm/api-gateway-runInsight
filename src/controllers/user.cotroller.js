const userService = require("../services/user.service")
const createUser = async (req,res) => {
    const user = req.body;
    try {
        const createdUser = await userService.createUser(user);
        return res.status(201).json(createdUser);
    } catch (error) {
        // console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error al crear usuario",error: error.message });
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
        // console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Error al obtener un usuario", error: error.message });
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
        // console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error al actualizar un usuario", error: error.message });
    }
}

const loginUser = async(req,res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.loginUser(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(200).json(user);
    } catch (error) {
        // console.error("Error logging in:", error);
        return res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
}

const addFriend = async (req,res) => {
    const { userId, friendId } = req.body;
    try {
        const updatedUser = await userService.addFriend(userId, friendId);
        return res.status(200).json(updatedUser);
    } catch (error) {
        // console.error("Error adding friend:", error);
        return res.status(500).json({ message: "Error al agregar amigo", error: error.message });
    }
}

const getAllMyFriends = async (req, res) => {
    const userId = req.params.id;
    try {
        const friends = await userService.getAllMyFriends(userId);
        return res.status(200).json(friends);
    } catch (error) {
        // console.error("Error fetching friends:", error);
        return res.status(500).json({ message: "Error al obtener amigos", error: error.message });
    }
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
    loginUser,
    addFriend,
    getAllMyFriends
}