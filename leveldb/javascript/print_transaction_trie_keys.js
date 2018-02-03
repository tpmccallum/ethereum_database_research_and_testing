//Run the following first
//npm install levelup leveldown rlp merkle-patricia-tree assert --save

//Just getting the requirements
var Trie = require('merkle-patricia-tree/secure');
var levelup = require('levelup');
var leveldown = require('leveldown');
var RLP = require('rlp');
var assert = require('assert');
console.log("begin");

//Connecting to the leveldb database
var db = levelup(leveldown('/home/timothymccallum/gethDataDir/geth/chaindata'));

//Obtaining the state root (of the latest block) using this command web3.eth.getBlock(web3.eth.defaultBlock).stateRoot
//block 2 at the time
//var root = '0x55b3b55cac8793a38209f410541ee93926cd58e2d49f5b82e0e4501428c1a823';
//block 13 at time time
//var root = '0x73f842ee4f51b59cbcfa31d213720bae992f0679cc0f27dc9eb16f891ab08e11';
//block 23 at the time
//block 14 which holds the transaction
//var root = '0x4988f58d335e5fc3b9c35c6282b80d7053889c9991d18c287f0e5ca5050a967e';
//block 15 which has no transactions but is after the previous block which held the transaction
var root = '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'
//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, root);

//Creating a nodejs stream object so that we can access the data
var stream = trie.createReadStream()

//Turning on the stream (because the node js stream is set to pause by default)
stream.on('data', function (data){
  //printing out the keys of the "state trie"
  console.log("keys");
  console.log(data.key);
  console.log("values");
  console.log(data.value);
});

//Activity

//Created 2 accounts which generated two addresses
//0x19c4b28272fc737f7d3483dd18ab176ca59fd7c8 - coinbase
//0xbe4e1f1a934fbcbe6ffedc16dfba377974d3a568 [1]

//mined about 2 blocks

//ran this file and say 2 account keys in the state trie

//Created a 3rd account which generated the following single address
//0x87fb6767c16161d05ba948dd2f6f47e73e9d53c2

//Mined about 13 blocks

//ran this file and still only say 2 account keys in the state trie

//sent eth at block 13 from coinbase to account [2]
//eth.sendTransaction({from:eth.coinbase, to:eth.accounts[2], value: web3.toWei(0.05, "ether")})
//This generated the following transaction id
//0x45a0ccb4363d56f6d179ea78324fbcdf57d162dfec7051a0dd86eca8305674b8

//Mined 10 more blocks and sitting at block 23 

//ran this file again 




//87fb6767c16161d05ba948dd2f6f47e73e9d53c2 should have zero funds
