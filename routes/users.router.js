const express = require("express")
const User = require("../models/User")

const usersRouter = express.Router()

// GET /users
// get ALL users route
usersRouter.get("/", async (req, res) => {
  const usersAll = await User.find()
  res.json(usersAll)
})

// POST /users
// create / signup new user
usersRouter.post("/", async (req, res) => {

  const { email } = req.body

  console.log(email)

  // forward data parsed by TÜRSTEHER (express.json middleware)
  // to database!

  const userExisting = await User.findOne({ email })

  // ERROR HANDLING
  // if user already exists => prevent creation!
  if(userExisting)
    return res.status(400).json({error: `User with email ${email} already exists`})
  
  // user does not exist => create 
  const userNew = await User.create( req.body ) 
  res.json( userNew )
})

// POST /users/login
// login a user
usersRouter.post("/login", async (req, res) => {

  const { email, password } = req.body

  console.log(req.body)

  // check if user with given email and password EXISTS in database
  const userFound = await User.findOne({
    email: email, password
  })

  // user with given email and password from req.body was not found!
  // Login fail!
  if(!userFound)
    return res.status(400).json({
      error: "User does not exist! Try with other email / password. Typo?"
    })

  // user exists! respond with found user
  res.json( userFound )
})


module.exports = usersRouter