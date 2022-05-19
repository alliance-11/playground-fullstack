const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const { connectDb } = require("./db-connect")
const usersRouter = require("./routes/users.router")
const session = require("express-session")

const env = dotenv.config() // load ENVIRONMENT first!
console.log("Loaded environment config: ", env)

connectDb() // now connect to database (using connection string in environment)

const app = express()

// Türsteher => JSON Parser => parses incoming JSON DATA
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true })) // allow access
app.use( express.json() )
app.use( session({
  secret: "holySecret",
  proxy: true, // needed later for heroku deployment
  saveUninitialized: true, // saveUnitialized: true => create cookie on each request! 
  resave: false, // do not resave session on each request if there were no changes
  cookie: {
    httpOnly: true, // just allow browser to read cookis, but javascript cannot read cookie in browser!
    maxAge: 1000*60*60*24, // 1000 ms * 60 => 1 m * 60 => 1 h 
    sameSite: 'lax',
    secure: false
    // sameSite: 'none',
    // secure: true
  }
}) )

app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to our fullstack Book App!</h2>
    <div>Our routes:<div>
    <div>Home: <a href="/">/</a></div>
    <div>Books: <a href="/books">/books</a></div>
    <div>Users: <a href="/users">/users</a></div>
  `)
})

app.get("/books", (req, res) => {
  res.json([
    { _id: "b1", title: "Name of the Wind", author: "Jadon Sanderson"},
    { _id: "b2", title: "Die Verwandlung", author: "Franz Kafka"},
    { _id: "b3", title: "Das Glasperlenspiel", author: "Hermann Hesse"}
  ])
})

// ROUTES
app.use("/users", usersRouter) // hook in the users router at path /users

// handle non existing routes
app.use((req, res, next) => {
  res.status(404).json({
    error: "This route does not exist, my dear friend!"
  })
})

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT)
})