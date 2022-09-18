'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var UserSchema = new Schema ({
    accountHolder: {
      type: String,
      default: ""
    },

    username: {
      type: String,
      default: ""
    },

    password: {
      type: String,
      default: ""
    },

    openBal: {
      type: String,
      default: ""
    },

    currBal: {
      type: String,
      default: ""
    },

    accType: {
      type: String,
      default: ""
    },

    currency: {
      type: String,
      default: "USD"
    },

    country: {
      type: String,
      default: ""
    },

    city: {
      type: String,
      default: ""
    },

    gender: {
      type: String,
      default: "male"
    },
   
    token: {
      type: String,
      default: ""
    },
    
    accNum: {
      type: String,
      default: ""
    },

    dob: {
      type: String,
      default: ''
    },

    activationKey: {
      type: String,
      default: ""
    },

    email: {
      type: String,
      default: ''
    },

    profile_pic_url: {
      type: String,
      default: ""
    },

    startDate: {
      type: Date,
      default: Date.now
    },
    
    deleted: {
        type: Boolean,
        default: false
    },

    transactions: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Transaction'
    }],

    isAdmin: {
      type: Boolean,
      default: false
    }
     

},{ timestamps: true })


mongoose.model('User', UserSchema);