//The following is an example of how to add and retrieve json data from leveldb via the nodejs high level leveldb wrapper
//Firstly reference the node library
/*
var level = require('level')
var rlp = require('rlp')
var trie = require('merkle-patricia-tree');
var db = level('/home/timothymccallum/gethDataDir/geth/chaindata')


//Genesis state root
//Result from typing eth.getBlock(0).stateRoot
var genesis_block_state_root = "0xe403429877a3fd13eb3da17503af458dd0741ec3b617f2eaf2338ca945edb0e2";
//Create new trie
var trieGen = new trie(db, genesis_block_state_root);
var address1 = '0x77fd1acbd74fab8dc821fe5c88598c7b4b906fd4'
trieGen.get(address1, function (err, info) {
  console.log(info);
  var decoded = rlp.decode(info);
  console.log(decoded);
});
console.log("Finished with genesis block now!")

//Using latest block now
console.log("Using latest block now!")
var latest_block_state_root = '0x71fbdf3c0de93ec8562628cedcc22636f66e9ccd68ae30f7c7dc7a47038f7342'
var trieLatest = new trie(db, latest_block_state_root);
var address2 = '0xb7714bd73152a27939914c644fb7471966378626'
trieLatest.get(address2, function (err, info) {
  console.log(info);
  var decoded = rlp.decode(info);
  console.log(decoded);
});
*/

var Trie = require('merkle-patricia-tree');
var rlp = require('rlp');
var level = require('level');
var db = level('/home/timothymccallum/gethDataDir/geth/lightchaindata');

//the genesis state root
var root = '0xe403429877a3fd13eb3da17503af458dd0741ec3b617f2eaf2338ca945edb0e2';
var trie = new Trie(db, root);

//gav's address
var gav = new Buffer('0xb7714bd73152a27939914c644fb7471966378626', 'hex');

trie.get(gav, function (err, val) {
  var decoded = rlp.decode(val);
  console.log(decoded);
});









/*
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
*/

