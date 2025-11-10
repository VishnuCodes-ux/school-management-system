const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const subjectsRoutes = require("./routes/subjects/subjectRoutes");
const studentRoutes = require("./routes/students/studentRouter");

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/subject', subjectsRoutes);



module.exports = app;
