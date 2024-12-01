import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Award,
  Video,
  Search,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../styles/Home.css";
// Import images (assuming same import structure)
import srh from "../images/srh.jpeg";
import kkr from "../images/kkr.jpeg";
import rr from "../images/rajasthan.jpg";
import rcb from "../images/rcb.jpeg";
import csk from "../images/csk.jpeg";
import dc from "../images/dc.jpeg";
import ImageCarousel from "../components/ImageCarousel";
import CommunitySection from "../components/CommunitySection";

import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";
import slide4 from "../images/slide4.jpg";
import slide5 from "../images/slide5.jpg";
import slide6 from "../images/slide6.png";

const Home = () => {
  // ... (previous teams and videos arrays remain the same)
  const teams = [
    {
      position: 1,
      name: "Kolkata Knight Riders",
      points: 20,
      played: 14,
      won: 9,
      nrr: 1.428,
      recentForm: ["N", "N", "W", "W", "W"],
      logo: kkr,
    },
    {
      position: 2,
      name: "Sunrisers Hyderabad",
      points: 17,
      played: 14,
      won: 8,
      nrr: 0.414,
      recentForm: ["N", "W", "L", "W", "W"],
      logo: srh,
    },
    {
      position: 3,
      name: "Rajasthan Royals",
      points: 17,
      played: 14,
      won: 8,
      nrr: 0.273,
      recentForm: ["L", "L", "L", "L", "L"],
      logo: rr,
    },
    {
      position: 4,
      name: "Royal Challengers Bengaluru",
      points: 14,
      played: 14,
      won: 7,
      nrr: 0.459,
      recentForm: ["W", "W", "W", "W", "W"],
      logo: rcb,
    },
    {
      position: 5,
      name: "Chennai Super King",
      points: 14,
      played: 14,
      won: 10,
      nrr: 0.489,
      recentForm: ["N", "W", "W", "N", "W"],
      logo: csk,
    },
    {
      position: 6,
      name: "Delhi Capitals",
      points: 14,
      played: 14,
      won: 8,
      nrr: 0.359,
      recentForm: ["W", "N", "W", "W", "N"],
      logo: dc,
    },
  ];

  const videos = [
    {
      title: "TATA IPL 2024: Top Moments",
      date: "31 May, 2024",
      views: "217.1k",
      duration: "16:37 mins",
      videoUrl:
        "https://www.youtube.com/embed/Mj1I2nnQsqg?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=Mj1I2nnQsqg",
    },
    {
      title: "A delighted & emotional reflects on...",
      date: "27 May, 2024",
      views: "79.9k",
      duration: "01:48 mins",
      videoUrl:
        "https://www.youtube.com/embed/gG6GMmwdE-g?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=gG6GMmwdE-g",
    },
    {
      title: "Champions speak: Post Mitchell...",
      date: "27 May, 2024",
      views: "157.1k",
      duration: "02:00 mins",
      videoUrl:
        "https://www.youtube.com/embed/P26JOXiwGlU?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=P26JOXiwGlU",
    },
    {
      title: "IPL 2024 Winning Captain...",
      date: "27 May, 2024",
      views: "108.3k",
      duration: "01:00 mins",
      videoUrl:
        "https://www.youtube.com/embed/9vz_0iVNTs0?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=9vz_0iVNTs0",
    },
  ];
  `                                         `;
  const images = [slide4, slide2, slide3, slide5, slide6];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Variants for animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen w-full bg-gray-50"
    >
      {/* Animated Carousel */}
      <div className=" w-full flex mt-8 justify-center ">
        <ImageCarousel images={images} />
      </div>
      {/* Points Table */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="container mx-8 px-4 py-8 w-full"
      >
        <LayoutGroup>
          <motion.h2
            layout
            className=" text-3xl font-bold text-center mb-6 flex items-center justify-center"
          >
            <Award className="mr-3 text-blue-600" /> Points Table
          </motion.h2>
          <div className="pt shadow-2xl">
            {/* <h1 className="poi mt-2 text-lg ">Points Table</h1> */}
            <div className="points-table">
              <div className=" flex">
                {teams.map((team) => (
                  <div key={team.position} className="team-card boss  shadow-md">
                    <div className="top">
                      <div className="team-rank">{team.position}</div>
                      <h1 className="team-name">{team.name}</h1>
                    </div>

                    <div className="flex justify-center">
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="team-img"
                      />
                    </div>
                    <hr />
                    <div className="team-info">
                      <div className="sm-div">
                        <strong>{team.points}</strong> Points
                      </div>
                      <div className="sm-div">
                        <strong>{team.played}</strong> Played
                      </div>
                      <div className="sm-div">
                        <strong>{team.won}</strong> Won
                      </div>
                      <div className="sm-div green">
                        <strong>{team.nrr.toFixed(3)}</strong> NRR
                      </div>
                    </div>
                    <div className="team-form">
                      <h3 className="recent mb-3">Recent form</h3>
                      <div className="form-icons">
                        {team.recentForm.map((result, index) => (
                          <span key={index} className={`form-icon ${result}`}>
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LayoutGroup>
      </motion.div>

      {/* Navigation Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-blue-900 text-white py-12"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-2xl mb-8">What Are You Looking For?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {[
              { icon: Users, text: "Teams", link: "/teams" },
              { icon: Search, text: "Search", link: "/search" },
              { icon: MapPin, text: "Venues", link: "/venues" },
              { icon: Video, text: "Players", link: "/players" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <Link to={item.link} className="flex flex-col items-center">
                  <item.icon className="h-12 w-12 mb-4" />
                  <span>{item.text}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Videos Section */}
      <div style={{ height: "400px" }} className="w-full  relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className=" mx-auto w-full h-[90%] flex m-8  flex-col  bg-[#FED607]  py-12 px-4"
        >
          <h2 className="font-black text-4xl  mb-8 flex items-center">
            <Video className="mr-3 text-black  " /> FROM THE VAULT
          </h2>
          <div className=" absolute h-[60%] bottom-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)", // Fixed clip-path
                }}
                className="bg-black text-white overflow-hidden shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-4">
                  <iframe
                    className="w-full h-40"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{video.date}</span>
                    <span>{video.views} Views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <CommunitySection />
    </motion.div>
  );
};

export default Home;
