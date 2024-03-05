//create user api app
const exp=require('express')
const bcryptjs = require('bcryptjs');
const userApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middlewares/verifyToken')

//get userscollections and articlescollection document
let userscollection;
let articlescollection;
userApp.use((req, res, next)=>{
    userscollection = req.app.get('userscollection')
    articlescollection = req.app.get('articlescollection')
    next();
})

//user registration route
userApp.post('/user',  expressAsyncHandler(async(req,res)=>{
    const  newUser = req.body;
    console.log("new user", newUser)
    //check for duplicate user based on username
    const dbuser = await userscollection.findOne({username:newUser.username})
    //if user found
    if(dbuser!==null){
        res.send({message:"user already exist"})
    }else{
       // console.log('new user')
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        newUser.password=hashedPassword;
        await userscollection.insertOne(newUser)
        res.send({message:"user created"})
    }
}))

//user login
userApp.post('/login', expressAsyncHandler( async (req, res) =>{
    const user = req.body;
    //searching user
    const existedUser = await userscollection.findOne({username: user.username})
    if(existedUser==null){
        res.send({message:"Invalid username"})
    }else{
        //comapring the password
        const status = await bcryptjs.compare(user.password, existedUser.password)
        if(status==false){
            res.send({message:"incorrect password"})
        }else{
            //c reating token
            const signedToken = jwt.sign({username: user.username}, process.env.SECRET_KEY,{expiresIn: "1d"})
            res.send({message:"Login success", token:signedToken, user: existedUser})
        }
    }
}))

//get articles of all author
userApp.get('/articles', verifyToken, expressAsyncHandler(async(req, res) =>{
    //geting articlescollection from express app
    const articlescollection = req.app.get('articlescollection')
    //geting all articles from database
    const articlesList = await articlescollection.find({status:"true"}).toArray();
    res.send({message:"articles",payload:articlesList})
}))

//comment
userApp.post('/comment/:id', verifyToken, expressAsyncHandler( async (req, res) =>{
    const newComment = req.body;
    const id = req.params.id
    const result = await articlescollection.updateOne({articleId: id}, {$addToSet : {comments : newComment}})
    console.log(result)
    res.send({message:"Comment posted"})
}))

module.exports=userApp