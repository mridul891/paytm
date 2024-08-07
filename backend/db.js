const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://pandeymridulwork:mridul891@paytm.gzqo0ig.mongodb.net/').then(() => console.log("mongodb connected"))

const userSchema = mongoose.Schema({
    Username: String,
    firstName: String,
    LastName: String,
    Password: String
})

const User = mongoose.model("User", userSchema)
module.exports =  User 