const jwt = require("jsonwebtoken")

    const blogmodel = require("../models/blogmodel")

    const authentication = async function(req, res, next){
    
        try {
            let token = req.headers["x-api-key"];
            if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
            // this verify the token that token is correct or not
            let decodedToken = jwt.verify(token, "rahul-secret-key");
            // res.setHeader('x-api-key',token)
            // if (!decodedToken)
                // return res.status(403).send({ status: false, msg: "token is invalid" });
    
            next()


        } catch (error){

            console.log(error)
            res.status(500).send({msg:error.message})
        }


    }

    const authorise = async function(req,res,next){

    try{


        let token = req.headers["x-api-key"];
        console.log(token)
        let blogId = req.query.blogId;

        console.log(blogId)
        
        let blogDetails = await blogmodel.findById(blogId)
        // console.log(blogDetails)
        let authorId = blogDetails.authorId
        // console.log(authorId)
        let decodedToken = jwt.verify(token, "rahul-secret-key");
        // if (!decodedToken)
            // return res.status(402).send({ status: false, msg: "token is invalid" });
            console.log(decodedToken)
        let decoded = decodedToken.userId
        if (authorId != decoded) return res.status(403).send({ status: false, msg: "anthentication denied" })
        next()

    } catch (error){
        console.log(error)
        res.status(500).send({msg:error.message})
    }

    

    }


    module.exports.authentication = authentication
    module.exports.authorise      = authorise