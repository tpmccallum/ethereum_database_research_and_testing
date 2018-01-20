//The following is an example of how to add and retrieve json data from leveldb via the nodejs high level leveldb wrapper
//Firstly reference the node library
var level = require('level')
//create database and specify encoding as json
var db = level('./tpmccallum', {valueEncoding: 'json'})

//Testing leveldb batch processing by passing in a pre written array variable called operations
console.log("Trying batch processing now ...");
console.log("Creating array");
var operations = [
{type:'put', key:'dataKeyOps1', value:'dataValueOps1'},
{type:'put', key:'dataKeyOps2', value:'dataValueOps2'},
{type:'put', key:'dataKeyOps3', value:'dataValueOps3'},
{type:'put', key:'dataKeyOps4', value:'dataValueOps4'}
]
console.log("Array created OK");
console.log("Performing batch operation by passing in the array")
db.batch(operations, function(err){
    if(err != null){
    	console.log("Error" + err);
    }
    else{
    	console.log("Data added successfully, OK!");
    }

})

//This outputs
//key= dataKeyOps1, value="dataValueOps1"
//key= dataKeyOps2, value="dataValueOps2"
//key= dataKeyOps3, value="dataValueOps3"
//key= dataKeyOps4, value="dataValueOps4"
