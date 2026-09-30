import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  Phone,
  MapPin,
  Instagram,
  Check,
  Send,
  Bot,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

import logo from "./logo.jpg";
import founder from "./founder.jpg";

const WHATSAPP = "https://wa.me/919940277984";

const services = [
  {
    title: "Carpentry Works",
    text: "Precision-built interiors for kitchens, wardrobes, furniture and custom spaces.",
    chatbotDescription:
      "Complete carpentry solutions designed around your space, lifestyle and storage needs.",
    pros: [
      "Custom-built to match your space",
      "Wide range of kitchen and wardrobe solutions",
      "Better storage planning",
      "Flexible designs and finishes",
    ],
    considerations: [
      "Material selection affects the final cost",
      "Custom work requires proper measurements",
      "Finish and hardware quality should be checked before execution",
    ],
    items: [
      "PVC Modular Kitchen",
      "PVC Wardrobes & Doors",
      "WPC Door Works",
      "UPVC Windows",
      "Glass Partitions",
      "Office Furniture",
      "Custom Furniture",
      "CNC Cutting & Partition",
    ],
    image:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Painting & Waterproofing",
    text: "Premium finishes combined with practical protection for beautiful, long-lasting spaces.",
    chatbotDescription:
      "Interior and exterior painting combined with waterproofing solutions for better protection and finish.",
    pros: [
      "Improves the overall appearance",
      "Multiple finish and colour options",
      "Helps protect walls and surfaces",
      "Waterproofing can reduce moisture-related issues",
    ],
    considerations: [
      "Surface preparation is important",
      "Waterproofing requires identifying the source of leakage",
      "Drying and curing time should be considered",
    ],
    items: [
      "Interior Painting",
      "3D Painting",
      "Elevation Painting",
      "Terrace Heat Reflection",
      "Bathroom Waterproofing",
      "Terrace Damp Proofing",
    ],
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Civil Works",
    text: "Complete civil and finishing solutions that bring your interior vision together.",
    chatbotDescription:
      "Civil, flooring and finishing work coordinated as part of your interior or renovation project.",
    pros: [
      "Complete execution under one service",
      "Suitable for renovation and new interiors",
      "Better coordination between civil and interior work",
      "Wide range of finishing options",
    ],
    considerations: [
      "Civil work can create dust and temporary disruption",
      "Project timelines depend on site conditions",
      "Material choices affect budget and maintenance",
    ],
    items: [
      "Tiles & Wooden Flooring",
      "Granite Works",
      "Civil & Demolition",
      "Wall Papers",
      "False Ceiling",
      "PVC False Ceiling",
    ],
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Electrical & Plumbing",
    text: "Modern infrastructure designed around safety, comfort and everyday convenience.",
    chatbotDescription:
      "Electrical and plumbing solutions planned to support safe, practical and comfortable interiors.",
    pros: [
      "Better planning before finishing work",
      "Supports modern appliances and automation",
      "Improves everyday convenience",
      "Can be integrated with interior planning",
    ],
    considerations: [
      "Electrical work should be properly planned before walls are closed",
      "Quality wiring and components matter",
      "Plumbing access should be considered for future maintenance",
    ],
    items: [
      "CCTV Installation",
      "Inverter Wiring",
      "Automation Switches",
      "Motor Control",
      "Electrical Works",
      "Copper Gas Pipe Work",
    ],
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Metal Fabrication",
    text: "Strong and contemporary metal solutions for homes, offices and outdoor spaces.",
    chatbotDescription:
      "Custom metal, aluminium and grille solutions for security, partitions, ventilation and modern design.",
    pros: [
      "Strong and durable solutions",
      "Custom sizes and designs",
      "Useful for security and partitions",
      "Suitable for residential and commercial spaces",
    ],
    considerations: [
      "Design and finish should match the overall interior",
      "Outdoor metalwork needs suitable protection",
      "Measurements should be confirmed before fabrication",
    ],
    items: [
      "SS Grille Gates",
      "MS Grille Gates",
      "Aluminium Mosquito Nets",
      "Sliding Doors",
      "Aluminium Partitions",
    ],
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90",
  },
];

const projects = [
  {
    title: "Contemporary Living",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Modern Kitchen",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Quiet Luxury Bedroom",
    category: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Modern Workspace",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90",
  },
];

/* -------------------------------------------------------
   WHATSAPP LOGO
------------------------------------------------------- */

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
    >
      <path
        d="M16 3C8.82 3 3 8.82 3 16C3 18.3 3.6 20.46 4.65 22.34L3.1 28.9L9.82 27.38C11.65 28.4 13.77 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3Z"
        fill="currentColor"
      />
      <path
        d="M21.55 18.78C21.26 18.64 19.83 17.94 19.57 17.84C19.31 17.74 19.12 17.69 18.92 17.98C18.73 18.27 18.2 18.93 18.04 19.12C17.87 19.31 17.7 19.33 17.41 19.18C17.12 19.04 16.18 18.73 15.07 17.74C14.2 16.97 13.61 16.02 13.45 15.73C13.29 15.44 13.43 15.28 13.57 15.14C13.71 15 13.86 14.78 14 14.61C14.14 14.44 14.19 14.32 14.29 14.13C14.38 13.94 14.34 13.78 14.27 13.64C14.19 13.5 13.61 12.08 13.37 11.5C13.14 10.94 12.91 11.03 12.73 11.02C12.56 11.01 12.37 11 12.18 11C11.99 11 11.68 11.07 11.42 11.36C11.16 11.65 10.42 12.35 10.42 13.77C10.42 15.19 11.44 16.56 11.58 16.75C11.72 16.94 13.58 19.8 16.42 21.03C17.1 21.32 17.63 21.49 18.05 21.62C18.73 21.84 19.35 21.81 19.84 21.74C20.39 21.66 21.53 21.05 21.77 20.39C22.01 19.72 22.01 19.15 21.94 19.03C21.88 18.91 21.74 18.85 21.55 18.78Z"
        fill="white"
      />
    </svg>
  );
}

/* -------------------------------------------------------
   CHATBOT
------------------------------------------------------- */

function Chatbot({ onWhatsApp }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("home");
  const [selectedService, setSelectedService] = useState(null);
  const [name, setName] = useState("");

  const resetChat = () => {
    setStep("home");
    setSelectedService(null);
    setName("");
  };

  const chooseService = (item) => {
    setSelectedService(item);
    setStep("service-detail");
  };

  const startBooking = () => {
    setSelectedService(null);
    setName("");
    setStep("booking-name");
  };

  const chooseBookingService = (item) => {
    setSelectedService(item);
    setStep("booking-confirm");
  };

  const sendEnquiry = () => {
    const customerName = name.trim() || "Customer";
    const serviceName = selectedService?.title || "Interior Services";

    const message = `Hi Sir, I'm ${customerName}. I'm interested in ${serviceName} services from Gururag Interior. I would like to know more and get a quotation.`;

    onWhatsApp(message);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            className="chatbot-launcher"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="chatbot-live-dot" />
            <Bot size={23} />
            <span>We’re Live</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.25 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-agent">
                <div className="chatbot-avatar">
                  <Bot size={21} />
                </div>

                <div>
                  <strong>Gururag Assistant</strong>

                  <span>
                    <i />
                    We’re Live • 24/7
                  </span>
                </div>
              </div>

              <button
                className="chatbot-close"
                onClick={() => setOpen(false)}
              >
                <X size={19} />
              </button>
            </div>

            <div className="chatbot-body">
              {step === "home" && (
                <motion.div
                  className="chatbot-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="chat-message bot-message">
                    <strong>Hi there! 👋</strong>

                    <p>
                      Welcome to Gururag Interior. I can help you
                      explore our services, know about our team, or
                      start an enquiry.
                    </p>
                  </div>

                  <div className="chat-question-label">
                    How can I help you?
                  </div>

                  <div className="chat-options">
                    <button
                      onClick={() => setStep("services")}
                    >
                      <span>01</span>
                      Explore Our Services
                      <ArrowRight size={17} />
                    </button>

                    <button
                      onClick={() => setStep("about")}
                    >
                      <span>02</span>
                      Know About Us
                      <ArrowRight size={17} />
                    </button>

                    <button
                      onClick={startBooking}
                    >
                      <span>03</span>
                      Book / Enquire Now
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "services" && (
                <motion.div
                  className="chatbot-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    className="chat-back"
                    onClick={resetChat}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <h4>Our Services</h4>

                  <p className="chat-subtitle">
                    Choose a service to explore what we offer.
                  </p>

                  <div className="chat-service-list">
                    {services.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => chooseService(item)}
                      >
                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.text}</span>
                        </div>
                        <ArrowRight size={17} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "service-detail" && selectedService && (
                <motion.div
                  className="chatbot-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    className="chat-back"
                    onClick={() => setStep("services")}
                  >
                    <ArrowLeft size={16} />
                    All Services
                  </button>

                  <div className="chat-service-image">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                    />
                  </div>

                  <h4>{selectedService.title}</h4>

                  <p className="chat-description">
                    {selectedService.chatbotDescription}
                  </p>

                  <div className="chat-detail-section">
                    <strong>What you get</strong>

                    {selectedService.items.map((item) => (
                      <div key={item}>
                        <Check size={14} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="chat-detail-section">
                    <strong>Advantages</strong>

                    {selectedService.pros.map((item) => (
                      <div key={item}>
                        <Check size={14} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="chat-detail-section consideration">
                    <strong>Things to consider</strong>

                    {selectedService.considerations.map(
                      (item) => (
                        <div key={item}>
                          <span>•</span>
                          {item}
                        </div>
                      )
                    )}
                  </div>

                  <button
                    className="chat-primary-button"
                    onClick={() => {
                      setName("");
                      setStep("booking-name");
                    }}
                  >
                    Enquire About This
                    <ArrowUpRight size={17} />
                  </button>
                </motion.div>
              )}

              {step === "about" && (
                <motion.div
                  className="chatbot-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    className="chat-back"
                    onClick={resetChat}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <div className="chat-about-image">
                    <img
                      src={founder}
                      alt="Saran Raj"
                    />
                  </div>

                  <span className="chat-mini-label">
                    ABOUT GURURAG INTERIOR
                  </span>

                  <h4>
                    Designed around
                    <br />
                    your life.
                  </h4>

                  <p className="chat-description">
                    Gururag Interior creates refined residential
                    and commercial spaces where thoughtful design,
                    skilled craftsmanship and everyday
                    functionality come together.
                  </p>

                  <div className="chat-stats">
                    <div>
                      <strong>13+</strong>
                      <span>Years Experience</span>
                    </div>

                    <div>
                      <strong>1,500+</strong>
                      <span>Completed Projects</span>
                    </div>
                  </div>

                  <p className="chat-description">
                    Founded and led by{" "}
                    <strong>Saran Raj</strong>, Gururag Interior
                    brings together interior design, carpentry,
                    civil works, finishing and allied solutions
                    with a focus on quality and client
                    satisfaction.
                  </p>

                  <button
                    className="chat-primary-button"
                    onClick={startBooking}
                  >
                    Start an Enquiry
                    <ArrowUpRight size={17} />
                  </button>
                </motion.div>
              )}

              {step === "booking-name" && (
                <motion.div
                  className="chatbot-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    className="chat-back"
                    onClick={resetChat}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <div className="chat-step-number">
                    STEP 1 OF 2
                  </div>

                  <h4>Let's get started.</h4>

                  <p className="chat-subtitle">
                    First, may I know your name?
                  </p>

                  <input
                    className="chat-input"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && name.trim()) {
                        setStep("booking-service");
                      }
                    }}
                    autoFocus
                  />

                  <button
                    className="chat-primary-button"
                    disabled={!name.trim()}
                    onClick={() => setStep("booking-service")}
                  >
                    Continue
                    <ArrowRight size={17} />
                  </button>
                </motion.div>
              )}

              {step === "booking-service" && (
                <motion.div
                  className="chatbot-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    className="chat-back"
                    onClick={() => setStep("booking-name")}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <div className="chat-step-number">
                    STEP 2 OF 2
                  </div>

                  <h4>
                    Nice to meet you,{" "}
                    {name.trim()}.
                  </h4>

                  <p className="chat-subtitle">
                    Which service are you interested in?
                  </p>

                  <div className="chat-service-list compact">
                    {services.map((item) => (
                      <button
                        key={item.title}
                        onClick={() =>
                          chooseBookingService(item)
                        }
                      >
                        <div>
                          <strong>{item.title}</strong>
                        </div>

                        <ArrowRight size={17} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "booking-confirm" && selectedService && (
                <motion.div
                  className="chatbot-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="chat-success-icon">
                    <Check size={25} />
                  </div>

                  <h4>
                    Thanks, {name.trim()}!
                  </h4>

                  <p className="chat-description">
                    You've selected{" "}
                    <strong>
                      {selectedService.title}
                    </strong>
                    .
                  </p>

                  <p className="chat-description">
                    Click below and we'll open WhatsApp so you
                    can directly enquire with Gururag Interior
                    and request a quotation.
                  </p>

                  <button
                    className="chat-whatsapp-button"
                    onClick={sendEnquiry}
                  >
                    <WhatsAppIcon size={21} />
                    Click to Enquire
                  </button>

                  <button
                    className="chat-start-over"
                    onClick={resetChat}
                  >
                    Start Over
                  </button>
                </motion.div>
              )}
            </div>

            <div className="chatbot-footer">
              <span>GURURAG INTERIOR</span>
              <span>CHENNAI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------
   MAIN APP
------------------------------------------------------- */

function App() {
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setService((current) => (current + 1) % services.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    setMenu(false);

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const whatsapp = (message) => {
    window.open(
      `${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const nextService = () => {
    setService(
      (current) => (current + 1) % services.length
    );
  };

  const previousService = () => {
    setService(
      (current) =>
        (current - 1 + services.length) % services.length
    );
  };

  const currentService = services[service];

  return (
    <div className="website">

      {/* NAVBAR */}

      <header className="navbar">
        <button
          className="brand"
          onClick={() => scrollTo("home")}
        >
          <span className="logo-box">
            <img
              src={logo}
              alt="Gururag Interior"
            />
          </span>

          <span className="brand-name">
            <strong>GURURAG</strong>
            <small>INTERIOR</small>
          </span>
        </button>

        <div className="nav-actions">
          <button
            className="whatsapp-button"
            aria-label="WhatsApp"
            onClick={() =>
              whatsapp(
                "Hi Gururag Interior, I would like to get a free quote."
              )
            }
          >
            <WhatsAppIcon size={22} />
          </button>

          <button
            className="menu-button"
            aria-label="Open menu"
            onClick={() => setMenu(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MENU */}

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="menu-header">
                <span>GURURAG INTERIOR</span>

                <button
                  onClick={() => setMenu(false)}
                >
                  <X />
                </button>
              </div>

              <nav>
                <button
                  onClick={() => scrollTo("home")}
                >
                  <small>01</small>
                  Home
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => scrollTo("about")}
                >
                  <small>02</small>
                  About Us
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => scrollTo("services")}
                >
                  <small>03</small>
                  Our Services
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => scrollTo("projects")}
                >
                  <small>04</small>
                  Our Projects
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                >
                  <small>05</small>
                  Contact
                  <ArrowUpRight />
                </button>
              </nav>

              <div className="menu-footer">
                <p>
                  Thoughtful interiors.
                  <br />
                  Crafted with character.
                </p>

                <a href="tel:+919940277984">
                  +91 99402 77984
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}

      <section id="home" className="hero">
        <div className="hero-image" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            INTERIOR DESIGN • TURNKEY SOLUTIONS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.9,
            }}
          >
            Spaces that
            <br />
            <em>feel like home.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            We create refined residential and commercial
            interiors where thoughtful design, skilled
            craftsmanship and everyday functionality come
            together.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              className="yellow-button"
              onClick={() => scrollTo("projects")}
            >
              Explore Projects
              <ArrowUpRight />
            </button>

            <button
              className="line-button"
              onClick={() =>
                whatsapp(
                  "Hi Gururag Interior, I would like to start an interior project."
                )
              }
            >
              Start a Project
              <ArrowUpRight />
            </button>
          </motion.div>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <div />
          <span>CHENNAI • INDIA</span>
        </div>
      </section>

      {/* INTRO */}

      <section className="intro section">
        <div className="label">
          01 — THE STUDIO
        </div>

        <div className="intro-grid">
          <motion.h2
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            Interiors with
            <br />
            <em>meaning.</em>
          </motion.h2>

          <motion.div
            className="intro-text"
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p>
              At Gururag Interior, we believe a beautiful
              space should do more than look good. It should
              feel natural, work effortlessly and reflect the
              people who live or work inside it.
            </p>

            <p>
              From detailed carpentry and modern kitchens to
              civil works, finishing and complete turnkey
              solutions, we bring every layer together with
              one clear vision.
            </p>

            <button
              className="dark-link"
              onClick={() => scrollTo("about")}
            >
              Discover our story
              <ArrowUpRight />
            </button>
          </motion.div>
        </div>

        <div className="intro-images">
          <motion.img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90"
            alt="Luxury interior"
            initial={{
              scale: 1.1,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.1,
            }}
          />

          <motion.img
            className="small-image"
            src="https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1000&q=90"
            alt="Interior detail"
            initial={{
              y: 80,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
          />
        </div>
      </section>

      {/* ABOUT */}

      <section
        id="about"
        className="about section"
      >
        <div className="label light">
          02 — ABOUT US
        </div>

        <div className="about-heading">
          <h2>
            Designed around
            <br />
            <em>your life.</em>
          </h2>

          <p>
            Gururag Interior is built around a simple idea —
            every space deserves its own character.
          </p>
        </div>

        {/* FOUNDER */}

        <div className="founder">
          <div className="founder-photo">
            <img
              src={founder}
              alt="Saran Raj"
            />

            <div className="photo-gradient" />

            <span>
              FOUNDER
              <br />
              GURURAG INTERIOR
            </span>
          </div>

          <div className="founder-info">
            <div className="label mint">
              THE PERSON BEHIND THE VISION
            </div>

            <h3>
              Saran
              <br />
              <em>Raj.</em>
            </h3>

            <div className="stats">
              <div>
                <strong>13+</strong>
                <span>Years Experience</span>
              </div>

              <div>
                <strong>1,500+</strong>
                <span>Completed Projects</span>
              </div>
            </div>

            <p>
              With over 13 years of experience across
              interior, construction and renovation
              solutions, Saran Raj leads Gururag Interior
              with a strong focus on craftsmanship, detail
              and client satisfaction.
            </p>

            <p>
              His approach combines thoughtful design with
              practical execution, creating spaces that are
              distinctive, comfortable and built around the
              people who use them.
            </p>

            <div className="signature">
              Saran Raj
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section
        id="services"
        className="services section"
      >
        <div className="label light">
          03 — OUR SERVICES
        </div>

        <div className="services-heading">
          <h2>
            From concept
            <br />
            to <em>completion.</em>
          </h2>

          <p>
            Complete interior, renovation, civil and allied
            solutions managed with one design vision.
          </p>
        </div>

        <div className="service-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.title}
              className="service-card"
              initial={{
                opacity: 0,
                x: 60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -60,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <div className="service-image">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                />
              </div>

              <div className="service-content">
                <span className="service-number">
                  SERVICE 0{service + 1}
                </span>

                <h3>
                  {currentService.title}
                </h3>

                <p>
                  {currentService.text}
                </p>

                <div className="service-list">
                  {currentService.items.map(
                    (item) => (
                      <div key={item}>
                        <Check />
                        {item}
                      </div>
                    )
                  )}
                </div>

                <button
                  className="service-link"
                  onClick={() =>
                    whatsapp(
                      `Hi Gururag Interior, I am interested in ${currentService.title}.`
                    )
                  }
                >
                  Enquire About This Service
                  <ArrowUpRight />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls">
            <button onClick={previousService}>
              <ArrowLeft />
            </button>

            <div className="dots">
              {services.map((item, index) => (
                <button
                  key={item.title}
                  className={
                    index === service
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setService(index)
                  }
                />
              ))}
            </div>

            <button onClick={nextService}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* PROJECTS */}

      <section
        id="projects"
        className="projects section"
      >
        <div className="label">
          04 — OUR PROJECTS
        </div>

        <div className="projects-heading">
          <h2>
            Spaces made
            <br />
            to be <em>lived in.</em>
          </h2>

          <p>
            A collection of modern interior directions shaped
            by comfort, proportion and timeless detailing.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              className={
                index === 0
                  ? "project project-large"
                  : "project"
              }
              key={project.title}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="project-arrow">
                  <ArrowUpRight />
                </div>
              </div>

              <div className="project-info">
                <span>
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="cta">
        <div className="cta-image" />
        <div className="cta-overlay" />

        <div className="cta-content">
          <span className="label mint">
            YOUR SPACE. YOUR STORY.
          </span>

          <h2>
            Let's create
            <br />
            something <em>beautiful.</em>
          </h2>

          <button
            className="yellow-button"
            onClick={() =>
              whatsapp(
                "Hi Gururag Interior, I would like to discuss my interior project."
              )
            }
          >
            Start Your Project
            <ArrowUpRight />
          </button>
        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="contact section"
      >
        <div className="label">
          05 — CONTACT
        </div>

        <div className="contact-grid">
          <div>
            <h2>
              Let's talk
              <br />
              <em>interiors.</em>
            </h2>

            <p>
              Have a home, office or renovation project in
              mind? Tell us what you are planning and let's
              build something around it.
            </p>

            <div className="contact-details">
              <a href="tel:+919940277984">
                <Phone />
                +91 99402 77984
              </a>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon size={22} />
                WhatsApp
              </a>

              <div>
                <MapPin />
                Chennai, Tamil Nadu
              </div>
            </div>
          </div>

          <div className="quote-card">
            <span className="label mint">
              GET A FREE QUOTE
            </span>

            <h3>
              Tell us about
              <br />
              your project.
            </h3>

            <p>
              Send your project type, location and reference
              images directly through WhatsApp.
            </p>

            <button
              className="yellow-button"
              onClick={() =>
                whatsapp(
                  "Hi Gururag Interior, I would like a free quote."
                )
              }
            >
              WhatsApp Us
              <ArrowUpRight />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">
              <img
                src={logo}
                alt="Gururag Interior"
              />
            </span>

            <div>
              <strong>GURURAG</strong>
              <small>INTERIOR</small>
            </div>
          </div>

          <p>
            Thoughtful interiors,
            <br />
            crafted with character.
          </p>

          <div className="socials">
            <a href="#">
              <Instagram />
            </a>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={21} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Gururag Interior
          </span>

          <span>
            Saran Raj • Founder
          </span>
        </div>
      </footer>

      {/* AI-STYLE CHAT ASSISTANT */}

      <Chatbot onWhatsApp={whatsapp} />
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <App />
);
