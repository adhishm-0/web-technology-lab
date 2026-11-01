// Question 3 — Product Database
use ProductDB;
if (!db.getCollectionNames().includes("products")) db.createCollection("products");
const products = db.products;
products.insertMany([
  { productId: 301, name: "Keyboard", category: "Accessories", price: 850, stock: 24 },
  { productId: 302, name: "Mouse", category: "Accessories", price: 550, stock: 0 },
  { productId: 303, name: "Headphones", category: "Audio", price: 1800, stock: 12 },
  { productId: 304, name: "Monitor", category: "Display", price: 12500, stock: 8 },
  { productId: 305, name: "Webcam", category: "Accessories", price: 1950, stock: 5 },
  { productId: 306, name: "Speaker", category: "Audio", price: 2300, stock: 14 }
]);
print("Accessories:"); printjson(products.find({ category: "Accessories" }, { _id: 0 }).toArray());
print("Products priced Rs. 500–2,000:");
printjson(products.find({ price: { $gte: 500, $lte: 2000 } }, { _id: 0 }).toArray());
print("Increase keyboard stock by 10:");
printjson(products.updateOne({ productId: 301 }, { $inc: { stock: 10 } }));
print("Delete out-of-stock products:"); printjson(products.deleteMany({ stock: 0 }));
print("Five most expensive products:");
printjson(products.find({}, { _id: 0 }).sort({ price: -1 }).limit(5).toArray());
