const AuthorModel = require('../models/AuthorModel')
const jwt = require("jsonwebtoken")

const createAuthor = async function(req,res){

try {
let result = await AuthorModel.create(req.body)

if (!result) return res.status(400).send({msg:"bad request"})

else {
res.status(201).send({msg:result})
}
} catch (error){
    res.status(500).send({status:false, msg:error.message})
}

}



const loginAuthor = async function (req,res){
try {
    let email = req.body.email
    let password = req.body.password

    if (!email) return res.status(400).send({msg:"compare the username"})

    if (!password) return res.status(400).send({msg:"compare the password"})

    let user = await AuthorModel.findOne({email:email, password:password})

    //  if (!author) return res.status(404).send({msg:"No Such User Exists"})

     let token = jwt.sign({
         userId:user._id },
         "rahul-secret-key"
     )

    //  res.setHeader("x-api-key",token)
    res.send({status:true, data:token,id:user._id})
     res.status(200).send({msg:"token generated"})
} catch (error){
    console.log(error)
    res.status(500).send({msg:error.message})
}

}

module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor