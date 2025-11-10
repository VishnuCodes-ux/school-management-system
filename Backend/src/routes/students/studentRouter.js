const express = require("express");
const router = express.Router();
const { addStuddent } = require("../../controllers/students/studentController")
const authMiddleWare = require("../../middleware/authMiddleware");

router.post('/add-student', authMiddleWare, addStuddent);
// router.get('/get-student', authMiddleWare, getStudents);

module.exports = router;