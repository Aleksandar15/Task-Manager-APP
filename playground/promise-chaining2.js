// This is for section 11 Video 13 CHALLENGE EXRCISES:

require('../src/db/mongoose')
const Task = require('../src/models/task')

// 1. Random user ID for testing: 61c502e4aed18c468024c63f
// 2. Random user ID for testing: 61c4a50cbc1c6c3bec1cd847
// ^^^^^This is old from previous video
// 1. Random task ID for testing: 61c509ff5034b65714c30e9e

// Task.findByIdAndDelete('61c509ff5034b65714c30e9e')
// .then((task) => {
//   console.log(task)
//   return Task.countDocuments({ completed: false})
// }).then((result) => {
//   console.log(result)
// }).catch((err) => {
//   console.log(err)
// })

// Section 11 Video 15 Minutes 7: exercises challenges goals:
// ID: 61c49a949dad520c84cb5d9b
// const deleteTaskAndCount = async (id, completed) => {
//   const task = await Task.findByIdAndDelete(id, { completed })
//   const count = await Task.countDocuments({ completed })
//   return count
// }

// deleteTaskAndCount('61c49a949dad520c84cb5d9b', false).then((count) => {
//   console.log(count)
// }).catch((err) => {
//   console.log(err)
// })
// ^^^ MY TRIALS were wrong, i was close to but I didn't put 1minutes thought into it
// HIS:
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('61c49a949dad520c84cb5d9b').then((count) => {
  console.log(count)
}).catch((err) => {
  console.log(err)
})