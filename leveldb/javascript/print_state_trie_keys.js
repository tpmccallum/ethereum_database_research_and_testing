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
  var arrayOfStateValues = RLP.decode(data.value);
  for (i = 0; i < arrayOfStateValues.length; i++){ console.log(RLP.decode(arrayOfStateValues[i], [skipRemainderCheck=false])); console.log("");}
  
  
    });


/*
var arrayLength = arrayOfStateValues[0].length;
  console.log("This array has " + arrayLength + " elements");
	for (var i = 0; i < arrayLength; i++) {
		console.log("Item " + i);
		console.log(arrayOfStateValues[0][i]);
	    console.log(" ");
	}
*/

