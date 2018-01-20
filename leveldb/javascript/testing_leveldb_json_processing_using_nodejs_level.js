//The following is an example of how to add and retrieve json data from leveldb via the nodejs high level leveldb wrapper
//Firstly reference the node library
var level = require('level')
//create database and specify encoding as json
var db = level('./tpmccallum', {valueEncoding: 'json'})

//Testing leveldb batch processing by passing in a pre written array variable called operations
console.log("Trying batch processing now ...");

var complexJson = {
	firstName: "John",
	lastName: "Smith",
	pets: ["dog", "cat"],
	address: {number: "123", street:"main street", city:"new york"}
}

db.put('complexJson', complexJson, function(err){
    if(err != null){
    	console.log(err);
    }
    else
    {
    	console.log("Data has been added");
    }

})

//This outputs
//key= complexJson, value={"firstName":"John","lastName":"Smith","pets":["dog","cat"],"address":{"number":"123","street":"main street","city":"new york"}}
