const express = require("express");
const mainRouter = require("./routes/index")

mongoose.connect('mongodb+srv://pandeymridulwork:mridul891@paytm.gzqo0ig.mongodb.net/').then(() => console.log("mongodb connected"))

app.use("/api/v1", mainRouter)
app.listen(port, () => {
    console.log(`the app is running at  localhost :${port}`)
})
