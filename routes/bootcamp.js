const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamp");

router.get("/", getBootcamps);
router.get("/:id", getBootcamp);
router.post("/:id", createBootcamp);
router.put("/:id", updateBootcamp);
router.put("/:id", deleteBootcamp);

module.exports = router;
