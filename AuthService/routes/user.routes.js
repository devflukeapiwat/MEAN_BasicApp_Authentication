const express = require('express');
const route = express.Router();
const User = require('../models/User');

route.get('/', async (req, res, next) => {
    var userList = await User.find();
    res.send(userList);
})

route.get('/:id', (req, res, next) => {

    User.findById(req.params.id).then((document) => {
        res.send(document);
    });

})

route.put('/', (req, res, next) => {
    User.updateOne(req.params.id,)
    res.send(`update user ${req.params.id}`);
})


route.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then((document) => {
        res.send(document);
    });
})


module.exports = route;