import React, { useState } from 'react'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3 from '../components/Step3'

const InterviewPage = () => {
    const [step,setstep] = useState(1)
    const [interviewData, setinterviewData] = useState(null)

  return (
    <div>
        {
            step === 1 && (
                <Step1 onStart={(d)=>{
                    setinterviewData(d)
                    setstep(2)
                }}/>
            )
        }
        {
            step === 2 && (
                <Step2 interviewData={interviewData} onFinish={(r)=>{
                    setinterviewData(r)
                    setstep(3)
                }}/>
            )
        }
        {
            step === 3 && (
                <Step3 report={interviewData}/>
            )
        }
    </div>
  )
}

export default InterviewPage