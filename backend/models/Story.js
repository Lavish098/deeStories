const mongoose = require('mongoose')


const StorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    body:{
        type: String,
        required: true
    },
    image: {
        type: String // Store the image as a base64 string
    },
    status:{
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    genre:{
        type: String,
        required: true
    },
    chapter:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Story', StorySchema)