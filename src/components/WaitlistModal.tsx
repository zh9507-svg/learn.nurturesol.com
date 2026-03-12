import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, Gift, ArrowRight, MessageCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ghlExperience: '',
    learningGoals: ''
  });

  useEffect(() => {
    // Open automatically after 1.5 seconds
    const timer = setTimeout(() => {
      // Removed localStorage check so it always shows up for testing
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic phone number validation
    const phoneRegex = /^[\d\s\+\-\(\)]{7,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus('error');
      setErrorMessage('Please enter a valid WhatsApp phone number.');
      return;
    }

    setErrorMessage(null);
    setStatus('submitting');

    // Fire and forget: send the data without waiting for a response
    const now = new Date();
    const payload = {
      form_name: 'Nurture AI Masterclass Waitlist',
      form_source: 'waitlist_modal',
      full_name: formData.name,
      email_address: formData.email,
      whatsapp_number: formData.phone,
      ghl_experience: formData.ghlExperience,
      learning_goals: formData.learningGoals,
      submission_date: now.toLocaleDateString('en-GB'), // DD/MM/YYYY
      submission_time: now.toLocaleTimeString('en-GB'), // HH:MM:SS
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp_iso: now.toISOString()
    };

    fetch('https://hook.eu2.make.com/th1zuzo5yrl77nncdh348o0u11q3lbsi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(error => {
      console.log('Waitlist background submission attempt completed');
    });

    // Immediately show success state
    setStatus('success');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl shadow-slate-900/20 border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-nurture-gradient opacity-10 blur-2xl -z-10"></div>

            <button 
              onClick={closeModal}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 bg-slate-50/50 hover:bg-white border border-slate-100/50 hover:border-slate-200 rounded-full transition-all z-10 shadow-sm hover:shadow-md group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="p-5 sm:p-6 overflow-y-auto">
              <div className="flex flex-col items-center text-center mb-5">
                <div className="flex items-center justify-center w-12 h-12 bg-nurture-gradient text-white rounded-2xl shadow-lg shadow-nurture-teal/20 mb-3">
                  <Gift className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
                  {status === 'success' ? "You're on the list!" : "Join the Batch 1 Waitlist"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
                  {status === 'success' 
                    ? "Welcome to the experiment. Here's what happens next."
                    : <>Sign up and get my <span className="font-bold text-nurture-teal">Golden Followup System Blueprint</span> sent straight to your inbox.</>
                  }
                </p>
              </div>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 my-4"
                >
                  <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-sm text-emerald-800 leading-relaxed">
                        <p className="font-bold mb-1">Check your Gmail ({formData.email})</p>
                        <p>I've sent you the <span className="font-bold">Golden Followup System Blueprint</span>. Please check your email to download it. You'll also receive an official invite for <span className="font-bold text-emerald-900">Session 1 on May 1st</span> shortly.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Join the Community</p>
                    <div className="grid grid-cols-1 gap-3">
                      <a 
                        href="https://chat.whatsapp.com/K3cdvmBXoYe13FA9IAYEBK" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:border-nurture-teal transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">WhatsApp Community</p>
                            <p className="text-[10px] text-slate-500">Ask questions & get unstuck</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-nurture-teal group-hover:translate-x-1 transition-all" />
                      </a>

                      <a 
                        href="https://whatsapp.com/channel/0029VbCj7dn96H4UnXWy2q2k" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:border-nurture-teal transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                            <Zap className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">WhatsApp Channel</p>
                            <p className="text-[10px] text-slate-500">Important updates & announcements</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-nurture-teal group-hover:translate-x-1 transition-all" />
                      </a>
                    </div>
                  </div>

                  <button 
                    onClick={closeModal}
                    className="w-full py-3 text-slate-500 hover:text-slate-900 text-sm font-bold transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">Gmail Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400"
                      placeholder="you@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">Your GHL Experience</label>
                    <select 
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900"
                      value={formData.ghlExperience}
                      onChange={e => setFormData({...formData, ghlExperience: e.target.value})}
                    >
                      <option value="" disabled>Select your level</option>
                      <option value="Beginner (Just starting out)">Beginner (Just starting out)</option>
                      <option value="Intermediate (Built a few workflows)">Intermediate (Built a few workflows)</option>
                      <option value="Advanced (Managing multiple clients)">Advanced (Managing multiple clients)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">What do you want to learn most?</label>
                    <textarea 
                      required
                      rows={2}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="Specific workflows, client acquisition, integrations..."
                      value={formData.learningGoals}
                      onChange={e => setFormData({...formData, learningGoals: e.target.value})}
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="p-2 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs text-center font-medium">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-slate-900 text-white font-bold py-3 mt-4 rounded-xl hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:transform-none text-sm"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <>Get the Blueprint <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
