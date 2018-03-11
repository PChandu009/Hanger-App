var mongoose = require("mongoose");
var Schema = mongoose.Schema
var Screen = require("./screen.js");

var movieSchema = new Schema({
    "name": {type:String, required:true, index: { unique:true }},
    "desc" : {type:String, required:true },
    "dur_hr" : {type:Number, required:true },
    "dur_min" : {type:Number, required:true },
    "release_date" : {type:Date, required:true },
    "genre" : [{type:String, required:true }],
    "certificate" : {type:String, required:true },
    "public" : {type:Boolean, required:true, default:true },
    "booking" : {type:Boolean, required:true, default:true },
    "cpic" : {type:String },
    "dpic" : {type:String },
    "trailer": {type:String},
    "language": {type:String, required:true, default:"English"},
    "shows": [{
        screen:{type:Schema.Types.ObjectId, ref: Screen },
        time: {type: Date, required:true},
        price: {type:Number, required:true, default:10},
        screenDetails: {
            "name": {type:String, required:false},
            "seats" : {type:Number, required:false }
        },
        seatsBooked: {type:Number, required:false, default:0 }
    }]
});

var movieModel = mongoose.model("movie",movieSchema);
module.exports = movieModel