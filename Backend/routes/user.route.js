import express from "express"
import { CurrentUser } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"

const user_router = express.Router()


user_router.get("/current-user",isAuth, CurrentUser)


export default user_router