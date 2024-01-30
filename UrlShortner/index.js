const express=require('express')
const app = express()
const urlRoute = require('./routes/url')
const {connectToMongoDB} = require("./connect")
const Url = require('./models/url')
const ejs = require("ejs");


connectToMongoDB("mongodb://127.0.0.1:27017/urlshortner");

app.use(express.urlencoded({ extended: false })); 

app.set("view engine",'ejs')
app.set('views','./views')

app.get('/',async(req,res)=>{
    const urldata=await  Url.find();
    // let newarray=urldata.map((x) => `<p>${x.shortId} - ${x.redirectURL}-${x.visitHistory.length}</p>`)
    // console.log(newarray)
    // let html = '';
    // newarray.forEach((x) => html+=x);
    res.render('home',{array : urldata})
})


app.get('/:shortId',async(req,res)=>{
    let shortId = req.params.shortId;
    console.log(shortId)
    const entery = await Url.findOneAndUpdate(
        {shortId},
        {
            $push : {
                visitHistory :{
                   timestamp : Date.now()
                } 
            }
        }
    )
    console.log(entery)
    res.redirect(entery.redirectURL)
})


app.use('/url',urlRoute);

app.listen(8000)