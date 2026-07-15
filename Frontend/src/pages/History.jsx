import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Briefcase, Award, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const History = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/interview/get-interview`,
                {
                    withCredentials: true,
                }
            );

            console.log(res);


            setInterviews(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 pt-15">
                <div className="max-w-6xl mx-auto">

                    <h1 className="text-4xl font-bold text-emerald-700 mb-8">
                        Interview History
                    </h1>

                    {interviews.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow p-12 text-center">
                            <h2 className="text-2xl font-semibold text-gray-700">
                                No Interviews Yet
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Start your first interview with Mock Mate.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {interviews.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between gap-6">

                                        <div className="space-y-3">

                                            <div className="flex items-center gap-2">
                                                <Briefcase className="text-emerald-600" size={20} />
                                                <span className="font-semibold">
                                                    {item.role}
                                                </span>
                                            </div>

                                            <p>
                                                <span className="font-semibold">
                                                    Experience:
                                                </span>{" "}
                                                {item.experience}
                                            </p>

                                            <p>
                                                <span className="font-semibold">
                                                    Mode:
                                                </span>{" "}
                                                {item.mode}
                                            </p>

                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar size={18} />
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end justify-between">

                                            <div className="flex items-center gap-2">
                                                <Award className="text-yellow-500" size={22} />
                                                <span className="text-3xl font-bold text-emerald-600">
                                                    {item.finalScore?.toFixed(1)}
                                                </span>
                                                <span>/10</span>
                                            </div>

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-semibold ${item.status === "completed"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    navigate(`/report/${item._id}`)
                                                }
                                                className="mt-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
                                            >
                                                <Eye size={18} />
                                                View Report
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </>
    );
};

export default History;