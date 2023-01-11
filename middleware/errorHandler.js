const errorHandler = (err, req, res, next) => {
    
    console.log("err", err);
    
  res.status(err.statusCode || 500 ).json({ msg: err.message || "Server error" });
};

module.exports = errorHandler;
