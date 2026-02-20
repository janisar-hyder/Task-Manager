import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LayoutList, Zap, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Softer spring for an even more luxurious, buttery scroll
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 15,
        restDelta: 0.001
    });

    // 1. Hero 
    const heroOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 0.5, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.95]);
    const heroY = useTransform(smoothProgress, [0, 0.25], [0, -50]);

    // 2. Features (Enters 0.15, peaks 0.35 - 0.5, exits 0.6)
    const featuresY = useTransform(smoothProgress, [0.15, 0.35, 0.5, 0.6], ["100vh", "0vh", "0vh", "-20vh"]);
    const featuresOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.5, 0.55], [0, 1, 1, 0]);
    const featuresScale = useTransform(smoothProgress, [0.15, 0.35, 0.5, 0.6], [0.9, 1, 1, 0.95]);

    // 3. Why Us (Enters 0.45, peaks 0.65 - 0.8, exits 0.9)
    const whyUsY = useTransform(smoothProgress, [0.45, 0.65, 0.8, 0.9], ["100vh", "0vh", "0vh", "-20vh"]);
    const whyUsOpacity = useTransform(smoothProgress, [0.45, 0.6, 0.8, 0.85], [0, 1, 1, 0]);
    const whyUsScale = useTransform(smoothProgress, [0.45, 0.65, 0.8, 0.9], [0.9, 1, 1, 0.95]);

    // 4. CTA (Enters 0.75, peaks 0.95 - 1.0)
    const ctaY = useTransform(smoothProgress, [0.75, 0.95, 1], ["100vh", "0vh", "0vh"]);
    const ctaScale = useTransform(smoothProgress, [0.75, 0.95, 1], [0.9, 1, 1]);
    const ctaOpacity = useTransform(smoothProgress, [0.75, 0.9, 1], [0, 1, 1]);

    return (
        // Increase scroll area to 500vh to give more breathing room for animations
        <div ref={containerRef} className="h-[500vh] bg-[#030712] relative selection:bg-indigo-500/30">

            {/* 1. Hero Section (Base Layer - z-0) */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-0 bg-[#030712] px-4"
            >
                {/* Ultra smooth background glows */}
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-10000" />
                <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 font-medium text-sm mb-10 shadow-[0_0_30px_rgba(99,102,241,0.1)] backdrop-blur-xl"
                    >
                        <Sparkles size={16} className="text-indigo-400" />
                        <span className="tracking-wide">Perfecting the workflow</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[7rem] font-extrabold tracking-tighter text-white mb-8 leading-[1.05]"
                    >
                        Focus on work. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 drop-shadow-sm">
                            Not tools.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-14 font-light leading-relaxed tracking-wide"
                    >
                        Experience a powerfully simple task manager designed with obsessive attention to detail. Stop organizing and start doing.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link
                            to="/app"
                            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
                            <span className="relative flex items-center gap-3 text-lg tracking-wide">
                                Enter Workspace
                                <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={20} />
                            </span>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
                >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-[1px] h-16 bg-gradient-to-b from-slate-400 to-transparent"
                    />
                </motion.div>
            </motion.div>

            {/* 2. Features Section (Slides over Hero - z-10) */}
            <motion.div
                style={{ opacity: featuresOpacity, y: featuresY, scale: featuresScale }}
                className="fixed inset-0 w-full flex items-center justify-center z-10 pointer-events-none px-4 md:px-8"
            >
                <div className="bg-[#0b1121]/80 backdrop-blur-3xl border border-slate-800/60 p-10 md:p-20 rounded-[2.5rem] w-full max-w-7xl shadow-2xl shadow-black pointer-events-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Fluid execution.</h2>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">Everything you need to get work done, engineered perfectly without the bloat.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Instantly create, update, and sort your tasks without ever waiting for a deep reload. Speed is a feature." },
                            { icon: LayoutList, title: "Glassmorphic UI", desc: "A gorgeous interface that feels native and premium, designed with profound attention to typography and spacing." },
                            { icon: CheckCircle2, title: "Pure Satisfaction", desc: "Delightful micro-interactions make checking off your daily tasks feel incredibly rewarding and satisfying." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-slate-900/40 border border-slate-800/80 p-10 rounded-3xl hover:bg-slate-800/60 transition-colors duration-500 group">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                                    <feature.icon className="text-indigo-400" size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg font-light">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 3. Why Us Section (Slides over Features - z-20) */}
            <motion.div
                style={{ opacity: whyUsOpacity, y: whyUsY, scale: whyUsScale }}
                className="fixed inset-0 w-full flex items-center justify-center z-20 pointer-events-none px-4 md:px-8"
            >
                <div className="bg-white/95 backdrop-blur-3xl border border-slate-200 p-10 md:p-20 rounded-[2.5rem] w-full max-w-6xl shadow-[0_20px_80px_rgba(0,0,0,0.4)] pointer-events-auto overflow-hidden relative">
                    <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[150%] bg-gradient-to-bl from-indigo-100/50 via-white to-white rounded-full blur-[100px] pointer-events-none -z-10" />

                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1 space-y-10">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                                    Privacy <br /><span className="text-indigo-600">First.</span> Always.
                                </h2>
                                <p className="text-xl text-slate-600 leading-relaxed font-light">
                                    This application runs its persistence entirely locally. Your tasks, your data, your business. We don't store a single thing on external cloud databases.
                                </p>
                            </div>

                            <ul className="space-y-6">
                                {["Local JSON persistence", "No sign-up required", "Instant offline access"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xl font-medium text-slate-800">
                                        <div className="p-2 rounded-xl bg-emerald-100/80 text-emerald-600 border border-emerald-200/50">
                                            <Shield size={24} strokeWidth={2} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1 w-full relative">
                            {/* Stylized App representation */}
                            <div className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] p-8 shadow-2xl rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-700 ease-out">
                                <div className="flex gap-2.5 mb-8">
                                    <div className="w-3.5 h-3.5 rounded-full bg-rose-400 shadow-sm" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm" />
                                </div>
                                <div className="space-y-5">
                                    <div className="h-5 w-1/3 bg-slate-200 rounded-full mb-8" />
                                    <div className="h-20 w-full bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center px-6 gap-4">
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                                        <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="h-20 w-full bg-white border border-slate-100 rounded-2xl shadow-sm opacity-70 flex items-center px-6 gap-4">
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                                        <div className="h-3 w-2/3 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="h-20 w-full bg-white border border-slate-100 rounded-2xl shadow-sm opacity-40 flex items-center px-6 gap-4">
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                                        <div className="h-3 w-1/3 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 4. Final CTA Section (Slides over everything - z-30) */}
            <motion.div
                style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
                className="fixed inset-0 w-full flex items-center justify-center z-30 pointer-events-none px-4 md:px-8"
            >
                <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950 p-12 md:p-24 rounded-[3rem] w-full max-w-5xl shadow-[0_30px_100px_rgba(49,46,129,0.8)] pointer-events-auto text-center border border-indigo-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="bg-indigo-500/20 w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-10 border border-indigo-400/30 text-indigo-300"
                        >
                            <Zap size={40} strokeWidth={1.5} />
                        </motion.div>
                        <h2 className="text-5xl md:text-[5.5rem] font-extrabold text-white mb-8 tracking-tighter leading-none">
                            Ready to begin?
                        </h2>
                        <p className="text-2xl text-indigo-200/80 mb-14 max-w-2xl mx-auto font-light">
                            Join thousands of focused minds. Experience the ultimate frictionless workflow today.
                        </p>
                        <Link
                            to="/app"
                            className="inline-flex items-center justify-center px-14 py-6 text-xl font-bold text-indigo-950 bg-white rounded-full hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                        >
                            <span className="flex items-center gap-3">
                                Launch Application
                                <ChevronRight strokeWidth={2.5} size={22} />
                            </span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
