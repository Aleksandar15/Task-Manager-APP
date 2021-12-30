// Created section 12 video 8 minute 2:EXPRESS MIDDLEWARES:
const jwt = require('jsonwebtoken')
const User = require('../models/userModels')

const auth = async (req, res, next) => {
  // console.log('Auth middleware')
  // next()

  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    // console.log(token)
    // Section 15 Video 4 Minute 16:
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const decoded = jwt.verify(token, 'testingTaskApp')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    // Section 12 Video 10 1.4 - ADDing LOGinG OUT:
    req.token = token
    // 
    req.user = user
    next()
    
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate.'})
  }
}

module.exports = auth