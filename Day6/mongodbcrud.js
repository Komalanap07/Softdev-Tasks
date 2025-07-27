// use myDB;
//create opration
db.createCollection("users") 

//insertion
db.users.insertOne({
  name: "Komal",
  email: "komal@example.com",
  age: 22
})

db.users.insertMany([
  { name: "Rahul", email: "rahul@mail.com", age: 25 },
  { name: "Anita", email: "anita@mail.com", age: 23 }
])
db.users.find()                       // all documents
db.users.find({ name: "Komal" })     // specific match
db.users.findOne({ age: 22 })        // single result

//updation
// Update one field
db.users.updateOne(
  { name: "Komal" },
  { $set: { age: 23 } }
)

// Update multiple documents
db.users.updateMany(
  { age: { $gt: 22 } },
  { $set: { status: "verified" } }
)
// Delete one
db.users.deleteOne({ name: "Komal" })

// Delete many
db.users.deleteMany({ age: { $lt: 24 } })


