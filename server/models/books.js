var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var schema = new Schema({
//     name : {type:String, require:true},
//     author: {type:String, require:true},
//     image:{type:String, require:true},
//     price:{type:String, require:true},
//     creation_dt:{type:Date, require:true}
// });

var schema = new Schema({ name: String, author: String, image: String, price: Number}, 
    { collection : 'test' });  


module.exports = mongoose.model('Book',schema);