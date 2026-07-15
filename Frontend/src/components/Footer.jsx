import React from "react";
import { Link } from "react-router-dom";
import {
    BsGithub,
    BsLinkedin,
    BsTwitterX,
    BsEnvelope,
    BsArrowUpRight,
} from "react-icons/bs";
import { motion } from "framer-motion"

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

                    <div className="lg:col-span-2">

                        <Link to="/" className="flex items-center gap-3 w-fit">
                            <motion.div whileHover={{rotate:15}} transition={{duration:0.3}} className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                M
                            </motion.div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Mock Mate
                                </h1>

                                <p className="text-sm text-gray-500">
                                    AI Powered Interview Platform
                                </p>
                            </div>
                        </Link>

                        <p className="mt-6 text-gray-500 leading-8 max-w-md">
                            Prepare smarter with AI-powered mock interviews, confidence
                            analysis, instant feedback, technical assessments and role-based
                            interview practice to boost your placement success.
                        </p>

                        <div className="flex items-center gap-4 mt-8">

                            <Link
                                to="/"
                                className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white hover:border-green-500 hover:-translate-y-1 transition-all duration-300"
                            >
                                <BsGithub size={18} />
                            </Link>

                            <Link
                                to="/"
                                className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white hover:border-green-500 hover:-translate-y-1 transition-all duration-300"
                            >
                                <BsLinkedin size={18} />
                            </Link>

                            <Link
                                to="/"
                                className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white hover:border-green-500 hover:-translate-y-1 transition-all duration-300"
                            >
                                <BsTwitterX size={18} />
                            </Link>

                            <Link
                                to="/"
                                className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-green-500 hover:text-white hover:border-green-500 hover:-translate-y-1 transition-all duration-300"
                            >
                                <BsEnvelope size={18} />
                            </Link>

                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-6">
                            Quick Links
                        </h2>

                        <div className="flex flex-col gap-4">

                            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                                <BsArrowUpRight />
                                Home
                            </Link>

                            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                                <BsArrowUpRight />
                                Interview
                            </Link>

                            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                                <BsArrowUpRight />
                                History
                            </Link>

                            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                                <BsArrowUpRight />
                                Dashboard
                            </Link>

                            <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition">
                                <BsArrowUpRight />
                                About
                            </Link>

                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-6">
                            Features
                        </h2>

                        <div className="flex flex-col gap-4">

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                AI Interview
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Voice Interview
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Technical Interview
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Confidence Detection
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Performance Report
                            </Link>

                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-6">
                            Support
                        </h2>

                        <div className="flex flex-col gap-4">

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Help Center
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Contact Us
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Privacy Policy
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                Terms & Conditions
                            </Link>

                            <Link to="/" className="text-gray-500 hover:text-green-600 transition">
                                FAQs
                            </Link>

                        </div>
                    </div>

                </div>

                <div className="my-12 h-px w-full bg-gray-200"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-5">

                    <p className="text-sm text-center md:text-left text-gray-500">
                        © {new Date().getFullYear()} Mock Mate. All Rights Reserved.
                    </p>

                    <p className="text-sm text-center md:text-right text-gray-500">
                        Designed & Developed with ❤️ by{" "}
                        <span className="font-semibold text-green-600">
                            Yomesh Nagar
                        </span>
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;