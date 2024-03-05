//create author api app
const exp=require('express')
const authorApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const verifyToken = require('../Middlewares/verifyToken')

let authorscollection;
let articlescollection;

authorApp.use((req, res, next) =>{
    authorscollection = req.app.get('authorscollection');
    articlescollection = req.app.get('articlescollection')
    next()
})

//Author Register

authorApp.post('/author', expressAsyncHandler( async ( req, res) =>{
    let newAuthor = req.body
    const existedAuthor = await authorscollection.findOne({username : newAuthor.username})
    if(existedAuthor != null){
        return res.send({message : "author already exist"})
    }
    const hashedPassword = await bcryptjs.hash(newAuthor.password, 5)
    newAuthor.password = hashedPassword
    await authorscollection.insertOne(newAuthor)
    res.send({message:"Author created"})

}))

// Author login
authorApp.post('/login', expressAsyncHandler(async (req, res) =>{
    const author = req.body
    const existedAuthor = await authorscollection.findOne({username: author.username})
    if(existedAuthor == null){
        return res.send({message: "Author does not exist"})
    }
    const isMatch = await bcryptjs.compare(author.password, existedAuthor.password)
    console.log(" is matched ? ", isMatch)
    if(!isMatch){
        return res.send({message:"Incorrect password"})
    }
    const signedToken = jwt.sign({username:author.username},process.env.SECRET_KEY, {expiresIn:"1d"})
    res.send({message:"Login success", token: signedToken, user: existedAuthor})
}))

// adding new article by author 
authorApp.post('/article', verifyToken, expressAsyncHandler( async(req, res) => {
    console.log("article called")
    const newArticle = req.body;
    await articlescollection.insertOne(newArticle)
    res.send({message:"New article created"})
}))

//modify the article
authorApp.put('/article', verifyToken, expressAsyncHandler( async(req, res) =>{
   const article = req.body;
   const result = await articlescollection.updateOne({articleId : article.articleId}, {$set: {...article}})
   res.send({message: "Article modified"})
}))

// delete article
authorApp.put('/article/:id', verifyToken, expressAsyncHandler( async (req, res) =>{
    const id = req.params.id
    const article = req.body;
    const result = await articlescollection.updateOne({articleId: id}, {$set : {...article, status : false}})
    res.send({message:"Article deleted"})
}))

//read articles
authorApp.get('/articles/:authorname', verifyToken, expressAsyncHandler( async (req, res) =>{
    const authorName = req.params.authorname;
    const articles = await articlescollection.find({username:authorName, status: true}).toArray()
    res.send({message: "Article list", articles: articles})
}))

module.exports=authorApp