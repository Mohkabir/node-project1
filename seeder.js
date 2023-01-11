const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const BootcampSchema = require("./model/Bootcamp");
const CourseSchema = require("./model/Course");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGODB_CONECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const course = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
const importBootcamp = async () => {
  try {
    await BootcampSchema.create(bootcamp);
    await CourseSchema.create(course);

    console.log("imported...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const destroyBootcamp = async () => {
  try {
    await BootcampSchema.deleteMany();
    await CourseSchema.deleteMany();

    console.log("destroyed...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importBootcamp();
} else if (process.argv[2] === "-d") {
  destroyBootcamp();
}
