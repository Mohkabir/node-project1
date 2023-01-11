const Bootcamp = require("../model/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Course = require("../model/Course");
const path = require("path");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResult);
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id).populate({
    path: "courses",
    select: " description title",
  });
  if (!bootcamp) {
    new ErrorResponse(`bootcamp not found with id ${req.params.id}`, 404);
  }
  res.status(200).json({ bootcamp });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ msg: "bootcamp created", bootcamp });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found with id ${req.params.id}`, 404)
    );
  }
  bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ msg: "bootcamp updated", bootcamp });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return res.status(404).json({ msg: "bootcamp not found" });
  }
  bootcamp.remove();
  res.status(201).json({ msg: "bootcamp deleted" });
});

exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found with id ${req.params.id}`, 404)
    );
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Only images are accepted`, 400));
  }
  if (file.size > process.env.FILE_UPLOAD_MAX) {
    return next(new ErrorResponse(`Image must be below 1mb`, 400));
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  console.log(file, "file");

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err, "error uploading");
      return next(new ErrorResponse(`Server error`, 500));
    }
    bootcamp = await Bootcamp.findOneAndUpdate(
      req.params.id,
      { photo: file.name },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({ msg: "photo uploaded successfully", bootcamp });
  });
});
