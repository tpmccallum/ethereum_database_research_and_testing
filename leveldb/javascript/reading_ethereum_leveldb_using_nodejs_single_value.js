//The following is an example of how to add and retrieve json data from leveldb via the nodejs high level leveldb wrapper
//Firstly reference the node library
var level = require('level');
var rlp = require('rlp');
var db = level('/home/timothymccallum/gethDataDir/geth/lightchaindata');
/*
var keyValue = db.get()
var keyStream = db.createKeyStream()
keyStream.on('data', function (data){
	console.log("key=", data);
});
*/
db.get('LastBlock', function (err, value) {
if (err) return console.log('Ooops!', err) // likely the key was not found
	console.log("1" + value);
    var buffer = new Buffer(value, "binary");
    console.log("2" + buffer);
    var decoded = rlp.decode(value);
    console.log("3" + decoded);
})