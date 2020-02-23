const express = require('express');
const route = express.Router();
const { signInValidate, signUpValidate } = require('../utils/auth.validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');

route.post('/sign-in', async (req, res, next) => {

    // VALIDATE SIGN IN EMAIL AND PASSWORD
    const { error } = signInValidate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    // Checking if the user aleady in the database 
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.status(400).send('Email not found')

    // Password is correct 
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
        return res.status(400).send('Invalid password');
    }

    res.status(200).json({ _id: user._id });
})

route.post('/sign-up', async (req, res, next) => {
    // VALIDATE SIGN UP DATA
    const { error } = signUpValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECKING PASSWORD AND CONFIRM PASSWORD IS SAME
    if (req.body.password !== req.body.confirm) {
        res.status(400).send(`Password not match`)
    }

    // Checking if the user aleady in the database 
    const emailExit = await User.findOne({ email: req.body.email.toLowerCase() });
    if (emailExit) return res.status(400).send('Email already exists')

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE A NEW USER
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.toLowerCase(),
        password: hashedPassword
    })

    try {
        const saveUser = await user.save();
        res.status(200).send({ user: user._id })
    } catch (err) {
        res.status(400).send(err);
    }

})

route.put('/', (req, res, next) => {
    res.send('update profile');
})

route.put('/reset-password', async (req, res, next) => {

    // Checking if the user aleady in the database 
    const user = await User.findById(req.body._id);
    if (!user) return res.status(400).send('Email not found')

    // CHECKING PASSWORD AND CONFIRM PASSWORD IS SAME
    if (req.body.password !== req.body.confirm) {
        res.status(400).send(`Password not match`)
    }

     // hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);
     
    // UPDATE USER
    const updateUser = await user.updateOne({ password:hashedPassword });

    res.status(200).send(updateUser);
})



module.exports = route;