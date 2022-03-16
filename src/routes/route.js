const express = require('express');
const router = express.Router();

const AuthorController=require("../controller/AuthorController")
const BlogController = require("../controller/BlogController")
const middileware = require("../middleware/auth")

router.get("/test-me", middileware.authentication,middileware.authorise,function (req, res) {
    res.send("My first ever api!")
})

// phase-1 pproject

router.post("/createauthor",AuthorController.createAuthor)   // create data for author


router.post("/createblog", BlogController.createBlog)        // create data for blog

router.get("/blogs",middileware.authentication,BlogController.getBlogs)                 // get data for blog

router.put("/updateblog/:blogId",middileware.authentication,middileware.authorise,BlogController.updateBlog)     // uppdate data in blog

router.delete("/deleteblog/:blogId",middileware.authentication,middileware.authorise,BlogController.deleteBlog)    // delete blogid as mark true


router.delete("/deletebyQuery",BlogController.deleteQuery)      


// pphase -02

router.post("/login",AuthorController.loginAuthor)









module.exports=router;