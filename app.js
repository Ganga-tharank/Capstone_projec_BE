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

// const mongoUrl = ('mongodb://localhost:27017');
// mongoose.connect(mongoUrl, err => {
//   if (err) throw err;
//   console.log("Mongodb connected...");
// });
// const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectToDatabase();


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

app.get('/', (req, res) =>{
    res.send('Welcome To The Task Manager API')
})
 
// app.post('/api/auth/login',(req, res)=>{
//   res.send({message: 'Login Sucessful'})
// })
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build/index.html")));
// }



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
