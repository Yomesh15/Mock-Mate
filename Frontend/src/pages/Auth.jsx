import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, provider } from '../utils/firebase';
import { FcGoogle } from "react-icons/fc";
import { FaRobot } from "react-icons/fa";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userSlice';


const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const res = await signInWithPopup(auth, provider)

            const name = res.user.displayName
            const email = res.user.email

            const result = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/google`, { name, email }, { withCredentials: true, })

            dispatch(setuserData(result.data.user))


            if (result.data.success) {
                localStorage.setItem("user", JSON.stringify(result.data.user));
                toast.success("Welcome Mate ");
                navigate("/")
            }
        } catch (error) {
            toast.error("Authentication Failed ")
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-5">

            <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
                <div className="flex justify-center">
                    <div className="h-20 w-20 rounded-2xl bg-black flex items-center justify-center">
                        <FaRobot className="text-white text-4xl" />
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <h1 className="text-4xl font-extrabold text-black">
                        Mock <span className="text-gray-600">Mate</span>
                    </h1>

                    <p className="mt-3 text-gray-600 text-sm leading-6">
                        Your AI Interview Partner.
                        <br />
                        Practice smarter. Get hired faster.
                    </p>
                </div>

                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{
                        scale: 1.04,
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="mt-10 w-full cursor-pointer flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3.5 font-semibold text-black hover:bg-black hover:text-white duration-300"
                >
                    <FcGoogle className="text-2xl" />
                    Continue with Google
                </motion.button>


                <p className="mt-8 text-center text-xs text-gray-500">
                    Secure authentication powered by Mock Mate
                </p>

            </div>
        </div>
    );
}

export default Auth