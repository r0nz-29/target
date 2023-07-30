const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  wpm: {
    type: String,
    required: false,
  },
  gameHistory: [
    {
      timestamp: {
        type: String,
        required: true,
      },
      mode: {
        type: String,
        default: 'solo'
      },
      duration: {
        type: String,
        required: true,
      },
      wpm: {
        type: Number,
        required: true,
      },
      accuracy: {
        type: Number,
        required: true,
      },
      errorCount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = new mongoose.model("user", userSchema);
module.exports = User;