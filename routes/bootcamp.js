const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  uploadPhoto,
} = require("../controllers/bootcamp");
const courseRouter = require("./course");
const Bootcamp = require("../model/Bootcamp");
const advanceResult = require("../middleware/advanceResult");

router.use("/:bootcampId/courses", courseRouter);
router.get(
  "/",
  advanceResult(Bootcamp, {
    path: "courses",
    select: " description title",
  }),
  getBootcamps
);
router.post("/", createBootcamp);
router
  .get("/:id", getBootcamp)
  .put("/:id", updateBootcamp)
  .delete("/:id", deleteBootcamp);
router.put("/:id/photo", uploadPhoto);

module.exports = router;
