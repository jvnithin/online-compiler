import express from 'express';
import Folder from '../models/folder.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import File from '../models/file.js'; 
const router = express.Router();

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.status(401).json({ message: "Invalid token." });
        }

        req.userId = decoded.id; // Ensure it matches database user _id
        next();
    });
};
router.get("/:folderId/:fileId", authenticateUser, async (req, res) => {
    try {
        const { fileId } = req.params;
        // console.log('file route:' ,fileId)
        const file = await File.findById(fileId);
        console.log(file)
        if (!file) return res.status(404).json({ message: "File not found" });
        res.json(file);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;