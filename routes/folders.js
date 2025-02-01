// import express from 'express';
// import Folder from '../models/folder.js';
// import File from '../models/file.js';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // Middleware to check user authentication and extract user ID from the token
// const authenticateUser = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1]; 

//     if (!token) {
//         return res.status(401).json({ message: "No token provided." });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             console.error("JWT Verification Error:", err.message);
//             return res.status(401).json({ message: "Invalid token." });
//         }

//         req.userId = decoded.id; // Ensure it matches database user _id
//         next();
//     });
// };

// // Fetch folders for a specific user
// router.get('/', authenticateUser, async (req, res) => {
//     try {
//         const folders = await Folder.find({ userId: req.userId }).populate('files');
//         res.status(200).json(folders);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching folders', error });
//     }
// });

// // Create a new folder
// router.post('/', authenticateUser, async (req, res) => {
//     const { title } = req.body;

//     if (!title) {
//         return res.status(400).json({ message: 'Title is required' });
//     }

//     try {
//         const newFolder = new Folder({ title, userId: req.userId, files: [] });
//         await newFolder.save();
//         res.status(201).json(newFolder);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating folder', error });
//     }
// });

// // Update folder title
// router.put('/:id', authenticateUser, async (req, res) => {
//     const { title } = req.body;

//     if (!title) return res.status(400).json({ message: 'Folder title is required' });

//     try {
//         const updatedFolder = await Folder.findOneAndUpdate(
//             { _id: req.params.id, userId: req.userId },
//             { title },
//             { new: true }
//         );
//         if (!updatedFolder) return res.status(404).json({ message: 'Folder not found or unauthorized' });
//         res.status(200).json(updatedFolder);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating folder', error });
//     }
// });

// // Delete a folder
// router.delete('/:id', authenticateUser, async (req, res) => {
//     try {
//         const deletedFolder = await Folder.findOneAndDelete({ _id: req.params.id, userId: req.userId });
//         if (!deletedFolder) return res.status(404).json({ message: 'Folder not found or unauthorized' });

//         await File.deleteMany({ folderId: req.params.id });
//         res.status(200).json({ message: 'Folder deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting folder', error });
//     }
// });

// // Add a file to a folder
// router.post('/:id/files', authenticateUser, async (req, res) => {
//     const { title, language, code } = req.body;  // Changed 'content' to 'code' for consistency

//     if (!title || !language || !code) {
//         return res.status(400).json({ message: 'File title, language, and code are required' });
//     }

//     try {
//         const folder = await Folder.findOne({ _id: req.params.id, userId: req.userId });
//         if (!folder) return res.status(404).json({ message: 'Folder not found or unauthorized' });

//         const newFile = new File({ title, language, code, folderId: folder._id });
//         await newFile.save();

//         folder.files.push(newFile._id);
//         await folder.save();

//         res.status(201).json(newFile);
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding file to folder', error });
//     }
// });

// // Update a file
// router.put('/:folderId/files/:fileId', authenticateUser, async (req, res) => {
//     const { title, language, code } = req.body;

//     try {
//         const file = await File.findById(req.params.fileId);
//         if (!file) return res.status(404).json({ message: 'File not found' });

//         if (file.folderId.toString() !== req.params.folderId) {
//             return res.status(401).json({ message: 'Unauthorized access to this file' });
//         }

//         if (title) file.title = title;
//         if (language) file.language = language;
//         if (code) file.code = code;

//         await file.save();
//         res.status(200).json(file);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating file', error });
//     }
// });

// // Delete a file from a folder
// router.delete('/:folderId/files/:fileId', authenticateUser, async (req, res) => {
//     try {
//         const folder = await Folder.findOne({ _id: req.params.folderId, userId: req.userId });
//         if (!folder) return res.status(404).json({ message: 'Folder not found or unauthorized' });

//         const file = await File.findById(req.params.fileId);
//         if (!file) return res.status(404).json({ message: 'File not found' });

//         folder.files.pull(file._id);
//         await folder.save();

//         await file.deleteOne();
//         res.status(200).json({ message: 'File deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting file', error });
//     }
// });

// export default router;


import express from 'express';
import Folder from '../models/folder.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import File from '../models/file.js'; 
const router = express.Router();

// Middleware to check user authentication and extract user ID from the token
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
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        // console.log("user ID:", userId);

        // Fetch folders that belong to the user
        const folders = await Folder.find({ userId: userId });
        // console.log(folders)
        if (!folders || folders.length === 0) {
            return res.status(404).json({ message: "No folders found for this user." });
        }

        res.json(folders);
    } catch (error) {
        console.error("Error fetching folders:", error);
        res.status(500).json({ message: "Server error." });
    }
});
router.post('/getByIds', authenticateUser, async (req, res) => {
    try {
        const { folderIds } = req.body;

        if (!folderIds || !Array.isArray(folderIds) || folderIds.length === 0) {
            return res.status(400).json({ message: "No folder IDs provided" });
        }

        const folders = await Folder.find({ _id: { $in: folderIds }, userId: req.userId }).populate('files');

        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching folders", error });
    }
});
// Create a new folder and update user with the folder ID
router.post('/', authenticateUser, async (req, res) => {
    const { title } = req.body;

    if (!title || !req.userId) {
        return res.status(400).json({ message: 'Title and userId are required' });
    }

    try {
        // Create a new folder
        const newFolder = new Folder({ title, userId: req.userId, files: [] });
        await newFolder.save();

        // Update the user's folders array to include the new folder ID
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.folders.push(newFolder._id); // Add the new folder's ID to the user's folders array
        await user.save();

        res.status(201).json(newFolder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating folder', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const folderId = req.params.id;
        
        // Find and delete the folder by ID
        const deletedFolder = await Folder.findByIdAndDelete(folderId);

        if (!deletedFolder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        res.status(200).json({ message: "Folder deleted successfully", folderId });
    } catch (error) {
        res.status(500).json({ message: "Error deleting folder", error: error.message });
    }
});
// ✅ Update Folder Title
router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const { title } = req.body;
        const updatedFolder = await Folder.findByIdAndUpdate(
            req.params.id,
            { title },
            { new: true }
        );
        if (!updatedFolder) return res.status(404).json({ message: "Folder not found" });

        res.json(updatedFolder);
    } catch (error) {
        res.status(500).json({ message: "Error updating folder title", error });
    }
});
router.post('/:folderId/files', authenticateUser, async (req, res) => {
    const { folderId } = req.params;
    console.log(folderId);
    const { title, language, code } = req.body;
    console.log(title, language, code);
    if (!title || !language || !code) {
        return res.status(400).json({ message: "Title, language, and code are required" });
    }

    try {
        // Find the folder by ID
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        // Create the new file with the code passed from the frontend
        const newFile = new File({
            title,
            language,
            code,
            folderId
        });

        // Save the file
        await newFile.save();

        // Add the new file ID to the folder's files array
        folder.files.push(newFile._id);
        await folder.save();

        // Return the newly created file
        res.status(201).json(newFile);
    } catch (error) {
        console.error("Error adding file:", error);
        res.status(500).json({ message: "Error adding file", error });
    }
});
// Backend API to get files for a folder
router.get('/:folderId/files', authenticateUser, async (req, res) => {
    const { folderId } = req.params;
    try {
        const folder = await Folder.findById(folderId).populate('files');
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }
        res.status(200).json({ files: folder.files });
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ message: "Error fetching files", error });
    }
});
export default router;
