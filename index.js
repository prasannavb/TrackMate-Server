const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

 // Load environment variables
require('dotenv').config();

const DATABASE_URL=process.env.DATABASE_URL
const PORT=process.env.PORT

// Connect to MongoDB
mongoose 
  .connect(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server connected");
      console.log("Running at 8000");
    });
  })
  .catch((error) => {
    console.log("Connection error:", error);
  });


// Function to dynamically get or create a model for a given year
const getModelForYear = (year) => {
  const modelName = year;

  // Check if the model already exists
  if (mongoose.modelNames().includes(modelName)) {
    return mongoose.model(modelName);
  }

  // Define schema and create model if it doesn't exist
  const schema = new mongoose.Schema({
    date: String,
    month:String,
  });

  return mongoose.model(modelName, schema);
};

// POST route to insert attendance data
app.post("/", async (req, res) => {
  const { date } = req.body;

  try {
    const inputYear = date.split("-")[0];
    const inputmonth=date.split("-")[1];
    const collectionName = `Attendance_${inputYear}`;
    
    // Get or create the model for the specific year
    const MarkAttendanceModel = getModelForYear(collectionName);

    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Insert data into the correct collection

    const [exists]=await MarkAttendanceModel.find({date:date})
    if(!exists) 
    {
        await MarkAttendanceModel.insertMany({ date: date,month:monthArray[inputmonth-1]});
        res.status(200).json({ message: "Attendance marked successfully!" });
    }
    else
    {
        res.status(200).json({ message: "Attendance already marked " });
    }

  } catch (error) {
    res.status(500).json({ error: "Error marking attendance" });
  }
});

//Get Route for Fetching attendance

app.post("/fetchAttendance",async(req,res)=>{
    const {inputYear}=req.body
    // console.log(inputYear)
    const collectionName = `Attendance_${inputYear}`;
    const FetchAttendanceModel=getModelForYear(collectionName);
    const AttendanceData=await FetchAttendanceModel.find({})
    // console.log(AttendanceData)
    res.status(200).json({message:"Attendance Details fecthed Successfully",AttendanceData})
}) 