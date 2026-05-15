"use client";

import { Button } from "@/components/ui/button";
import {
  Stars,
  ShieldCheck,
  Cuboid,
  Palette,
  Rocket,
  FlaskRound,
  GamepadIcon,
  Users,
  Globe,
  Send,
  Bird,
  Video,
  MessageSquare,
  Gavel,
  Cog,
  Lock,
  ChartColumnIncreasing,
  Bolt,
  Menu,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const communities = [
    {
      icon: <Cuboid size={30} />,
      name: "Tech Shit",
    },
    {
      icon: <Palette size={30} />,
      name: "Fart & Design",
    },
    {
      icon: <Rocket size={30} />,
      name: "Space & Astrologies",
    },
    {
      icon: <FlaskRound size={30} />,
      name: "Science & Terrorism",
    },
    {
      icon: <GamepadIcon size={30} />,
      name: "Gaming & E-fuck",
    },
  ];

  const featuresTop = [
    {
      title: "Community Driven Feeds",
      description:
        "Empowering you to achieve your goals with flexible, reliable, and stress-free financing solutions.",
      image: "/images/landing-page/online-commune.jpg",
    },
    {
      title: "Good Moderation",
      description:
        "Affordable interest rates designed to fit your budget and save you more.",
      image: "/images/landing-page/moderation.jpg",
    },
    {
      title: "Secure Spaces",
      description:
        "No hidden fees, no surprises. Understand your loan terms from the start.",
      image: "/images/landing-page/safe.jpeg",
    },
  ];

  const featuresBottom = [
    {
      title: "Advanced Analytics",
      description:
        "Choose from personalized plans tailored to your needs, whether it's for personal, business, or home improvement.",
      image: "/images/landing-page/anal.jpg",
    },
    {
      title: "Lightning Fast Performance",
      description:
        "Our dedicated team is here to guide you at every step, anytime you need us.",
      image: "/images/landing-page/fast.jpg",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "How Secure is Komune?",
      answer:
        "Komune prioritizes security with encrypted connections, secure authentication, and modern moderation tools to help keep communities safe and private. We continuously improve our systems to provide a reliable and trustworthy experience for all users.",
    },
    {
      id: 2,
      question: "Is Komune Moderated?",
      answer:
        "Yes! Komune includes powerful moderation tools that help community owners manage discussions, members, and reported content. Our goal is to maintain a respectful and welcoming environment for everyone.",
    },
    {
      id: 3,
      question: "What Kind of Communities Can I Create?",
      answer:
        "Komune supports many types of communities, including gaming groups, study forums, professional networks, fan clubs, and hobby-based spaces. Whether your community is small or large, Komune provides the tools needed to help it grow.",
    },
    {
      id: 4,
      question: "Is Komune Free to Use?",
      answer:
        "Yes, Komune offers a free plan with essential features for building and managing communities. We also provide premium options with additional customization and advanced tools for larger or more active communities.",
    },
  ];

  return (
    <div className="bg-[#0C1222] w-full h-full flex flex-col gap-10 md:gap-15 text-white">
      <nav className="w-full h-20 bg-[#0F172A]/70 backdrop-blur-md z-50 fixed px-6 md:px-10 py-5 flex items-center justify-between flex-row">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0066FF]">Komune</h1>
        
        <div className="hidden md:flex gap-8">
          <a href="/" className="text-gray-300 hover:text-blue-500 font-medium transition-all">Home</a>
          <a href="#about" className="text-gray-300 hover:text-blue-500 font-medium transition-all">About Us</a>
          <a href="#features" className="text-gray-300 hover:text-blue-500 font-medium transition-all">Features</a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block">
            <Button className="font-medium hover:scale-105 px-5 py-2 bg-[#0066FF] hover:bg-blue-400">
              Sign In
            </Button>
          </Link>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-[#0F172A] border-b border-gray-700 flex flex-col p-6 gap-4 md:hidden animate-in slide-in-from-top">
            <a href="/" onClick={() => setIsMenuOpen(false)} className="text-lg">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg">About Us</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg">Features</a>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-[#0066FF]">Sign In</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section sialan */}
      <section
        className="relative flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-10 py-16 md:py-20 min-h-[80vh] w-full mt-20 overflow-hidden"
        id="hero">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col gap-6 w-full lg:w-1/2 z-5 text-center lg:text-left items-center lg:items-start">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 w-fit text-sm font-medium text-blue-400">
            <Stars size={16} className="fill-blue-400" />
            <span>Voted no.1 Community in Jomokerto 2069</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] text-white tracking-tight">
            The Best modern home for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              every community
            </span>
            .
          </h1>

          <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-xl">
            Komune brings people together in a modern, supportive environment
            for real-time discussions. Experience the future of community living
            today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="/signup"
              className="bg-blue-600 text-white rounded-full px-8 py-4 text-lg font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:-translate-y-1 transition-all text-center">
              Get Started!
            </Link>
            <Link
              href="#about"
              className="rounded-full px-8 py-4 text-lg font-bold text-white border-2 border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all text-center">
              Learn More
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full scale-75" />
          <div className="relative bg-[#1E293B] rounded-[2rem] md:rounded-[2.5rem] w-full max-w-lg p-3 md:p-4 shadow-2xl border border-slate-700/50">
            <div className="rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-slate-800">
              <img
                src="/images/landing-page/user-group.png"
                alt="User Group"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Komune Ajg */}
      <section
        className="flex flex-col lg:flex-row mx-4 md:mx-10 rounded-2xl bg-[#1E293B] border border-gray-700 p-8 md:p-14 lg:px-20 gap-8 md:gap-10 mt-10 md:mt-15"
        id="about">
        <div className="flex flex-col gap-2 w-full lg:w-1/4">
          <p className="text-blue-500 font-medium text-lg text-center lg:text-left">Our Mission</p>
          <h1 className="font-semibold text-3xl text-center lg:text-left">About Komune</h1>
          <div className="w-2/12 lg:w-4/12 border-b-4 border-blue-500 py-1 mx-auto lg:mx-0"></div>
        </div>

        <div className="w-full lg:w-3/4 flex flex-col gap-5 text-center lg:text-left">
          <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed">
            A modern community platform designed to bring people together and
            foster meaningful connections with meaningful discussions. <br className="hidden md:block" />
            <br />
            Built for creators, communities, workers, hobbyists and everyone to
            share knowledge and built lasting digital homes. We believe in the
            power of community to drive positive change.
          </p>
          <h1 className="text-blue-500 flex items-center justify-center lg:justify-start gap-2">
            <ShieldCheck size={20} /> Trusted by Security & Design
          </h1>
        </div>
      </section>

      {/* User Stats */}
      <section
        className="my-20 md:my-32 flex flex-col gap-12 md:gap-16 items-center justify-center px-6"
        id="stats">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 text-center">
          <div className="space-y-2">
            <p className="text-blue-500 font-semibold tracking-widest uppercase text-[10px] md:text-xs">
              Join the Global Movement
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white max-w-md md:max-w-none">
              Trusted by over 10,000 users worldwide
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 opacity-60">
            {communities.map((community, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-full text-slate-300 font-medium text-xs md:text-sm">
                <span className="text-blue-400 scale-75 md:scale-100">{community.icon}</span>
                <span>{community.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4 md:px-0">
          <div className="group rounded-[2rem] bg-[#1E293B] border border-slate-700/50 p-8 md:p-10 flex flex-col items-center justify-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400"><Users size={28} /></div>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">120k<span className="text-blue-500">+</span></h1>
              <p className="text-slate-400 font-medium mt-2">Total Users</p>
            </div>
          </div>

          <div className="group relative rounded-[2rem] bg-gradient-to-b from-blue-600 to-blue-700 p-8 md:p-10 flex flex-col items-center justify-center gap-4 shadow-xl md:transform md:-translate-y-4">
            <div className="p-3 rounded-2xl bg-white/20 text-white"><Users size={32} /></div>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">6.9k<span className="text-blue-200">+</span></h1>
              <p className="text-blue-100 font-semibold text-lg mt-2">Active Forums</p>
            </div>
          </div>

          <div className="group rounded-[2rem] bg-[#1E293B] border border-slate-700/50 p-8 md:p-10 flex flex-col items-center justify-center gap-4 sm:col-span-2 md:col-span-1">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400"><Users size={28} /></div>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">1M<span className="text-blue-500">+</span></h1>
              <p className="text-slate-400 font-medium mt-2">Total Posts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="py-16 md:py-20 bg-[#0F172A] flex flex-col items-center px-6"
        id="features">
        <div className="text-center max-w-3xl mb-12 md:mb-16">
          <span className="px-4 py-1.5 text-sm font-medium text-blue-400 bg-blue-900/30 border border-blue-800 rounded-full">Features</span>
          <h1 className="text-3xl md:text-5xl font-semibold text-white mt-6 tracking-tight">
            Built for <span className="text-blue-500">Meaningful Connections</span>
          </h1>
          <p className="text-slate-400 mt-4 md:mt-6 text-base md:text-lg">
            Powerful features designed to foster meaningful interactions and build strong communities.
          </p>
        </div>

        <div className="max-w-7xl w-full space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuresTop.map((f, i) => (
              <div key={i} className="group bg-[#1E293B] border border-slate-700 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                <div className="h-40 md:h-48 bg-slate-800 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{f.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-xs md:text-sm">{f.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuresBottom.map((f, i) => (
              <div key={i} className="group bg-[#1E293B] border border-slate-700 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
                <div className="h-56 md:h-64 bg-slate-800 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm max-w-md">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dropdown Info ajg */}
      <section className="mt-10 md:mt-15 mx-6 sm:mx-20 lg:mx-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-center leading-snug">
          Frequently Asked <span className="text-blue-500">Questions</span>.
        </h1>

        <Accordion type="single" collapsible className="w-full flex flex-col gap-4 mt-8 md:mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} value={`item-${index + 1}`} className="bg-[#1E293B] border border-gray-700 rounded-2xl px-4 md:px-5">
              <AccordionTrigger className="text-sm md:text-base text-left hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5 text-xs md:text-sm">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTE bangsat*/}
      <section className="mt-20 md:mt-24 mx-4 md:mx-20 relative overflow-hidden" id="cta">
        <div className="bg-[#1E293B] rounded-[2rem] md:rounded-[3rem] p-10 md:p-24 border border-slate-700/50 flex flex-col items-center justify-center gap-8 relative shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-5 flex flex-col items-center gap-6 text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl">
              Ready to build your <span className="text-blue-500">Dream Community</span> in Komune?
            </h1>
            <p className="text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed">Join thousands of users who are already building meaningful connections.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <a href="#login" className="bg-blue-600 text-white rounded-full px-8 md:px-10 py-4 text-lg font-bold shadow-lg shadow-blue-500/20 text-center hover:scale-105 transition-all duration-200 ">Get Started Now</a>
              <a href="#signup" className="bg-transparent text-white border-2 border-slate-700 rounded-full px-8 md:px-10 py-4 text-lg font-bold text-center hover:scale-105 transition-all duration-300">Sign Up</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-[#0F172A] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center sm:text-left">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-blue-600">Komune</h2>
              <p className="text-gray-400 text-sm leading-relaxed">Empowering communities to talk, share, and grow together in a modern digital space.</p>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <a href="#" className="p-2 rounded-full bg-[#1E293B] text-slate-300 hover:bg-blue-500 transition"><Send size={18} /></a>
                <a href="#" className="p-2 rounded-full bg-[#1E293B] text-slate-300 hover:bg-blue-500 transition"><Bird size={18} /></a>
                <a href="#" className="p-2 rounded-full bg-[#1E293B] text-slate-300 hover:bg-blue-500 transition"><Video size={18} /></a>
                <a href="#" className="p-2 rounded-full bg-[#1E293B] text-slate-300 hover:bg-blue-500 transition"><MessageSquare size={18} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase mb-5">Product</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-500">Features</a></li>
                <li><a href="#" className="hover:text-blue-500">Integrations</a></li>
                <li><a href="#" className="hover:text-blue-500">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase mb-5">Resources</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-500">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-500">Global Feed</a></li>
                <li><a href="#" className="hover:text-blue-500">Status Page</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold tracking-wider text-slate-200 uppercase mb-5">Legal</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-500">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-500">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center">
            <p>© 2026 Komune Inc. Built with love for communities everywhere.</p>
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}