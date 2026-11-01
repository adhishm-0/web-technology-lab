// Question 4 — Library Database
use LibraryDB;
if (!db.getCollectionNames().includes("books")) db.createCollection("books");
const books = db.books;
books.insertMany([
  { bookId: 401, title: "Algorithms", author: "Cormen", category: "Computing", price: 950 },
  { bookId: 402, title: "Clean Code", author: "Robert Martin", category: "Computing", price: 780 },
  { bookId: 403, title: "Dune", author: "Frank Herbert", category: "Fiction", price: 620 },
  { bookId: 404, title: "Pride and Prejudice", author: "Jane Austen", category: "Classic", price: 500 },
  { bookId: 405, title: "The Hobbit", author: "J. R. R. Tolkien", category: "Fantasy", price: 700 }
]);
print("Books by Cormen:"); printjson(books.find({ author: "Cormen" }, { _id: 0 }).toArray());
print("Computing books:"); printjson(books.find({ category: "Computing" }, { _id: 0 }).toArray());
print("Update Dune price to Rs. 680:");
printjson(books.updateOne({ bookId: 403 }, { $set: { price: 680 } }));
print("Books alphabetically by title:");
printjson(books.find({}, { _id: 0 }).sort({ title: 1 }).toArray());
print("Total books:", books.countDocuments());
