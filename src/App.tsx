import React, { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { WaitlistModal } from './components/WaitlistModal';
import { 
  CheckCircle2, 
  XCircle,
  PlayCircle, 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Award,
  ArrowRight,
  BookOpen,
  Code2,
  Briefcase,
  Target,
  Clock,
  Zap,
  HelpCircle,
  Calendar,
  Star,
  Loader2
} from 'lucide-react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Divider = () => (
  <div className="w-full flex justify-center py-8 opacity-30">
    <svg width="200" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6C34.5 6 34.5 10 67 10C99.5 10 99.5 2 132 2C164.5 2 164.5 6 198 6" stroke="#688E45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export default function App() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    experience: '',
    whyBatch1: '',
    commitment: ''
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Fire and forget: send the data without waiting for a response
    const now = new Date();
    const payload = {
      form_name: 'Nurture AI Masterclass Application',
      form_source: 'main_application_form',
      full_name: formData.name,
      email_address: formData.email,
      whatsapp_number: formData.whatsapp,
      ghl_experience: formData.experience,
      why_batch_1: formData.whyBatch1,
      commitment_level: formData.commitment,
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
      console.log('Background submission attempt completed');
    });

    // Immediately show success state
    setStatus('success');
  };

  return (
    <div className="min-h-screen bg-paper text-slate-900 overflow-x-hidden font-sans">
      <WaitlistModal />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="https://assets.cdn.filesafe.space/MOufmG93fJ08yYYcm5D2/media/69b1f62c78565a0a5a4f85bc.png" alt="NurtureSol Icon" className="h-6 md:h-8 object-contain" referrerPolicy="no-referrer" />
            <span className="text-lg md:text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Nurture<span className="text-nurture-teal">Sol</span> Lab
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-nurture-teal transition-colors">The Problem</a>
            <a href="#curriculum" className="hover:text-nurture-teal transition-colors">4 Weeks</a>
            <a href="#who" className="hover:text-nurture-teal transition-colors">Who It's For</a>
            <a href="#faq" className="hover:text-nurture-teal transition-colors">FAQ</a>
          </div>
          <a href="#apply" className="bg-nurture-gradient text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-semibold text-xs md:text-sm hover:shadow-lg hover:shadow-nurture-teal/20 transition-all whitespace-nowrap">
            <span className="hidden sm:inline">Apply for Batch 1</span>
            <span className="sm:hidden">Apply Now</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 lg:pt-28 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-mesh -z-10"></div>
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm rounded-full px-4 py-2 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-nurture-teal animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Batch 1 Applications Open</span>
            </div>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
              I'm teaching <span className="text-nurture-gradient">GHL + n8n</span> to 30 people.<br />
              For free.<br />
              <span className="text-2xl lg:text-3xl text-slate-500 font-medium mt-4 block">Because I need to learn how to teach.</span>
            </h1>
            <div className="text-base lg:text-lg text-slate-600 mb-10 max-w-xl leading-relaxed space-y-3">
              <p>I've built 700+ systems. Generated $8M+. Never taught anyone systematically.</p>
              <p>Starting May 1, I'm fixing that. 30 people. 4 weeks. Live sessions.</p>
              <p>If this works, Batch 2 will be paid. If this doesn't, you'll tell me and we'll adjust.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <a href="#apply" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-center hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto">
                Apply for Batch 1 <ArrowRight className="w-5 h-5" />
              </a>
              <div className="text-xs lg:text-sm text-slate-500">
                <p className="font-bold text-slate-700">30 spots. Not first-come-first-served.</p>
                <p>I'm reading every application.</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-6 font-medium">
              Applications close when I find 30 committed people. Or April 15. Whichever comes first.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white/60 backdrop-blur-sm p-4 rounded-[2rem] border border-slate-200/60 shadow-sm w-full sm:w-max">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start pb-4 sm:pb-0 border-b sm:border-b-0 sm:pr-4 border-slate-200">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mastering:</span>
                <img src="https://assets.cdn.filesafe.space/MOufmG93fJ08yYYcm5D2/media/69b1f3e68cb2596aef4c825d.png" alt="GoHighLevel" className="h-6 lg:h-8 object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 shadow-inner w-full sm:w-auto justify-center sm:justify-start">
                <img src="https://assets.cdn.filesafe.space/MOufmG93fJ08yYYcm5D2/media/69b1f54057249b125347c3fa.png" alt="GHL Certified Admin" className="h-12 lg:h-14 object-contain drop-shadow-sm" referrerPolicy="no-referrer" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-nurture-teal uppercase tracking-wider">Official</span>
                  <span className="text-xs font-black text-slate-900 uppercase">Certified Admin</span>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-nurture-gradient opacity-20 blur-3xl rounded-[3rem]"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/60 aspect-[4/3] lg:aspect-square hidden md:block">
              <img 
                src="https://picsum.photos/seed/workspace/1920/1080?blur=2" 
                alt="Authentic workspace with GHL dashboard" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
            {/* Mobile Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/40 aspect-[16/9] md:hidden">
              <img 
                src="https://picsum.photos/seed/typing/800/1200" 
                alt="Hands typing on laptop" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Nurturesol x GHL Banner */}
      <section className="py-12 px-6 bg-slate-900 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-5"></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative z-10">
          <FadeIn className="flex items-center justify-center">
            <img src="https://assets.cdn.filesafe.space/MOufmG93fJ08yYYcm5D2/media/69b1f62c78565a0a5a4f85bc.png" alt="NurtureSol" className="h-12 md:h-16 object-contain drop-shadow-lg" referrerPolicy="no-referrer" />
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-white ml-4">
              Nurture<span className="text-nurture-teal">Sol</span>
            </span>
          </FadeIn>
          
          <FadeIn delay={0.1} className="flex items-center justify-center bg-white/10 p-3 rounded-full border border-white/10">
            <XCircle className="w-6 h-6 text-slate-400" />
          </FadeIn>
          
          <FadeIn delay={0.2} className="flex items-center justify-center">
            <img src="https://assets.cdn.filesafe.space/MOufmG93fJ08yYYcm5D2/media/69b1f3e68cb2596aef4c825d.png" alt="GoHighLevel" className="h-10 md:h-14 object-contain drop-shadow-lg brightness-0 invert" referrerPolicy="no-referrer" />
          </FadeIn>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Here's why I'm <span className="text-nurture-teal">doing this.</span></h2>
          </FadeIn>

          <FadeIn delay={0.1} className="prose prose-lg text-slate-600 max-w-none">
            <p>Every day, talented Pakistani freelancers DM me:</p>
            <blockquote className="border-l-4 border-nurture-teal pl-6 italic my-8 text-slate-700 bg-white/50 p-6 rounded-r-2xl">
              "Zaid, how do I charge more for GHL?"<br/>
              "How do you do those complex integrations?"<br/>
              "Why do US clients pay you $150/hour and me $15?"
            </blockquote>
            <p>I used to say "watch YouTube."</p>
            <p>Lazy answer. I know.</p>
            <p>The truth is, I learned by breaking things for 3 years. 700 projects. Countless failures. Slow growth.</p>
            <p>There's no shortcut for experience. But there is a faster path than figuring it out alone.</p>
            <p className="text-xl font-semibold text-slate-900 mt-8">I want to find 30 people and walk that path with them.</p>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* What This Actually Is */}
      <section className="py-12 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Not a course. <span className="text-nurture-gradient">An experiment.</span></h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn delay={0.1} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">Here's what I'm promising:</h3>
              <ul className="space-y-4">
                {[
                  "4 weeks of live sessions (my screen, your screen, real building)",
                  "WhatsApp group (ask questions, share wins, get unstuck)",
                  "Real projects (bring your problems, we solve them together)",
                  "Messy teaching (I'm learning to teach, you're learning GHL)"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-nurture-green shrink-0 mt-0.5" />
                    <span className="text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">Here's what I'm NOT promising:</h3>
              <ul className="space-y-4">
                {[
                  "Polished videos",
                  "Perfect slides",
                  "Certificates",
                  "Guaranteed results"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-lg text-slate-600">
              If you need polished, wait for Batch 2.<br/>
              If you want perfect, I'm not your guy.
            </p>
            <p className="text-xl font-bold text-slate-900 mt-6">
              If you want to build together, experiment together, figure this out together?<br/>
              Keep reading.
            </p>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* The 4 Weeks */}
      <section id="curriculum" className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">The <span className="text-nurture-teal">4 Weeks</span></h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Week 1 */}
            <FadeIn delay={0.1} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nurture-teal/5 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="text-sm font-bold text-nurture-teal tracking-wider uppercase mb-2">Week 1</div>
              <h3 className="text-2xl font-bold mb-2">GHL Architecture</h3>
              <p className="text-slate-500 text-sm mb-6 flex items-center gap-2"><Calendar className="w-4 h-4"/> May 1-7 | 9 PM Pakistan Time</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-nurture-teal"/> What we'll cover:</h4>
                  <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-2">
                    <li>The 3-question client audit (how I win $5K+ projects)</li>
                    <li>Pipeline psychology (why leads actually go cold)</li>
                    <li>Automation logic (not button-clicking, thinking)</li>
                    <li>Speed-to-lead systems (sub-2-minute response)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-nurture-teal"/> What you'll build:</h4>
                  <p className="text-slate-600 text-sm ml-6">One complete GHL system for your actual work or a client</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Format:</h4>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• 2 live sessions, 2 hours each</li>
                    <li>• You share screen, I guide</li>
                    <li>• WhatsApp support between sessions</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Week 2 */}
            <FadeIn delay={0.2} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nurture-green/5 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="text-sm font-bold text-nurture-green tracking-wider uppercase mb-2">Week 2</div>
              <h3 className="text-2xl font-bold mb-2">n8n Integration</h3>
              <p className="text-slate-500 text-sm mb-6 flex items-center gap-2"><Calendar className="w-4 h-4"/> May 8-14 | 9 PM Pakistan Time</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Code2 className="w-4 h-4 text-nurture-green"/> What we'll cover:</h4>
                  <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-2">
                    <li>Self-hosted n8n (free forever, no Zapier fees)</li>
                    <li>HTTP requests and APIs (the scary stuff, made simple)</li>
                    <li>Webhook debugging (real-time integrations)</li>
                    <li>Error handling (systems that don't break at 2 AM)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-nurture-green"/> What you'll build:</h4>
                  <p className="text-slate-600 text-sm ml-6">2 working integrations (GHL + something else)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Format:</h4>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• 2 live sessions, 2 hours each</li>
                    <li>• Build together, break together, fix together</li>
                    <li>• WhatsApp for when you get stuck (you will, it's normal)</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Week 3 */}
            <FadeIn delay={0.3} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nurture-teal/5 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="text-sm font-bold text-nurture-teal tracking-wider uppercase mb-2">Week 3</div>
              <h3 className="text-2xl font-bold mb-2">Real Projects</h3>
              <p className="text-slate-500 text-sm mb-6 flex items-center gap-2"><Calendar className="w-4 h-4"/> May 15-21 | 9 PM Pakistan Time</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-nurture-teal"/> What we'll cover:</h4>
                  <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-2">
                    <li>You bring your real problems</li>
                    <li>Client projects you're stuck on</li>
                    <li>Integrations you think are "impossible"</li>
                    <li>Pricing and scoping challenges</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-nurture-teal"/> What you'll build:</h4>
                  <p className="text-slate-600 text-sm ml-6">Whatever you actually need for your work</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Format:</h4>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• 2 live sessions, open format</li>
                    <li>• Peer review (students help students)</li>
                    <li>• I facilitate, you build</li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Week 4 */}
            <FadeIn delay={0.4} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nurture-green/5 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="text-sm font-bold text-nurture-green tracking-wider uppercase mb-2">Week 4</div>
              <h3 className="text-2xl font-bold mb-2">The Business Side</h3>
              <p className="text-slate-500 text-sm mb-6 flex items-center gap-2"><Calendar className="w-4 h-4"/> May 22-29 | 9 PM Pakistan Time</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4 text-nurture-green"/> What we'll cover:</h4>
                  <ul className="list-disc list-inside text-slate-600 text-sm space-y-1 ml-2">
                    <li>How I charge 10x for the same work (positioning)</li>
                    <li>Writing proposals that win</li>
                    <li>Documenting for handoffs</li>
                    <li>Building recurring revenue (not just one-time projects)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-nurture-green"/> What you'll build:</h4>
                  <p className="text-slate-600 text-sm ml-6">Your pricing strategy, one proposal template, and system documentation for a real project</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">Format:</h4>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• 2 live sessions, 2 hours each</li>
                    <li>• Real numbers, real examples</li>
                    <li>• Honest conversation about money</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Divider />

      {/* Who This Is For */}
      <section id="who" className="py-12 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">30 spots. Here's who I'm <span className="text-nurture-teal">looking for.</span></h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FadeIn delay={0.1} className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <CheckCircle2 className="text-nurture-teal"/> You:
              </h3>
              <ul className="space-y-4">
                {[
                  "You've used GHL before (not beginner, not expert)",
                  "You've hit a wall with basic setups",
                  "You want to learn integrations but don't know where to start",
                  "You can commit 4 hours/week (2 sessions + practice)",
                  "You're building something real (client work, agency, product)",
                  "You're okay with messy, experimental teaching"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-nurture-teal font-bold">✓</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <XCircle className="text-red-400"/> Not you:
              </h3>
              <ul className="space-y-4">
                {[
                  "Complete beginner (never opened GHL)",
                  "Looking for \"passive income\" without work",
                  "Need polished, perfect instruction",
                  "Can't commit to showing up live",
                  "Want a certificate, not skills"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <span className="text-red-400 font-bold">✗</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="text-center mt-12">
            <h3 className="text-xl font-bold text-white mb-4">What matters:</h3>
            <div className="inline-flex flex-col md:flex-row gap-4 md:gap-8 text-lg font-mono text-nurture-teal bg-white/5 px-8 py-4 rounded-2xl border border-white/10">
              <span>Commitment &gt; Experience</span>
              <span className="hidden md:inline text-white/20">|</span>
              <span>Curiosity &gt; Credentials</span>
              <span className="hidden md:inline text-white/20">|</span>
              <span>Building &gt; Watching</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* The Commitment & What You Get */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">What I'm <span className="text-nurture-teal">asking from you.</span></h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-nurture-teal"/> Time:</h3>
                <ul className="text-slate-600 space-y-1 ml-7">
                  <li>4 weeks (May 1-29, 2026)</li>
                  <li>4 hours/week total</li>
                  <li>- 2 live sessions (2 hours each)</li>
                  <li>- Practice and building between sessions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-nurture-teal"/> Energy:</h3>
                <ul className="text-slate-600 space-y-1 ml-7">
                  <li>Show up live (recordings available but live is better)</li>
                  <li>Ask questions (dumb questions welcome)</li>
                  <li>Help others (when you know, teach)</li>
                  <li>Give feedback (on my teaching, on the format, honestly)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">The real ask:</h3>
                <p className="text-slate-700 font-medium text-lg mb-4">Build in public. Share your wins. Tell me what sucks.</p>
                <p className="text-slate-500 italic">This only works if we're real with each other.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">What <span className="text-nurture-green">you get.</span></h2>
            
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">The tangible:</h3>
                <ul className="space-y-3">
                  {[
                    "16 hours live teaching",
                    "WhatsApp group access (during + after)",
                    "Session recordings",
                    "My actual templates and workflows",
                    "Direct feedback on your projects"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <ArrowRight className="w-5 h-5 text-nurture-green shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">The intangible:</h3>
                <ul className="space-y-3">
                  {[
                    "A group of 29 other builders",
                    "Someone to message when you're stuck",
                    "Honest feedback on your work",
                    "The confidence to charge more",
                    "Proof that you can build complex things"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <ArrowRight className="w-5 h-5 text-nurture-green shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* The Batch 2 Glance */}
      <section className="py-12 px-6 bg-slate-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">After <span className="text-nurture-gradient">this.</span></h2>
            <div className="prose prose-lg text-slate-600 mx-auto">
              <p>If this experiment works—if you actually learn and earn more—I'll probably do it again.</p>
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm my-8 text-left max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Batch 2 (if it happens):</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Mid-May or June</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> Around 20,000 PKR</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> 30 spots (bigger, but still small)</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-slate-400"/> More polished (I'll have practiced)</li>
                </ul>
              </div>

              <p>But that's later.</p>
              <p className="font-bold text-slate-900 text-xl my-6">Right now, this is Batch 1.<br/>Free. Experimental. Real.</p>
              <p>Don't wait for "perfect."<br/>Join the experiment.<br/>Or don't. Your call.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* Application Form */}
      <section id="apply" className="py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/decision/1920/1080" 
            alt="Decision Moment" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper/90 to-paper"></div>
        </div>
        
        <div className="max-w-xl mx-auto relative z-10">
          <FadeIn className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Apply for <span className="text-nurture-teal">1 of 30 spots.</span></h2>
          </FadeIn>
            
          <FadeIn delay={0.1} className="bg-white p-5 md:p-8 rounded-[2rem] shadow-2xl shadow-slate-900/10 border border-slate-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-nurture-gradient opacity-5 blur-2xl -z-10"></div>
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8 py-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Application Received!</h3>
                  <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                    I've sent the <span className="font-bold">Golden Followup System Blueprint</span> to your Gmail ({formData.email}). Please check your email to download it. You'll also receive an invite for <span className="font-bold text-nurture-teal">Session 1 on May 1st</span> shortly.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Steps: Join the Community</p>
                  <div className="grid grid-cols-1 gap-4">
                    <a 
                      href="https://chat.whatsapp.com/K3cdvmBXoYe13FA9IAYEBK" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:border-nurture-teal transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-900">WhatsApp Community</p>
                          <p className="text-xs text-slate-500">Ask questions & get unstuck</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-nurture-teal group-hover:translate-x-1 transition-all" />
                    </a>

                    <a 
                      href="https://whatsapp.com/channel/0029VbCj7dn96H4UnXWy2q2k" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:border-nurture-teal transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-900">WhatsApp Channel</p>
                          <p className="text-xs text-slate-500">Important updates & announcements</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-nurture-teal group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-slate-500">
                  I'll read your application personally and get back to you within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleApply}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400" 
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400" 
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 ml-1">WhatsApp number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-5 border-t border-slate-100">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">
                      Your GHL Experience & Context
                      <span className="block text-[10px] font-normal text-slate-500 normal-case tracking-normal mt-0.5">(How long? What have you built? What are you building right now?)</span>
                    </label>
                    <textarea 
                      required
                      rows={2} 
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                      value={formData.experience}
                      onChange={e => setFormData({...formData, experience: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">
                      Why do you want in on Batch 1 specifically?
                      <span className="block text-[10px] font-normal text-slate-500 normal-case tracking-normal mt-0.5">(Not "because it's free"—why this, why now, why experimental?)</span>
                    </label>
                    <textarea 
                      required
                      rows={2} 
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                      value={formData.whyBatch1}
                      onChange={e => setFormData({...formData, whyBatch1: e.target.value})}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1.5 ml-1">
                      Can you commit to 4 hours/week May 1-29?
                      <span className="block text-[10px] font-normal text-slate-500 normal-case tracking-normal mt-0.5">(Be honest. No judgment, but no flakes.)</span>
                    </label>
                    <textarea 
                      required
                      rows={2} 
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-nurture-teal/50 focus:border-nurture-teal transition-all bg-slate-50 focus:bg-white shadow-sm text-sm text-slate-900 placeholder:text-slate-400 resize-none"
                      value={formData.commitment}
                      onChange={e => setFormData({...formData, commitment: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm text-center font-medium">
                    Something went wrong. Please try again.
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:transform-none"
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <>Join the Batch <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                  <div className="text-center mt-6 text-sm text-slate-600 space-y-1">
                    <p>I'll read every one.</p>
                    <p>If you're in, you'll hear from me within 48 hours.</p>
                    <p>If not, no hard feelings. Batch 2 might be your thing.</p>
                  </div>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">What People Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              I've built 700+ systems. Here's what some of the people I've built for have to say about the work.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Zaid is a GHL wizard. He built our entire automation system in record time and it works flawlessly. Highly recommend!",
                name: "Mark S.",
                role: "CEO, Marketing Agency"
              },
              {
                quote: "The best GHL expert I've worked with. His attention to detail and understanding of business logic is top-notch.",
                name: "Sarah J.",
                role: "Operations Manager"
              },
              {
                quote: "Zaid transformed our sales process. His systems generated more leads in one month than we had in the previous six.",
                name: "David R.",
                role: "Founder, SaaS Startup"
              }
            ].map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 text-lg mb-8 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="https://www.upwork.com/freelancers/~015c2460ebab164918" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
            >
              View all 100+ reviews on Upwork 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* FAQ Section */}
      <section id="faq" className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">FAQ</h2>
          </FadeIn>

          <div className="space-y-6">
            {[
              {
                q: "Is this really free?",
                a: "Yes. Batch 1 only. I'm practicing teaching. You get value. I get practice. Fair trade."
              },
              {
                q: "What if you're terrible at teaching?",
                a: "Then you tell me and we adjust. Or you stop showing up. No contracts. No guilt. Just honest feedback."
              },
              {
                q: "What time are sessions?",
                a: "9 PM Pakistan Time. That's 11 AM US East Coast. Good for Pakistan, good for US clients."
              },
              {
                q: "What if I miss a session?",
                a: "Recordings available within 24 hours. But live is better. For you and for the group energy."
              },
              {
                q: "What about Batch 2?",
                a: "If Batch 1 works, probably mid-May or June. Around 10,000 PKR. 30 spots. But focus on now. This is the free window."
              },
              {
                q: "Will I get a certificate?",
                a: "No. You'll get skills. You'll get projects. You'll get confidence. If you need paper, this isn't for you."
              },
              {
                q: "Can I join the WhatsApp community now?",
                a: "Join the waitlist or submit your application and you will be added to a WhatsApp community and group where you can get updates and ask questions."
              }
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.1} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-nurture-teal/50 transition-colors">
                <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-nurture-teal shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 pl-9 whitespace-pre-line">{faq.a}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <FadeIn>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
              30 people.<br/>
              <span className="text-nurture-teal">4 weeks.</span><br/>
              Starting May 1.
            </h2>
            
            <div className="text-xl text-slate-300 mb-12 space-y-4">
              <p>I'm not promising magic.</p>
              <p>I'm promising to show up, share what I know, and build alongside you.</p>
              <p>If that sounds like what you need, apply.</p>
              <p>If you're waiting for something polished and perfect, wait for Batch 2.</p>
              <p className="font-bold text-white">Either way, no hard feelings.</p>
            </div>
            
            <a href="#apply" className="inline-block bg-nurture-gradient text-white px-10 py-5 rounded-full font-bold text-xl hover:shadow-lg hover:shadow-nurture-teal/20 transition-all transform hover:-translate-y-1 mb-6">
              Apply for Batch 1
            </a>
            
            <p className="text-slate-400 text-sm mb-12">
              Applications close April 15 or when 30 people are selected.<br/>
              Whichever comes first.
            </p>

            <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/20 max-w-2xl mx-auto">
              <MessageCircle className="w-5 h-5 text-nurture-teal shrink-0" />
              <span className="text-slate-300 text-sm">Join the waitlist or submit your application and you will be added to a WhatsApp community and group where you can get updates and ask questions.</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src="https://assets.cdn.filesafe.space/MOufmG93fJ08yYYcm5D2/media/69b1f62c78565a0a5a4f85bc.png" alt="NurtureSol Icon" className="h-8 object-contain" referrerPolicy="no-referrer" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Nurture<span className="text-nurture-teal">Sol</span> Lab
            </span>
            <span className="text-slate-600 font-normal text-2xl">— Batch 1</span>
          </div>
          <p className="text-slate-500">An experiment in teaching what I know.</p>
          
          <div className="pt-8 border-t border-white/5 max-w-md mx-auto">
            <p className="text-white font-bold mb-2">Zaid ul Hassan Khokhar</p>
            <p className="text-sm text-slate-500 mb-6">700+ projects | $8M+ generated | Top 1% Upwork</p>
            <img src="https://assets.cdn.filesafe.space/MOufmG93fJ08yYYcm5D2/media/69b1f54057249b125347c3fa.png" alt="GHL Certified Admin" className="h-24 mx-auto object-contain" referrerPolicy="no-referrer" />
          </div>
          
          <div className="pt-8">
            <a href="https://lab.nurturesol.com" className="text-nurture-teal hover:text-white transition-colors">lab.nurturesol.com</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
