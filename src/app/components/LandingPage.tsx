"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const LandingPage = ({ stats }: { stats: { totalUsers: number; totalPosts: number; co2Offset: number } }) => {
  const [counters, setCounters] = useState({ users: 0, posts: 0, co2: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animated counter
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setCounters({
        users: Math.floor(stats.totalUsers * eased),
        posts: Math.floor(stats.totalPosts * eased),
        co2: parseFloat((stats.co2Offset * eased).toFixed(1)),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  const features = [
    {
      icon: "🌱",
      title: "Track Impact",
      desc: "Log sustainability actions and watch your campus footprint shrink in real-time.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: "🏆",
      title: "Compete & Earn",
      desc: "Climb leaderboards, earn achievement badges, and unlock rewards for going green.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: "🤝",
      title: "Build Community",
      desc: "Connect with fellow eco-warriors, share stories, and organize campus events.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      desc: "Visualize your personal and campus-wide sustainability data with rich analytics.",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-hidden relative -mx-4 md:-mx-8 -mt-0 px-4 md:px-8">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10px",
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              background: [
                "rgba(16, 185, 129, 0.4)",
                "rgba(6, 182, 212, 0.3)",
                "rgba(139, 92, 246, 0.3)",
                "rgba(251, 191, 36, 0.3)",
              ][i % 4],
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient Glow Orbs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl animate-float" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Powered by Next.js 15 &bull; Supabase &bull; Clerk
            </div>
          </div>

          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Make Your Campus
            <br />
            <span className="gradient-text">Cleaner Together</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            CleanQuest is the gamified social platform that transforms individual sustainability
            actions into a powerful collective campus movement. Track impact, earn badges, climb
            leaderboards.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Link
              href="/sign-up"
              className="group px-8 py-4 text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-[1.03] flex items-center gap-2"
            >
              Start Your Quest
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a
              href="#features"
              className="px-8 py-4 text-base font-semibold bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              See How It Works
            </a>
          </div>

          {/* Live Stats Counter */}
          <div
            id="stats"
            ref={statsRef}
            className={`grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm stat-glow-green">
              <div className="text-4xl font-black text-emerald-400">{counters.users}+</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">Active Users</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm stat-glow-blue">
              <div className="text-4xl font-black text-cyan-400">{counters.posts}+</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">Impact Actions</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm stat-glow-purple">
              <div className="text-4xl font-black text-violet-400">{counters.co2}kg</div>
              <div className="text-sm text-slate-400 mt-1 font-medium">CO₂ Offset</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text">Go Green</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            A complete platform built with modern web technologies for maximum campus impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-default"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-lg`}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            How <span className="gradient-text">CleanQuest</span> Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Post Your Action", desc: "Upload a photo and describe your sustainability contribution — cleaning a park, recycling, or organizing a drive.", icon: "📸" },
            { step: "02", title: "Earn Impact Points", desc: "Every action earns points. Our server-side system validates and awards points with daily caps to keep it fair.", icon: "⚡" },
            { step: "03", title: "Climb & Inspire", desc: "Rise through the leaderboard, unlock achievement badges, and inspire others to join the campus movement.", icon: "🚀" },
          ].map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center p-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl mb-6">
                {item.icon}
              </div>
              <div className="text-xs font-black text-emerald-500 tracking-[0.3em] uppercase mb-3">Step {item.step}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Built With Modern Tech</h2>
          <p className="text-slate-400 text-sm">Production-grade architecture for scale and performance</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Next.js 15",
            "React 19",
            "TypeScript",
            "Supabase (PostgreSQL)",
            "Clerk Auth",
            "Server Actions",
            "Zod Validation",
            "UploadThing",
            "Tailwind CSS",
            "PPR",
          ].map((tech, i) => (
            <div
              key={i}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 animate-pulse-glow">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Ready to Make an <span className="gradient-text">Impact</span>?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Join hundreds of students already transforming their campus through CleanQuest.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-10 py-4 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-[1.03]"
          >
            Join CleanQuest Today 🌿
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[8px] font-black">
              CQ
            </div>
            <span>© {new Date().getFullYear()} CleanQuest</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span>Next.js 15</span>
            <span>•</span>
            <span>Supabase</span>
            <span>•</span>
            <span>Clerk</span>
            <span>•</span>
            <span>Open Source</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
