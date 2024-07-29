const express = require("express")
const { connectdb } = require("./DB/Db")
const Router = require("./Route/UserRouter")
connectdb()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Server Is running")
})
app.use("/api", Router)
app.listen(8000, () => {
    console.log("Server is running at 8000 prort")
})