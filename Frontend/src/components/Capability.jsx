import React from "react";
import {
    BsRobot,
    BsShieldCheck,
    BsMic,
    BsBarChart,
    BsStars,
    BsLightningCharge,
} from "react-icons/bs";

const capabilities = [
    {
        id: 1,
        icon: BsRobot,
        title: "AI Interviewer",
        description:
            "Practice realistic technical and HR interviews powered by Artificial Intelligence.",
    },
    {
        id: 2,
        icon: BsMic,
        title: "Voice Interaction",
        description:
            "Answer interview questions naturally using your voice or keyboard.",
    },
    {
        id: 3,
        icon: BsBarChart,
        title: "Performance Analysis",
        description:
            "Get detailed AI feedback, scores, and personalized improvement tips.",
    },
    {
        id: 4,
        icon: BsShieldCheck,
        title: "Role Specific",
        description:
            "Generate interview questions tailored to your chosen job role and experience.",
    },
    {
        id: 5,
        icon: BsStars,
        title: "Smart Suggestions",
        description:
            "Receive recommendations to improve confidence, communication, and technical skills.",
    },
    {
        id: 6,
        icon: BsLightningCharge,
        title: "Instant Results",
        description:
            "No waiting—your interview report is generated immediately after completion.",
    },
];

const Capability = () => {
    return (
        <section className="bg-white  px-6">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-20">
                    <span className="inline-block bg-green-50 mb-3 text-green-600 px-5 py-2 rounded-full text-sm font-semibold">
                        Mock Mate Capabilities
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
                        Everything You Need To
                        <span className="text-green-500"> Ace Your Interview</span>
                    </h2>

                    <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
                        Experience next-generation AI interview preparation with powerful
                        tools designed to improve your confidence and technical skills.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                className="group relative overflow-hidden rounded-[30px] border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-green-500 hover:shadow-2xl"
                            >

                                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-50 transition-all duration-500 group-hover:scale-125"></div>

                                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white text-3xl shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Icon />
                                </div>

                                <h3 className="relative z-10 mt-8 text-2xl font-bold text-gray-900">
                                    {item.title}
                                </h3>

                                <p className="relative z-10 mt-4 leading-7 text-gray-500">
                                    {item.description}
                                </p>

                                <div className="relative z-10 mt-8 h-1 w-14 rounded-full bg-green-500 transition-all duration-500 group-hover:w-full"></div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Capability;