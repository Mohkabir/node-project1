const Bootcamp = require("../model/Bootcamp");

exports.getBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
  res.status(200).json({ bootcamp });
};

exports.getBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  res.status(200).json({ bootcamp });
};

exports.createBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ msg: "bootcamp created", bootcamp });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ msg: `Update bootcamp ${req.params.id}` });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ msg: `delete bootcamp ${req.params.id}` });
};
