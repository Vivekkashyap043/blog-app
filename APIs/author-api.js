//create author api app
const exp=require('express')
const authorApp = exp.Router()

authorApp.get('/test-author', (req,res)=>{

    res.send({message:"from author api"})
})

module.exports=authorApp