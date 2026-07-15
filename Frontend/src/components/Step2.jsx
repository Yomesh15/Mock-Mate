import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";


const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);
const CameraOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1l22 22" /><path d="M21 21H3a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2h4l1 1" /><path d="M23 7l-7 5" />
  </svg>
);
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);
const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const SpinnerIcon = () => (
  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
);


const formatTime = (s) => {
  if (s >= 60) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  }
  return `${s}s`;
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";


const Step2 = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [isLoadingNextQuestion, setIsLoadingNextQuestion] = useState(false);

  const isAnswerSubmitting = useRef(false);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const [cameraOn, setCameraOn] = useState(true);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef(null);
  const textareaRef = useRef(null);
  const userVideoRef = useRef(null);
  const streamRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const maleVideo = "/videos/female-ai.mp4";
  const femaleVideo = "/videos/female-ai.mp4";

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isAIPlaying) {
      const playPromise = v.play();
      if (playPromise?.catch) playPromise.catch(() => { });
    } else {
      v.pause();
    }
  }, [isAIPlaying, videoSource]);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (userVideoRef.current) userVideoRef.current.srcObject = stream;
        setCameraError(false);
      } catch (err) {
        console.log(err);
        setCameraError(true);
      }
    };

    if (cameraOn) {
      start();
    } else if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    return () => {
      cancelled = true;
    };
  }, [cameraOn]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text.replace(/,/g, ", ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.volume = 1;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsAIPlaying(true);
      };

      utterance.onend = () => {
        setIsAIPlaying(false);
        textareaRef.current?.focus();
        resolve();
      };

      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) return;

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hii ${userName} Welcome to Mock Mate, I hope you are feeling confident`
        );

        await speakText(
          `I will ask you some questions . just answer naturally and dont fear of anyone its Mate`
        );

        await speakText(`Let's begin Mate `);

        setIsIntroPhase(false);

        if (currentIndex === questions.length - 1) {
          await speakText(
            `Let's end up with this last question , this one might be a little big more challenging`
          );
        }

        await speakText(currentQuestion.question);
      }
    };

    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  const submitCurrentAnswer = async () => {
    if (isAnswerSubmitting.current) return;

    isAnswerSubmitting.current = true;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/interview/submit-answer`,
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      );

      if (res.data?.feedback) {
        setFeedback(res.data.feedback);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isAnswerSubmitting.current = false;
    }
  };

  const [isMovingNext, setIsMovingNext] = useState(false);

  const handlenext = async () => {
    if (currentIndex + 1 >= questions.length) return;

    setIsMovingNext(true);
    setIsLoadingNextQuestion(true);

    try {
      await submitCurrentAnswer();

      setFeedback("");
      setAnswer("");

      await speakText("Alright Mate, Let's move to the next question.");

      setCurrentIndex((prev) => prev + 1);
    } finally {
      setIsMovingNext(false);
    }
  };

  useEffect(() => {
    if (isIntroPhase || currentIndex === 0) return;

    const askQuestion = async () => {
      if (currentIndex === questions.length - 1) {
        await speakText(
          "Let's end with the final question. It may be a little more challenging."
        );
      }

      await speakText(currentQuestion.question);

      setIsLoadingNextQuestion(false);
    };

    askQuestion();
  }, [currentIndex, isIntroPhase]);

  useEffect(() => {
    if (isIntroPhase) return;

    setTimeLeft(currentQuestion.timeLimit);
  }, [currentIndex, isIntroPhase]);

  useEffect(() => {
    if (isIntroPhase || isAIPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, isAIPlaying, currentIndex]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    if (currentIndex === questions.length - 1) {
      submitanswer();
    } else {
      handlenext();
    }
  }, [timeLeft, currentIndex]);

  const finishInterview = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/interview/finish`,
        { interviewId },
        { withCredentials: true }
      );

      onFinish(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitanswer = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/interview/submit-answer`,
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      );

      setFeedback(res.data.feedback);

      await speakText(res.data.feedback);

      await finishInterview();

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timePercent = currentQuestion?.timeLimit
    ? (timeLeft / currentQuestion.timeLimit) * 100
    : 0;

  const timerTone =
    timePercent <= 20 ? "danger" : timePercent <= 50 ? "warn" : "safe";

  const timerBadgeClasses =
    timerTone === "danger"
      ? "bg-[#FDECEC] text-[#DC2626]"
      : timerTone === "warn"
        ? "bg-[#FFF3DE] text-[#B7791F]"
        : "bg-[#E9F7EF] text-[#16A34A]";

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const initials = getInitials(userName);
  const isBusy = isMovingNext || isLoadingNextQuestion || isAIPlaying;

  return (
    <div
      className="min-h-screen bg-[#EEF1F6] px-3 sm:px-6 py-4 sm:py-8"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes speakingRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,84,209,0.45); }
          50% { box-shadow: 0 0 0 10px rgba(52,84,209,0); }
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mm-speaking-ring, .mm-live-dot { animation: none !important; }
        }
        .mm-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
        .mm-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0E17] flex items-center justify-center shrink-0">
              <span className="mm-display text-white font-bold text-sm">M</span>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#8A93A3] font-semibold">
                Mock Mate · Live Interview
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#1E2433]">
                {userName}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            {questions.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex
                    ? "w-8 bg-[#3454D1]"
                    : i < currentIndex
                      ? "w-4 bg-[#3454D1]/40"
                      : "w-4 bg-[#3454D1]/15"
                  }`}
              />
            ))}
          </div>

          <div
            className={`mm-mono font-semibold text-sm px-3.5 py-1.5 rounded-lg tabular-nums flex items-center gap-1.5 ${timerBadgeClasses}`}
          >
            <ClockIcon />
            {formatTime(timeLeft)}
          </div>
        </header>

        <div className="grid lg:grid-cols-[1.55fr_1fr] gap-5 sm:gap-6 items-start">
          {/* ===== Stage column (video call look) ===== */}
          <div>
            <div className="relative rounded-3xl bg-[#0B0E17] p-2 sm:p-3 shadow-xl">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0B0E17]">
                <div
                  className={`w-full h-full rounded-2xl ${isAIPlaying ? "mm-speaking-ring" : ""
                    }`}
                  style={
                    isAIPlaying
                      ? { animation: "speakingRing 1.6s ease-in-out infinite" }
                      : undefined
                  }
                >
                  <video
                    ref={videoRef}
                    src={videoSource}
                    key={videoSource}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/45 backdrop-blur px-2.5 py-1 rounded-full">
                  <span
                    className="mm-live-dot w-1.5 h-1.5 rounded-full bg-[#EF4444]"
                    style={{ animation: "livePulse 2s ease-in-out infinite" }}
                  />
                  <span className="text-white text-[10px] sm:text-[11px] font-semibold tracking-wide">
                    LIVE
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-20 bg-black/45 backdrop-blur px-2.5 py-1 rounded-full">
                  <span className="mm-mono text-white/85 text-[10px] sm:text-[11px]">
                    Q{currentIndex + 1}/{questions.length}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-4 sm:px-5 pt-10 pb-3 sm:pb-4">
                  <p
                    className="text-white text-xs sm:text-sm font-medium leading-relaxed line-clamp-3"
                    aria-live="polite"
                  >
                    {subtitle || "Your AI interviewer is getting ready…"}
                  </p>
                  {isAIPlaying && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-wider">
                        Speaking
                      </span>
                      <span className="flex gap-0.5 items-end h-3">
                        <span className="w-[3px] h-2 bg-[#5B7BF0] rounded-full animate-bounce [animation-delay:-0.2s]" />
                        <span className="w-[3px] h-3 bg-[#5B7BF0] rounded-full animate-bounce [animation-delay:-0.1s]" />
                        <span className="w-[3px] h-1.5 bg-[#5B7BF0] rounded-full animate-bounce" />
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 w-[84px] h-[62px] sm:w-[140px] sm:h-[100px] rounded-xl overflow-hidden border-2 border-white/15 shadow-lg bg-[#1B2030]">
                  {cameraOn && !cameraError ? (
                    <video
                      ref={userVideoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="mm-display text-white/70 text-xs sm:text-sm font-semibold">
                        {initials}
                      </span>
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 text-[8px] sm:text-[9px] text-white/85 bg-black/40 px-1.5 py-0.5 rounded font-medium">
                    You
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setCameraOn((c) => !c)}
                title={cameraOn ? "Turn camera off" : "Turn camera on"}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0B0E17] hover:bg-[#1B2030] flex items-center justify-center text-white transition-colors"
              >
                {cameraOn ? <CameraIcon /> : <CameraOffIcon />}
              </button>

              <button
                onClick={() => speakText(currentQuestion?.question)}
                disabled={isAIPlaying}
                className="px-5 h-10 sm:h-11 rounded-full bg-[#0B0E17] hover:bg-[#1B2030] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium flex items-center gap-2 transition-colors"
              >
                {isAIPlaying ? <SpinnerIcon /> : <PlayIcon />}
                {isAIPlaying ? "Speaking…" : "Replay question"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#E4E7EE] p-4 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-[#3454D1]">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span
                className={`mm-mono px-2.5 py-1 rounded-full text-xs font-semibold tabular-nums ${timerBadgeClasses}`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="rounded-xl bg-[#F5F6FA] border border-[#E4E7EE] p-4 mb-4 sm:mb-5">
              <p className="mm-display text-[#1E2433] text-base sm:text-lg leading-7">
                {currentQuestion?.question}
              </p>
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-[#1E2433] font-semibold mb-2 text-sm">
                Your answer
              </label>

              <textarea
                ref={textareaRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isAIPlaying}
                rows={8}
                placeholder={
                  isAIPlaying
                    ? "Please wait for the AI interviewer to finish…"
                    : "Type your answer here…"
                }
                className="w-full flex-1 min-h-[150px] sm:min-h-[180px] border border-[#E4E7EE] rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#3454D1] focus:border-transparent resize-none disabled:bg-[#F7F8FA] disabled:cursor-not-allowed text-sm sm:text-base transition-all"
              />

              <p className="mm-mono text-xs text-[#8A93A3] mt-1.5 text-right">
                {wordCount} words
              </p>
            </div>

            {feedback && (
              <div className="mt-4 sm:mt-5 bg-[#FFF8EC] border border-[#F5D9A8] rounded-xl p-4">
                <h3 className="font-semibold text-[#946200] mb-1.5 text-sm">
                  AI Feedback
                </h3>
                <p className="text-[#5B6472] text-sm leading-relaxed">
                  {feedback}
                </p>
              </div>
            )}

            <div className="mt-5 sm:mt-6">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handlenext}
                  disabled={isBusy}
                  className="w-full px-6 py-3 rounded-xl bg-[#3454D1] hover:bg-[#2943B0] active:scale-[0.99] disabled:bg-[#C7CEDB] disabled:cursor-not-allowed text-white font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isBusy ? (
                    <>
                      <SpinnerIcon />
                      Loading next question…
                    </>
                  ) : (
                    <>
                      Next question <ChevronIcon />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={submitanswer}
                  disabled={isSubmitting || isAIPlaying}
                  className="w-full px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-[#128A3E] active:scale-[0.99] disabled:bg-[#C7CEDB] disabled:cursor-not-allowed text-white font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerIcon />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Finish interview <CheckIcon />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
