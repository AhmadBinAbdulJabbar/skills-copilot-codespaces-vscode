// create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

// create database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});

// create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    like: Number
});

// create model
const Comment = mongoose.model('Comment', commentSchema);

// set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// set up routes
app.get('/', function(req, res){
    res.render('home');
});

app.get('/comments', function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            console.log(err);
        } else {
            res.render('comments', {comments: comments});
        }
    });
});

app.post('/comments', function(req, res){
    Comment.create(req.body.comment, function(err, newComment){
        if(err){
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

app.listen(port, function(){
    console.log('Server is running on port ' + port);
});