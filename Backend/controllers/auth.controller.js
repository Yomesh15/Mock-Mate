import UserModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const GoogleAuth = async (req, res) => {
    try {
        const { name, email } = req.body

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name,
                email,
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: `Welcome ${user.name}`, success: true, token, user })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json({ message: "Logout Successfully", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}