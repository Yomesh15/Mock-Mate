import express from "express"
import { analyzeResume, finishInterview, generateQuestions, getInterviewReport, getMyInterviews, submitAnswer } from "../controllers/interview.controller.js"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"


const interview_router = express.Router()


interview_router.post("/resume", isAuth, upload.single("resume"), analyzeResume)
interview_router.post("/generate-questions", isAuth, generateQuestions)
interview_router.post("/submit-answer", isAuth, submitAnswer)
interview_router.post("/finish", isAuth, finishInterview)


interview_router.get("/get-interview", isAuth, getMyInterviews)
interview_router.get("/report/:id", isAuth, getInterviewReport)


export default interview_router