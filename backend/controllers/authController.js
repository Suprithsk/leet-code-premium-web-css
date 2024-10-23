const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

  

const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ username, role }, "SECRET", { expiresIn: '1h' });

        const message = "Signin successfully";

        res.status(200).json({user, token, message });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ error: 'User already registered' });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ error: 'User already registered' });
        }

        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', newUser});
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    signin,
    signup
}