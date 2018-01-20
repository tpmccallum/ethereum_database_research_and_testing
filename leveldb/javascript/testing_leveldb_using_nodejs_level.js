//The following is an example of how to add and retrieve json data from leveldb via the nodejs high level leveldb wrapper
//Firstly reference the node library
var level = require('level')
//create database and specify encoding as json
var db = level('./tpmccallum', {valueEncoding: 'json'})
//just a reusable variable
var quote = '"'
console.log("About to add the data");
//put data into the database
db.put('dataKey', {name:'jsonData', type:'json'}, function(err) {
	console.log("Data added OK!");
    console.log("About to retrieve the data");
    //get data from the database
    db.get('dataKey', function(err, dataKey){
    	console.log("The data is " + quote + dataKey.type + quote);
    	console.log("Data retrieved OK!");
    })
})

