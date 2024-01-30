const express = require('express')
const router = express.Router()
const user = require('../models/users')
const { createHmac, randomBytes } = require("crypto");
const {createToken} = require('../services/authentication');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/signin',(req,res)=>{
    return res.render('signin')
})

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/logout", (req, res) => {
res.clearCookie("token");
  return res.redirect("/")
});

router.post("/signup", upload.single("avatar"), async (req, res) => {
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(req.body.password)
    .digest("hex");
    if(req.file){
      await user.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
        salt: salt,
        profileImageURL: `/img/${req.file.filename}`,
      });
    }
    else{
        await user.create({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashedPassword,
          salt: salt,
        });
    }
  console.log(req.file)
  res.redirect("/user/signin")
});

router.post("/signin", async (req, res) => {
    const User = await user.findOne({email : req.body.email});
    if (!User) res.render("signin", { error: "Incorrect user name and password" });
    const salt = User.salt;
    const hashedPassword = createHmac("sha256", salt)
    .update(req.body.password)
    .digest("hex");
    if(hashedPassword != User.password)res.render("signin",{ error : "Incorrect user name and password"});
    else {
        const token = createToken(JSON.stringify(User))
        res.cookie("token",token)  
        
        res.redirect("/")
    }
});




module.exports = router