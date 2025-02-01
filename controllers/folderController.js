import Folder from '../models/folder.js';

// Create a new folder
export const createFolder = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user?.id; // Assuming `req.user` contains the logged-in user's info from middleware

        if (!title) {
            return res.status(400).json({ error: 'Folder title is required.' });
        }

        if (!userId) {
            return res.status(401).json({ error: 'User authentication required.' });
        }

        const newFolder = new Folder({ title, files: [], userId });
        await newFolder.save();

        res.status(201).json(newFolder);
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).json({ error: 'Failed to create folder.' });
    }
};
