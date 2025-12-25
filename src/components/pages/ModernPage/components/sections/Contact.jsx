import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import MagneticWrapper from '../features/MagneticWrapper';
import { portfolioData } from '@data/portfolioData';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return "Woops! Please enter your name!";
        return null;
      case 'email':
        if (!value.trim()) return "Dang! Please enter your e-mail!";
        if (!validateEmail(value)) return "Please enter a valid e-mail address";
        return null;
      case 'subject':
        if (submitAttempted && !value.trim()) return "Please enter a subject!";
        return null;
      case 'message':
        if (!value.trim()) return "WHOA THERE! Please type your message!";
        return null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name] || submitAttempted) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
      setIsValid(prev => ({ ...prev, [name]: !error && value.trim() }));
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setIsValid(prev => ({ ...prev, [name]: !error && value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    const newErrors = {};
    const newIsValid = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      newErrors[key] = error;
      newIsValid[key] = !error && formData[key].trim();
    });
    
    setErrors(newErrors);
    setIsValid(newIsValid);
    
    const requiredFields = ['name', 'email', 'message'];
    const allValid = requiredFields.every(field => newIsValid[field]);
    
    if (allValid) {
      setFormStatus('loading');
      
      setTimeout(() => {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({});
        setErrors({});
        setIsValid({});
        setSubmitAttempted(false);
        
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      }, 2000);
    }
  };

  const { personalInfo } = portfolioData;

  const socialLinks = [
    { icon: Github, url: personalInfo.social.github, label: 'GitHub' },
    { icon: Linkedin, url: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: SiInstagram, url: personalInfo.social.instagram, label: 'Instagram' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
  ];

  return (
    <section 
      id="contact" 
      ref={ref} 
      className="relative py-20 px-4 bg-linear-to-b from-white via-yellow-50/30 to-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(252, 211, 77, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(252, 211, 77, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-400/20"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-100 border-2 border-yellow-300 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">Get In Touch</span>
          </motion.div>

          <MagneticWrapper strength={0.2}>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 cursor-pointer"
              style={{ 
                color: '#C3E41D',
                fontFamily: "'Fira Code', monospace"
              }}
            >
              Let's Connect
            </h2>
          </MagneticWrapper>

          <span className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Quick responses promised!
          </span>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl backdrop-blur-xl bg-white/70 border-2 border-yellow-200/50 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-14">
              {/* Name Input */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <motion.label
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                    focusedField === 'name' || formData.name
                      ? '-top-7 text-base text-gray-900'
                      : 'top-5 text-lg text-gray-500'
                  }`}
                  style={{
                    borderBottom: (focusedField === 'name' || formData.name) ? '4px solid #C3E41D' : 'none',
                    paddingBottom: '3px',
                    paddingRight: '12px'
                  }}
                >
                  Name
                </motion.label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-5 bg-white/50 border-b-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-900 text-lg transition-all duration-300 rounded-t-xl"
                />
                <AnimatePresence>
                  {isValid.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute right-2 top-5 text-green-500"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  )}
                  {errors.name && (touched.name || submitAttempted) && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-0 -bottom-6 text-red-500 text-sm font-medium"
                    >
                      {errors.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <motion.label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                    focusedField === 'email' || formData.email
                      ? '-top-7 text-base text-gray-900'
                      : 'top-5 text-lg text-gray-500'
                  }`}
                  style={{
                    borderBottom: (focusedField === 'email' || formData.email) ? '4px solid #C3E41D' : 'none',
                    paddingBottom: '3px',
                    paddingRight: '12px'
                  }}
                >
                  E-Mail
                </motion.label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-5 bg-white/50 border-b-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-900 text-lg transition-all duration-300 rounded-t-xl"
                />
                <AnimatePresence>
                  {isValid.email && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute right-2 top-5 text-green-500"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  )}
                  {errors.email && (touched.email || submitAttempted) && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-0 -bottom-6 text-red-500 text-sm font-medium"
                    >
                      {errors.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Subject Input */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <motion.label
                  htmlFor="subject"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-medium ${
                    focusedField === 'subject' || formData.subject
                      ? '-top-7 text-base text-gray-900'
                      : 'top-5 text-lg text-gray-500'
                  }`}
                  style={{
                    borderBottom: (focusedField === 'subject' || formData.subject) ? '4px solid #C3E41D' : 'none',
                    paddingBottom: '3px',
                    paddingRight: '12px'
                  }}
                >
                  Subject
                </motion.label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-5 bg-white/50 border-b-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-900 text-lg transition-all duration-300 rounded-t-xl"
                />
                <AnimatePresence>
                  {isValid.subject && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute right-2 top-5 text-green-500"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <motion.label
                  htmlFor="message"
                  className={`absolute left-4 top-6 transition-all duration-300 pointer-events-none font-medium text-lg ${
                    focusedField === 'message' || formData.message
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  Message
                </motion.label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  rows="6"
                  className="w-full px-4 pt-12 pb-4 bg-white/50 border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-gray-900 text-lg transition-all duration-300 resize-none rounded-2xl"
                />
                <AnimatePresence>
                  {isValid.message && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute right-3 top-3 text-green-500"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  )}
                  {errors.message && (touched.message || submitAttempted) && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-0 -bottom-6 text-red-500 text-sm font-medium"
                    >
                      {errors.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                <MagneticWrapper strength={0.3}>
                  <motion.button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className={`w-full px-8 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                      formStatus === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-linear-to-r from-yellow-300 to-amber-400 text-gray-900 hover:from-yellow-400 hover:to-amber-500 hover:shadow-yellow-500/50'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <motion.div
                          className="w-6 h-6 border-3 border-gray-900/30 border-t-gray-900 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : formStatus === 'success' ? (
                      '✓ Message Sent Successfully!'
                    ) : (
                      <>
                        Submit
                        <Send className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>
                </MagneticWrapper>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info Side */}
          <div className="space-y-6">
            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl backdrop-blur-xl bg-white/70 border-2 border-yellow-200/50 shadow-xl"
            >
              <p className="text-gray-700 leading-relaxed text-lg">
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="flex items-center gap-4 p-5 rounded-2xl backdrop-blur-xl bg-white/70 border-2 border-yellow-200/50 hover:border-yellow-400/80 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      <div className="p-3 rounded-xl bg-linear-to-br from-yellow-100 to-amber-100 text-yellow-700 group-hover:scale-110 transition-transform">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">{info.label}</p>
                        <p className="font-semibold text-gray-800">{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-5 rounded-2xl backdrop-blur-xl bg-white/70 border-2 border-yellow-200/50 shadow-lg">
                      <div className="p-3 rounded-xl bg-linear-to-br from-yellow-100 to-amber-100 text-yellow-700">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">{info.label}</p>
                        <p className="font-semibold text-gray-800">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-gray-800">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <MagneticWrapper key={index} strength={0.4}>
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl backdrop-blur-xl bg-white/70 border-2 border-yellow-200/50 hover:border-yellow-400/80 transition-all duration-300 shadow-lg hover:shadow-xl group"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-6 h-6 text-gray-700 group-hover:text-yellow-600 transition-colors" />
                    </motion.a>
                  </MagneticWrapper>
                ))}
              </div>
            </motion.div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <MagneticWrapper strength={0.3}>
                <motion.a
                  href={personalInfo.resume}
                  download
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl backdrop-blur-xl bg-white/70 border-2 border-yellow-300/60 text-gray-900 font-bold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </motion.a>
              </MagneticWrapper>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
