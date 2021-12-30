// Created in Section 11 Video 12
require('../src/db/mongoose')
const User = require('../src/models/user')

// 1. Random user ID for testing: 61c502e4aed18c468024c63f
// 2. Random user ID for testing: 61c4a50cbc1c6c3bec1cd847

// User.findByIdAndUpdate('61c4a50cbc1c6c3bec1cd847', { age: 1 })
// .then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 1 })
// }).then
// ((result) => {
//   console.log(result)
// }).catch((err) => {
//   console.log(err)
// })

// Section 11 Video 15:
// ID: 61c502e4aed18c468024c63f
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('61c502e4aed18c468024c63f', 2).then((count) => {
  console.log(count)
}).catch((err) => {
  console.log(err)
})