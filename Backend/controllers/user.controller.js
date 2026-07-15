import UserModel from "../models/user.model.js";


export const CurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error" })
    }
}