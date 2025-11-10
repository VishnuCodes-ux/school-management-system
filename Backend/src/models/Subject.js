const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
