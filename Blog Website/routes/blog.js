const express = require("express");
const router = express.Router();
const multer = require("multer");
const blog = require('../models/blog')
const comment = require('../models/comment');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./img");
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage : storage });



router.get("/addBlog", (req, res) => {
  if(!req.user)return res.render('signin')
  return res.render("addBlog",{name : req.user.fullName})
});


router.post("/addBlog", upload.single('coverImage'), async(req, res) => {
    await blog.create({
      title: req.body.title,
      Body: req.body.Body,
      createBy: req.user._id,
      coverImage: `/img/${req.file.filename}`,
    });
  return res.redirect('/')  ;
});

  router.get("/:id", async(req, res) => {
    if(!req.user)return res.render('signin');
    const Blog = await blog.findById(req.params.id).populate('createBy')
    const Comment = await comment.find({blogId : req.params.id}).populate('createBy')
    return res.render("displayBlog", {
      name: req.user.fullName,
      blog: Blog,
      comment : Comment
    });
  });

  router.post('/comment/:blogId',async(req,res)=>{
    const Comment = await comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  })


module.exports = router;
