import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImagerCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef(null);

  // Slide transition variants
  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    enter: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 1,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 1,
      },
    }),
  };

  // Hover effect for images
  const imageHoverVariants = {
    rest: { 
      scale: 1,
      filter: 'brightness(100%)',
    },
    hover: {
      scale: 1.05,
      filter: 'brightness(110%)',
      transition: {
        duration: 0.3,
      },
    },
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); // Cleanup
  }, [images.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e) => {
    if (!carouselRef.current) return;

    const rect = carouselRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    carouselRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${(y - 0.5) * 10}deg) 
      rotateY(${(x - 0.5) * 10}deg)
    `;
  };

  const handleMouseLeave = () => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
  };

  return (
    <motion.div
      ref={carouselRef}
      className="relative w-[90%] h-[600px] overflow-hidden rounded-2xl shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="absolute inset-0"
        >
          <motion.img
            src={images[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            variants={imageHoverVariants}
            initial="rest"
            whileHover="hover"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Overlay */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/30 backdrop-blur-sm p-3 rounded-full"
        >
          ←
        </motion.button>
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/30 backdrop-blur-sm p-3 rounded-full"
        >
          →
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white scale-150' : 'bg-white/50'
            }`}
            animate={{
              scale: index === currentSlide ? 1.5 : 1,
              opacity: index === currentSlide ? 1 : 0.5,
            }}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ImagerCarousel;
