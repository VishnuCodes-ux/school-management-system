const express = require("express");
const router = express.Router();
const { register, login, getProfile, getTeachers } = require("../controllers/authController");
const authMiddleWare = require("../middleware/authMiddleware");


router.get('/profile', getProfile)
router.get('/get-teachers', authMiddleWare, getTeachers);
router.post("/register", register);
router.post('/login', login);

module.exports = router;