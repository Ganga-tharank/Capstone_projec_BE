require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
// require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

console.log('SECRET_KEY:', process.env.SECRET_KEY);



// const mongoUrl = process.env.MONGODB_URI;
// mongoose.connect(mongoUrl, err => {
//   if (err) throw err;
//   console.log("Mongodb connected...");
// });
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

app.get('/', (req, res) =>{
    res.send('Welcome To The Task Manager API')
})
 
// app.post('/auth/signup', (req, res) => {
//   // Handle the signup request here
//   console.log('Signup request received');
//   res.send('Signup successful');
// });
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
// }



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
