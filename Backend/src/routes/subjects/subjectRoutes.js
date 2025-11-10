const express = require("express");
const router = express.Router();

const { addSubject, getSubject } = require("../../controllers/subject/subjectController");
const authMiddleWare = require("../../middleware/authMiddleware");

router.post("/add-subjects", authMiddleWare, addSubject);
router.get("/get-subjects", authMiddleWare, getSubject);


module.exports = router;

