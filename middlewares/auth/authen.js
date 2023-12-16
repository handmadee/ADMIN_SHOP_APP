
var jwt = require('jsonwebtoken'); 
const Authen = (req,res,next) => {
    try {
      const token = req.header("token");
      const decod = jwt.verify(token,'Da24102003@');
      req.user = decod;
      return next();
    } catch (error) {
       throw new Error(error);
    }
}

const timeToken = async (req,res) => {
  const jwt = require('jsonwebtoken');
  const token = req.header("token");
  jwt.verify(token, 'Da24102003@', (err, decoded) => {
  if (err) {
    res.send(false);
  } else {
    const currentUnixTime = Math.floor(new Date().getTime() / 1000);
    if (decoded.exp > currentUnixTime) {
      res.send(decoded);
    } else {
       res.send(false);
    }
  }
});

}
// Refetch token 
module.exports = {Authen,timeToken};