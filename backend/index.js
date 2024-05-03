const express = require("express");
const cors = require('cors')
const rootRouter = require('./Routes/index');
const port = 3000;
const app = express();
const mongoose = require("mongoose")
app.use(cors());
app.use(express.json());


app.use('/api/v1', rootRouter);

mongoose.connect('mongodb+srv://pandeymridulwork:mridul891@paytm.gzqo0ig.mongodb.net/').then(() => console.log("mongodb connected"))


app.listen(port, () => {
    console.log(`the app is running at  localhost :${port}`)
})
