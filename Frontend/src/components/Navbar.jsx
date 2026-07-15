import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRobot, FaUserAstronaut } from "react-icons/fa";
import { TbCoinBitcoin } from "react-icons/tb";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setuserData } from "../redux/userSlice";


const Navbar = () => {
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showCredits, setShowCredits] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const creditsRef = useRef(null);
    const profileRef = useRef(null);

    const toggleCredits = () => {
        setShowCredits((prev) => !prev);
        setShowProfile(false);
    };

    const toggleProfile = () => {
        setShowProfile((prev) => !prev);
        setShowCredits(false);
    };


    const navigationtoauth = () => {
        if (!userData) {
            navigate('/auth')
        }
    }

    const handleLogout = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND}/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            console.log(res.data.message);

            dispatch(setuserData(null))

            navigate("/auth");
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                creditsRef.current &&
                !creditsRef.current.contains(e.target)
            ) {
                setShowCredits(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);


    return (
        <motion.nav
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-lg"
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">

                <div
                    onClick={() => {
                        navigate("/")
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="flex cursor-pointer items-center gap-4"
                >
                    <motion.div
                        whileHover={{ scale: 1.08, rotate: 8 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-300"
                    >
                        <FaRobot size={22} />
                    </motion.div>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Mock Mate
                        </h1>

                        <p className="text-xs text-gray-500">
                            AI Interview Platform
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-5">

                    <div className="relative" ref={creditsRef}>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                toggleCredits()
                                navigationtoauth()
                            }}
                            className="flex cursor-pointer items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-5 py-2.5 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200"
                        >
                            <TbCoinBitcoin className="text-xl" />

                            <span className="font-semibold">
                                {userData?.credits || 0}
                            </span>

                            <ChevronDown
                                size={17}
                                className={`transition-transform duration-300 mt-0.5 ${showCredits ? "rotate-180" : ""
                                    }`}
                            />
                        </motion.button>

                        <AnimatePresence>
                            {showCredits && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -15,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -15,
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        duration: 0.22,
                                    }}
                                    className="absolute right-0 mt-4 w-72 rounded-2xl border bg-white p-5 shadow-2xl"
                                >
                                    <h3 className="text-lg font-semibold">
                                        Need More Credits?
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Purchase interview credits and continue
                                        practicing without interruption.
                                    </p>

                                    <motion.button
                                        onClick={() => {
                                            navigate("/buycredit")
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="mt-5 w-full cursor-pointer rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                                    >
                                        Buy Credits
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="relative" ref={profileRef}>
                        <motion.button
                            whileHover={{
                                scale: 1.08
                            }}
                            whileTap={{
                                scale: 0.96,
                            }}
                            onClick={toggleProfile}
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                        >
                            {userData?.name ? (
                                userData.name.charAt(0).toUpperCase()
                            ) : (
                                <FaUserAstronaut />
                            )}
                        </motion.button>

                        <AnimatePresence>
                            {showProfile && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -15,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -15,
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        duration: 0.22,
                                    }}
                                    className="absolute right-0 mt-4 w-72 rounded-2xl border bg-white p-5 shadow-2xl"
                                >
                                    <div className="mb-4">
                                        <h2 className="text-lg font-semibold">
                                            {userData?.name || "Guest"}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {userData?.email}
                                        </p>
                                    </div>

                                    <hr />

                                    <div className="mt-4 flex flex-col gap-2">
                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            className="cursor-pointer rounded-xl p-3 text-left transition hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            className="cursor-pointer rounded-xl p-3 text-left transition hover:bg-gray-100"
                                        >
                                            Interview History
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            className="cursor-pointer rounded-xl p-3 text-left transition hover:bg-gray-100"
                                        >
                                            Settings
                                        </motion.button>

                                        {userData ? (
                                            <motion.button
                                                whileHover={{ scale: 1.02, x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleLogout}
                                                className="cursor-pointer rounded-xl p-3 text-left font-medium text-red-600  hover:bg-gray-100 transition"
                                            >
                                                Logout
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.02, x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() =>
                                                    navigate("/auth")
                                                }
                                                className="cursor-pointer rounded-xl p-3 text-left font-medium  hover:bg-gray-100 text-violet-500 transition"
                                            >
                                                Login
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;