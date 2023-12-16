const authorize = (arr) => (req,res,next) => {
    const {user} = req;
    console.log(user.type);
    if(arr.findIndex((ele) => ele === user.type) > -1){
      return  next()
    }else{ 
      res.status(403).send("You don't have access");
    }
}


module.exports = {authorize};