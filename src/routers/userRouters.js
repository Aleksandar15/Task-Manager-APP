// Generally created in section 11 20 video:
const express = require('express')
const router = new express.Router()

const User = require('../models/userModels')
const auth = require('../middleware/auth')

// section 14 Video 2 Minute 15.3:
const multer = require('multer')

// Section 14 Video 8 Minute 4.4:
const sharp = require('sharp')

// Section 15 Video 3 Minute 5.2:
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

// Section 11 20 Video: [Separate Route Files - ONE main (this) into Multiple chunks]
// // Minute 7 we transfer oodes from index.js and into here we delete/comments out the dummy TEST ROUTERS
// // const router = new express.Router()
// router.get('/test', (req, res) => {
//   res.send('<h1>This is from my other router</h1>')
// })
// // app.use(router)

// +++S11,20vid,Minute 8: WE NEED to Switch APP with ROUTER [the keyword app.POST===ROUTER.post]

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  
  try {
    await user.save()
    // Section 15 Video 3 Minute 6:
    sendWelcomeEmail(user.email, user.name)
    // 
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  }
  catch(err) {
    res.status(400).send(err)
  }
})

// Section 12 Video 6 minute 12:^^^^^challenge time do the userTokens for the REGISTERED, userSCHEMAs


router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    // Section 12 video 6 minute 1: Reusable functions for TOKENs
    const token = await user.generateAuthToken()
    // Also added USER and TOKEN objects to the ARGUMENTS
    // res.send({ user, token })
    // Section 12 video 11=> WE are HIDING DATA from SENDING to the USER (such as PASSWORD and TOKENS should be HIDDEN) +getPublicProfile() FUNCTION will be created in UserModels.js MODELS folders
    // res.send({ user: user.getPublicProfile(), token })
    // Section 12 video 11 minute 5.4=IN THE SAME VIDEO he Changes it back as we Edited userModels.js
    res.send({ user, token })
  } catch(err) {
    res.status(400).send()
  }
})

// Section 12 Video 10 => LOgging oUT
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(500).send()
  }
})
// Section 12 Video 12 7mins=> LOGGING OUT from ALL SESSIONS (devices)-CHALLENGES-EXERCISES:
// I give up I couldnt do it=>HARDEST CHALLENGE ever=>I needed SOLUTIONS for this EXERCISES:
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(500).send()
  }
})


router.get('/users/me', auth, async (req, res) => {
// router.get('/users', auth, async (req, res) => {
// // Section 12 Video 8 minute 17^^^^^Changed router path to /users/ME ~ My PROFILE Authentication ONLY
// // Deleted the below: Deletes the below:
//   try {
//     const users = await User.find()
//     res.send(users)
//   }
//   catch(err) {
//     res.status(500).send()
//   }

  res.send(req.user)
  })
  
// Section 12 Video 12 minute 1: DELETES the CODES below:
// router.get('/users/:id', async (req, res) => {
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

// Section 12 Video 12 edits:
router.patch('/users/me', auth, async (req, res) => {
  // router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'})
  }
  // Section 12 Video 12 Minutes 8 Above ^^ is ok, edits only below:
  try {
    // // Section 12 Video 3 Minutes 8:
    // const user = await User.findById(req.params.id)
    
    updates.forEach((update) => req.user[update] = req.body[update])
    // updates.forEach((update) => user[update] = req.body[update])
    await req.user.save()
    // await user.save()
    
    // He HIMSELF edits out this [in Section12,3v,8m]:
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
    // Section 12 Video 12 Minute 8.3 Deletes [the iF statement]:
    // if (!user) {
    //   return res.status(404).send()
    // }

    res.send(req.user)
    // res.send(user)
  } catch(err) {
    res.status(400).send(err)
  }
})

// Section 12 Video 12 edits:
router.delete('/users/me', auth, async (req, res) => {
// router.delete('/users/:id', async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)
    // // const user = await User.findByIdAndDelete(req.params.id)
    
    // if(!user) {
    //   return res.status(404).send()
    // }

    await req.user.remove()
    // Section 15 Video 3 Minute 14:
    sendCancelationEmail(req.user.email, req.user.name)
    //
    res.send(req.user)
    // res.send(user)
  } catch(err) {
    res.status(500).send()
  }
})

// section 14 Video 2 Minute 16 [continous]:
const upload = multer({
  // section 14 Video 6 Minute 3.5 [removed dest PROPERTY from options-OBJECT with 'avatar' PROPERTY]
  // dest: 'avatars',
  // section 14 Video 4: challenge time exercises:
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})
// Section 14 Video 8 Minute 5.3:
// section 14 Video 6 minute 1 [AUTH, added as second arguments]
// section 14 Video 2 Minute 15 [[[^^^]]]we will Finish it upwards:
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  // Section 14 Video 8 Minute 5.3:
  const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).png().toBuffer()
  req.user.avatar = buffer 
  // // section 14 video 6 minute 4.4 [req.file.buffer+AWAIT functions]:
  // req.user.avatar = req.file.buffer
  await req.user.save()
// router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
  res.send()
}
// section 14 video 5 minute 7: challenge time exercises:
, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// Section 14 Video 6 11 Challenge Time exercises: REMOVE PROFILE PICTURES-the commented out are my mistakes:
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  // req.user.avatar = req.file.buffer
  await req.user.save()
  res.send()
})

// Section 14 Video 7 Minute 1:
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }
// Section 14 Video 8 Minute 8.5:
    res.set('Content-Type', 'image/png')
    // res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
    
  } catch (err) {
    res.status(404).send()
  }
})

 module.exports = router