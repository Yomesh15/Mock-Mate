import React from "react";
import Navbar from "../components/Navbar"

const Step3 = ({ report }) => {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Generating Interview Report...
          </p>
        </div>
      </div>
    );
  }

  const {
    finalScore,
    confidence,
    communication,
    correctness,
    questionWiseScore,
  } = report;

  const getPercent = (value) => (value / 2) * 100;

  return (
    <>
<Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              🎉 Interview Report
            </h1>

            <p className="mt-3 text-emerald-100 text-lg ml-5">
              Here is your AI Interview Performance Report (MOCK MATE)
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-gray-500 text-sm">Final Score</h3>
              <p className="text-5xl font-bold text-emerald-600 mt-3">
                {finalScore}/2
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-gray-500 text-sm">Confidence</h3>
              <p className="text-5xl font-bold text-blue-600 mt-3">
                {confidence}/2
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-gray-500 text-sm">Communication</h3>
              <p className="text-5xl font-bold text-orange-500 mt-3">
                {communication}/2
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-gray-500 text-sm">Correctness</h3>
              <p className="text-5xl font-bold text-purple-600 mt-3">
                {correctness}/2
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-emerald-700 mb-8">
              Overall Performance
            </h2>

            {[
              {
                title: "Final Score",
                value: finalScore,
                color: "bg-emerald-500",
              },
              {
                title: "Confidence",
                value: confidence,
                color: "bg-blue-500",
              },
              {
                title: "Communication",
                value: communication,
                color: "bg-orange-500",
              },
              {
                title: "Correctness",
                value: correctness,
                color: "bg-purple-500",
              },
            ].map((item) => (
              <div key={item.title} className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-700">
                    {item.title}
                  </span>
                  <span className="font-bold">{item.value}/2</span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${getPercent(item.value)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
            <h2 className="text-2xl font-bold text-emerald-700 mb-6">
              Question Wise Report
            </h2>

            <div className="space-y-6">
              {questionWiseScore?.map((item, index) => (
                <div
                  key={index}
                  className="border border-emerald-100 rounded-xl p-5 bg-emerald-50"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <h3 className="font-bold text-lg text-gray-800">
                      Question {index + 1}
                    </h3>

                    <span className="bg-emerald-600 text-white px-4 py-1 rounded-full font-semibold">
                      Score: {item.score}/2
                    </span>
                  </div>

                  {item.question && (
                    <p className="mt-4 text-gray-700">
                      <span className="font-semibold">Question:</span>{" "}
                      {item.question}
                    </p>
                  )}

                  <div className="mt-4">
                    <p className="font-semibold text-emerald-700 mb-2">
                      AI Feedback
                    </p>

                    <p className="text-gray-700 leading-7">
                      {item.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mt-8 text-center text-white shadow-xl">
            <h2 className="text-2xl font-bold">
              🚀 Keep Practicing with Mock Mate
            </h2>

            <p className="mt-3 text-emerald-100">
              Every interview makes you stronger. Practice consistently to improve
              your confidence and interview skills.
            </p>

            <button
              onClick={() => { window.location.reload(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="mt-6 px-8 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Take Another Interview
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;