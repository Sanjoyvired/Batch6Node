const express = require("express");
const Joi = require("joi");
const { result } = require("underscore");
const { join } = require("path");
//const app = express();
//app.use(express.json());
const mongodb = require("mongoose");
const { string, date, boolean } = require("joi");
const { default: mongoose } = require("mongoose");
//step 1:Connecting to the database
//step 2: Create schema
//Step 3: Create a model
//Step 4: I can add objects/Documents
//Step 5: I can find documents
//I/O operation: Java scripts deal with I/O operations
//asynchronours Functions
console.log("hi");
//Step 1: Connecting to the database
mongodb.connect(
  "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/test",
  function (err) {
    if (err) {
      console.log("not able to connect to Mongo db");
    } else {
      console.log("Connection successful");
    }
  }
);

//Promises
//callback functions

//mongodb
//  .connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/test")
//  .then(() => console.log("connected to mongo db "))
//  .catch((err) => console.log(err));
//class and object
//new operator
//Class and object
//new keyword

const courseschema = new mongodb.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  ispublished: Boolean,
});

//Creating the model
const Course = mongodb.model("course", courseschema);
//Finding the course

//const Course = mongodb.model("course", courseschema);
const newcourse = new Course({
  name: "CSS",
  author: "Yash",
  tags: ["Frontend"],
  ispublished: false,
});
newcourse.save();

const course = new Course({
  name: "HTML",
  author: "Sanjoy",
  tags: ["Deployment", "puthon"],
  ispublished: true,
});
course.save();

//Finding a course
Course.find(
  { author: "Sanjoy", name: "HTML" },
  { _id: 0, __v: 0 },
  { sort: { date: 1 }, limit: 2 },
  function (result, error) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  }
);
