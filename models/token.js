const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});


const Token = new mongoose.model('token', TokenSchema);
module.exports = Token;