const AuthorModel = require('../models/AuthorModel');
const blogmodel = require('../models/blogmodel')


const createBlog =async function (req,res){

try{
let blog = req.body;

let authorId =blog.authorId

// console.log(authorId)
if (!authorId)  return res.status(400).send({msg:"bad request"})

let validAuthor = await AuthorModel.findOne({_id:authorId})

if (!validAuthor)  return res.status(404).send({msg:"valid Author not exists"})
    
let blogcreated = await blogmodel.create(blog)
// console.log(blogcreated)

 res.status(201).send({msg:blogcreated})

} catch(error){

    res.status(500).send({status:false, msg:error.message})
}

}

const getBlogs = async function (req , res){

try {
let authorId = req.query.authorId
let category = req.query.category
let subcategory = req.query.subcategory
let tags = req.query.tags

let blogs = await blogmodel.find({
    isDeleted:false,
    $or:[
        {authorId:authorId},
        {category:category},
        {tags:{$in:[tags]}},
        {subcategory:{$in:[subcategory]}}
    ],
})
if (!blogs) return res.status(404).send({msg:"no blogs found"})

res.status(200).send({msg:blogs})

}
 catch (error){
    res.status(500).send({status:false, msg:error.message})
}

}


const updateBlog = async function(req,res){
try{
    let data = req.body;

let id = req.params.blogId
console.log(id)

if (!id)  return res.status(400).send({msg:"compare the id in params"})

if (!data) return res.status(400).send({msg:"compare the data for updation"})

let updateData = await blogmodel.updateMany({_id:id},{$set:data},{new:true})
if (!updateData)  return res.status(404).send({msg:"no such data exists"})

res.status(200).send({msg:updateData})
} catch (error){
    res.status(500).send({msg:error.message})
}

}

const deleteBlog = async function (req, res){
try{
let blogId = req.params.blogId
if (!blogId) return res.status(400).send({msg:"compare the blog id"})

let blog = await blogmodel.findById(blogId)
// console.log(blog)

if (!blog) return res.status(404).send({msg:"blog id not exists"})

let deleteBlog = await blogmodel.findOneAndUpdate({_id:blogId},{isDeleted:true},{new:true})
res.status(200).send({msg:deleteBlog})
} catch(error){
    res.status(500).send({msg:error.message})
}
}


const deleteQuery = async function(req, res){
     try {
        let authorIds = req.query.authorId
        let categorys = req.query.category
        let tag = req.query.tags
        let subcategorys = req.query.subcategory
        if (!authorIds && !categorys && !tag && !subcategorys) {
          res.status(400).send({ status: false, msg: "quarys is required, BAD REQUEST" })
        }
        let authorDetails = await AuthorModel.findById({ _id: authorIds })
        if (!authorDetails) {
          res.status(404).send({ status: false, msg: "authorId not exist" })
        } else {
          let updatedDetails = await blogmodel.findOneAndUpdate({$or: [ { authodId: authorIds },{ category: categorys }, { tags: { $in: [tag] } }, { subcategory: { $in: [subcategorys]}}]},{ isDeleted: true})
          res.status(201).send({mag:"blog deleted "})
          req.body.isDeletedAt = new Date()
          console.log(updatedDetails)
        }  
    
     } catch (error){

        res.status(500).send({msg:error.message})
     }
}



module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteBlog= deleteBlog
module.exports.deleteQuery= deleteQuery