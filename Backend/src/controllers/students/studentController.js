const Student = require('../../models/Student');

exports.addStuddent = async (req, res) => {
  try {
    const {
      studentName,
      rollNo,
      className,
      teacherId,
      parentId,
      subjects,
      address
    } = req.body;

    if (!studentName || !rollNo || !className || !teacherId || !parentId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Roll number already exists'
      });
    }

    const student = new Student({
      studentName,
      rollNo,
      className,
      teacherId,
      parentId,
      subjects,
      address
    });

    await student.save();

    return res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: student
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
