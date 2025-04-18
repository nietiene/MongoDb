const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
});

// mongoose.model("user", userSchema);
module.exports = mongoose.model("User", userSchema); 