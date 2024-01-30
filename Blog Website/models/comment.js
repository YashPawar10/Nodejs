const mongoose = require("mongoose");
const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamp: true }
);

const comment = mongoose.model("comments", commentSchema);
module.exports = comment;
