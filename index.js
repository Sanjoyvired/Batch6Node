const express = require("express");
const Joi = require("joi");
const { result } = require("underscore");
const { join } = require("path");
const app = express();
app.use(express.json());
const courses = [
  {
    id: 1,
    name: "javascript",
  },
  {
    id: 2,
    name: "react",
  },
  {
    id: 3,
    name: "FSD",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/courses", function (req, res) {
  res.send(courses);
});
app.get("/courses/:id", function (req, res) {
  var courseId = req.params.id;
  //array.find
  //array.push
  var course = courses.find((c) => c.id === parseInt(courseId));
  if (!course) {
    res.status(404).send("Course not found");
  } else res.send(course);
});

//post servidce
//localhost:3000/course
//body
//{"name":"Devops"}
app.post("/course", function (req, res) {
  //course object
  //validation of the input
  //creating schema
  //  const schema = Joi.object({
  //    name: Joi.string().min(3).required(),
  //  });
  const validateResult = validateCourse(req.body);
  console.log(validateResult);

  if (validateResult.error) res.send(validateResult.error);
  else {
    var course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    //push that object into the courses array
    courses.push(course);
    res.send(course);
  }
});

app.listen(3000);
console.log("listening the server on port 3000");
//JOI module and validate the input for post request
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  try {
    const result = schema.validate(course);
    return result;
  } catch (err) {
    return err;
  }
}
