const express = require("express");
const mainRouter = require("./routes/index")
const cors = require("cors")
const PORT = 3000
app.use(cors())
app.use(express.json())


app.use("/api/v1", mainRouter)

app.listen(PORT, () => {
    console.log(`the app is running at  localhost :${port}`)
})
