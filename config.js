'use strict';
require('dotenv').config();
var express = require('express');
var pathExp = require("path");
var multer = require('multer');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
//var router = express.Router();
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);
var User = mongoose.model("User");
var uuid = require('uuid');


function genHash(count) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567899966600555777222abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < count; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


module.exports = function(app) {
  /*var storeDB = "mongodb://127.0.0.1:27017/bnpDB";
  var store = new MongoDBStore(
    {
      uri: storeDB,
      collection: 'mySessions'
  });

 	store.on('error', function(error) {
	  assert.ifError(error);
	  assert.ok(false);
	});*/

	app.use('/assets',express.static(__dirname + '/public'));
	//middleware
	/*app.use(session({
	  secret: 'keyboard cat',
	  store: store,
	  resave: true,	  
	  saveUninitialized: true,
	  cookie: {
	  	httpOnly: true, 
	  	//maxAge: 3600000 * 24, // 24 hours
	  	path: "/en"
	  } //secure: true will be set on the cookie when i this site is on https
	}));*/
	
	/*app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());*/	
	app.use(bodyParser.urlencoded({ extended: true,limit: '50mb'}));
	//app.use(bodyParser.json());
	app.use(bodyParser.json({limit: '50mb'}));


	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, './uploads')
	  },
	  filename: function (req, file, cb) {
	    cb(null, Date.now() + '-' + uuid.v1() + pathExp.extname(file.originalname)) //Appending .jpg
	  }
	})

	var upload = multer({ storage: storage });
	app.use(upload.any());

	app.engine('.html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.set('views', __dirname + '/views');
	//app.set('view engine', 'ejs');

	/*passport.serializeUser(function(user, done) {   
    	done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {		
			done(err, user);				
		});
	});*/
}