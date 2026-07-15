import React from "react";
import {
  BsRobot,
  BsPersonWorkspace,
  BsMic,
  BsBarChart,
} from "react-icons/bs";

const steps = [
  {
    id: 1,
    icon: <BsPersonWorkspace />,
    title: "Choose Your Role",
    description:
      "Select the job role and experience level you want to practice for.",
  },
  {
    id: 2,
    icon: <BsRobot />,
    title: "AI Takes Interview",
    description:
      "Our AI interviewer asks realistic technical and HR interview questions.",
  },
  {
    id: 3,
    icon: <BsMic />,
    title: "Answer Naturally",
    description:
      "Speak or type your answers just like in a real interview environment.",
  },
  {
    id: 4,
    icon: <BsBarChart />,
    title: "Get AI Feedback",
    description:
      "Receive detailed feedback, scores, strengths, and improvement tips.",
  },
];

const Steps = () => {
  return (
    <section className="bg-white px-6 mb-5">
      <div className="max-w-7xl mx-auto">
 
        <div className="text-center mb-16">
          <span className="inline-block px-4 mt-[-9px] py-3 mb-2 rounded-full bg-green-50 text-green-600 font-semibold text-sm">
            How It Works
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-5">
            Get Interview Ready in
            <span className="text-green-500"> 4 Simple Steps</span>
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-lg">
            Mock Mate helps you prepare for technical and HR interviews using
            Artificial Intelligence with instant feedback and performance
            analysis.
          </p>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-green-500 hover:shadow-xl transition-all duration-300"
            > 

              <span className="text-sm font-semibold text-green-500">
                Step {step.id}
              </span>
 
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-3xl text-green-500 mt-5 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
 
              <h3 className="text-2xl font-bold text-gray-900 mt-6">
                {step.title}
              </h3>
 
              <p className="text-gray-500 mt-4 leading-7">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Steps;