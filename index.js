const express = require("express");
const app = express();

//Function to log requests sent to localhost:3000 and their path
let requestCount = 0;
function customMiddleware(req, res, next) {
  requestCount++;
  console.log(`Request #${requestCount}: ${req.method} ${req.url}`);
  next();
}

//For passing information through Postman
app.use(express.urlencoded({ extended: true }));

//using middleware function
app.use(customMiddleware);

//Mock data
const students = [
  { id: 1, name: "John", section: "A", GPA: "4.0", nationality: "German" },
  { id: 2, name: "Emily", section: "B", GPA: "3.8", nationality: "American" },
  { id: 3, name: "Carlos", section: "A", GPA: "3.5", nationality: "Spanish" },
  { id: 4, name: "Priya", section: "C", GPA: "3.9", nationality: "Indian" },
  { id: 5, name: "Yuki", section: "B", GPA: "3.7", nationality: "Japanese" },
  { id: 6, name: "Ahmed", section: "A", GPA: "3.6", nationality: "Egyptian" },
  { id: 7, name: "Sophie", section: "C", GPA: "4.0", nationality: "French" },
  { id: 8, name: "Liam", section: "B", GPA: "3.4", nationality: "Canadian" },
  { id: 9, name: "Maria", section: "A", GPA: "3.9", nationality: "Brazilian" },
  { id: 10, name: "Elena", section: "C", GPA: "3.8", nationality: "Russian" },
];

//Get method - prints all students
app.get("/students", function (req, res) {
    //response
  res.status(200).send(students);
});

//Get method - to get single student by id
app.get("/students/:id", function (req, res) {
  //We can get id from query parameters(query parameters are passed in the URL)
  let id = parseInt(req.params.id); //converts string to number
  // find student by id
  let student = students.find((u) => u.id == id);
  // if student is not found
  if (!student) {
    res.send("Student not found").status(404);
    return;
  }
  // if student is found
  res.status(200).send(student);
});

//Post method to add new student
app.post("/students", function (req, res) {
    //new student object
  let newStudent = {
    id: students.length + 1,
    name: req.body.name,
    section: req.body.section,
    GPA: req.body.GPA,
    nationality: req.body.nationality,
  };

  //add student to students array
  students.push(newStudent);
  //send the new student back to the client with 201 status code
  res.status(201).send(newStudent);
});

//Patch method to update individual student
app.patch("/students/:id", function (req, res) {
  //We can get id from query parameters(query parameters are passed in the URL)
  let id = parseInt(req.params.id); //converts string to number
  // find student by id
  let student = students.find((u) => u.id == id);
  // if student is not found
  if (!student) {
    res.status(404).send("Student not found").status(404);
    return;
  }
  //Update the student information
  (student.name = req.body.name),
    (student.section = req.body.section),
    (student.GPA = req.body.GPA),
    (student.nationality = req.body.nationality);

  // if student is found
  res.status(200).send(student);
});

//Delete method to delete student
app.delete("/students/:id", function (req, res) {
  //We can get id from query parameters(query parameters are passed in the URL)
  let id = parseInt(req.params.id); //converts string to number
  // find student by id
  let student = students.find((u) => u.id == id);
  // if student is not found
  if (!student) {
    res.status(404).send("Student not found").status(404);
    return;
  }
  //finding the index of the student
  let indexOfStudent = students.indexOf(student);
  //delete student
  students.splice(indexOfStudent, 1);

  // if student is found
  res.status(200).send(student);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
