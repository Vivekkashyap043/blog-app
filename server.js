const exp = require('express')
const app=exp()
require('dotenv').config()
const mongoClient = require('mongodb').MongoClient;
app.use(exp.json())

//import API Routes
const userApp=require('./APIs/user-api')
const adminApp=require('./APIs/admin-api')
const authorApp=require('./APIs/author-api')

//

mongoClient.connect(process.env.DB_URL)
.then( client =>{
    //get database object
    const blogdb = client.db('blogdb');
    //get Collection object
    const userscollection = blogdb.collection('userscollection')
    const articlescollection=blogdb.collection('articlescollection')
    //share collections to other apps
    app.set('userscollection', userscollection);
    app.set('articlescollection', articlescollection);
    //confirm database connection
    console.log('Database connected successfull')
})
.catch(err => console.log(err))

//if path starts with user-api, send the request to userApp
app.use('/user-api', userApp)

//if path starts with author-api, send the request to authorApp
app.use('/author-api', authorApp)

//if path starts with admin-api, send the request to adminApp
app.use('/admin-api', adminApp)

app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

const port=process.env.PORT || 5000

app.listen(port, ()=> console.log(`server is running on port ${port}`))