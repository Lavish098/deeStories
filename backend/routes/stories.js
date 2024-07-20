const express = require('express')
const router = express.Router()
const path = require('path')
const { ensureAuth } = require('../middleware/auth');
const { getUser } = require("../controller/userController");
const mongoose  = require('mongoose');
const multer = require('multer');


// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle image uploads
const uploadMiddleware = upload.single('image');


const Story = require('../models/Story');


router.get('/add', ensureAuth, (req, res) => {
    res.sendFile('add.html', {root: path.join(__dirname, '../public')});
})
router.post('/', ensureAuth, uploadMiddleware, async (req, res) => {
    try {
        
        console.log(req.body);
        req.body.user = req.user
          // If an image is uploaded, convert it to base64
          let imageBase64 = '';
          if (req.file) {
              imageBase64 = req.file.buffer.toString('base64');
          }
          console.log(imageBase64);
          const genres = req.body.genre.toString();
          const storyData = {
            ...req.body,
            genre: genres,
            image: imageBase64 // Store the image as a base64 string
        };
        await Story.create(storyData)
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

router.get('/:id', ensureAuth, async(req, res) => {
    try {
        let story = await Story.findById(req.params.id)
        .populate('user')
        .lean()

        if(!story){
            console.log('no Story');
        }
        res.json(story)
    } catch (error) {
        
    }
})

//edit page
router.get('/edits/:id', ensureAuth, (req, res) => {
    res.sendFile('edit.html', {root: path.join(__dirname, '../public')});
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.find({
            _id: req.params.id
            }).lean()
        
            if(!story){
                console.log('error');
            }
            if(story[0].user.toString() != req.user){
                res.redirect('/stories')
            } else {
                res.json(story);
            }
    } catch (err) {
        console.log(err);
    }
})

//Update story
router.put('/:id', ensureAuth, async(req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        console.log(story);
    
        if(!story){
            console.log(error);
        } 
        console.log(story.user);
        console.log(req.user);
        if(story.user != req.user){
            console.log('true');
            res.redirect('/stories')
        } else{
            const { user, ...updateData } = req.body;       
    
            story = await Story.findOneAndUpdate({ _id: req.params.id }, { ...updateData, user: user._id  }, {
                new: true,
                runValidators: true
            })
    
            res.redirect('/dashboard')
        }
    } catch (err) {
        console.log(err);
    }
   
})

router.delete('/:id', ensureAuth, async(req, res) => {
    try{
        await Story.findByIdAndDelete({ _id: req.params.id})
        res.redirect('/dashboard')
    }catch (err){
        console.log(err);
    }
})

//user stories
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()
        res.json(stories)
    } catch (err) {
        console.log(err);

    }
})

module.exports = router