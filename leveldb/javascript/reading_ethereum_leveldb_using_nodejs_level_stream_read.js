//The following is an example of how to add and retrieve json data from leveldb via the nodejs high level leveldb wrapper
//Firstly reference the node library
var level = require('level')
var rlp = require('rlp')

var db = level('/home/timothymccallum/gethDataDir/geth/chaindata')

//Genesis state root
//Result from typing eth.getBlock(0).stateRoot
var genesis_block_state_root = "0xe403429877a3fd13eb3da17503af458dd0741ec3b617f2eaf2338ca945edb0e2";

var stream = db.createReadStream()
stream.on('data', function (data){
	var base64data = new Buffer(genesis_block_state_root, 'binary').toString('base64');
	console.log(base64data);
});


var stream = db.createReadStream()
stream.on('data', function (data){
	var base64data = new Buffer(genesis_block_state_root, 'binary').toString('base64');
	console.log(base64data);
});


