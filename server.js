const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const { connectDb } = require("./db-connect")
const usersRouter = require("./routes/users.router")
const session = require("express-session")

// load ENVIRONMENT first!
const env = dotenv.config() 
console.log("Loaded environment config: ", env)

connectDb() // now connect to database (using connection string in environment)

const app = express()


// allow ONLY THIS GIVEN frontend access to us + getting cookies from there
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true })) // allow access from ANY frontend ANY DOMAIN

// Türsteher => JSON Parser => parses incoming JSON DATA
app.use( express.json() )
app.use(
  session({
    // name: "eliza.id" => name for cookie can be set with "name"
    secret: "holySecret",
    proxy: true, // needed later for heroku deployment
    saveUninitialized: false, // saveUnitialized: true => create cookie on each request!
    resave: false, // do not resave session on each request if there were no changes
    cookie: {
      httpOnly: true, // just allow browser to read cookis, but javascript cannot read cookie in browser!
      maxAge: 1000 * 60 * 60 * 24, // 1000 ms * 60 => 1 m * 60 => 1 h

      // settings for DEPLOYMENT! 
      // => on deployed webpages we use HTTPS / encrypted sending of all responses
      // therefore we also need to mark cookies as SECURE (=> the browser will only accept "secure" cookies over HTTP)
      secure: process.env.NODE_ENV === "production",
      // sameSite => once deployed, frontend and backend will run on DIFFERENT domains. 
      // If both would run on the same domain we would call this "sameSite"
      // but due they do not run on the same: in production  we must tell the browser to allow non same-site cookies
      sameSite: process.env.NODE_ENV === "production" ? "none": "lax",
    },
  })
)

app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to our fullstack Book App!</h2>
    <div>Our routes:<div>
    <div>Home: <a href="/">/</a></div>
    <div>Books: <a href="/books">/books</a></div>
    <div>Users: <a href="/users">/users</a></div>
  `)
})

// TÜRSTEHER => security guard

// req => request => cookie & session & params
// res => for sending a response
// next => next is used to FORWARD a user to the route he / she wants to access
// if we do not call next => the user will get stuck / rejected
const auth = (req, res, next) => {
  console.log("SESSION:", req.session.user)

  // if no session => REJECT call (terminate request)
  if (!req.session.user) {
    return res.status(401).json({
      error:
        "[OUCH] Dios mio! You have no rights to be here whatsover! Buy a ticket please!",
    })
  }

  // user has a ticket! => allow user to move forward to route!
  next()
}


app.get("/books", auth, (req, res) => {
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