import React, { useState } from 'react';
import { Mail, User, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Additional form validation can be added here
  };

  return (
    <div className=" w-full flex items-center justify-center  p-4  bg-gradient-to-r from-pink-200 via-blue-300 to-purple-200">
      <div className="w-1/3 shadow-md rounded-lg bg-gray-200 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          <MessageSquare className="mr-3 text-blue-500" />
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} action='https://formspree.io/f/mkgwobjy' method='POST' className="space-y-4">
          <div className="relative">
            <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
              <User className="mr-2 text-blue-500" /> Full Name
            </label>
            <input 
              type='text' 
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Your Name' 
              autoComplete='off' 
              required 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          
          <div className="relative">
            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
              <Mail className="mr-2 text-blue-500" /> Email
            </label>
            <input 
              type='email' 
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Your Email' 
              autoComplete='off' 
              required 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          
          <div className="relative">
            <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
              <MessageSquare className="mr-2 text-blue-500" /> Subject
            </label>
            <input 
              type='text' 
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              placeholder='Subject' 
              autoComplete='off' 
              required 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          
          <div className="relative">
            <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center">
              <MessageSquare className="mr-2 text-blue-500" /> Message
            </label>
            <textarea 
              name='message'
              value={formData.message}
              onChange={handleChange}
              cols="30" 
              rows="5" 
              placeholder='Write Something Here!' 
              required 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-y"
            />
          </div>
          
          <button 
            type='submit' 
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <Send className="mr-2 w-[9%]" />
            <div className='w-[90%]' >
            Send Message
            </div>
            
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;