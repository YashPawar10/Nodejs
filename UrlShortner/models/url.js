const mongoose = require('mongoose')
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
    },
    redirectURL: {
      type: String,
      unique:true
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.model('url',urlSchema)
module.exports = Url;