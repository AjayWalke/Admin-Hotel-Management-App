const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  refNo: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model("user", userSchema);
