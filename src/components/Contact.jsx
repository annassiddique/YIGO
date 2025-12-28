/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    alert('Form submitted successfully!');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Title and Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className="text-4xl lg:text-6xl font-light text-black leading-tight">
                GET IN TOUCH
              </h1>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 shrink-0">
                    <Mail className="w-full h-full text-black" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-medium">Info@yigogroup.com</p>
                    <div className="w-full h-px bg-black mt-1"></div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 shrink-0">
                    <Phone className="w-full h-full text-black" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-medium">+971 50 147 4794</p>
                    <div className="w-full h-px bg-black mt-1"></div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 shrink-0">
                    <MapPin className="w-full h-full text-black" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-medium whitespace-pre-line">
                      905-906, Court tower{'\n'}Business Bay{'\n'}Dubai
                    </p>
                    <div className="w-full h-px bg-black mt-1"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-8">
                {/* Name and Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-black font-medium mb-2">
                      NAME
                    </label>
                    <div className="w-full h-px bg-black mb-2"></div>
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label className="block text-black font-medium mb-2">
                      COMPANY
                    </label>
                    <div className="w-full h-px bg-black mb-2"></div>
                    <input
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-black font-medium mb-2">
                      EMAIL
                    </label>
                    <div className="w-full h-px bg-black mb-2"></div>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label className="block text-black font-medium mb-2">
                      PHONE
                    </label>
                    <div className="w-full h-px bg-black mb-2"></div>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-black font-medium mb-2">
                    TELL US MORE ABOUT YOUR INQUIRY
                  </label>
                  <div className="w-full h-px bg-black mb-2"></div>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none text-black placeholder-gray-400 resize-none"
                    placeholder=""
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    SEND
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;