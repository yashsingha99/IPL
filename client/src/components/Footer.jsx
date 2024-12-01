import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", color: "text-blue-600" },
    { icon: Twitter, url: "https://twitter.com", color: "text-sky-400" },
    { icon: Instagram, url: "https://instagram.com", color: "text-pink-500" },
    { icon: Linkedin, url: "https://linkedin.com", color: "text-blue-700" }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Teams", path: "/teams" },
    { name: "Players", path: "/players" },
    { name: "Venues", path: "/venues" },
    { name: "Schedule", path: "/schedule" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Disclaimer", path: "/disclaimer" }
  ];

  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-4 flex items-center"
          >
            CricketMaster
          </motion.h2>
          <p className="text-gray-300 mb-4">
            Your ultimate destination for cricket insights, live updates, and passionate cricket coverage.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`${social.color} hover:opacity-80`}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {quickLinks.map((link, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link 
                  to={link.path} 
                  className="block py-1 text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {legalLinks.map((link, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link 
                  to={link.path} 
                  className="block py-1 text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center space-x-2">
              <Mail size={20} />
              <span>support@cricketmaster.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={20} />
              <span>+91 9876 543 210</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={20} />
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="border-t border-blue-900 mt-8 py-4 text-center"
      >
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} CricketMaster. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;