import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Step3 from "../components/Step3";

const Report = () => {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/interview/report/${id}`,
        {
          withCredentials: true,
        }
      );

      setReport(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <Step3 report={report} />;
};

export default Report;