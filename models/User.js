const mongoose = require("mongoose")

// extract Schema and Model
const { Schema, model } = mongoose

// rules for each user document
const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true }
},
{
  versionKey: false, // deactivate __v field
  timestamps: true // add createdAt and updatedAt fields to each document
})

// dolmetscher with database
// which will manage & talk to users collection in database
const User = model("User", UserSchema)

// we just export the model
// the model is enough for the routes => the routes will just call the model
// they dont need to know about the schema
module.exports = User