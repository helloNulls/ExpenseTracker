const express = require('express');
const mongoos = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const client = process.env.MONGO_URI;
let projectData;


mongoos.connect(client ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("MongoDB connected");
  const db = mongoos.connection.db;


  projectData= db.collection("app");
  
}).catch(err=>console.error("Failed to connect to MongoDB",err))


app.post('/signup', async (req, res) => {

  const { firstName,lastName ,email,password} = req.body;
 
    try {
   
    await projectData.insertOne({ fullName, email, password })
   
      res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
      res.status(400).json({ message: 'Signup failed.', error });
  }
});

app.post('/signin', async (req, res) => { 
  const { email, password } = req.body;
  try {
      const user= await projectData.findOne({ email, password });
      if (user) {
          res.status(200).json({ message: 'Login successful' });
      } else {
          res.status(400).json({ message: 'Email or password does not match.' });
      }
  } catch (error) {
      res.status(400).json({ message: 'Login failed.', error: error.message });
  }
});

const port = 5002; 
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중`);
});