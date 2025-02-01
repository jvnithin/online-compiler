import express from 'express';
import dotenv from 'dotenv';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Folder from '../models/folder.js';

dotenv.config(); // Load environment variables

const router = express.Router();

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in the environment variables.");
  process.exit(1); // Stop the server if the secret is missing
}

// POST /login route
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email is not registered.' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Fetch the folders based on folder IDs stored in the user's folders array
    const folders = await Folder.find({ '_id': { $in: user.folders } });

    // Generate JWT token using the secret from .env
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name },
      folders, // Send the user's folders in the response
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login', error });
  }
});

export default router;
