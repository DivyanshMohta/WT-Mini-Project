import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import { AddToDataBase } from "./database.js";
import { Assistant } from "./BardApi.js";

const app = express();
const port = 1000;
const env = dotenv.config();

const loginDb = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Login",
  password: "",
  port: ,
});

const StudentDb = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "StudentData",
  password: "",
  port: ,
});

StudentDb.connect();
loginDb.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
  
app.get("/", (req, res) => {
  res.send("Login Page"); // Just sending a simple response as a placeholder
});

app.get("/subjects", async (req, res) => {
  try {
    const subjectData = await loginDb.query("SELECT * FROM SubjectName");
    res.status(200).json(subjectData.rows); // Sending subject data as JSON
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await loginDb.query("SELECT Login_Role FROM AllLogin WHERE Login_Email = $1", [username]);

    if (data.rows.length > 0) {
      const role = data.rows[0].login_role;

      if (role === 'Admin') {
        const adminData = await loginDb.query("SELECT Admin_Password FROM AdminLogin WHERE Admin_Email = $1", [username]);
        
        if (adminData.rows.length > 0 && adminData.rows[0].admin_password === password) {
          console.log("Login Successful as Admin");
          res.status(200).json({ Role: role });
        } else {
          console.log('Admin Login Failed');
          res.status(401).json({ message: "Admin Login Failed" });
        }
      } else if (role === 'Student') {
        const studentData = await loginDb.query("SELECT Student_Password FROM StudentLogin WHERE Student_Email = $1", [username]);

        if (studentData.rows.length > 0 && studentData.rows[0].student_password === password) {
          console.log("Login Successful as Student");
          res.status(200).json({ Role: role });
        } else {
          console.log('Student Login Failed');
          res.status(401).json({ message: "Password Failed" });
        }
      } else {
        console.log('Invalid Role');
        res.status(401).json({ message: "Invalid Role" });
      }
    } else {
      console.log('User not found');
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error executing login query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/excel", (req, res) => {

  console.log("Received Excel file");
  const data = req.body;
  AddToDataBase(data);
  res.status(200).send("Excel file received successfully");
});

app.post("/fetchOveralldata", async (req, res) => {
  try {
    // console.log(req.body.username);
    const prndata = await  loginDb.query('SELECT "prn_no" FROM "student_database" where e_mail =$1',[req.body.username]);
    const prn= prndata.rows;
    // console.log(prn[0].prn_no)
    const data = await StudentDb.query('SELECT * FROM "NA_DataScienceandMachineLearning_2022-23_Semester1_OverAll" where "PRN.No." = $1',[prn[0].prn_no]);
    // console.log(data.rows)
    res.status(200).json({ Data: data.rows }); // Sending data as JSON with status code 200

  } catch (error) {
    console.error("Error fetching overall data:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Sending error message as JSON with status code 500
  }
});
app.post("/bard", async (req, res) => {
  console.log(req.body);
  const data = req.body;
  try {
    // Call the Assistant function and await its response
    const message = await Assistant(data.message);
    console.log(message);
    // Send the response message back to the client
    res.json({ message: message }); // Assuming message is a string
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/tracksubjectrecord", async (req, res) => {
  try {
    const { username } = req.body;

    // Fetch tracking records for subjects
    const trackRecords = await StudentDb.query('SELECT * FROM subject_database_tracking');

    // Initialize a variable to store the found data
    let foundData = [];

    // Iterate over each tracking record to check if the username is associated with any table
    for (const record of trackRecords.rows) {
      const tableName = record.table_name;
      // Query the current table to check if the username exists
      const data = await StudentDb.query(`SELECT * FROM "${tableName}" WHERE "Email" = $1`, [username]);
      
      // If the user exists in the current table, add the data to foundData
      if (data.rows.length > 0) {
        foundData.push({ data: data.rows });
      }
    }

    // If data is found, send it as a response
    if (foundData.length > 0) {
      // Combine trackRecords and foundData into a single object
      const responseData = {
        trackRecords: trackRecords.rows,
        foundData: foundData
      };

      res.status(200).json(responseData);
      console.log('Found Data:', responseData);
    } else {
      // If the loop completes without finding any data, send an appropriate response
      console.log('User not found in any tables');
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Error fetching tracking records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
