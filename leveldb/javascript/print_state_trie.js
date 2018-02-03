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
var root = '0x8c77785e3e9171715dd34117b047dffe44575c32ede59bde39fbf5dc074f2976';

//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, root);

//Creating a nodejs stream object so that we can access the data
var stream = trie.createReadStream()

//Turning on the stream (because the node js stream is set to pause by default)
stream.on('data', function (data){
  //Capture the RLP serialised data structure
  var arrayOfStateValues = RLP.decode(data.value);
  //Loop through the data of the 3 accounts in the array to obtain the nonce, balance, storageRoot and codeHash for each one 
  for (i = 0; i < arrayOfStateValues.length; i++){ 
    console.log(RLP.decode(arrayOfStateValues[i], [skipRemainderCheck=false])); 
    console.log("");
  }
  
});