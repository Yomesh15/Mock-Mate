import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./database/connectDB.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import AuthRoute from "./routes/auth.route.js"
import UserRoute from "./routes/user.route.js"
import InterviewRoute from "./routes/interview.route.js"

const app = express()

//cors 
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}))


// database connection
connectDB()


// middleware
app.use(express.json())
app.use(cookieParser())


//route 
app.use("/auth", AuthRoute)
app.use("/user", UserRoute)
app.use("/interview", InterviewRoute)


app.get("/", (req, res) => {
    res.send("Mock Mate")
})

const PORT = process.env.PORT || 2005

app.listen(PORT, () => {
    console.log(`Server : http://localhost:${PORT}`);
})