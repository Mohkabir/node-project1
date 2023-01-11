const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  createCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const Course = require("../model/Course");
const advanceResult = require("../middleware/advanceResult");

router
  .get(
    "/",
    advanceResult(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post("/", createCourses);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
