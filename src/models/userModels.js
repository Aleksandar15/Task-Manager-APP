const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
// Section 12 video 6 4 minutes:
const jwt = require('jsonwebtoken')
// Section 12 video 15 minute 2:
const Task = require('./taskModels')

// Section 12 2 video: [using MIDDLEWAREs mongoose for BCRYPTjs checking passwords]
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  // Section 13 Video 6 minute 2.2:
  avatar: {
    type: Buffer
  },
},
// Section 13 Video 2: [adds 2nd SECOND ARGUMENT OF OBJECTS]
{
  timestamps: true
})

// Section 12 Video 13 Minutes 15:
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// Section 12 Video 11 minute 3 [creating the getPublicProfile() Function which is used in userRouters.js]:
// userSchema.methods.getPublicProfile = function () {
  // Section 12 Video 11 minute 6 [he changes FunctionS() Name AS we no Longer ues it in userROUters.js] i Guess toJSON is a MONGOOSE METHODS ,not using mongoDB methods
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  // Section 14 Video 8 MInute 1.5: DELETEs JSON to SPEED UP our WEBSITES PERFORMANCE APP:
  delete userObject.avatar

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  // Section 15 Video 4 Minute 16:
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  // const token = jwt.sign({ _id: user._id.toString() }, 'testingTaskApp')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// Section 11 Video 4 3.3 minutes new CODES:
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login (wrong credentials)')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login (wrong credentials)')
  }
  // // BY ME: we could have put them inside of a same Message since At Least HE HAS same ERRORS message
  // if (!user && !isMatch) {
  //   throw new Error('3.Wrong credentials')
  // }
  // // ^^^ ITS STILL not SENDING ERRORS message (only error 400), but i think is bcuz we never SEND it but only THROW
  // // ^^^^^ YEP, even when email is correct but password wrong = doesn't SHOW the error MESSAGE, anyways we need this when BOTH FAIL

  return user
}

// Hash the plain text password before saving - HIS NOTES [section 11,4 video, 3.3minutes]
userSchema.pre('save', async function (next) {
  const user = this
  
  // console.log('Just before saving!')
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})


// Section 12 Video 15:
// Delete user tasks when user is removed:
userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

// By me [same section ^^^]Make sure the below is BELOW EVERYTHING ELSE!!!!!
const User = mongoose.model('User', userSchema)

// // Just before the SECTION 12 2 VIDEO: [ we only cut out the objects (of the const User - the 2nd argument and put it inside of userSchema as the one (and only) ARGUMENT)]
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

module.exports = User