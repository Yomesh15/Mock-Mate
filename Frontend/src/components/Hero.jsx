import React from "react";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()

  const { userData } = useSelector((state) => state.user)

  const navigatetoauth = () => {
    if (!userData) {
      navigate("/auth")
    }

    if(userData){
      window.scrollTo({top:0, behavior: 'smooth'})
      navigate("/interview")
    }
  }
  const navigatetoauth2 = () => {
    if (!userData) {
      navigate("/auth")
    }

    if(userData){
      window.scrollTo({top:0, behavior: 'smooth'})
      navigate("/history")
    }
  }
  return (
    <section className="min-h-[90vh] bg-white flex items-center justify-center px-6 mt-10 mb-10">
      <div className="max-w-6xl mx-auto text-center">

        <motion.div
          // initial={{ opacity: 0, y: -20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.6 }}
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full px-5 py-2 shadow-sm"
        >
          <BsStars className="text-green-500 text-lg" />
          <p className="text-sm md:text-base font-medium text-gray-700">
            AI Powered Smart Interview Platform by{" "}
            <span className="text-green-500 font-semibold">
              Mock Mate
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            Practice Interview With
          </h1>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mt-2">
            Artificial Intelligence
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-gray-500 text-base sm:text-lg leading-8">
            Master technical interviews with AI-powered mock sessions,
            personalized feedback, coding challenges, and real interview
            simulations designed to boost your confidence and land your dream
            job.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigatetoauth}
            className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-green-200 transition-all duration-300"
          >
            Start Interview
          </motion.button>

          <motion.button
            onClick={navigatetoauth2}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-gray-300 cursor-pointer hover:border-green-500 hover:text-green-500 text-gray-700 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
          >
            View History
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            ["10K+", "Interviews"],
            ["95%", "Success Rate"],
            ["24/7", "AI Available"],
            ["100+", "Companies"],
          ].map(([value, label], index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-3xl font-bold text-green-500">{value}</h2>
              <p className="text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;