var mongoose = require("mongoose");
var Schema = mongoose.Schema

var screenSchema = new Schema({
    "name": {type:String, required:true, index: { unique:true }},
    "seats" : {type:Number, required:true }
});

var screenModel = mongoose.model("screen",screenSchema);
module.exports = screenModel
