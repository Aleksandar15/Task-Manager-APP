// Generally created in section 11 20 video:
const express = require('express')
const router = new express.Router()

const Task = require('../models/taskModels')
// Section 12 Video 13 Minute 4:
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req,res) => {
// router.post('/tasks', async (req,res) => {
  // const task = new Task(req.body)
  // He comments this out^^^^^
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save()
    res.status(201).send(task)
  }
  catch(err) {
    res.status(400).send(err)
  }
})

// Section 13 Video 5:
// GET /tasks?sortBy=createdAt_desc
// Section 13 Video 4 Minute 8 challenge-exercises for SKIPs [ we did LIMIT ]
// Section 13 Video 4 Minute 3:
// GET /tasks?limit=10&skip= 0
// GET /tasks?limit=10&skip=20
// Section 13 Video 3:
// 1st option (He says minute 3)
// GET /tasks?completed=false   [true or false]
// Section 12 Video 14 Minute 6: Challenges exercises:
router.get('/tasks', auth, async (req, res) => {
  // Section 13 Video 3 Minute 5.5:
  const match = {}
  // Section 13 Video 5 Minute 5.5:
  const sort ={}
  
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }
  // Section 13 Video 5 Minute 6:
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split('_')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 
  }
// router.get('/tasks', async (req, res) => {
  try {
    // // 1st option:
    // const tasks = await Task.find({ owner: req.user._id })
    // // const tasks = await Task.find({})

    // 2nd option:
    // await req.user.populate('tasks').execPopulate()
    // Section 13 Video 3 Minute 4 [same but edits]:
    await req.user.populate({
      path: 'tasks',
      match,
      // Section 13 Video 4 Minute 5:
      options: {
        // limit: 2
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        // Section 13 Video 5 minute 3:
        sort
        // : 
        // {
        //   // createdAt: -1
        //   completed: -1
        //   // -1 means TRUE first (COMPLETED) then FALSE (INCOMPLETED) = +1 (1) is REVERSE
        // // Deletes them as we write the code IF (statement) {ABOVE} ^^^^^
        // }
      }
    }).execPopulate()

    // res.send(tasks)
    // 2nd option requires to delete ^^^ and modify it like so:
    res.send(req.user.tasks)
  } catch (err) {
    res.status(500).send()
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
// router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  try {
    // Section 12 Video 14: [removed the below line and added a new code line]
    // const task = await Task.findById(_id)
    const task = await Task.findOne({ _id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch(err) {
    res.status(500).send()
    // res.status(500).send('WRONG ID!')
  }
})

// Section 12 Video 14 Minute 9: modifications:
router.patch('/tasks/:id', auth, async (req, res) => {
// router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }

  try {
    // Section 12 Video 14 minute 9 EXERCISES - PRACTICES - CHALLENGES:
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    // // Section 12 Video 3 Minutes 16 EXeRCISES - PRACTICES - CHALLENGES:
    // const task = await Task.findById(req.params.id)

    // // Section 12 VIdeo 14 minute 10: these are moved below IF statement {THE SAME}
    // updates.forEach((update) => task[update] = req.body[update])
    // await task.save()

    //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

     if (!task) {
       return res.status(404).send()
     }
     updates.forEach((update) => task[update] = req.body[update])
     await task.save()
     res.send(task)
  } catch(err) {
     res.status(400).send(err)
  }
})

// Section 12 Video 14 Minute 12: challenges - exercises:
router.delete('/tasks/:id', auth, async (req, res) => {
// router.delete('/tasks/:id', async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch(err) {
    res.status(500).send()
  }
})

module.exports = router