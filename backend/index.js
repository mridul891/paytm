const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors")

app.use(cors())
app.use(express.json())


app.use("/api/v1", mainRouter)
app.listen(port, () => {
    console.log(`the app is running at  localhost :${port}`)
})
