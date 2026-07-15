import fs from "fs";
import { PDFParse } from "pdf-parse";
import { askAI } from "../services/openRouter.service.js";
import InterviewModel from "../models/interview.model.js";

// anlyze resume
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume Required",
      });
    }

    const fileBuffer = req.file.buffer;

    const parser = new PDFParse({
      data: fileBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    const resumetext = result.text.replace(/\s+/g, " ").trim();

    if (!resumetext) {
      return res.status(400).json({
        success: false,
        message: "No text found in PDF",
      });
    }

    const messages = [
      {
        role: "system",
        content: `
Extract structured data from the resume.

Return ONLY valid JSON.

{
  "role":"string",
  "experience":"string",
  "projects":["project1","project2"],
  "skills":["skill1","skill2"]
}
`,
      },
      {
        role: "user",
        content: resumetext,
      },
    ];

    const airesponse = await askAI({ messages });

    let parsed;

    try {
      parsed = JSON.parse(airesponse);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
      });
    }

    return res.status(200).json({
      success: true,
      role: parsed.role || "",
      experience: parsed.experience || "",
      projects: parsed.projects || [],
      skills: parsed.skills || [],
      resumetext,
    });
  } catch (error) {
    console.error("Resume Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


// thats for generate questions from ai 
export const generateQuestions = async (req, res) => {
  try {
    let { role, experience, mode, resumetext, projects, skills } = req.body;

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res.status(400).json({ message: "Role , Experience and Mode is required !" })
    }

    const user = req.user;

    if (user.credits < 50) {
      return res.status(400).json({ message: "Not Enough Credits" })
    }

    const projecttext = Array.isArray(projects) && projects.length
      ? projects.join(", ")
      : "None"

    const skillstext = Array.isArray(skills) && skills.length
      ? skills.join(", ")
      : "None"


    const safeResume = resumetext?.trim() || "None";

    const userPrompt = `
Role:${role}
Experience:${experience}
InterviewMode:${mode}
Projects:${projecttext}
Skills:${skillstext}
Resume:${safeResume}
`;

    if (!userPrompt.trim()) {
      return res.status(400).json({
        message: "Prompt content is empty."
      });
    }

    const messages = [
      {
        role: "system",
        content: `
You are a real human interviewer conducting a professional interview.

Speak in simple, natural English as if you are directly talking to the candidate.

Generate exactly 5 interview questions.

Strict Rules:
- Each question must contain between 15 and 25 words.
- Each question must be a single complete sentence.
- Do NOT number them.
- Do NOT add explanations.
- Do NOT add extra text before or after.
- One question per line only.
- Keep language simple and conversational.
- Questions must feel practical and realistic.

Difficulty progression:
Question 1 → easy
Question 2 → easy
Question 3 → medium
Question 4 → medium
Question 5 → hard

Make questions based on the candidate's role, experience, interviewMode, projects, skills, and resume details.
`
      },
      {
        role: "user",
        content: userPrompt
      }
    ];

    const aiResponse = await askAI({ messages });

    if (!aiResponse || !aiResponse.trim()) {
      return res.status(500).json({
        message: "AI returned empty response."
      });
    }

    const questionsArray = aiResponse
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .slice(0, 5);

    if (questionsArray.length === 0) {
      return res.status(500).json({
        message: "AI failed to generate questions."
      });
    }

    user.credits -= 50;
    await user.save();

    const interview = await InterviewModel.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questionsArray.map((q, index) => ({
        question: q,
        difficulty: ["easy", "easy", "medium", "medium", "hard"][index],
        timeLimit: [60, 60, 90, 90, 120][index],
      })),
    });


    res.json({
      success: true,
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions: interview.questions,
    });



  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" })
  }
}


//thts for submit ansswer
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body

    const interview = await InterviewModel.findById(interviewId)

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const question = interview.questions[questionIndex];

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Invalid question index",
      });
    }

    if (!answer) {
      question.score = 0
      question.feedback = "You did not submit an answer"
      question.answer = ""

      await interview.save()

      return res.json({ feedback: question.feedback })
    }

    if (timeTaken > question.timeLimit) {
      question.score = 0;
      question.feedback = "Time LImit Exceed"
      question.answer = answer

      await interview.save()

      return res.json({ feedback: question.feedback })
    }

    const messages = [
      {
        role: "system",
        content: `
You are a professional human interviewer evaluating a candidate's answer in a real interview.

Evaluate naturally and fairly, like a real person would.

Score the answer in these areas (0 to 10):

1. Confidence ➜ Does the answer sound clear, confident, and well spoken?
2. Communication ➜ Is the language simple, clear, and easy to understand?
3. Correctness ➜ Is the answer accurate, relevant, and complete?

Rules:
- Be realistic and unbiased.
- Do not give random high scores.
- If the answer is weak, score low.
- If the answer is strong and detailed, score high.
- Consider clarity, structure, and relevance.

Calculate:
finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

Feedback Rules:
- Write natural human feedback.
- 10 to 15 words only.
- Sound like real interview feedback.
- Can suggest improvement if needed.
- DO NOT repeat the question.
- DO NOT explain scoring.
- Keep tone professional and honest.

Return ONLY valid JSON in this format:

{
  "confidence": number,
  "communication": number,
  "correctness": number,
  "finalScore": number,
  "feedback": "short human feedback"
}
`
      },
      {
        role: "user",
        content: `
Question: ${question.question}
Answer: ${answer}
`
      }
    ];

    const aiResponse = await askAI({ messages });

    const parsed = JSON.parse(aiResponse);

    question.answer = answer;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.score = parsed.finalScore;
    question.feedback = parsed.feedback;

    await interview.save();

    return res.status(200).json({
      feedback: parsed.feedback
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }
}


// thats for finish interview
export const finishInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;

    const interview = await InterviewModel.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const totalQuestions = interview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });

    const finalScore = totalQuestions
      ? totalScore / totalQuestions
      : 0;

    const avgConfidence = totalQuestions
      ? totalConfidence / totalQuestions
      : 0;

    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;

    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    interview.finalScore = finalScore;
    interview.status = "completed";

    await interview.save();

    return res.status(200).json({
      finalScore: Number(finalScore.toFixed(1)),
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions.map((q) => ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || "",
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// get interviews 
export const getMyInterviews = async (req, res) => {
  try {
    const interview = await InterviewModel.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("role experience mode finalScore status createdAt")


    return res.status(200).json(interview)
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" })
  }
}


// get interview report 
export const getInterviewReport = async (req, res) => {
  try {
    const interview = await InterviewModel.findById(req.params.id)

    if (!interview) {
      return res.status(404).json({ message: "Interview not Found" })
    }



    const totalQuestions = interview.questions.length;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q) => {
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    });


    const avgConfidence = totalQuestions
      ? totalConfidence / totalQuestions
      : 0;

    const avgCommunication = totalQuestions
      ? totalCommunication / totalQuestions
      : 0;

    const avgCorrectness = totalQuestions
      ? totalCorrectness / totalQuestions
      : 0;

    return res.json({
      finalScore: interview.finalScore,
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" })
  }
}