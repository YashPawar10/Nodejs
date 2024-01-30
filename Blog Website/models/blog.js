const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Body: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "users"
    },
  },
  { timestamp: true }
);



const blog = mongoose.model("Blogs", blogSchema)
module.exports = blog
