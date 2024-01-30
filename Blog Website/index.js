const express = require("express")
const userRout = require('./routes/user')
const blogRout = require('./routes/blog')
const mongoose = require('mongoose');
const checkForAuthentication = require("./middlewares/checkAuth");
const app = express()
app.use(express.static("img"));
const port = 8000;
const cookieParser = require("cookie-parser"); 
const blog = require('./models/blog')
const path = require('path')

app.use("/img", express.static("./img"));



//connection with mongodb
mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then((e)=>{
    console.log("MongoDB Connected");
})

//home page
app.set('view engine' ,'ejs')

//middleware
app.use(cookieParser()); 
app.use(checkForAuthentication())
app.use(express.urlencoded({extended : false}))

//homepage
app.get('/',async(req,res)=>{
    const allBlogs = await blog.find({});
    res.render('home',{user : req.user,blogs : allBlogs})
})

//route
app.use('/user',userRout)
app.use("/blog", blogRout)

//start server
app.listen(port , ()=> console.log(`server started at port :${port}`))