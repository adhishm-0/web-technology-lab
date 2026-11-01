// Question 5 — Query Operations on students
use CollegeDB;
if (!db.getCollectionNames().includes("students")) {
  db.createCollection("students");
  db.students.insertMany([
    { rollNo: 101, name: "Arun", department: "CSE", age: 20, mark: 85 },
    { rollNo: 102, name: "Priya", department: "IT", age: 21, mark: 92 },
    { rollNo: 103, name: "Kumar", department: "CSE", age: 19, mark: 78 },
    { rollNo: 104, name: "Divya", department: "ECE", age: 20, mark: 88 },
    { rollNo: 105, name: "Ravi", department: "CSE", age: 22, mark: 67 }
  ]);
}
const students = db.students;
print("Students with marks >= 75:");
printjson(students.find({ mark: { $gte: 75 } }, { _id: 0 }).toArray());
print("Students younger than 21:");
printjson(students.find({ age: { $lt: 21 } }, { _id: 0 }).toArray());
print("Students in CSE or IT:");
printjson(students.find({ department: { $in: ["CSE", "IT"] } }, { _id: 0 }).toArray());
print("Top three students by marks:");
printjson(students.find({}, { _id: 0 }).sort({ mark: -1 }).limit(3).toArray());
print("Add 5 marks to all CSE students:");
printjson(students.updateMany({ department: "CSE" }, { $inc: { mark: 5 } }));
printjson(students.find({}, { _id: 0 }).toArray());
