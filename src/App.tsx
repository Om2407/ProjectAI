import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import CodeGenerator from './components/CodeGenerator';
import ProjectShowcase from './components/ProjectShowcase';
import MusicPlayer from './components/MusicPlayer';
import KonamiCode from './components/KonamiCode';
import ChatBot from './components/ChatBot';
import CSS3DHero from './components/CSS3DHero';
// import ThreeHero from './components/ThreeHero'; // Temporarily disabled
import { 
  Zap, 
  Globe, 
  Smartphone, 
  Code, 
  Palette, 
  Shield, 
  ArrowRight, 
  Check, 
  Star,
  Menu,
  X,
  Bot,
  Play,
  Timer,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showAIBuilder, setShowAIBuilder] = useState(true);
  const [currentHowItWorksSlide, setCurrentHowItWorksSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Design",
      description: "Let our advanced AI create stunning websites tailored to your brand in seconds"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "SEO Optimized",
      description: "Built-in SEO optimization ensures your website ranks higher on search engines"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Responsive",
      description: "Every website is automatically optimized for all devices and screen sizes"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Production-ready, clean code that's easy to maintain and extend"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Custom Themes",
      description: "Choose from hundreds of professional themes or let AI create a unique design"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Fast",
      description: "Enterprise-grade security with lightning-fast loading speeds"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for personal projects and small businesses",
      features: [
        "5 AI-generated websites",
        "Basic customization",
        "Mobile responsive design",
        "SSL certificate included",
        "24/7 support"
      ],
      isPopular: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses and agencies",
      features: [
        "Unlimited AI websites",
        "Advanced customization",
        "SEO optimization tools",
        "Analytics dashboard",
        "Custom domain support",
        "Priority support",
        "White-label options"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Professional",
        "Advanced AI models",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom branding",
        "Advanced security features"
      ],
      isPopular: false
    }
  ];

  const testimonials = [
    {
      name: "Om Gupta",
      role: "Full Stack Developer",
      company: "Decode@Chn",
      content: "Building this AI website builder has been an incredible journey. The power of Google Gemini API combined with modern web technologies enables creators to bring their ideas to life instantly.",
      rating: 5,
      imageUrl: "/site.jpg"
    }
  ];

  const howItWorksSlides = [
    {
      id: 1,
      title: "1. Describe Your Vision",
      description: "Tell our AI about your business, goals, and preferences in plain English. Our advanced AI understands context and creates exactly what you need.",
      image: "/project2a.png",
      icon: <Timer className="w-8 h-8 text-white" />
    },
    {
      id: 2,
      title: "2. Live Preview & Edit",
      description: "See your website come to life instantly with our live preview. Make changes, test functionality, and perfect your design in real-time.",
      image: "/project2b.png",
      icon: <Play className="w-8 h-8 text-white" />
    },
    {
      id: 3,
      title: "3. Go Full Screen and Deploy Instantly",
      description: "Launch your website to the world with one click. Deploy to Netlify, Vercel, or download your files for any hosting platform.",
      image: "/project2b.png",
      icon: <Globe className="w-8 h-8 text-white" />
    }
  ];

  const nextHowItWorksSlide = () => {
    setCurrentHowItWorksSlide((prev) => (prev + 1) % howItWorksSlides.length);
  };

  const prevHowItWorksSlide = () => {
    setCurrentHowItWorksSlide((prev) => (prev - 1 + howItWorksSlides.length) % howItWorksSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextHowItWorksSlide, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToAIBuilder = () => {
    setShowAIBuilder(true);
    setTimeout(() => {
      document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Konami Code Easter Egg */}
      <KonamiCode />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Decode@Chn</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Reviews</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Back on Top</a>
              
              <button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105" 
                onClick={scrollToAIBuilder}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
              <div className="px-4 py-4 space-y-4">
                <a href="#features" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#projects" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#how-it-works" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>How it Works</a>
                <a href="#pricing" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</a>
                <a href="#testimonials" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Reviews</a>
                <button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300" 
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToAIBuilder();
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 sm:px-8 lg:px-16 relative">
        {/* 3D CSS Background */}
        <div className="absolute inset-0 w-full h-full opacity-80">
          <CSS3DHero />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <TypeAnimation
                sequence={[
                  'Create Professional Websites',
                  2000,
                  'Build Stunning Web Apps',
                  2000,
                  'Design Beautiful Interfaces',
                  2000,
                  'Launch Your Dream Project',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
              {/* <br />
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent opacity-20">
                From Decode@Chn
              </span> */}
            </h1>
            
            <p className="text-xl text-white/80 mb-10 pt-5 max-w-3xl mx-auto leading-relaxed">
              Build beautiful, responsive websites with our intuitive tools and modern templates. 
              From concept to launch in minutes, not months.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button 
                className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
                onClick={scrollToAIBuilder}
              >
                Start Building Now
                <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                className="group flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>View Projects</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">9876+</div>
                <div className="text-white/60">Websites Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98.9%</div>
                <div className="text-white/60">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">569+</div>
                <div className="text-white/60">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <div id="projects" className="pt-0">
        <ProjectShowcase />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Modern Websites</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Professional tools and features that help you build stunning websites that convert
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              From Idea to Website in
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 3 Simple Steps</span>
            </h2>
          </div>

          <div className="relative">
            {/* Image Carousel */}
            <div className="overflow-hidden rounded-2xl mb-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentHowItWorksSlide * 100}%)` }}
              >
                {howItWorksSlides.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <div className="relative w-full rounded-2xl overflow-hidden">
                      <div className="absolute top-6 left-6 z-10">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                          {slide.icon}
                        </div>
                      </div>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Section */}
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                {howItWorksSlides[currentHowItWorksSlide].title}
              </h3>
              <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                {howItWorksSlides[currentHowItWorksSlide].description}
              </p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevHowItWorksSlide}
              className="absolute left-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextHowItWorksSlide}
              className="absolute right-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {howItWorksSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHowItWorksSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentHowItWorksSlide 
                      ? 'bg-purple-500 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Code Generator */}
      {showAIBuilder && <CodeGenerator />}

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Perfect Plan</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Start free, scale as you grow. All plans include our core AI website building features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                  plan.isPopular 
                    ? 'border-purple-400 ring-2 ring-purple-400/50 scale-105' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/60 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  onClick={scrollToAIBuilder}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Built with
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Passion</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A message from the creator of Decode@Chn
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-md"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-6 leading-relaxed text-center text-lg">"{testimonial.content}"</p>
                <div className="text-center">
                  <div className="font-semibold text-white text-xl">{testimonial.name}</div>
                  <div className="text-white/60">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who've transformed their online presence with Decode@Chn. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={scrollToAIBuilder}
            >
              Start Building Now
            </button>
            <button 
              className="text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Examples
            </button>
          </div>
        </div>
      </section>

       {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Decode@Chn</span>
              </div>
              <p className="text-white/70 mb-4">
                Empowering developers and creators with cutting-edge tools to build exceptional web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/70">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="https://github.com/Om2407" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/om-gupta-4a3549294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/om_gupta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <span>Twitter</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="font-semibold text-white mb-4">Contact Me</h3>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:omgupta203@gmail.com" className="text-white/70 hover:text-white transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>omgupta203@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919876543210" className="text-white/70 hover:text-white transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+91 98765 43210</span>
                  </a>
                </li>
                <li>
                  <div className="text-white/70 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Bhopal, India</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/70">
              © 2025 Decode@Chn. All rights reserved. Built with ❤️ by Om Gupta for the future of GenAI and web development.
            </p>
          </div>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer />

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}

export default App;
// import { useState, useEffect } from 'react';
// import { TypeAnimation } from 'react-type-animation';
// import CodeGenerator from './components/CodeGenerator';
// import ProjectShowcase from './components/ProjectShowcase';
// import MusicPlayer from './components/MusicPlayer';
// import KonamiCode from './components/KonamiCode';
// import ChatBot from './components/ChatBot';
// import { 
//   Zap, 
//   Globe, 
//   Smartphone, 
//   Code, 
//   Palette, 
//   Shield, 
//   ArrowRight, 
//   Check, 
//   Star,
//   Menu,
//   X,
//   Bot,
//   Play,
//   Timer,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [showAIBuilder, setShowAIBuilder] = useState(true);
//   const [currentHowItWorksSlide, setCurrentHowItWorksSlide] = useState(0);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const features = [
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "AI-Powered Design",
//       description: "Let our advanced AI create stunning websites tailored to your brand in seconds"
//     },
//     {
//       icon: <Globe className="w-8 h-8" />,
//       title: "SEO Optimized",
//       description: "Built-in SEO optimization ensures your website ranks higher on search engines"
//     },
//     {
//       icon: <Smartphone className="w-8 h-8" />,
//       title: "Mobile Responsive",
//       description: "Every website is automatically optimized for all devices and screen sizes"
//     },
//     {
//       icon: <Code className="w-8 h-8" />,
//       title: "Clean Code",
//       description: "Production-ready, clean code that's easy to maintain and extend"
//     },
//     {
//       icon: <Palette className="w-8 h-8" />,
//       title: "Custom Themes",
//       description: "Choose from hundreds of professional themes or let AI create a unique design"
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Secure & Fast",
//       description: "Enterprise-grade security with lightning-fast loading speeds"
//     }
//   ];

//   const pricingPlans = [
//     {
//       name: "Starter",
//       price: "$9",
//       period: "/month",
//       description: "Perfect for personal projects and small businesses",
//       features: [
//         "5 AI-generated websites",
//         "Basic customization",
//         "Mobile responsive design",
//         "SSL certificate included",
//         "24/7 support"
//       ],
//       isPopular: false
//     },
//     {
//       name: "Professional",
//       price: "$29",
//       period: "/month",
//       description: "Ideal for growing businesses and agencies",
//       features: [
//         "Unlimited AI websites",
//         "Advanced customization",
//         "SEO optimization tools",
//         "Analytics dashboard",
//         "Custom domain support",
//         "Priority support",
//         "White-label options"
//       ],
//       isPopular: true
//     },
//     {
//       name: "Enterprise",
//       price: "$99",
//       period: "/month",
//       description: "For large organizations with advanced needs",
//       features: [
//         "Everything in Professional",
//         "Advanced AI models",
//         "Custom integrations",
//         "Dedicated account manager",
//         "SLA guarantee",
//         "Custom branding",
//         "Advanced security features"
//       ],
//       isPopular: false
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Om Gupta",
//       role: "Full Stack Developer",
//       company: "Decode@Chn",
//       content: "Building this AI website builder has been an incredible journey. The power of Google Gemini API combined with modern web technologies enables creators to bring their ideas to life instantly.",
//       rating: 5,
//       imageUrl: "/site.jpg"
//     }
//   ];

//   const howItWorksSlides = [
//     {
//       id: 1,
//       title: "1. Describe Your Vision",
//       description: "Tell our AI about your business, goals, and preferences in plain English. Our advanced AI understands context and creates exactly what you need.",
//       image: "/project2a.png",
//       icon: <Timer className="w-8 h-8 text-white" />
//     },
//     {
//       id: 2,
//       title: "2. Live Preview & Edit",
//       description: "See your website come to life instantly with our live preview. Make changes, test functionality, and perfect your design in real-time.",
//       image: "/project2b.png",
//       icon: <Play className="w-8 h-8 text-white" />
//     },
//     {
//       id: 3,
//       title: "3. Go Full Screen and Deploy Instantly",
//       description: "Launch your website to the world with one click. Deploy to Netlify, Vercel, or download your files for any hosting platform.",
//       image: "/project2b.png",
//       icon: <Globe className="w-8 h-8 text-white" />
//     }
//   ];

//   const nextHowItWorksSlide = () => {
//     setCurrentHowItWorksSlide((prev) => (prev + 1) % howItWorksSlides.length);
//   };

//   const prevHowItWorksSlide = () => {
//     setCurrentHowItWorksSlide((prev) => (prev - 1 + howItWorksSlides.length) % howItWorksSlides.length);
//   };

//   useEffect(() => {
//     const timer = setInterval(nextHowItWorksSlide, 4000);
//     return () => clearInterval(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const scrollToAIBuilder = () => {
//     setShowAIBuilder(true);
//     setTimeout(() => {
//       document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Konami Code Easter Egg */}
//       <KonamiCode />
      
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/10 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl font-bold text-white">Decode@Chn</span>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
//               <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
//               <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</a>
//               <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
//               <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Reviews</a>
//               <a href="#" className="text-white/80 hover:text-white transition-colors">Back on Top</a>
              
//               <button 
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105" 
//                 onClick={scrollToAIBuilder}
//               >
//                 Get Started
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-white p-2"
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
//               <div className="px-4 py-4 space-y-4">
//                 <a href="#features" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
//                 <a href="#projects" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
//                 <a href="#how-it-works" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>How it Works</a>
//                 <a href="#pricing" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</a>
//                 <a href="#testimonials" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Reviews</a>
//                 <button 
//                   className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300" 
//                   onClick={() => {
//                     setIsMenuOpen(false);
//                     scrollToAIBuilder();
//                   }}
//                 >
//                   Get Started
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-40 pb-24 px-6 sm:px-8 lg:px-16">
//         <div className="max-w-7xl mx-auto">
//           <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//               <TypeAnimation
//                 sequence={[
//                   'Create Professional Websites',
//                   2000,
//                   'Build Stunning Web Apps',
//                   2000,
//                   'Design Beautiful Interfaces',
//                   2000,
//                   'Launch Your Dream Project',
//                   2000,
//                 ]}
//                 wrapper="span"
//                 speed={50}
//                 repeat={Infinity}
//               />
//               <br />
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 From Decode@Chn
//               </span>
//             </h1>
            
//             <p className="text-xl text-white/80 mb-10 pt-5 max-w-3xl mx-auto leading-relaxed">
//               Build beautiful, responsive websites with our intuitive tools and modern templates. 
//               From concept to launch in minutes, not months.
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
//               <button 
//                 className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
//                 onClick={scrollToAIBuilder}
//               >
//                 Start Building Now
//                 <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </button>
              
//               <button 
//                 className="group flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
//                 onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
//               >
//                 <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
//                   <Play className="w-5 h-5 ml-1" />
//                 </div>
//                 <span>View Projects</span>
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">9876+</div>
//                 <div className="text-white/60">Websites Created</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">98.9%</div>
//                 <div className="text-white/60">Uptime Guarantee</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">569+</div>
//                 <div className="text-white/60">Happy Customers</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Project Showcase */}
//       <div id="projects" className="pt-0">
//         <ProjectShowcase />
//       </div>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               Everything You Need for
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Modern Websites</span>
//             </h2>
//             <p className="text-xl text-white/80 max-w-3xl mx-auto">
//               Professional tools and features that help you build stunning websites that convert
//             </p>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
//               >
//                 <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
//                 <p className="text-white/70 leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               From Idea to Website in
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 3 Simple Steps</span>
//             </h2>
//           </div>

//           <div className="relative">
//             {/* Image Carousel */}
//             <div className="overflow-hidden rounded-2xl mb-8">
//               <div 
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentHowItWorksSlide * 100}%)` }}
//               >
//                 {howItWorksSlides.map((slide) => (
//                   <div key={slide.id} className="w-full flex-shrink-0">
//                     <div className="relative w-full rounded-2xl overflow-hidden">
//                       <div className="absolute top-6 left-6 z-10">
//                         <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
//                           {slide.icon}
//                         </div>
//                       </div>
//                       <img
//                         src={slide.image}
//                         alt={slide.title}
//                         className="w-full h-auto object-contain"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Text Section */}
//             <div className="text-center mt-6">
//               <h3 className="text-2xl font-bold text-white mb-4">
//                 {howItWorksSlides[currentHowItWorksSlide].title}
//               </h3>
//               <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
//                 {howItWorksSlides[currentHowItWorksSlide].description}
//               </p>
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevHowItWorksSlide}
//               className="absolute left-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
            
//             <button
//               onClick={nextHowItWorksSlide}
//               className="absolute right-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>

//             {/* Dots Indicator */}
//             <div className="flex justify-center space-x-2 mt-6">
//               {howItWorksSlides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentHowItWorksSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentHowItWorksSlide 
//                       ? 'bg-purple-500 scale-125' 
//                       : 'bg-white/30 hover:bg-white/50'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* AI Code Generator */}
//       {showAIBuilder && <CodeGenerator />}

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               Choose Your
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Perfect Plan</span>
//             </h2>
//             <p className="text-xl text-white/80 max-w-3xl mx-auto">
//               Start free, scale as you grow. All plans include our core AI website building features.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {pricingPlans.map((plan, index) => (
//               <div 
//                 key={index}
//                 className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
//                   plan.isPopular 
//                     ? 'border-purple-400 ring-2 ring-purple-400/50 scale-105' 
//                     : 'border-white/10 hover:border-white/20'
//                 }`}
//               >
//                 {plan.isPopular && (
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                       Most Popular
//                     </div>
//                   </div>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
//                   <p className="text-white/70 mb-4">{plan.description}</p>
//                   <div className="flex items-baseline justify-center">
//                     <span className="text-4xl font-bold text-white">{plan.price}</span>
//                     <span className="text-white/60 ml-1">{plan.period}</span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-center">
//                       <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
//                       <span className="text-white/80">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button 
//                   className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
//                     plan.isPopular
//                       ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
//                       : 'bg-white/10 text-white hover:bg-white/20'
//                   }`}
//                   onClick={scrollToAIBuilder}
//                 >
//                   Get Started
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               Built with
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Passion</span>
//             </h2>
//             <p className="text-xl text-white/80 max-w-3xl mx-auto">
//               A message from the creator of Decode@Chn
//             </p>
//           </div>

//           <div className="max-w-2xl mx-auto">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
//                 <div className="flex justify-center mb-4">
//                   <img
//                     src={testimonial.imageUrl}
//                     alt={testimonial.name}
//                     className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-md"
//                   />
//                 </div>
//                 <div className="flex justify-center mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-white/80 mb-6 leading-relaxed text-center text-lg">"{testimonial.content}"</p>
//                 <div className="text-center">
//                   <div className="font-semibold text-white text-xl">{testimonial.name}</div>
//                   <div className="text-white/60">{testimonial.role}, {testimonial.company}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//             Ready to Build Your Dream Website?
//           </h2>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Join thousands of businesses who've transformed their online presence with Decode@Chn. 
//             Start your journey today.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <button 
//               className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
//               onClick={scrollToAIBuilder}
//             >
//               Start Building Now
//             </button>
//             <button 
//               className="text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
//               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
//             >
//               View Examples
//             </button>
//           </div>
//         </div>
//       </section>

//        {/* Footer */}
//       <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {/* Brand Section */}
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold text-white">Decode@Chn</span>
//               </div>
//               <p className="text-white/70 mb-4">
//                 Empowering developers and creators with cutting-edge tools to build exceptional web experiences.
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="font-semibold text-white mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-white/70">
//                 <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
//                 <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
//                 <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
//               </ul>
//             </div>

//             {/* Social Links */}
//             <div>
//               <h3 className="font-semibold text-white mb-4">Connect</h3>
//               <ul className="space-y-2 text-white/70">
//                 <li>
//                   <a href="https://github.com/Om2407" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                     </svg>
//                     <span>GitHub</span>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="https://www.linkedin.com/in/om-gupta-4a3549294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                     </svg>
//                     <span>LinkedIn</span>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="https://twitter.com/om_gupta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                     </svg>
//                     <span>Twitter</span>
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Contact Section */}
//             <div>
//               <h3 className="font-semibold text-white mb-4">Contact Me</h3>
//               <ul className="space-y-3">
//                 <li>
//                   <a href="mailto:omgupta203@gmail.com" className="text-white/70 hover:text-white transition-colors flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     <span>omgupta203@gmail.com</span>
//                   </a>
//                 </li>
//                 <li>
//                   <a href="tel:+919876543210" className="text-white/70 hover:text-white transition-colors flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                     <span>+91 1234567890</span>
//                   </a>
//                 </li>
//                 <li>
//                   <div className="text-white/70 flex items-center space-x-2">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span>Bhopal, India</span>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-white/10 mt-12 pt-8 text-center">
//             <p className="text-white/70">
//               © 2025 Decode@Chn. All rights reserved. Built with ❤️ by Om Gupta for the future of GenAI and web development.
//             </p>
//           </div>
//         </div>
//       </footer>

//       {/* Music Player */}
//       <MusicPlayer />

//       {/* ChatBot */}
//       <ChatBot />
//     </div>
//   );
// }

// export default App;
// import { useState, useEffect } from 'react';
// import CodeGenerator from './components/CodeGenerator';
// import ProjectShowcase from './components/ProjectShowcase';
// import { 
//   Zap, 
//   Globe, 
//   Smartphone, 
//   Code, 
//   Palette, 
//   Shield, 
//   ArrowRight, 
//   Check, 
//   Star,
//   Menu,
//   X,
//   Bot,
//   Play,
//   Timer,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [showAIBuilder, setShowAIBuilder] = useState(true);
//   const [currentHowItWorksSlide, setCurrentHowItWorksSlide] = useState(0);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const features = [
//     {
//       icon: <Zap className="w-8 h-8" />,
//       title: "AI-Powered Design",
//       description: "Let our advanced AI create stunning websites tailored to your brand in seconds"
//     },
//     {
//       icon: <Globe className="w-8 h-8" />,
//       title: "SEO Optimized",
//       description: "Built-in SEO optimization ensures your website ranks higher on search engines"
//     },
//     {
//       icon: <Smartphone className="w-8 h-8" />,
//       title: "Mobile Responsive",
//       description: "Every website is automatically optimized for all devices and screen sizes"
//     },
//     {
//       icon: <Code className="w-8 h-8" />,
//       title: "Clean Code",
//       description: "Production-ready, clean code that's easy to maintain and extend"
//     },
//     {
//       icon: <Palette className="w-8 h-8" />,
//       title: "Custom Themes",
//       description: "Choose from hundreds of professional themes or let AI create a unique design"
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Secure & Fast",
//       description: "Enterprise-grade security with lightning-fast loading speeds"
//     }
//   ];

//   const pricingPlans = [
//     {
//       name: "Starter",
//       price: "$9",
//       period: "/month",
//       description: "Perfect for personal projects and small businesses",
//       features: [
//         "5 AI-generated websites",
//         "Basic customization",
//         "Mobile responsive design",
//         "SSL certificate included",
//         "24/7 support"
//       ],
//       isPopular: false
//     },
//     {
//       name: "Professional",
//       price: "$29",
//       period: "/month",
//       description: "Ideal for growing businesses and agencies",
//       features: [
//         "Unlimited AI websites",
//         "Advanced customization",
//         "SEO optimization tools",
//         "Analytics dashboard",
//         "Custom domain support",
//         "Priority support",
//         "White-label options"
//       ],
//       isPopular: true
//     },
//     {
//       name: "Enterprise",
//       price: "$99",
//       period: "/month",
//       description: "For large organizations with advanced needs",
//       features: [
//         "Everything in Professional",
//         "Advanced AI models",
//         "Custom integrations",
//         "Dedicated account manager",
//         "SLA guarantee",
//         "Custom branding",
//         "Advanced security features"
//       ],
//       isPopular: false
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Santosh Shenoy",
//       role: "Software Engineer",
//       company: "Uber",
//       content: "KarRish delivers fast, clean, and scalable code. It's like having an expert dev team working in the background.",
//       rating: 5,
//       imageUrl: "https://media.licdn.com/dms/image/v2/D4D22AQFQBDomCcFHGQ/feedshare-shrink_1280/B4DZXNtkZzHAAk-/0/1742913031155?e=1755129600&v=beta&t=CqXmjSevBMjrGRhzht366xx8HLj2Vf6SHvAdMacAQnk"
//     },
//     {
//       name: "Rohit Negi",
//       role: "Founder",
//       company: "CoderArmy",
//       content: "As a Gen-AI instructor, I was skeptical about AI-generated websites. KarRish proved me wrong with its attention to detail and design quality.",
//       rating: 5,
//       imageUrl: "https://yt3.googleusercontent.com/ytc/AIdro_kMl44oPi4fNs0L0DhQxsXWFhMWym0bfH3tagBnNeBkNyc=s900-c-k-c0x00ffffff-no-rj"
//     },
//     {
//       name: "Sagar Shah",
//       role: "Founder",
//       company: "ChessBase India",
//       content: "KarRish helped us showcase our chess ecosystem beautifully. The UI is intuitive, and everything just works.",
//       rating: 5,
//       imageUrl: "https://www.profileage.com/wp-content/uploads/2024/10/sagar_shah.jpg"
//     }
//   ];

//   const howItWorksSlides = [
//     {
//       id: 1,
//       title: "1. Describe Your Vision",
//       description: "Tell our AI about your business, goals, and preferences in plain English. Our advanced AI understands context and creates exactly what you need.",
//       image: "/screenshots/step1-describe.png",
//       icon: <Timer className="w-8 h-8 text-white" />
//     },
//     {
//       id: 2,
//       title: "2. Live Preview & Edit",
//       description: "See your website come to life instantly with our live preview. Make changes, test functionality, and perfect your design in real-time.",
//       image: "/screenshots/step3-preview.png",
//       icon: <Play className="w-8 h-8 text-white" />
//     },
//     {
//       id: 3,
//       title: "3. Go Full Screen and Deploy Instantly",
//       description: "Launch your website to the world with one click. Deploy to Netlify, Vercel, or download your files for any hosting platform.",
//       image: "/screenshots/step4-deploy.png",
//       icon: <Globe className="w-8 h-8 text-white" />
//     }
//   ];

//   const nextHowItWorksSlide = () => {
//     setCurrentHowItWorksSlide((prev) => (prev + 1) % howItWorksSlides.length);
//   };

//   const prevHowItWorksSlide = () => {
//     setCurrentHowItWorksSlide((prev) => (prev - 1 + howItWorksSlides.length) % howItWorksSlides.length);
//   };

//   useEffect(() => {
//     const timer = setInterval(nextHowItWorksSlide, 4000);
//     return () => clearInterval(timer);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const scrollToAIBuilder = () => {
//     setShowAIBuilder(true);
//     setTimeout(() => {
//       document.getElementById('ai-builder')?.scrollIntoView({ behavior: 'smooth' });
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/10 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl font-bold text-white">Decode@Chn</span>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
//               <a href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
//               <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How it Works</a>
//               <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
//               <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Reviews</a>
//               <a href="#" className="text-white/80 hover:text-white transition-colors">Back on Top</a>
              
//               <button 
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105" 
//                 onClick={scrollToAIBuilder}
//               >
//                 Get Started
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-white p-2"
//               >
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
//               <div className="px-4 py-4 space-y-4">
//                 <a href="#features" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
//                 <a href="#projects" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
//                 <a href="#how-it-works" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>How it Works</a>
//                 <a href="#pricing" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</a>
//                 <a href="#testimonials" className="block text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Reviews</a>
//                 <button 
//                   className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300" 
//                   onClick={() => {
//                     setIsMenuOpen(false);
//                     scrollToAIBuilder();
//                   }}
//                 >
//                   Get Started
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-40 pb-24 px-6 sm:px-8 lg:px-16">
//         <div className="max-w-7xl mx-auto">
//           <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//               Create Professional Websites
//               <br />
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 From Decode@Chn
//               </span>
//             </h1>
            
//             <p className="text-xl text-white/80 mb-10 pt-5 max-w-3xl mx-auto leading-relaxed">
//               Build beautiful, responsive websites with our intuitive tools and modern templates. 
//               From concept to launch in minutes, not months.
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
//               <button 
//                 className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
//                 onClick={scrollToAIBuilder}
//               >
//                 Start Building Now
//                 <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//               </button>
              
//               <button 
//                 className="group flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
//                 onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
//               >
//                 <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
//                   <Play className="w-5 h-5 ml-1" />
//                 </div>
//                 <span>View Projects</span>
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">9876+</div>
//                 <div className="text-white/60">Websites Created</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">98.9%</div>
//                 <div className="text-white/60">Uptime Guarantee</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-2">569+</div>
//                 <div className="text-white/60">Happy Customers</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Project Showcase */}
//       <div id="projects" className="pt-0">
//         <ProjectShowcase />
//       </div>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm overflow-hidden">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               Everything You Need for
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Modern Websites</span>
//             </h2>
//             <p className="text-xl text-white/80 max-w-3xl mx-auto">
//               Professional tools and features that help you build stunning websites that convert
//             </p>
//           </div>

//           {/* Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index}
//                 className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2"
//               >
//                 <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
//                 <p className="text-white/70 leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               From Idea to Website in
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 3 Simple Steps</span>
//             </h2>
//           </div>

//           <div className="relative">
//             {/* Image Carousel */}
//             <div className="overflow-hidden rounded-2xl mb-8">
//               <div 
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentHowItWorksSlide * 100}%)` }}
//               >
//                 {howItWorksSlides.map((slide) => (
//                   <div key={slide.id} className="w-full flex-shrink-0">
//                     <div className="relative w-full rounded-2xl overflow-hidden">
//                       <div className="absolute top-6 left-6 z-10">
//                         <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
//                           {slide.icon}
//                         </div>
//                       </div>
//                       <img
//                         src={slide.image}
//                         alt={slide.title}
//                         className="w-full h-auto object-contain"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Text Section */}
//             <div className="text-center mt-6">
//               <h3 className="text-2xl font-bold text-white mb-4">
//                 {howItWorksSlides[currentHowItWorksSlide].title}
//               </h3>
//               <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
//                 {howItWorksSlides[currentHowItWorksSlide].description}
//               </p>
//             </div>

//             {/* Navigation Arrows */}
//             <button
//               onClick={prevHowItWorksSlide}
//               className="absolute left-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
            
//             <button
//               onClick={nextHowItWorksSlide}
//               className="absolute right-4 top-48 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>

//             {/* Dots Indicator */}
//             <div className="flex justify-center space-x-2 mt-6">
//               {howItWorksSlides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentHowItWorksSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentHowItWorksSlide 
//                       ? 'bg-purple-500 scale-125' 
//                       : 'bg-white/30 hover:bg-white/50'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* AI Code Generator */}
//       {showAIBuilder && <CodeGenerator />}

//       {/* Pricing Section */}
//       <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               Choose Your
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Perfect Plan</span>
//             </h2>
//             <p className="text-xl text-white/80 max-w-3xl mx-auto">
//               Start free, scale as you grow. All plans include our core AI website building features.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {pricingPlans.map((plan, index) => (
//               <div 
//                 key={index}
//                 className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
//                   plan.isPopular 
//                     ? 'border-purple-400 ring-2 ring-purple-400/50 scale-105' 
//                     : 'border-white/10 hover:border-white/20'
//                 }`}
//               >
//                 {plan.isPopular && (
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                       Most Popular
//                     </div>
//                   </div>
//                 )}

//                 <div className="text-center mb-8">
//                   <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
//                   <p className="text-white/70 mb-4">{plan.description}</p>
//                   <div className="flex items-baseline justify-center">
//                     <span className="text-4xl font-bold text-white">{plan.price}</span>
//                     <span className="text-white/60 ml-1">{plan.period}</span>
//                   </div>
//                 </div>

//                 <ul className="space-y-4 mb-8">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-center">
//                       <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
//                       <span className="text-white/80">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button 
//                   className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
//                     plan.isPopular
//                       ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
//                       : 'bg-white/10 text-white hover:bg-white/20'
//                   }`}
//                   onClick={scrollToAIBuilder}
//                 >
//                   Get Started
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//               Loved by
//               <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Thousands</span>
//             </h2>
//             <p className="text-xl text-white/80 max-w-3xl mx-auto">
//               See what our customers are saying about their Decode@Chn experience
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2">
//                 <div className="flex justify-center mb-4">
//                   <img
//                     src={testimonial.imageUrl}
//                     alt={testimonial.name}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
//                   />
//                 </div>
//                 <div className="flex justify-center mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-white/80 mb-6 leading-relaxed text-center">"{testimonial.content}"</p>
//                 <div className="text-center">
//                   <div className="font-semibold text-white">{testimonial.name}</div>
//                   <div className="text-white/60 text-sm">{testimonial.role}, {testimonial.company}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//             Ready to Build Your Dream Website?
//           </h2>
//           <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
//             Join thousands of businesses who've transformed their online presence with Decode@Chn. 
//             Start your journey today.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <button 
//               className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
//               onClick={scrollToAIBuilder}
//             >
//               Start Building Now
//             </button>
//             <button 
//               className="text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
//               onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
//             >
//               View Examples
//             </button>
//           </div>
//         </div>
//       </section>

//        {/* Footer */}
//       <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <span className="text-xl font-bold text-white">Decode@Chn</span>
//               </div>
//               <p className="text-white/70 mb-4">
//                 Empowering developers and creators with cutting-edge tools to build exceptional web experiences.
//               </p>
//             </div>
//             </div>

//             {/* <div>
//               <h3 className="font-semibold text-white mb-4">Product Summary</h3>
//               <ul className="space-y-2 text-white/70">
//                 <li><a href="#" className="hover:text-white transition-colors">Back on Top</a></li>
//                 <li><a href="https://github.com/google/generative-ai-docs" className="hover:text-white transition-colors">Generative AI</a></li>
//                 <li><a href="https://nodejs.org/en" className="hover:text-white transition-colors">Node JS</a></li>
//                 <li><a href="https://www.postman.com/api-platform/api-documentation/" className="hover:text-white transition-colors">API</a></li>
//               </ul>
//             </div> */}

//             {/* <div>
//               <h3 className="font-semibold text-white mb-4">My Coding Journey</h3>
//               <ul className="space-y-2 text-white/70">
//                 <li><a href="https://codeforces.com/profile/tenperformer" className="hover:text-white transition-colors">Codeforces</a></li>
//                 <li><a href="https://www.codechef.com/users/rishabh_55" className="hover:text-white transition-colors">Codechef</a></li>
//                 <li><a href="https://leetcode.com/u/Tenperformer7/" className="hover:text-white transition-colors">Leetcode</a></li>
//                 <li><a href="https://www.geeksforgeeks.org/user/rishabhs82nm/" className="hover:text-white transition-colors">GeeksForGeeks</a></li>
//               </ul>
//             </div> */}

//             {/* <div>
//               <h3 className="font-semibold text-white mb-4">About the Creator</h3>
//               <ul className="space-y-2 text-white/70">
//                 <li><a href="https://www.linkedin.com/in/rishabh-shenoy-3b3566286/" className="hover:text-white transition-colors">LinkedIn</a></li>
//                 <li><a href="https://github.com/CodingEnthusiastic" className="hover:text-white transition-colors">Github</a></li>
//                 <li><a href="https://www.chess.com/member/tenperformer" className="hover:text-white transition-colors">Chess.com</a></li>
//                 <li><a href="https://www.crosswalk.com/devotionals/" className="hover:text-white transition-colors">Devotion</a></li>
//               </ul>
//             </div>
//           </div> */}

//           <div className="border-t border-white/10 mt-12 pt-8 text-center">
//             <p className="text-white/70">
//               © 2025 Decode@Chn. All rights reserved. Built with ❤️ by Om Gupta for the future of GenAI and web development.
//             </p>
//           </div>
//         </div>
//       </footer>

//       {/* Fixed ChatBot Button */}
//       <a 
//         href="https://chatbotindia.netlify.app/"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 z-50 flex items-center space-x-2"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//         </svg>
//         <span className="font-semibold">ChatBot India</span>
//       </a>
//     </div>
//   );
// }

// export default App;