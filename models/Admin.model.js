'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var AdminSchema = new Schema ({
    name: {
        type: String,
        default: "Mikasa"
    },

    phone: {
        type: String,
        default: "+2346465756"
    },

    role: {
        type: String,
        default: "admin"
    },

    email: {
        type: String,
        default: "maxi@gmail.com"
    },

    city: {
        type: String,
        default: "Birmingham"
    },

    state: {
        type: String,
        default: "Califonia"
    },

   
    username: {
        type: String,
    },

    password: {
        type: String,
    },

    created: {
        type: Date,
        default: Date.now
    },

    deleted: {
        type: Boolean,
        default: false
    },

    admin: {
        type: Boolean,
        default: false
    },

    super_admin: {
        type: Boolean,
        default: false
    }

},{ timestamps: true })


mongoose.model('Admin', AdminSchema);