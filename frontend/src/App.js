import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star, Users, Award, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import "./App.css";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen}
            currentSection={currentSection}
            scrollToSection={scrollToSection}
            isScrolled={isScrolled}
          />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const HomePage = ({ isMenuOpen, setIsMenuOpen, currentSection, scrollToSection, isScrolled }) => {
  return (
    <div className="relative">
      <Navigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
      />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ContactSection />
    </div>
  );
};

const Navigation = ({ isMenuOpen, setIsMenuOpen, currentSection, scrollToSection, isScrolled }) => {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-gold/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
              <span className="text-gold font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gold">CampaHill</h1>
              <p className="text-sm text-gold/70">Weddings</p>
            </div>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`text-white hover:text-gold transition-colors duration-300 relative ${
                  currentSection === item.id ? "text-gold" : ""
                }`}
              >
                {item.label}
                {currentSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <button
            className="md:hidden text-white hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg border-t border-gold/20"
          >
            <div className="container mx-auto px-6 py-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 text-white hover:text-gold transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-black">
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/19168723/pexels-photo-19168723.jpeg')`
          }}
        ></motion.div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gold leading-tight"
          >
            Sacred Traditions
            <br />
            <span className="text-white">Perfect Ceremonies</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl md:text-2xl text-gold/90 max-w-2xl mx-auto leading-relaxed"
          >
            Exquisite Nepali wedding accessories crafted with love and tradition. 
            From ceremonial thalis to decorative umbrellas, we bring authenticity to your special moments.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(220, 38, 38, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Collection
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gold text-gold px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold hover:text-black transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gold"
      >
        <ChevronRight className="rotate-90" size={32} />
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  const stats = [
    { number: "500+", label: "Weddings Served", icon: Users },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Happy Clients", icon: Star }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-black via-red-950 to-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gold mb-6">
            Our Heritage
          </h2>
          <p className="text-xl text-gold/80 max-w-3xl mx-auto leading-relaxed">
            Preserving the sacred traditions of Nepali weddings through authentic craftsmanship and timeless beauty.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-4">Traditional Craftsmanship</h3>
              <p className="text-gold/70 leading-relaxed">
                Every piece in our collection is carefully curated to honor the rich cultural heritage of Nepal. 
                Our artisans use traditional techniques passed down through generations, ensuring each item 
                carries the authentic spirit of Nepali celebrations.
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-4">Event Planning Excellence</h3>
              <p className="text-gold/70 leading-relaxed">
                We understand that event planners need reliability, quality, and authenticity. 
                Our comprehensive collection and dedicated service ensure your clients' special 
                moments are celebrated with the dignity and beauty they deserve.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1658251367683-40189a394b40"
                alt="Traditional Nepali Wedding"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gold/20"
                >
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gold">{stat.number}</div>
                  <div className="text-sm text-gold/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProductsSection = () => {
  const products = [
    {
      name: "Traditional Thali Sets",
      description: "Authentic brass and silver thali sets for sacred ceremonies",
      image: "https://images.pexels.com/photos/5994302/pexels-photo-5994302.jpeg",
      features: ["Handcrafted", "Multiple Sizes", "Premium Quality"]
    },
    {
      name: "Ceremonial Umbrellas",
      description: "Decorative umbrellas for wedding processions and celebrations",
      image: "https://images.unsplash.com/photo-1612170482263-b7e393c4e87f",
      features: ["Vibrant Colors", "Traditional Designs", "Durable Materials"]
    },
    {
      name: "Floral Arrangements",
      description: "Fresh and artificial flower sets for traditional decorations",
      image: "https://images.pexels.com/photos/5713647/pexels-photo-5713647.jpeg",
      features: ["Seasonal Varieties", "Custom Arrangements", "Long-lasting"]
    },
    {
      name: "Bridal Accessories",
      description: "Complete sets of traditional jewelry and ornaments",
      image: "https://images.pexels.com/photos/19168699/pexels-photo-19168699.jpeg",
      features: ["Gold Plated", "Authentic Designs", "Comfortable Fit"]
    },
    {
      name: "Decorative Items",
      description: "Ceremonial decorations and traditional ornaments",
      image: "https://images.unsplash.com/photo-1514830902516-48e20ae0ced9",
      features: ["Handmade", "Cultural Significance", "Premium Finish"]
    },
    {
      name: "Ritual Essentials",
      description: "Complete sets for traditional Nepali wedding rituals",
      image: "https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a",
      features: ["Authentic Items", "Blessed Materials", "Complete Sets"]
    }
  ];

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-red-950 via-black to-red-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gold mb-6">
            Sacred Collection
          </h2>
          <p className="text-xl text-gold/80 max-w-3xl mx-auto leading-relaxed">
            Discover our curated selection of traditional Nepali wedding accessories, 
            each piece crafted to honor sacred traditions and create unforgettable moments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-black/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gold mb-3">{product.name}</h3>
                  <p className="text-gold/70 mb-4">{product.description}</p>
                  
                  <div className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gold rounded-full"></div>
                        <span className="text-sm text-gold/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-black via-red-950 to-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gold mb-6">
            Let's Create Magic Together
          </h2>
          <p className="text-xl text-gold/80 max-w-3xl mx-auto leading-relaxed">
            Ready to plan an unforgettable Nepali wedding? Contact us today to discuss your vision and discover how we can bring traditional beauty to your special event.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gold font-semibold">Phone</p>
                    <p className="text-gold/70">+977 1234567890</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gold font-semibold">Email</p>
                    <p className="text-gold/70">info@campahillweddings.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gold font-semibold">Location</p>
                    <p className="text-gold/70">Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-gold font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full bg-black/50 border border-gold/30 rounded-xl px-4 py-3 text-white placeholder-gold/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label className="block text-gold font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-black/50 border border-gold/30 rounded-xl px-4 py-3 text-white placeholder-gold/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gold font-semibold mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full bg-black/50 border border-gold/30 rounded-xl px-4 py-3 text-white placeholder-gold/50 focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your event planning needs..."
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default App;