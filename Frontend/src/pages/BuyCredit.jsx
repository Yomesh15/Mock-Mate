import React from "react";
import { Coins, Check, Star, ShieldCheck, Zap, Infinity } from "lucide-react";
import Navbar from "../components/Navbar"

const plans = [
    {
        credits: 50,
        price: 100,
        bonus: 0,
        badge: "Starter",
        popular: false,
    },
    {
        credits: 120,
        price: 200,
        bonus: 20,
        badge: "Most Popular",
        popular: true,
    },
    {
        credits: 350,
        price: 500,
        bonus: 100,
        badge: "Best Value",
        popular: false,
    },
    {
        credits: 800,
        price: 1000,
        bonus: 300,
        badge: "Premium",
        popular: false,
    },
];

const BuyCredits = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 px-5">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mx-auto shadow-xl">
                            <Coins className="text-white" size={50} />
                        </div>

                        <h1 className="text-5xl font-extrabold text-gray-800 mt-6">
                            Buy Credits
                        </h1>

                        <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
                            Purchase credits to unlock AI-powered mock interviews and improve
                            your interview skills with Mock Mate.
                        </p>
                    </div>

                    <div className="mt-12 bg-white rounded-3xl shadow-lg border border-emerald-100 p-8 flex flex-wrap justify-center gap-8">

                        <div className="flex items-center gap-3">
                            <Zap className="text-yellow-500" />
                            <span className="font-medium">Instant Credit Activation</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-emerald-600" />
                            <span className="font-medium">100% Secure Payments</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Infinity className="text-blue-600" />
                            <span className="font-medium">Credits Never Expire</span>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">

                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.popular
                                    ? "bg-gradient-to-br from-emerald-600 to-teal-600 text-white scale-105"
                                    : "bg-white border border-emerald-100 shadow-lg"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-yellow-400 text-gray-900 px-5 py-1 rounded-full font-bold text-sm flex items-center gap-1">
                                            <Star size={16} fill="currentColor" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center mb-6">
                                    <div
                                        className={`w-20 h-20 rounded-full flex items-center justify-center ${plan.popular
                                            ? "bg-white/20"
                                            : "bg-emerald-100"
                                            }`}
                                    >
                                        <Coins
                                            size={42}
                                            className={
                                                plan.popular ? "text-white" : "text-emerald-600"
                                            }
                                        />
                                    </div>
                                </div>

                                <h2 className="text-3xl font-bold text-center">
                                    {plan.credits}
                                </h2>

                                <p
                                    className={`text-center mt-2 ${plan.popular
                                        ? "text-emerald-100"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Credits
                                </p>

                                <div className="mt-8 text-center">
                                    <span className="text-5xl font-bold">
                                        ₹{plan.price}
                                    </span>
                                </div>

                                {plan.bonus > 0 && (
                                    <div
                                        className={`mt-4 text-center font-semibold ${plan.popular
                                            ? "text-yellow-300"
                                            : "text-emerald-600"
                                            }`}
                                    >
                                        + {plan.bonus} Bonus Credits 🎁
                                    </div>
                                )}

                                <div className="mt-8 space-y-4">

                                    <div className="flex items-center gap-3">
                                        <Check size={18} />
                                        <span>{plan.credits + plan.bonus} Total Credits</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Check size={18} />
                                        <span>Unlimited Validity</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Check size={18} />
                                        <span>AI Interview Access</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Check size={18} />
                                        <span>Detailed AI Reports</span>
                                    </div>

                                </div>

                                <button
                                    className={`w-full mt-10 py-3 rounded-xl cursor-pointer font-bold transition ${plan.popular
                                        ? "bg-white text-emerald-600 hover:bg-gray-100"
                                        : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90"
                                        }`}
                                >
                                    Buy Now
                                </button>
                            </div>
                        ))}

                    </div>

                    <div className="mt-20 bg-white rounded-3xl shadow-lg border border-emerald-100 p-10">

                        <h2 className="text-3xl font-bold text-center text-gray-800">
                            Frequently Asked Questions
                        </h2>

                        <div className="mt-10 grid md:grid-cols-2 gap-8">

                            <div>
                                <h3 className="font-bold text-lg">
                                    Do credits expire?
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    No. Once purchased, your credits remain in your account forever.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg">
                                    How quickly are credits added?
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Credits are added instantly after successful payment.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg">
                                    Which payment methods are supported?
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    UPI, Credit Card, Debit Card, Net Banking and Wallets.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg">
                                    Can I get a refund?
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    Refunds are handled according to our refund policy.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>
    );
};

export default BuyCredits;