const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    studentName: {
      type: String,
      required: true
    },
    rollNo: {
      type: String,
      required: true,
      unique: true
    },
    className: {
      type: String,
      required: true
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ],
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
