// Question 2 — Employee Database
use EmployeeDB;
if (!db.getCollectionNames().includes("employees")) db.createCollection("employees");
const employees = db.employees;
employees.insertMany([
  { employeeId: 201, name: "Meera", department: "HR", salary: 42000, experience: 4 },
  { employeeId: 202, name: "Rohan", department: "IT", salary: 58000, experience: 6 },
  { employeeId: 203, name: "Asha", department: "Sales", salary: 38000, experience: 3 },
  { employeeId: 204, name: "Vikram", department: "IT", salary: 72000, experience: 9 },
  { employeeId: 205, name: "Nila", department: "HR", salary: 46500, experience: 5 }
]);
print("All employees:"); printjson(employees.find({}, { _id: 0 }).toArray());
print("Employees earning more than Rs. 40,000:");
printjson(employees.find({ salary: { $gt: 40000 } }, { _id: 0 }).toArray());
print("Update employee 203 salary to Rs. 41,000:");
printjson(employees.updateOne({ employeeId: 203 }, { $set: { salary: 41000 } }));
print("Employees by descending salary:");
printjson(employees.find({}, { _id: 0 }).sort({ salary: -1 }).toArray());
print("Employees in IT:", employees.countDocuments({ department: "IT" }));
