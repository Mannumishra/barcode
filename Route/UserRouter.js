const { createUser, getUser } = require("../Controllar/UserControllar")

const Router = require("express").Router()

Router.post("/user" , createUser)
Router.get("/user/:_id" , getUser)

module.exports = Router