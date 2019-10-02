const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
});

module.mongoose = mongoose.model('User', UserSchema);