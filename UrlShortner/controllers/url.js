const shortid = require("shortid");
const Url = require('../models/url')


async function handleGenerateNewShortURL(req, res) {
    const body = req.body
    if(!body.url) return res.status(400).json({error:" required url"})
    const Shortid=shortid.generate();
    await Url.create({
      shortId: Shortid,
      redirectURL : body.url,
      visitHistory : []
    });
    return res.render("home",{ id: Shortid });
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await Url.findOne({shortId})
  return res.json({
    totalClicks : result.visitHistory.length,
    analytics : result.visitHistory
  })
}

module.exports = {handleGenerateNewShortURL,handleGetAnalytics}
