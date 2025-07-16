// ------------------   core modules  ----------------------------------------

const mongoose=require("mongoose");

mongoose.connect("url");



// ------------------   custom modules  ----------------------------------------

function add(a,b){
    return a+b;

}
//export
module.exports={add};

//import
const add=require("add");

