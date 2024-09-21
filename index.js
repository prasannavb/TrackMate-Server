const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

require('dotenv').config();

//env Variables
const DATABASE_URL=process.env.DATABASE_URL
const PORT=process.env.PORT

//Connect to MongoAtlas
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


const getModelForYear = (year) => {
  const modelName = year;
  if (mongoose.modelNames().includes(modelName)) {
    return mongoose.model(modelName);
  }
  const schema = new mongoose.Schema({
    date: String,
    month:String,
  });
  return mongoose.model(modelName, schema);
};

// Route to mark attendance
app.post("/", async (req, res) => {
  const { date } = req.body;
  try {
    const inputYear = date.split("-")[0];
    const inputmonth=date.split("-")[1];
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const collectionName = `Attendance_${inputYear}`;
    const MarkAttendanceModel = getModelForYear(collectionName);
    const [exists]=await MarkAttendanceModel.find({date:date})
    if(!exists) 
    {
      await MarkAttendanceModel.insertMany({ date: date,month:monthArray[inputmonth-1]});
      res.status(200).json({ message: "Attendance marked successfully!" ,status:true});
    }
    else
    {
      res.status(200).json({ message: "Attendance already marked ",status:false });
    }

  }catch (error) {
  res.status(500).json({ error: "Error marking attendance" });
  }
});

// Check if a collection exists
async function collectionExists(db, collectionName) {
  const collections = await db.listCollections({ name: collectionName }).toArray();
  return collections.length > 0;
}

// Route to fetch attendance data for a specific year
app.post("/fetchAttendance",async(req,res)=>{
    const { inputYear } = req.body;
    try {
    const collectionName = `attendance_${inputYear}`;
    const db = mongoose.connection.db; 
    const exists = await collectionExists(db, collectionName);   
    if(exists)
    {
      const FetchAttendanceModel=getModelForYear(collectionName);
      const AttendanceData=await FetchAttendanceModel.find({})
      res.status(200).json({status:true,AttendanceData})
    }
    else
    {
      res.status(200).json({status:false})
    }    
    }catch (error) {
    console.error("Error in fetching attendance:", error);
    res.status(500).json({ error: "Error processing request" });
    }

}) 

// Route to fetch attendance data for a specific month and year
app.post("/fetchAttendancePerMonth",async(req,res)=>{
  const {_year,_month}=req.body
  try {
    const collectionName = `attendance_${_year}`;
    const db = mongoose.connection.db; 
    const exists = await collectionExists(db, collectionName);   
    if(exists)
    {
      const FetchAttendanceModel=getModelForYear(collectionName);
      const AttendanceData=await FetchAttendanceModel.find({month:_month}).select({_id:1,date:1})
      res.status(200).json({status:true,AttendanceData})
    }
    else
    {
     res.status(200).json({status:false,AttendanceData:[]})
    }
  } catch (error) {
  console.error("Error in fetching attendance:", error);
  res.status(500).json({ error: "Error processing request" });
  }
})  

app.delete("/deleteAttendancePerMonth",async(req,res)=>{
  const {_year,_date}=req.body
  const collectionName = `attendance_${_year}`;
  const FetchAttendanceModel=getModelForYear(collectionName)
  await FetchAttendanceModel.deleteOne({date:_date})
  res.status(200).json({status:true,message:"Attendance has been deleted"})
})