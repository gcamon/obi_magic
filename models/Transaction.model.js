'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var TransactionSchema = new Schema ({
    amount: {
        type: String,
        default: ""
    },

    accNum: {
        type: String,
        default: ""
    },

    bank: {
        type: String,
        default: ""
    },

    destinationAcc: {
        type: String,
        default: ""
    },

    destinationName: {
        type: String,
        default: ""
    },

    message: {
        type: String,
        default: "BNPCHANNEL/EPNB-TRF/"
    },

    reference: {
        type: Number,
        default: Math.floor(Math.random() * 999898)
    },

    created: {
        type: Date,
        default: Date.now
    },

    title: {
        type: String,
        default: "transfer"
    },

    action: {
        type: String,
        default: 'Debit'
    },

    deleted: {
        type: Boolean,
        default: false
    },

},{ timestamps: true })


mongoose.model('Transaction', TransactionSchema);