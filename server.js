const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to our fullstack Book App!</h2>
    <div>Our routes:<div>
    <div>Home: <a href="/">/</a></div>
    <div>Books: <a href="/books">/books</a></div>
  `)
})

app.get("/books", (req, res) => {
  res.json([
    { _id: "b1", title: "Name of the Wind", author: "Jadon Sanderson"},
    { _id: "b2", title: "Die Verwandlung", author: "Franz Kafka"},
    { _id: "b3", title: "Das Glasperlenspiel", author: "Hermann Hesse"}
  ])
})

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