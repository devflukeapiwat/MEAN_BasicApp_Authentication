const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    firstname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    }
})

module.exports = mongoose.model('User',userSchema);