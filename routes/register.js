import express from 'express';
import User from '../models/user.js';
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    // Validate input
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }
    const newUser = new User({
      name,
      email,
      password,
      folders: [],
    });

    await newUser.save();
    console.log('User saved successfully:', newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user to database:', error.message);
    res.status(500).json({ message: 'Server error while saving user', error });
  }
});

export default router;
