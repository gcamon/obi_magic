"use strict";
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: 'gcamon29@outlook.com',
        pass: 'icui4cuOK!'
    }
});

module.exports = transporter;

