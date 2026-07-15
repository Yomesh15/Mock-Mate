import express from "express"
import { GoogleAuth, Logout } from "../controllers/auth.controller.js"

const auth_router = express.Router()


auth_router.post("/google", GoogleAuth)

auth_router.post("/logout", Logout)


export default auth_router
