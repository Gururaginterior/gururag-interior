import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  MessageCircle,
  Check,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

import logo from "./logo.jpg";
import founder from "./founder.jpg";

const WHATSAPP_NUMBER = "919940277984";
const PHONE_NUMBER = "+91 99402 77984";

const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

const services = [
  {
    number: "01",
    title: "Carpentry Works",
    description:
      "Precision-built interiors for kitchens, wardrobes, doors, furniture and custom spaces.",
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
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    title: "Painting & Waterproofing",
    description:
      "Beautiful finishes with protection that keeps your interiors and exteriors looking refined.",
    items: [
      "Interior Painting",
      "3D Painting",
      "Elevation Painting",
      "Terrace Heat Reflection",
      "Bathroom Waterproofing",
      "Terrace Damp Proofing",
    ],
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "03",
    title: "Civil Works",
    description:
      "Complete civil and finishing solutions that bring the design together from floor to ceiling.",
    items: [
      "Tiles & Wooden Flooring",
      "Granite Works",
      "Civil & Demolition",
      "Wall Papers",
      "False Ceiling",
      "PVC False Ceiling",
    ],
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "04",
    title: "Electrical & Plumbing",
    description:
      "Reliable infrastructure designed around modern comfort, safety and everyday convenience.",
    items: [
      "CCTV Installation",
      "Inverter Wiring",
      "Automation Switches",
      "Motor Control",
      "Electrical Works",
      "Copper Gas Pipe Work",
    ],
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "05",
    title: "Metal Fabrication",
    description:
      "Strong, clean and contemporary metal solutions for homes, offices and outdoor spaces.",
    items: [
      "SS Grille Gates",
      "MS Grille Gates",
      "Aluminium Mosquito Nets",
      "Sliding Doors",
      "Aluminium Partitions",
    ],
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "06",
    title: "Landscape & Other Works",
    description:
      "Thoughtful outdoor additions that extend the character of your interior into the surroundings.",
    items: [
      "Terrace Garden",
      "Water Landscape",
      "Garden Works",
      "Pigeon Net",
      "Outdoor Improvements",
    ],
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1400&q=90",
  },
];

const projects = [
  {
    title: "Contemporary Living",
    type: "Residential",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Modern Kitchen",
    type: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Quiet Luxury Bedroom",
    type: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Modern Workspace",
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((current) => (current + 1) % services.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const nextService = () => {
    setServiceIndex((current) => (current + 1) % services.length);
  };

  const previousService = () => {
    setServiceIndex(
      (current) => (current - 1 + services.length) % services.length
    );
  };

  const scrollTo = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const openWhatsApp = (message) => {
    const finalMessage =
      message ||
      "Hi Gururag Interior, I would like to discuss an interior project.";

    window.open(
      `${whatsappLink}?text=${encodeURIComponent(finalMessage)}`,
      "_blank"
    );
  };

  const service = services[serviceIndex];

  return (
    <div className="site">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <button
          className="brand"
          onClick={() => scrollTo("home")}
          aria-label="Gururag Interior Home"
        >
          <div className="logo-container">
            <img
              src={logo}
              alt="Gururag Interior Logo"
              className="company-logo"
            />
          </div>

          <div className="brand-text">
            <strong>GURURAG</strong>
            <span>INTERIOR</span>
          </div>
        </button>

        <div className="nav-right">

          <button
            className="navbar-whatsapp"
            onClick={() =>
              openWhatsApp(
                "Hi Gururag Interior, I would like to get a free quote."
              )
            }
            aria-label="Contact Gururag Interior on WhatsApp"
          >
            <MessageCircle size={21} />
          </button>

          <button
            className="quote-button"
            onClick={() =>
              openWhatsApp(
                "Hi Gururag Interior, I would like to get a free quote."
              )
            }
          >
            Get Free Quote
            <ArrowUpRight size={16} />
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </header>

      {/* ================= MENU ================= */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >

            <motion.aside
              className="menu-panel"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="menu-top">

                <span>GURURAG INTERIOR</span>

                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X />
                </button>

              </div>

              <nav className="menu-links">

                {[
                  ["home", "Home"],
                  ["about", "About Us"],
                  ["services", "Our Services"],
                  ["projects", "Our Projects"],
                  ["contact", "Contact"],
                ].map(([id, title], index) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                  >
                    <small>
                      0{index + 1}
                    </small>

                    <span>
                      {title}
                    </span>

                    <ArrowUpRight size={20} />
                  </button>
                ))}

              </nav>

              <div className="menu-bottom">

                <p>
                  Thoughtful interiors.
                  <br />
                  Crafted for everyday living.
                </p>

                <a href={`tel:${WHATSAPP_NUMBER}`}>
                  {PHONE_NUMBER}
                </a>

              </div>

            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HERO ================= */}

      <section id="home" className="hero">

        <motion.div
          className="hero-background"
          initial={{
            scale: 1.08,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        />

        <div className="hero-shade" />

        <div className="hero-content">

          <Reveal>

            <div className="hero-kicker">
              <span />
              INTERIOR DESIGN • TURNKEY SOLUTIONS
            </div>

          </Reveal>

          <Reveal delay={0.08}>

            <h1>
              Spaces that
              <br />
              <em>feel like home.</em>
            </h1>

          </Reveal>

          <Reveal delay={0.14}>

            <p className="hero-description">
              Gururag Interior creates refined residential and commercial
              spaces where thoughtful design, quality craftsmanship and
              everyday functionality come together.
            </p>

          </Reveal>

          <Reveal delay={0.2}>

            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={() => scrollTo("projects")}
              >
                Explore Projects
                <ArrowUpRight size={18} />
              </button>

              <button
                className="minimal-button"
                onClick={() =>
                  openWhatsApp(
                    "Hi Gururag Interior, I would like to start an interior project."
                  )
                }
              >
                Start a Project
                <span>↗</span>
              </button>

            </div>

          </Reveal>

        </div>

        <div className="hero-bottom">

          <span>
            SCROLL TO EXPLORE
          </span>

          <div className="hero-scroll-line">
            <span />
          </div>

          <span>
            CHENNAI • INDIA
          </span>

        </div>

        <div className="hero-orbit">

          <Sparkles size={17} />

          <span>
            DESIGN
            <br />
            CRAFT
            <br />
            DETAIL
          </span>

        </div>

      </section>

      {/* ================= INTRO ================= */}

      <section className="intro section">

        <div className="section-number">
          01 — THE STUDIO
        </div>

        <div className="intro-grid">

          <Reveal>

            <h2>
              Interiors with
              <br />
              <em>meaning.</em>
            </h2>

          </Reveal>

          <Reveal delay={0.1}>

            <div className="intro-copy">

              <p>
                At Gururag Interior, we believe a beautiful space should do
                more than look good. It should feel natural, work effortlessly
                and reflect the people who live or work inside it.
              </p>

              <p>
                From detailed carpentry and modern kitchens to civil works,
                finishing, electrical solutions and outdoor spaces, we bring
                every layer together with one clear vision.
              </p>

              <button
                className="text-link"
                onClick={() => scrollTo("about")}
              >
                Discover our story
                <ArrowUpRight size={16} />
              </button>

            </div>

          </Reveal>

        </div>

        <div className="visual-intro">

          <motion.div
            className="visual-large"
            initial={{
              clipPath: "inset(15% 0 15% 0)",
            }}
            whileInView={{
              clipPath: "inset(0 0 0 0)",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.1,
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90"
              alt="Luxury interior"
            />

          </motion.div>

          <motion.div
            className="visual-small"
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
            transition={{
              duration: 0.9,
              delay: 0.15,
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1000&q=90"
              alt="Modern interior detail"
            />

          </motion.div>

        </div>

      </section>

      {/* ================= ABOUT / FOUNDER ================= */}

      <section
        id="about"
        className="about-section section dark"
      >

        <div className="section-number light">
          02 — ABOUT US
        </div>

        <div className="about-grid">

          <Reveal>

            <div className="about-title">

              <span className="mini-label">
                THE VISION
              </span>

              <h2>
                Designed around
                <br />
                <em>your life.</em>
              </h2>

            </div>

          </Reveal>

          <Reveal delay={0.12}>

            <div className="about-text">

              <p>
                Gururag Interior is built around a simple idea — every space
                deserves its own character.
              </p>

              <p>
                We combine practical planning, clean aesthetics and skilled
                execution to create interiors that remain beautiful long after
                the project is complete.
              </p>

            </div>

          </Reveal>

        </div>

        {/* FOUNDER */}

        <div className="founder-card">

          <div className="founder-visual">

            <img
              src={founder}
              alt="Saran Raj - Founder of Gururag Interior"
              className="founder-photo"
            />

            <div className="founder-overlay" />

            <div className="founder-visual-label">
              FOUNDER
              <br />
              GURURAG INTERIOR
            </div>

          </div>

          <div className="founder-content">

            <span className="mini-label">
              THE PERSON BEHIND THE VISION
            </span>

            <h3>
              Saran
              <br />
              <em>Raj.</em>
            </h3>

            <div className="founder-stats">

              <div>
                <strong>
                  13+
                </strong>

                <span>
                  Years Experience
                </span>
              </div>

              <div>
                <strong>
                  1,500+
                </strong>

                <span>
                  Completed Projects
                </span>
              </div>

            </div>

            <p>
              With more than a decade of experience in interior, construction
              and renovation solutions, Saran Raj leads Gururag Interior with
              a strong focus on craftsmanship, detail and client satisfaction.
              His approach brings design thinking and practical execution
              together to create spaces that are both distinctive and
              comfortable to live in.
            </p>

            <p>
              From the first conversation to the final finishing touch,
              the vision is simple — create spaces that feel personal,
              purposeful and built to last.
            </p>

            <div className="founder-sign">
              Saran Raj
            </div>

          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="services section dark"
      >

        <div className="section-number light">
          03 — OUR SERVICES
        </div>

        <div className="services-heading">

          <Reveal>

            <h2>
              From concept
              <br />
              to <em>completion.</em>
            </h2>

          </Reveal>

          <Reveal delay={0.1}>

            <p>
              A complete range of interior, renovation, civil and allied
              services — managed with one design vision.
            </p>

          </Reveal>

        </div>

        <div className="service-carousel">

          <AnimatePresence mode="wait">

            <motion.div
              key={service.number}
              className="service-card"
              initial={{
                opacity: 0,
                x: 70,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -70,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="service-image">

                <img
                  src={service.image}
                  alt={service.title}
                />

                <div className="service-image-number">
                  {service.number}
                </div>

              </div>

              <div className="service-info">

                <span className="service-small">
                  SERVICE {service.number}
                </span>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <div className="service-items">

                  {service.items.map((item) => (
                    <div key={item}>
                      <Check size={15} />
                      <span>{item}</span>
                    </div>
                  ))}

                </div>

                <button
                  className="service-quote"
                  onClick={() =>
                    openWhatsApp(
                      `Hi Gururag Interior, I am interested in your ${service.title} service.`
                    )
                  }
                >
                  Enquire About This Service
                  <ArrowUpRight size={17} />
                </button>

              </div>

            </motion.div>

          </AnimatePresence>

          <div className="carousel-controls">

            <button
              onClick={previousService}
              aria-label="Previous Service"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="carousel-dots">

              {services.map((item, index) => (
                <button
                  key={item.number}
                  className={
                    index === serviceIndex
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setServiceIndex(index)
                  }
                  aria-label={`Service ${index + 1}`}
                />
              ))}

            </div>

            <button
              onClick={nextService}
              aria-label="Next Service"
            >
              <ArrowRight size={19} />
            </button>

          </div>

        </div>

      </section>

      {/* ================= PROJECTS ================= */}

      <section
        id="projects"
        className="projects section"
      >

        <div className="section-number">
          04 — OUR PROJECTS
        </div>

        <div className="projects-heading">

          <Reveal>

            <h2>
              Spaces made
              <br />
              to be <em>lived in.</em>
            </h2>

          </Reveal>

          <Reveal delay={0.1}>

            <p>
              A visual direction for homes and spaces shaped by comfort,
              proportion and timeless detailing.
            </p>

          </Reveal>

        </div>

        <div className="project-grid">

          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 0.06}
            >

              <article
                className={
                  `project ${
                    index === 0
                      ? "project-tall"
                      : ""
                  }`
                }
              >

                <div className="project-image">

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                  <div className="project-hover">
                    <ArrowUpRight size={22} />
                  </div>

                </div>

                <div className="project-meta">

                  <span>
                    {project.type}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                </div>

              </article>

            </Reveal>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="big-cta">

        <div className="big-cta-image" />

        <div className="big-cta-shade" />

        <div className="big-cta-content">

          <span className="mini-label">
            YOUR SPACE. YOUR STORY.
          </span>

          <h2>
            Let's create
            <br />
            something <em>beautiful.</em>
          </h2>

          <button
            className="primary-button"
            onClick={() =>
              openWhatsApp(
                "Hi Gururag Interior, I would like to discuss my interior project."
              )
            }
          >
            Start Your Project
            <ArrowUpRight size={18} />
          </button>

        </div>

      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="contact section"
      >

        <div className="section-number">
          05 — CONTACT
        </div>

        <div className="contact-grid">

          <Reveal>

            <div>

              <h2>
                Let's talk
                <br />
                <em>interiors.</em>
              </h2>

              <p className="contact-intro">
                Have a home, office or renovation project in mind?
                Tell us what you are planning and let's build something
                around it.
              </p>

              <div className="contact-details">

                <a href={`tel:${WHATSAPP_NUMBER}`}>
                  <Phone size={18} />
                  {PHONE_NUMBER}
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>

                <a href="mailto:hello@gururaginterior.com">
                  <Mail size={18} />
                  Email Us
                </a>

                <div>
                  <MapPin size={18} />
                  Chennai, Tamil Nadu
                </div>

              </div>

            </div>

          </Reveal>

          <Reveal delay={0.12}>

            <div className="quote-box">

              <span className="mini-label">
                GET A FREE QUOTE
              </span>

              <h3>
                Tell us about
                <br />
                your project.
              </h3>

              <p>
                The fastest way to start is through WhatsApp.
                Send us your project type, location and a few
                reference images.
              </p>

              <button
                className="primary-button"
                onClick={() =>
                  openWhatsApp(
                    "Hi Gururag Interior, I would like a free quote. Project type: "
                  )
                }
              >
                WhatsApp Us
                <ArrowUpRight size={18} />
              </button>

            </div>

          </Reveal>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-main">

          <div className="footer-brand">

            <div className="footer-logo-container">

              <img
                src={logo}
                alt="Gururag Interior"
                className="footer-logo"
              />

            </div>

            <div>

              <strong>
                GURURAG
              </strong>

              <span>
                INTERIOR
              </span>

            </div>

          </div>

          <p>
            Thoughtful interiors,
            <br />
            crafted with character.
          </p>

          <div className="footer-social">

            <a href="#">
              <Instagram size={18} />
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
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

    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <App />
);
