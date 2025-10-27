'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useComicMode } from '@/context/ComicModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Send, Phone, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const { isComicMode } = useComicMode();
  const { content } = useLanguage();
  const [form, setForm] = useState({ name: '', lastname: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(content.contact.form.sending);
    setIsLoading(true);
    
    try {
      await axios.post('/api/contact', form);
      setStatus(content.contact.form.success);
      setForm({ name: '', lastname: '', email: '', message: '' });
    } catch (err) {
      setStatus(content.contact.form.error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(''), 5000);
    }
  }

  const sectionBg = isComicMode ? 'bg-comic-blue' : 'bg-dark-blue';
  const titleClasses = isComicMode ? 'section-title font-comic text-comic-yellow' : 'text-white';
  const inputClasses = isComicMode
    ? 'border-4 border-black bg-white text-black font-bold focus:ring-4 focus:ring-comic-yellow'
    : 'border-2 border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-dark-blue';
  const buttonClasses = isComicMode
    ? 'comic-button w-full'
    : 'bg-dark-blue text-white hover:bg-dark-blue/90 w-full';
  const secondaryButtonClasses = isComicMode
    ? 'comic-button-alt w-full'
    : 'bg-white border-2 border-dark-blue text-dark-blue hover:bg-dark-blue hover:text-white w-full';
  const socialButtonClasses = isComicMode
    ? 'bg-comic-yellow border-4 border-black text-black hover:bg-black hover:text-comic-yellow shadow-comic'
    : 'bg-dark-blue text-white hover:bg-dark-blue/90';

  const getTextColor = () => {
    if (isComicMode) return undefined;
    return isDarkMode ? '#060E28' : '#E2E2E2';
  };

  return (
    <section id="contact" className={`py-20 px-6 md:px-16 ${sectionBg} relative overflow-hidden`}>
      
      {isComicMode && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="comic-halftone w-full h-full"></div>
        </div>
      )}

      <div className="container mx-auto relative z-10">
        <motion.h2 
          className={`text-4xl font-bold text-center mb-4 ${titleClasses}`}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {content.contact.title}
        </motion.h2>

        <p 
          className={`text-center mb-12 text-lg ${isComicMode ? 'text-black font-semibold' : ''}`}
          style={{ color: getTextColor() }}
        >
          {content.contact.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className={`relative ${isComicMode ? 'animate-float' : ''}`}>
              <Image
                src="/contact-illustration.png"
                alt="Contact Illustration"
                width={500}
                height={400}
                className={`w-full max-w-md h-auto ${
                  isComicMode ? 'border-4 border-black shadow-comic-lg rounded-xl' : ''
                }`}
              />
              
              {isComicMode && (
                <motion.div
                  className="absolute -top-8 -right-8 bg-comic-yellow text-black font-black text-xl px-4 py-2 rounded-lg border-4 border-black shadow-comic rotate-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  ¡Hablemos!
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={submit} className="space-y-4">
              
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  required
                  placeholder={content.contact.form.name}
                  className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none ${inputClasses}`}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={e => setForm({...form, lastname: e.target.value})}
                  placeholder={content.contact.form.lastname}
                  className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none ${inputClasses}`}
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                  placeholder={content.contact.form.email}
                  className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none ${inputClasses}`}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  required
                  placeholder={content.contact.form.message}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg transition-all focus:outline-none resize-none ${inputClasses}`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${buttonClasses}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  {content.contact.form.send}
                </motion.button>

                <motion.a
                  href="tel:+573001234567"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${secondaryButtonClasses}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={20} />
                  {content.contact.form.call}
                </motion.a>
              </div>

              {status && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center font-semibold ${
                    status.includes('Error') || status.includes('error')
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </form>

            <div className="mt-8">
              <p 
                className={`text-center mb-4 font-semibold ${isComicMode ? 'text-black' : ''}`}
                style={{ color: getTextColor() }}
              >
                {content.footer.contact_title}
              </p>
              <div className="flex justify-center gap-4">
                <motion.a
                  href="https://github.com/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${socialButtonClasses}`}
                  whileHover={{ scale: 1.1 }}
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${socialButtonClasses}`}
                  whileHover={{ scale: 1.1 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="mailto:tu.email@example.com"
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${socialButtonClasses}`}
                  whileHover={{ scale: 1.1 }}
                  aria-label="Email"
                >
                  <Mail size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
