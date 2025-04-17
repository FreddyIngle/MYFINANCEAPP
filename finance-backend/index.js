const PORT = 4000;
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const createTable = async () => {
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        );
        console.log("Table created successfully");

    }catch(err){
        console.error("Error creating table:", err);
    }finally{
        pool.end();
    }
};
//createTable();

/********API ENDPOINTS************************************ */
/* SignUp: POST */
app.post("/signup", async (req, res) => {
    const { username, email, password} =  req.body;

    try{
        const result = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, password]
        );
        res.status(201).json(result.rows[0]);

    }catch (error){
        console.error("Error signing up,", error);
        res.status(500).json({error:"Signup failed"});
    }





});



require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Finance backend is live ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
