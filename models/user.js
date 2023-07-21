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
      gameDate: {
        type: Date,
        required: true,
      },
      gameMode: {
        type: String,
        enum: ["solo", "multi"],
        required: true,
      },
      wordsPerMin: {
        type: Number,
        required: true,
      },
      accuracy: {
        type: Number,
        required: true,
      },
      errors: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = new mongoose.model("user", userSchema);
module.exports = User;
