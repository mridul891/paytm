const express = require("express");
const { Router } = require("./routes");


mongoose.connect('mongodb+srv://pandeymridulwork:mridul891@paytm.gzqo0ig.mongodb.net/').then(() => console.log("mongodb connected"))

app.use("/api/v1", Rout)
app.listen(port, () => {
    console.log(`the app is running at  localhost :${port}`)
})
