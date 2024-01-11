const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json(err); 
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        } 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    req.session.userId = user.id;

    res.status(200).json({ message: 'You are now logged in' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

router.post('/logout', (req, res) => {
    if (req.session) {
        // Destroy the session and handle the result.
        req.session.destroy(err => {
            if (err) {
                // If an error occurred, send an error response.
                res.status(400).json({ message: 'Unable to log out, please try again' });
            } else {
                // On successful destruction of the session, send a success response.
                res.status(200).json({ message: 'You are now logged out!' });
            }
        });
    } else {
        // If there is no session, simply respond that the user is logged out.
        res.status(200).json({ message: 'You are already logged out' });
    }
});

router.put('/profile', async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: { id: req.session.userId }
        });

        if (updatedUser[0]) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;