const mongoose =require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
title:{type:String,
    required:true
},

body :{type:String,
     required:true
     
},

authorId:{
    type:ObjectId,
    required:true,
    ref:"Author1"
},
category:{
    type:String,
    required:true
},

tags:[],
subcategory:{
    type:[],
},


deletedAt:{
    type:Date,
    default:new Date()
},
publishedAt:{
    type:Date,
    default:Date.now()
},
isDeleted:{
    type:Boolean,
    default:false
},
isPublished :{
    type:Boolean,
    default:false
}

},{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)
