function errHandler(err, req, res, next){
  console.log(err);
  res.status(err.code).json({ message: err})
}

module.exports = errHandler