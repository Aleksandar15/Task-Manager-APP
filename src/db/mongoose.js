const mongoose = require('mongoose')
// const validator = require('validator')
// ^^^is moved, i mean both are moved to user.js but mongoose stays

// Section 15 Video 4 Minute 15:
mongoose.connect((process.env.MONGODB_URL), {
// mongoose.connect(('mongodb://127.0.0.1:27017/task-manager-api'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  // section 11 video 12 minutes 18: [for fixing decprecations HE SAYS - purposefully]
  useFindAndModify: false
})

// const Task = mongoose.model(('Task'), {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// })
  

// Deletes this in section 11 8 video 12 minute:::
// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value){
//       if(!validator.isEmail(value)) {
//         throw new Error('Email is invalid')
//       }
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Password cannot contain "password"')
//       }
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Age must be a positive number')
//       }
//     }
//   }
// })
// // const me = new User({
// //   name: '  Alek sandar  ',
// //   // New code as of section 11 video 4 ^^^ REMOVES only Spaces in and out of Letters (not in between) my name was saved as: Alek sandar
// //   // age: -1,
// //   email: 'myemail@email.com  ',
// //   // password: '   zy30   ',
// //   // password: 'Password123',
// //   password: 'ph0ne123',
// // })

// // me.save().then(() => {
// //   console.log(me)
// // }).catch((error) => {
// //   console.log('Error!', error)
// // })


// // Section 11 Video 5 GOAL - exercises - challenges:
// // Section 11 video 3 GOAL - exercises - challenges:
// const Task = mongoose.model(('Task'), {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// })

// const task = new Task({
//   description: '   Learn the Mongoose library',
//   // description: 'Learn the Mongoose library',
//   completed: false
// })

// task.save().then(() => {
//   console.log(task)
// }).catch((error) => {
//   console.log(error)
// })




// const me = new User({
//   name: 'Aleksandar',
//   age: 123
// })

// me.save().then(() => {
// // me.save(() => {
// // ^^^Including a parameter isn't necessary when its the same name as the variable
//   console.log(me)
// }).catch((error) => {
//   console.log('Error!', error)
// })