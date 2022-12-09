exports.getBootcamps = (req, res, next) => {


 let boot = Array(9).fill({ id: "2", name: "boo1" });
  res.status(200).json({
    msg: "get all bootcamp",
    bootcamps: [...boot],
  });
};
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ msg: `get bootcamp ${req.params.id}` });
};

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ msg: "create bootcamp" });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ msg: `Update bootcamp ${req.params.id}` });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ msg: `delete bootcamp ${req.params.id}` });
};
