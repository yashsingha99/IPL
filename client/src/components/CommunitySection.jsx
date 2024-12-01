import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  MessageCircle, 
  Twitter, 
  Instagram, 
  Facebook, 
  Hash
} from 'lucide-react';

const CommunitySection = () => {
  const [selectedHashtag, setSelectedHashtag] = useState(null);

  const communityHighlights = [
    {
      username: "@IPLFanatic",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "What a thrilling match! KKR's performance was absolutely stunning! 🏏🔥",
      likes: 1245,
      comments: 87,
      shares: 42,
      hashtags: ["#IPL2024", "#KKRWins"]
    },
    {
      username: "@CricketQueen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Hyderabad's bowling attack was pure magic today! Absolutely mesmerizing! 👏",
      likes: 987,
      comments: 65,
      shares: 29,
      hashtags: ["#SRH", "#IPLMagic"]
    },
    {
      username: "@CricketAnalyst",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      content: "Statistical breakdown of the tournament's most impactful players incoming! 📊",
      likes: 678,
      comments: 45,
      shares: 21,
      hashtags: ["#IPLStats", "#CricketAnalysis"]
    }
  ];

  const hashtagTrending = [
    "#IPL2024", 
    "#KKRChampions", 
    "#CricketFever", 
    "#IPLMoments", 
    "#PlayBold"
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Community Highlights */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Share2 className="mr-4 text-blue-300" /> 
              Community Buzz
            </h2>
            <div className="space-y-6">
              {communityHighlights.map((post, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={post.avatar} 
                      alt={post.username}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{post.username}</h3>
                    </div>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      {post.hashtags.map((tag) => (
                        <motion.span
                          key={tag}
                          onClick={() => setSelectedHashtag(tag)}
                          whileHover={{ scale: 1.1 }}
                          className={`
                            text-sm px-2 py-1 rounded-full cursor-pointer
                            ${selectedHashtag === tag 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white/20 text-blue-200'}
                          `}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-red-400" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1 text-blue-300" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trending and Social Connect */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Hash  className="mr-4 text-blue-300" /> 
              Trending & Connect
            </h2>
            
            {/* Trending Hashtags */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Trending Hashtags</h3>
              <div className="flex flex-wrap gap-3">
                {hashtagTrending.map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{ scale: 1.1 }}
                    className={`
                      px-4 py-2 rounded-full cursor-pointer
                      ${selectedHashtag === tag 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/20 text-blue-200'}
                    `}
                    onClick={() => setSelectedHashtag(tag)}
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media Connect */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Join the Conversation</h3>
              <div className="flex space-x-6 justify-center">
                {[
                  { Icon: Twitter, color: "text-blue-400" },
                  { Icon: Instagram, color: "text-pink-500" },
                  { Icon: Facebook, color: "text-blue-600" }
                ].map(({ Icon, color }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      w-16 h-16 bg-white/10 rounded-full 
                      flex items-center justify-center
                      cursor-pointer backdrop-blur-sm
                      ${color}
                    `}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CommunitySection;

// To use in your Home component:
// <CommunitySection />