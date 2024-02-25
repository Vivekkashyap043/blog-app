//create user api app
const exp=require('express')
const bcryptjs = require('bcryptjs');
const userApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

//get userscollections app
let userscollection;
userApp.use((req, res, next)=>{
    userscollection = req.app.get('userscollection')
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
        console.log('new user')
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
            const signedToken = jwt.sign({username: user.username}, process.env.SECRET_KEY,{expiresIn: 50})
            res.send({message:"Login successfull", token:signedToken, user:existedUser})
        }
    }
}))

//get articles of all users
userApp.get('/articles',  expressAsyncHandler(async(req, res) =>{
    //geting articlescollection from express app
    const articlescollection = req.app.get('articlescollection')
    //geting all articles from database
    const articlesList = await articlescollection.find().toArray();
    res.send({message:"articles",payload:articlesList})
}))

module.exports=userApp