const express = require('express')
const router = express.Router()
const path = require('path')
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const { getUser } = require("../controller/userController");


const Story = require('../models/Story')


router.get('/', ensureGuest, (req, res) => {
    res.sendFile('login.html', {root: path.join(__dirname, '../public')});
})
router.get('/dashboard', ensureAuth, (req, res) => {
    res.sendFile('dashboard.html', {root: path.join(__dirname, '../public')});
})
router.get('/api/user', getUser)

router.get('/api/stories', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user }).lean();
        res.json(stories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router