 import React from 'react';
import { Header } from './components/Header';
import { Detector } from './components/Detector';
import { ShieldCheck, Zap, BarChart3, ArrowRight } from 'lucide-react';
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse delay-1000" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-muted-foreground">AI Detection Model v2.0 Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Is Your Content <br />
            <span className="text-primary">Human or Machine?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            The advanced analysis tool for recruiters and creators. Detect AI-generated text instantly and humanize it for maximum engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="#tool" 
              className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-lg transition-all shadow-lg shadow-primary/25 flex items-center"
            >
              Try Detector Free <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="#features" 
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-lg transition-all border border-white/10 backdrop-blur-md"
            >
              How it Works
            </a>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 relative z-10 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why It Matters</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              In the age of AI, authenticity is the new premium. Ensure your content stands out and passes the strictest checks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                title: "For Recruiters",
                desc: "Instantly verify candidate applications and cover letters. Ensure you're hiring real talent, not ChatGPT."
              },
              {
                icon: <Zap className="w-10 h-10 text-blue-400" />,
                title: "For Content Creators",
                desc: "Don't get penalized by search engines. Humanize your AI drafts to rank higher and engage readers."
              },
              {
                icon: <BarChart3 className="w-10 h-10 text-green-400" />,
                title: "Deep Analysis",
                desc: "Get granular insights into sentence structure, perplexity, and burstiness scores."
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors group">
                <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Tool Section */}
      <section id="tool" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
           <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Analyze Your Text</h2>
              <p className="text-muted-foreground">Paste your content below to get started.</p>
           </div>
           <Detector />
        </div>
      </section>
      <footer className="py-12 border-t border-white/5 bg-black/40 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">AI Sentry</h3>
          <p className="text-muted-foreground mb-8">Building trust in the digital age.</p>
          <p className="text-sm text-white/20">&copy; {new Date().getFullYear()} AI Sentry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
export default App;
