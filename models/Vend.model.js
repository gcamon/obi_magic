'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var VendSchema = new Schema ({ 
    tk: {
        type: String,
        default: ""
    },

    mn: {
        type: String,
        default: ""
    },

    amount: {
        type: Number,
    },

    used: {
        type: Boolean,
        default: false
    },

    street_value: {
        type: Number,
        default: 0
    },

    deleted: {
        type: Boolean,
        default: false
    },

},{ timestamps: true })


mongoose.model('Vend', VendSchema);