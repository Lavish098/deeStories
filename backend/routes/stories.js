const express = require('express')
const router = express.Router()
const path = require('path')
const { ensureAuth } = require('../middleware/auth');
const { getUser } = require("../controller/userController");


const Story = require('../models/Story')


router.get('/add', ensureAuth, (req, res) => {
    res.sendFile('add.html', {root: path.join(__dirname, '../public')});
})
router.post('/', ensureAuth, async (req, res) => {
    try {
        console.log(req.user);
        req.body.user = req.user
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err);
    }
})

router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public'})
            .populate('user')
            .sort({ createdAt: 'desc'})
            .lean()
        res.json(stories)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router