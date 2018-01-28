//Run the following first
//npm install levelup leveldown rlp merkle-patricia-tree assert --save

//Just getting the requirements
var Trie = require('merkle-patricia-tree/secure');
var levelup = require('levelup');
var leveldown = require('leveldown');
var RLP = require('rlp');
var assert = require('assert');

//Connecting to the leveldb database
var db = levelup(leveldown('/home/timothymccallum/gethDataDir/geth/chaindata'));

//Obtaining the state root (of the latest block) using this command web3.eth.getBlock(web3.eth.defaultBlock).stateRoot
//block 2 at the time
//var root = '0x55b3b55cac8793a38209f410541ee93926cd58e2d49f5b82e0e4501428c1a823';
//block 13 at time time
//var root = '0x73f842ee4f51b59cbcfa31d213720bae992f0679cc0f27dc9eb16f891ab08e11';
//block 23 at the time
var root = '0x8c77785e3e9171715dd34117b047dffe44575c32ede59bde39fbf5dc074f2976';
//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, root);

//Creating a nodejs stream object so that we can access the data
var stream = trie.createReadStream()

//Turning on the stream (because the node js stream is set to pause by default)
stream.on('data', function (data){
  //printing out the keys of the "state trie"
  console.log(data.key);
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
