const Subject = require("../../models/Subject");

exports.addSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, teacherId } = req.body;

    if (!subjectName || !subjectCode || !teacherId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Subject.findOne({ subjectCode });
    if (existing) {
      return res.status(400).json({ message: "Subject code already exists" });
    }

    const newSubject = new Subject({
      subjectName,
      subjectCode,
      teacherId,
    });

    await newSubject.save();

    res.status(201).json({
      message: "Subject added successfully",
      subject: newSubject,
    });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getSubject = async (req, res) => {
  res.json({message: 'kk'})
}
