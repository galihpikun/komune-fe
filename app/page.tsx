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
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Home() {
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

  const features = [
    {
      icon: <Cog size={30} />,
      title: "Community Driven Feeds",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae neque vel alias, distinctio similique voluptatum voluptatem quod quas. Provident molestiae molestias in dolor voluptatem.",
    },
    {
      icon: <Gavel size={30} />,
      title: "Good Moderations",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae neque vel alias, distinctio similique voluptatum voluptatem quod quas. Provident molestiae molestias in dolor voluptatem.",
    },
    {
      icon: <Lock size={30} />,
      title: "Secure Community Spaces",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae neque vel alias, distinctio similique voluptatum voluptatem quod quas. Provident molestiae molestias in dolor voluptatem.",
    },
    {
      icon: <Palette size={30} />,
      title: "Beautiful Customization",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae neque vel alias, distinctio similique voluptatum voluptatem quod quas. Provident molestiae molestias in dolor voluptatem.",
    },
    {
      icon: <ChartColumnIncreasing size={30} />,
      title: "Advanced Analytics",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae neque vel alias, distinctio similique voluptatum voluptatem quod quas. Provident molestiae molestias in dolor voluptatem.",
    },
    {
      icon: <Bolt size={30} />,
      title: "Lightning Fast Performance",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae neque vel alias, distinctio similique voluptatum voluptatem quod quas. Provident molestiae molestias in dolor voluptatem.",
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
    <div className="bg-[#0C1222] w-full h-full flex flex-col gap-15 text-white">
      <nav className="w-full h-20 bg-[#0F172A] border-b border-gray-700 z-10 fixed px-10 py-5 flex items-center justify-between flex-row">
        <h1 className="text-3xl font-bold text-[#0066FF]">Komune</h1>
        <div className="flex gap-5">
          <a
            href="/"
            className="text-gray-300 hover:text-blue-500 font-medium hover:font-semibold transition-all duration-300 hover:underline">
            Home
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-blue-500 font-medium hover:font-semibold transition-all duration-300 hover:underline">
            About Us
          </a>
          <a
            href="#features"
            className="text-gray-300 hover:text-blue-500 font-medium hover:font-semibold transition-all duration-300 hover:underline">
            Features
          </a>
        </div>
        <Link href="/login">
          <Button className="font-medium hover:scale-110 px-5 py-2 bg-[#0066FF] hover:bg-blue-400">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Section sialan */}
      <section className="flex justify-between items-center p-10 py-5 w-full mt-30">
        <div className="flex flex-col gap-3 w-full">
          <p className="px-3 py-1 rounded-full bg-blue-400 flex gap-1 w-fit text-sm items-center text-white">
            <Stars size={15} /> Voted no.1 Community in Jomokerto 2069
          </p>
          <h1 className="text-5xl font-semibold">
            The Best modern home for{" "}
            <span className="text-blue-500">every community</span>.
          </h1>
          <p className="text-gray-300">
            Komune brings people together in a modern, supportive environment
            for real time discussions. Experience the future of community living
            today.
          </p>
          <div className="flex gap-5 mt-5">
            <Link
              href="/signup"
              className="bg-blue-500 text-white rounded-full px-4 py-2 text-lg font-semibold hover:border-2 hover:border-blue-500 hover:bg-white transition-all duration-300 hover:text-blue-500">
              Get Started!
            </Link>
            <Link
              href="#about"
              className="rounded-full px-4 font-semibold py-2 text-lg text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
              Learn More
            </Link>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="bg-[#1E293B] rounded-xl w-2/3 h-auto p-3 shadow-lg border border-gray-700">
            <img
              src="/images/landing-page/user-group.png"
              alt="User Group Image art corpo bullshit"
              className=""
            />
          </div>
        </div>
      </section>

      {/* About Komune Ajg */}
      <section
        className="flex mx-10 rounded-2xl bg-[#1E293B] border border-gray-700 justify-around items-center p-10 px-20 gap-5 mt-15"
        id="about">
        <div className="flex flex-col gap-2 w-1/4">
          <p className="text-blue-500 font-medium text-lg">Our Mission</p>
          <h1 className="font-semibold text-3xl">About Komune</h1>
          <div className="w-4/12 border-b-4 border-blue-500 py-1"></div>
        </div>

        <div className="w-3/4 flex flex-col gap-5">
          <p className="text-lg font-light text-gray-300">
            A modern community platform designed to bring people together and
            foster meaningful connections with meaningful discussions. <br />
            <br />
            Built for creators, communities, workers, hobbyists and everyone to
            share knowledge and built lasting digital homes. We believe in the
            power of community to drive positive change, empowering every voice
            with tools that prioritize community importance.
          </p>
          <h1 className="text-blue-500 flex items-center">
            <ShieldCheck /> Trusted by Security & Design
          </h1>
        </div>
      </section>

      {/* User Stats */}
      <section
        className="my-30 flex flex-col gap-10 items-center justify-center mx-20"
        id="stats">
        {/* Opening Stats */}
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-lg font-medium text-blue-500">
            Trusted by over 10,000 users worldwide
          </p>
          <div className="flex gap-10">
            {communities.map((community, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-300 font-semibold">
                {community.icon}
                <span>{community.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full gap-10 mx-10">
          <div className="rounded-2xl bg-[#1E293B] border border-gray-700 p-10 shadow-lg h-1/2 w-4/12 flex flex-col items-center justify-center gap-5">
            <div className="bg-[#2B4161] p-3 rounded-md">
              <Users size={30} className="text-blue-400 font-medium" />
            </div>

            <h1 className="text-5xl font-medium text-center">120k+</h1>
            <p className="text-gray-300 font-semibold text-lg">Total Users</p>
          </div>

          <div className="rounded-2xl bg-[#2B4161] p-10 shadow-lg h-1/2 w-4/12 flex flex-col items-center justify-center gap-5 border border-gray-700">
            <div className="bg-blue-500 p-3 rounded-md">
              <Users size={30} className="text-white font-medium" />
            </div>

            <h1 className="text-5xl text-white font-medium text-center">
              6.9k+
            </h1>
            <p className="text-gray-100 font-semibold text-lg">Active Forums</p>
          </div>

          <div className="rounded-2xl bg-[#1E293B] border border-gray-700 p-10 shadow-lg h-1/2 w-4/12 flex flex-col items-center justify-center gap-5">
            <div className="bg-[#2B4161] p-3 rounded-md">
              <Users size={30} className="text-blue-400 font-medium" />
            </div>

            <h1 className="text-5xl font-medium text-center">1M+</h1>
            <p className="text-gray-300 font-semibold text-lg">Total Posts</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="mt-15 flex flex-col items-center justify-center mx-20"
        id="features">
        <p className="text-lg text-blue-500">Our Features</p>
        <h1 className="text-4xl">
          Built for{" "}
          <span className="text-blue-500">Meaningful Connections</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Powerful features designed to foster meaningful interactions and build
          strong communities. <br />
          Our platform provides everything you need to create and maintain
          vibrant, engaged communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[#1E293B] border border-gray-700 rounded-3xl p-6 shadow-md gap-2">
              <div className="bg-[#2B4161] p-4 rounded-lg mb-4 text-blue-400">
                {feature.icon}
              </div>
              <div className="text-left p-3">
                <h3 className="text-xl font-medium py-1 text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dropdown Info ajg */}
      <section className="mt-15 mx-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold">
          Frequently Asked <span className="text-blue-500">Questions</span>.
        </h1>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="flex flex-col gap-5 mt-10">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={`item-${index + 1}`}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl px-5 py-1 shadow-sm">
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-gray-400 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTE bangsat*/}
      <section className="mt-15 mx-30 flex flex-col items-center justify-center gap-10 bg-[#2B4161] p-10 py-30 rounded-3xl shadow border border-gray-700">
        <h1 className="text-6xl text-white text-center">
          Ready to build your Dream Community <br />
          in Komune?
        </h1>
        <p className="text-white text-lg text-center w-3/4">
          Join thousands of users who are already building meaningful
          connections on our platform. Start creating and Sign Up Today. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Explicabo facilis
          sit asperiores.
        </p>
        <div className="flex gap-5 mt-5">
          <a
            href=""
            className="bg-white text-blue-500 rounded-full px-4 py-2 text-lg font-semibold hover:border-2 hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
            Log In
          </a>
          <a
            href=""
            className="rounded-full px-4 font-semibold py-2 text-lg text-white border-2 border-white hover:bg-white hover:text-blue-500 transition-all duration-300">
            Sign Up
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-[#0F172A] mt-15">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-blue-600">Komune</h2>

              <p className="text-gray-400 leading-relaxed">
                Empowering communities to talk, share, and grow together in a
                safe, modern, and high-performance digital space.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="p-2 rounded-full bg-[#1E293B] hover:bg-blue-500 hover:text-white transition">
                  <Send size={18} />
                </a>

                <a
                  href="#"
                  className="p-2 rounded-full bg-[#1E293B] hover:bg-blue-500 hover:text-white transition">
                  <Bird size={18} />
                </a>

                <a
                  href="#"
                  className="p-2 rounded-full bg-[#1E293B] hover:bg-blue-500 hover:text-white transition">
                  <Video size={18} />
                </a>

                <a
                  href="#"
                  className="p-2 rounded-full bg-[#1E293B] hover:bg-blue-500 hover:text-white transition">
                  <MessageSquare size={18} />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase mb-5">
                Product
              </h3>

              <ul className="space-y-3 text-gray-500">
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Features
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Integrations
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Pricing
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Changelog
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    API Docs
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase mb-5">
                Resources
              </h3>

              <ul className="space-y-3 text-gray-500">
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Help Center
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Global Feed
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Moderator Guide
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Community Forum
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Status Page
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase mb-5">
                Legal
              </h3>

              <ul className="space-y-3 text-gray-500">
                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Terms of Service
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Cookie Policy
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    DPA
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-500 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-14 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              © 2026 Komune Inc. Built with love for communities everywhere.
            </p>

            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
