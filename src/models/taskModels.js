const mongoose = require('mongoose')
// const validator = require('validator')

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  // Section 12 Video 13:
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
// Section 13 Video 2 minute 5: Challenge time Exercises: [2ND SECOND ARGUMENT OF OBJECTS]
{
  timestamps: true
})

// Section 13 Video 2 minute 5: He edits this out in a different variable taskSchema [SCHEMAS]
// const Task = mongoose.model(('Task'), {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   // Section 12 Video 13:
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   }
// })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task