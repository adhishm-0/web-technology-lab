Experiment 9: Working with MongoDB using Shell Commands

Files
- Q1_Student_Database.js: create/use CollegeDB, insert/query/update/delete students.
- Q2_Employee_Database.js: create/use EmployeeDB and run employee queries.
- Q3_Product_Database.js: create/use ProductDB and manage products.
- Q4_Library_Database.js: create/use LibraryDB and query books.
- Q5_Student_Query_Operations.js: student comparison, membership, sorting, limiting, and updateMany queries.
- output_screenshots/: actual mongosh output captures for each question.

Run a program
1. Install MongoDB Community Server and MongoDB Shell (mongosh), then start the server.
2. Open a terminal in this folder.
3. Run one program at a time, for example:
   mongosh < Q1_Student_Database.js

Q1–Q4 insert their sample records, so run them against fresh lab databases or clear the corresponding collection before rerunning. Q5 inserts its seed records only when the students collection does not exist.

The screenshots are cropped from Konsole captures of actual mongosh output after running the included programs against a temporary local MongoDB 8.0 server. Full stdout and uncropped Konsole window captures are saved in mongosh_output/.
