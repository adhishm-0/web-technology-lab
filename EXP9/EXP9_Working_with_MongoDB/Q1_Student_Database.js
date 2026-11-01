// Question 1 — Student Database Management
use CollegeDB;
if (!db.getCollectionNames().includes("students")) db.createCollection("students");
const students = db.students;
students.insertOne({ rollNo: 101, name: "Arun", department: "CSE", age: 20, mark: 85 });
students.insertMany([
  { rollNo: 102, name: "Priya", department: "IT", age: 21, mark: 92 },
  { rollNo: 103, name: "Kumar", department: "CSE", age: 19, mark: 78 },
  { rollNo: 104, name: "Divya", department: "ECE", age: 20, mark: 88 },
  { rollNo: 105, name: "Ravi", department: "CSE", age: 22, mark: 67 }
]);
print("All student records:"); printjson(students.find({}, { _id: 0 }).toArray());
print("Student with roll number 103:"); printjson(students.findOne({ rollNo: 103 }, { _id: 0 }));
print("Students scoring above 80:"); printjson(students.find({ mark: { $gt: 80 } }, { _id: 0 }).toArray());
print("Update Arun's marks:"); printjson(students.updateOne({ rollNo: 101 }, { $set: { mark: 90 } }));
print("Delete Ravi by roll number:"); printjson(students.deleteOne({ rollNo: 105 }));
print("Remaining students:"); printjson(students.find({}, { _id: 0 }).toArray());
