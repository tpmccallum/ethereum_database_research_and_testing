//The following is an example of how to add and retrieve json data from leveldb via the nodejs high level leveldb wrapper
//Firstly reference the node library
var level = require('level')

var db = level('/home/timothymccallum/gethDataDir/geth/lightchaindata')

var keyStream = db.createKeyStream()
keyStream.on('data', function (data){
	console.log("key=", data);
});

