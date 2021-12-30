// CRUD create read update delete
// Delete this file in Section 11 Video 8 Minute 2

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
// All of this ^^^^^ is exchange with:
const { MongoClient, ObjectID } = require('mongodb')

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id.length)
// console.log(id.toHexString().length)

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  // console.log('Connected correctly!')
  const db = client.db(databaseName)

  // Section 10 video 11:
//   db.collection('users').updateOne({
//   // const updatePromise = db.collection('users').updateOne({
//     // (the Second Object):
//     _id: new ObjectID('61c3a583fcb3d53b709ab0b4')
//   }, {
//     // $set: {
//     //   name: 'Mike',
//     //   age: 111
//     // }
//     $inc: {
//       // increments, increases age by +2
//       age: 2
//     }
//   })
// // Section 10 video 11 7 minutes he says:
// // CONST above can be deleted and instead,
// // we can have }).then((result) => { ...
// // IT WILL WORKS the same he says
// // +++its SHORTENED version we will do this!
//   .then((result) => {
//   // updatePromise.then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)
//   })



  // db.collection('tasks').findOne({ _id: new ObjectID('61c3b25cd891203a709b0d45')}, (error, task) => {
  //   console.log(task)
  // })
  // db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
  //   console.log(tasks)
  // })


  // db.collection('users').findOne({ _id: ObjectID('61c3b543c58b9b1fcc54c835') }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(user)
  // })

  // db.collection('users').find({ age: 108 }).toArray((error, users) => {
  //   console.log(users)
  // })
  // db.collection('users').find({ age: 108 }).count((error, count) => {
  //   console.log(count)
  // })

  // db.collection('users').findOne({ name: 'Jenny' }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(user)
  // })



  // db.collection('users').insertOne({
  //   _id: id,
  //   name: 'Victor',
  //   age: '88'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert a user')
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('users').insertOne({
  //   name: 'Aleksandar',
  //   age: 'unlimited'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert a user')
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Jenny',
  //     age: 108
  //   }, {
  //     name: 'Robert',
  //     age: 96
  //   }
  //   ], (error, result) => {
  //     if (error) {
  //       return console.log('Unable to insert documents!')
  //     }
  //     console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Clean the house',
  //     completed: true
  //   },
  //   {
  //     description: 'Renew inspection',
  //     completed: false
  //   },
  //   {
  //     description: 'Pot plants',
  //     completed: true
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert tasks!')
  //   }
  //   console.log(result.ops)
  // })


})