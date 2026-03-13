"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Server, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Shield,
  Activity
} from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-2xl text-gray-900 tracking-tight">PredictX AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/login" className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all font-semibold">Login</Link>
          <Link href="/register" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-semibold">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-32 max-w-7xl mx-auto text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
            Next-Gen Predictive Intelligence
          </span>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.1]">
            Empower Your Infrastructure <br />
            <span className="text-blue-600">with AI Predictions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            PredictX AI leverages advanced machine learning to forecast electricity demand, 
            detect server failures before they happen, and monitor PC health for peak performance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/dashboard" 
              className="group px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center"
            >
              Open Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section id="features" className="px-8 py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Industry Modules</h2>
            <p className="text-gray-500 text-lg">Scalable prediction models designed for reliability and speed.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Electricity Demand',
                desc: 'Optimize energy consumption with data-driven demand forecasting.',
                icon: Zap,
                color: 'bg-yellow-50 text-yellow-600'
              },
              {
                title: 'Server Failure',
                desc: 'Identify hardware and network anomalies before downtime occurs.',
                icon: Server,
                color: 'bg-blue-50 text-blue-600'
              },
              {
                title: 'PC Health & Crash',
                desc: 'Monitor thermal metrics and predict system instability in real-time.',
                icon: Cpu,
                color: 'bg-purple-50 text-purple-600'
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <Link href="/dashboard" className="text-blue-600 font-semibold flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 underline decoration-blue-600 decoration-4 underline-offset-8">
              Why PredictX?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              In a world where infrastructure failures can cost millions, reactive maintenance is no longer enough. 
              Our platform provides a proactive approach by analyzing historical and real-time metrics to forecast system behavior.
            </p>
            <div className="space-y-4">
              {[
                'Real-time data processing and analysis',
                '99% accuracy in demand forecasting',
                'Instant risk alerts via WebSocket',
                'Modular & scalable architecture'
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="text-blue-600 w-6 h-6" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl relative z-10">
              <div className="flex justify-between items-center mb-10">
                <Shield className="w-12 h-12 opacity-80" />
                <Activity className="w-12 h-12 opacity-80" />
              </div>
              <p className="text-2xl font-bold mb-4">Enterprise Grade Security</p>
              <p className="text-blue-100 mb-8">
                Your data is encrypted end-to-end with enterprise-level security protocols and JWT-based authentication.
              </p>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-blue-400 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm mt-4 text-blue-200">Trusted by 500+ tech lead teams</p>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <BarChart3 className="text-blue-600 w-6 h-6" />
            <span className="font-bold text-xl text-gray-900">PredictX AI</span>
          </div>
          <div className="flex space-x-8 text-gray-500 font-medium">
            <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <Link href="/dashboard/electricity" className="hover:text-blue-600 transition-colors">Modules</Link>
            <Link href="https://github.com/predictx" className="hover:text-blue-600 transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          </div>
          <div className="mt-6 md:mt-0 text-gray-400 text-sm">
            © 2024 PredictX AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
