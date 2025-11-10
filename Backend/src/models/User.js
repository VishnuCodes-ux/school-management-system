const mongoose = require('mongoose');

const USER_STATUS = {
    DELETED: 0,
    PENDING: 1,
    ACTIVE: 2,
    SUSPENDED: 3,
};

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide a username'],
        uniqe: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
        lowercase: true,
    },
    parentMobile: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['parent', 'teacher', 'admin'],
        default: 'teacher',
    },
    status: {
        type: Number,
        enum: Object.values(USER_STATUS),
        default: USER_STATUS.PENDING,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);