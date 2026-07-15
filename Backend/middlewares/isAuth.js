import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"


const isAuth = async (req ,res ,next)=>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(400).json({message:"Unauthorized", success:false})
        }
        
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        
        if(!decoded){
            return res.status(400).json({message:"Invalid Token", success:false})
        }

        const user = await UserModel.findById(decoded.id)

        req.user = user

        next()


    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error", success:false})
    }
}

export default isAuth