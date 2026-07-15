import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setuserData } from '../redux/userSlice'


const Step1 = ({ onStart }) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("");
  const [resumetext, setResumeText] = useState("");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [resume, setResume] = useState(null);

  const [loading, setloading] = useState(false)
  const [loading2, setloading2] = useState(false)

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!role || !experience || !mode) {
      return toast.error("All fields are Required");
    }

    setloading2(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/interview/generate-questions`, { role, experience, mode, resumetext, projects, skills }, { withCredentials: true })
      console.log(res.data)
      setloading2(false)

      if (userData) {
        dispatch(setuserData({ ...userData, credits: res.data.creditsLeft }))
      }

      onStart(res.data)

      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
      setloading2(false)
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  }

  const handleuploadresume = async (e) => {
    e.preventDefault();

    setloading(true)

    if (!resume) {
      setloading(false)
      toast.error("Please Upload your Resume")
      return;
    }

    const formdata = new FormData();
    formdata.append("resume", resume);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/interview/resume`,
        formdata,
        {
          withCredentials: true,
        }
      );

      setRole(res.data.role)
      setExperience(res.data.experience)

      setResumeText(res.data.resumetext);
      setProjects(res.data.projects);
      setSkills(res.data.skills);

      console.log(res.data);
      setloading(false)
    } catch (error) {
      console.log(error.response?.data || error);
      setloading(false)
    }
  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-7xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden bg-white grid lg:grid-cols-2">

        <div className="relative bg-gradient-to-br from-green-600 to-emerald-500 text-white p-10 lg:p-14 flex flex-col justify-between">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-semibold">
              🚀 AI Powered Interview Platform
            </div>

            <h1 className="text-5xl font-black mt-8 leading-tight">
              Mock
              <br />
              Mate
            </h1>

            <p className="mt-6 text-green-100 text-lg leading-8 max-w-md">
              Prepare for technical and HR interviews with realistic AI
              interview sessions. Upload your resume and let Mock Mate create
              personalized interview questions.
            </p>
          </div>

          <div className="space-y-5 mt-16">

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Resume Based Questions
                </h3>
                <p className="text-green-100 text-sm">
                  AI analyzes your resume before starting.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                💬
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  HR & Technical Modes
                </h3>
                <p className="text-green-100 text-sm">
                  Practice according to your interview type.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                ⚡
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Instant AI Feedback
                </h3>
                <p className="text-green-100 text-sm">
                  Improve your confidence with every interview.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-white p-8 md:p-12 flex items-center">

          <form
            className="w-full space-y-7"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                Setup Interview
              </h2>

              <p className="text-gray-500 mt-3">
                Fill in your interview details to begin your AI interview.
              </p>
            </div>



            <div>
              <label className="text-sm font-semibold text-gray-700">
                Job Role
              </label>

              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Frontend Developer"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
              />
            </div>


            <div>
              <label className="text-sm font-semibold text-gray-700">
                Experience
              </label>

              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Fresher / 2 Years"
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
              />
            </div>


            <div>
              <label className="text-sm font-semibold text-gray-700">
                Interview Type
              </label>

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition"
              >
                <option value="">Select Interview</option>
                <option value="Technical">Technical Interview</option>
                <option value="HR">HR Interview</option>
              </select>
            </div>


            <div>
              <label className="text-sm font-semibold text-gray-700">
                Upload Resume (PDF)
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="mt-2 block w-full rounded-2xl border border-dashed border-green-400 bg-green-50 p-4 file:mr-5 file:rounded-xl file:border-0 file:bg-green-600 file:px-5 file:py-2 file:text-white file:cursor-pointer hover:file:bg-green-700"
              />
            </div>


            <button
              type="submit"
              onClick={handleuploadresume}
              className="w-full rounded-2xl bg-green-400 cursor-pointer py-4 text-lg font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 hover:scale-[1.01] active:scale-100"
            >
              {loading ? "Analyzing Resume..." : "Analyze Resume"}
            </button>
            <button
              onClick={handlesubmit}
              className="w-full rounded-2xl bg-green-600 cursor-pointer py-4 text-lg font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 hover:scale-[1.01] active:scale-100"
            >
              {loading2 ? "Starting Interview..." : "Start Interview →"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Step1;