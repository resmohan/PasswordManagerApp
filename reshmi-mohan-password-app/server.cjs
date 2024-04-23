const express = require('express');
const mongoose = require('mongoose');
const userApi = require('./backend/api/userApi.cjs')
const userPasswordApi = require('./backend/api/userPasswordApi.cjs')
const shareRequestApi = require('./backend/api/shareRequestApi.cjs')
const cookieParser = require('cookie-parser')
const path = require('path')

// const mongoDbEndPoint = "mongodb+srv://webdev:Welcome@webdevcluster.f7ct0rx.mongodb.net/?retryWrites=true&w=majority&appName=WebDevCluster";
const mongoDbEndPoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/WebDevCluster';

mongoose.connect(mongoDbEndPoint)
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to Mongo DB"));

const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userApi)
app.use('/api/userPasswords', userPasswordApi)
app.use('/api/shareRequests', shareRequestApi)

//if none of the above paths match, redirect to our fronend code
let frontend_dir = path.join(__dirname, 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    res.sendFile(path.join(frontend_dir, "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
    console.log("Starting back end app")
})