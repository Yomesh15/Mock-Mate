import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setuserData } from './redux/userSlice'
import History from './pages/History'
import Report from './pages/Report'
import BuyCredit from './pages/BuyCredit'
import Protect from './protect/Protect'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/user/current-user`,
          { withCredentials: true }
        );

        dispatch(setuserData(res.data.user));
      } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Message:", error.message);

        dispatch(setuserData(null));
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={
        <Protect>
          <InterviewPage />
        </Protect>
      } />
      <Route path='/history' element={
        <Protect>
          <History />
        </Protect>
      } />
      <Route path='/report/:id' element={
        <Protect>
          <Report />
        </Protect>
      } />
      <Route path='/buycredit' element={
        <Protect>
          <BuyCredit />
        </Protect>
      } />

    </Routes>

  )
}

export default App