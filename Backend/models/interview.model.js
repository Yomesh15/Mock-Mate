import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
    question:String,
    difficulty:String,
    timeLimit:Number,
    answer:String,
    feedback:String,

    score:{
        type:Number,
        default:0
    },
    confidence:{
        type:Number,
        default:0
    },
    communication:{
        type:Number,
        default:0
    },
    correctness:{
        type:Number,
        default:0
    }
})


const InterviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    role:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    mode:{
        type:String,
        enum:["HR","Technical"]
    },
    resumetext:{
        type:String
    },

    questions:[QuestionSchema],

    finalScore:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:["incompleted", "completed"],
        default:"incompleted"
    }

},{timestamps:true})


const InterviewModel = mongoose.model("Interview", InterviewSchema)
export default InterviewModel