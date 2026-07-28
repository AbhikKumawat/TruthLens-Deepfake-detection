"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, PlayCircle, CheckCircle2, FileText, Share2, Zap, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    { icon: Shield, title: 'Deepfake Detection', desc: 'Advanced AI models detect face swaps, lip sync anomalies, and voice cloning.' },
    { icon: PlayCircle, title: 'Frame Analysis', desc: 'Frame-by-frame deep dive to identify micro-inconsistencies missed by human eyes.' },
    { icon: CheckCircle2, title: 'Authenticity Score', desc: 'Get a clear, actionable score (0-100) indicating the likelihood of manipulation.' },
    { icon: FileText, title: 'PDF Reports', desc: 'Export detailed technical analysis reports for compliance and auditing.' },
    { icon: Share2, title: 'Multi-Platform Publishing', desc: 'Automatically publish verified content to social platforms with our trust badge.' },
    { icon: Zap, title: 'Real-time Processing', desc: 'Lightning-fast analysis delivering results in under 30 seconds for most videos.' },
  ];

  const faqs = [
    { q: 'How accurate is the AI detection?', a: 'Our models are trained on millions of data points and currently achieve a 99.2% accuracy rate in detecting known manipulation techniques.' },
    { q: 'Which platforms do you support for publishing?', a: 'We currently support direct publishing to YouTube, X (Twitter), LinkedIn, and TikTok.' },
    { q: 'Is my data secure?', a: 'Yes. All videos are processed in secure, isolated environments and are immediately deleted unless you choose to save the report.' },
    { q: 'Do you offer an API?', a: 'Yes, our Enterprise plan includes full REST API access for seamless integration.' },
    { q: 'What video formats are supported?', a: 'We support MP4, MOV, AVI, and WEBM up to 4K resolution.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-white" />
            <span className="font-bold text-xl tracking-tight">TruthLens</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-sm font-medium hover:text-muted transition-colors">Login</Link>
            <Link href="/auth" className="bg-white text-black px-4 py-2 rounded-btn text-sm font-medium hover:bg-gray-200 transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
        >
          Verify Before You Publish
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto"
        >
          The most advanced AI video authenticity and deepfake detection platform. Protect your brand reputation with military-grade frame analysis.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth" className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-btn text-base font-medium hover:bg-gray-200 transition-colors">
            Get Started Free
          </Link>
          <button className="w-full sm:w-auto border border-border px-8 py-3 rounded-btn text-base font-medium hover:bg-surface-50 transition-colors flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5" /> Watch Demo
          </button>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="border-y border-border bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-around gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">10M+</div>
            <div className="text-sm text-muted mt-1">Videos Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold">99.2%</div>
            <div className="text-sm text-muted mt-1">Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold">&lt; 30s</div>
            <div className="text-sm text-muted mt-1">Processing Time</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Enterprise-grade Analysis</h2>
          <p className="text-muted">Everything you need to ensure content authenticity.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-surface-50 border border-border rounded-card hover:bg-surface-100 hover:border-muted transition-all group"
            >
              <f.icon className="w-8 h-8 mb-4 text-muted group-hover:text-white transition-colors" />
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4 bg-surface-50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted">Three simple steps to complete peace of mind.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-border -z-10" />
            {[
              { step: 1, title: 'Upload Video', desc: 'Drag and drop your video file.' },
              { step: 2, title: 'AI Analysis', desc: 'Our engines scan frame-by-frame.' },
              { step: 3, title: 'Get Report', desc: 'Receive instant authenticity score.' }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center bg-surface-50 p-4 mb-8 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-black border border-border flex items-center justify-center text-xl font-bold mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted text-center max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-muted">Plans that scale with your needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Free', price: '$0', desc: 'For individuals', features: ['10 videos / month', 'Standard analysis', '720p max resolution'] },
            { name: 'Pro', price: '$49', desc: 'For creators', features: ['Unlimited videos', 'Deep frame analysis', '4K resolution', 'PDF Reports', 'Auto-publishing'], popular: true },
            { name: 'Enterprise', price: 'Custom', desc: 'For teams', features: ['API Access', 'Dedicated support', 'Custom models', 'SLA'] }
          ].map((p, i) => (
            <div key={i} className={`p-8 rounded-card border ${p.popular ? 'border-white bg-surface-100 relative' : 'border-border bg-surface-50'}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-3 py-1 text-xs font-bold rounded-full">Most Popular</span>}
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <div className="mb-4"><span className="text-4xl font-bold">{p.price}</span><span className="text-muted">/mo</span></div>
              <p className="text-sm text-muted mb-6">{p.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-btn font-medium transition-colors ${p.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-surface-200 hover:bg-surface-100 text-white'}`}>
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-card bg-surface-50 overflow-hidden">
              <button 
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-100 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium text-left">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 py-4 text-muted text-sm border-t border-border">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 text-muted">
          <Shield className="w-6 h-6" />
          <span className="font-bold">TruthLens</span>
        </div>
        <p className="text-sm text-muted mb-6">© 2024 TruthLens AI. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm text-muted">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </footer>
    </div>
  );
}
