'use strict';
/*var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbURL = "mongodb://127.0.0.1:27017/bnpDB"; 
var options = {
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify:false,
}

mongoose.connect(dbURL,options)
.then(
  () => { console.log("db connected!") },
  err => { console.log(err)}
)*/

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    //useCreateIndex: true
})
.then(() => console.log("database cluster connected successfully!"))
.catch((err) => console.log(err))