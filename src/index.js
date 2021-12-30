const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Task = require('./models/task')
// ^^^Unnecessary in video 20 13 minutes of 11 section
const userRouter = require('./routers/userRouters')
const taskRouter = require('./routers/taskRouters')

const app = express()


// // Section 14 Video 2 Minute 3:
// const multer = require('multer')
// const upload = multer({
//   dest: 'images',
//   // section 14 Video 3 Minute 3:
//   limits: {
//     fileSize: 1000000
//     // 1000000 [1.000.000] BYTES = 1MB megabytes
//   },
//   // section 14 Video 3 Minute 8:
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//     // if (!file.originalname.endsWith('.pdf')) {
//       return cb(new Error('Please upload a Word document'))
//       // return cb(new Error('Please upload a PDF'))
//     }

//     cb(undefined, true)

//     // cb(new Error('File must be a PDF'))
//     // cb(undefined, true)
//     // cb(undefined, false)
//   }
// })
// // section 14 Video 5:
// const errorMiddleware = (req, res, next) => {
//   throw new Error('From my middleware')
// }
// // section 14 video 5:
// // section 14 Video 2 Minute 15 [[[^^^]]]we will Finish it upwards:
// app.post('/upload', upload.single('upload'), (req, res) => {
// // app.post('/upload', errorMiddleware, (req, res) => {
// // app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({error: error.message})
// })



// We comment this out he says it was all experimental: Section 12 video 8 0 minutes
// // This MUST be ABOVE other's app.use's(): [Section 12 video 7 minute 3]EXPRESS MIDDLEWARES=> REQ RES NEXT
// app.use((req, res, next) => {
//   // console.log(req.method, req.path)
//   // next()
//   if ( req.method === 'GET' ){
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })
// // 
// // Challenge,exerccises of the same video for MAINTENANCE page;routes
// // My trials:
// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()
//     if ( req.method === 'GET' ){
//       res.status(503).send('Page is under maintenance')
//     } else {
//       next()
//     }
//   })
//   // His solutions hiz:
// app.use((req, res, next) => {
//   res.status(503).send('Site is under maintenance. Come back laters')
// })
// // 
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// // Section 12 Video 13 Minute 8: [the userS-taskS relationshipS]
// const Task = require('./models/taskModels')
// const User = require('./models/userModels')

// const main = async () => {
//   // const task = await Task.findById('61ca1e8cd88fa45ed48b80f3')
//   // await task.populate('owner').execPopulate()
//   // // console.log(task)
//   // console.log(task.owner)

//   // minute 13:
//   const user = await User.findById('61ca18ab6e63244d046c9509')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)
// }
// main()

// // Section 12 Video 11 7.2 EXAMPLES explains toJSON - i GueSS is a MONGOOSE METHODS of a FUNCTION specialized explanations
// const pet = {
//   name: 'Hal'
// }
// pet.toJSON = function () {
//   // console.log(this)
//   // return this
//   return {}
// }
// console.log(JSON.stringify(pet))


// Section 12 video 7: EXPRESS MIDDLEWAREs (no codes):
// Without middleware: new request -> run route handler
// 
// With middleware:    new request -> do something -> run router handler
// 


// // Section 12 video 5: JWT - JSON WEB TOKEN: [NPM install JSONWEBTOKEN@8.4.0]:
// const jwt = require('jsonwebtoken')

// const myFunciton = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisIsTokenForTaskApp', { expiresIn: '5 mins'})
//   console.log(token)

//   const data = jwt.verify(token, 'thisIsTokenForTaskApp')
//   console.log(data)
// }

// myFunciton()



// // Section 12 Video 5 minutes 3.5 === DELETES the BELOW COmmented OUT:
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//   const password = 'Red12345'
//   const hashedPasswords = await bcrypt.hash(password, 8)

//   console.log(password)
//   console.log(hashedPasswords)
//   // $2a$08$3StHSPVnsO4w24SWeMSBJ..rsZe68Wnqu1LPAKkAKQ1MTlFIhQkdG

//   const isMatch = await bcrypt.compare('Red12345', hashedPasswords)
//   console.log(isMatch)
// }

// myFunction()



// // Section 11 20 Video: [Separate Route Files - ONE main (this) into Multiple chunks]
// const router = new express.Router()
// router.get('/test', (req, res) => {
//   res.send('<h1>This is from my other router</h1>')
// })
// app.use(router)


// ALL of this in section 11 Video 20 Will be moved into SEPARATE FILES
// app.post('/users', (req, res) => {
//   // console.log(req.body)
//   // res.send('testing!')

//   const user = new User(req.body)
//   user.save().then(() => {
//     res.status(201).send(user)
//   }).catch((error) => {
//     res.status(400).send(error)
//     // res.status(400)
//     // res.send(error)
//   })
// })
// ^^^^^COMMENTING this out and next will be section 11 video 16 [edits same code with ASYNC AWAIT]:
// !!!I DiD the BELOW CODE - BEFORE HIM + as my OWN EXERCISES - i Paused the Video!!!
// app.post('/users', async (req, res) => {
//   const user = new User(req.body)

//   try {
//     await user.save()
//     res.status(201).send(user)
//   }
//   catch(err) {
//     res.status(400).send(err)
//   }
// })

// // app.get('/users', (req, res) => {
// //   User.find({}).then((users) => {
// //     res.send(users)
// //   }).catch((err) => {
// //     res.status(500).send()
// //     // res.status(500).send(err)
// //     // he says isnt necessary ^^^ just status is enough
// //   })
// // })
// // Section 11 Video 16 Minutes 6:
// app.get('/users', async (req, res) => {
//   try {
//     // await User.find()
//     const users = await User.find()
//     res.send(users)
//   }
//   catch(err) {
//     res.status(500).send()
//   }
//   })

// // app.get('/users/:id', (req, res) => {
// //   const _id = req.params.id
// //   // console.log(req.params)
// //   User.findById(_id).then((user) => {
// //     if (!user) {
// //       return res.status(404).send()
// //     }
// //     res.send(user)
// //   }).catch((err) => {
// //     res.status(500).send()
// //   })
// // })
// // Section 11 Video 16 Minutes 7.3:
// app.get('/users/:id', async (req, res) => {
//   try {
//     const _id = req.params.id
//     const user = await User.findById(_id)
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   }
//   catch(err) {
//     res.status(500).send()
//   }
// })

// // Section 11 video 17 0 Minute: 4th functions
// // (USER-related ENDPOINT - we will use 4th which will use app.PATH HTTP METHODs not HTTPS javascript methods)
// app.patch('/users/:id', async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['name', 'email', 'password', 'age']
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!'})
//   }

//   try {
//      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//      if (!user) {
//        return res.status(404).send()
//      }
//      res.send(user)
//   } catch(err) {
//     // res.status(404).send()
//     // By me ^^^ wasn't correct, but his:
//     res.status(400).send(err)
//   }
// })

// // Section 11 Video 19 DELETE Methods - HTTP Endpoints , ExpressJS METHODS for DELETE HTTP Method
// // ;NOT exercises challenges but for TASKS - YES, for USERS explanations
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id)

//     if(!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   } catch(err) {
//     res.status(500).send()
//   }
// })
 

// app.post('/tasks', (req,res) => {
//   const task = new Task(req.body)
//   task.save().then(() => {
//     res.status(201).send(task)
//   }).catch((error) => {
//     res.status(400).send(error)
//   })
// })
// Section 11 Video 16 Minutes 11:
// app.post('/tasks', async (req,res) => {
//   try {
//     const task = new Task(req.body)
//     await task.save()
//     res.status(201).send(task)
//   }
//   catch(err) {
//     res.status(400).send(err)
//   }
// })

// // Challenge exercises section 11 video 11:
// // app.get('/tasks', (req, res) => {
// //   Task.find({}).then((tasks) => {
// //     res.send(tasks)
// //   }).catch((err) => {
// //     res.status(500).send()
// //   })
// // })
// // Section 11 Video 16 Minutes 11:
// app.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find({})
//     res.send(tasks)
//   } catch (err) {
//     res.status(500).send()
//   }
// })

// // app.get('/tasks/:id', (req, res) => {
// //   const _id = req.params.id
// //   Task.findById(_id).then((task) => {
// //     if (!task) {
// //       return res.status(404).send()
// //     }
// //     res.send(task)
// //   }).catch((err) => {
// //     res.status(500).send()
// //   })
// // })
// // Section 11 Video 16 Minutes 11:
// app.get('/tasks/:id', async (req, res) => {
//   try {
//     const _id = req.params.id
//     const task = await Task.findById(_id)
//     if (!task) {
//       return res.status(404).send()
//     }
//     res.send(task)
//   } catch(err) {
//     res.status(500).send()
//   }
// })

// // Section 11 Video 18 Exercises Challenges Goals:
// app.patch('/tasks/:id', async (req, res) => {
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['description', 'completed']
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!'})
//   }

//   try {
//      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//      if (!task) {
//        return res.status(404).send()
//      }
//      res.send(task)
//   } catch(err) {
//     res.status(400).send(err)
//   }
// })

// // Section 11 Video 19 DELETE HTTP ENDPOINTS METHODS:
// app.delete('/tasks/:id', async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id)

//     if(!task) {
//       return res.status(404).send()
//     }
//     res.send(task)
//   } catch(err) {
//     res.status(500).send()
//   }
// })


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
  // console.log(`Server is up and running on port ${process.env.PORT || 3000}`)
  // console.log('Server is up and running on port ' + PORT)
})