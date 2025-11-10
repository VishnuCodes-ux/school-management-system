require('dotenv').config();
const connectDB = require('./src/config/database');
const app = require('./src/app');

const port = process.env.PORT || 5000;
connectDB();
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
