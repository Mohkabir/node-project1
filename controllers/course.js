const Course = require("../model/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Bootcamp = require("../model/Bootcamp");

exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    let courses = await Course.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({ count: courses.length, courses });
  } else {
    res.status(200).json(res.advanceResult);
  }

  const courses = await query;

  if (!courses) {
    new ErrorResponse(`courses not found `, 404);
  }
  res.status(200).json({ count: courses.length, courses });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
  let query;
  query = Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });
  const courses = await query;

  if (!courses) {
    new ErrorResponse(`course not found `, 404);
  }
  res.status(200).json({ courses });
});

exports.createCourses = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  let bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    new ErrorResponse(`bootcamp not found `, 404);
  }

  let course = await Course.create(req.body);
  res.status(200).json({ course });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`course not found with id ${req.params.id}`, 404)
    );
  }
  course = await Course.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ msg: "course updated", course });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ msg: "Course not found" });
  }
  course.remove();
  res.status(201).json({ msg: "Course deleted" });
});
