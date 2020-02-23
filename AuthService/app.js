const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

// SET ENVIRONMENT
env.config();

// IMPORT ROUTER
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

// connect to MongoDB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => { if (err) { console.log(err) } else { console.log('connected to db') } }
);

// USE MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// ROUTE MIDDLEWARE
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// START SERVER
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`Start Server and Running! port : ${port}`)
})

