const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ user: { id } }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        await user.save();

        const token = generateToken(user.id);

        res.json({ token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar } });
    } catch (err) {
        fs.writeFileSync('error.log', `REGISTER ERROR: ${err.message}\nStack: ${err.stack}\n`);
        res.status(500).send('Server error');
    }
};

// @route   POST api/auth/login
// @desc    Auth user & get token
// @access  Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const token = generateToken(user.id);

        res.json({ token, user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
