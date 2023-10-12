const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("counter", counterSchema);