import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  X,
  MessageCircle,
  Phone,
  MapPin,
  Instagram,
  Check,
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
    setService((current) => (current + 1) % services.length);
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
            onClick={() =>
              whatsapp(
                "Hi Gururag Interior, I would like to get a free quote."
              )
            }
          >
            <MessageCircle size={20} />
          </button>

          <button
            className="menu-button"
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

                <button onClick={() => setMenu(false)}>
                  <X />
                </button>
              </div>

              <nav>

                <button onClick={() => scrollTo("home")}>
                  <small>01</small>
                  Home
                  <ArrowUpRight />
                </button>

                <button onClick={() => scrollTo("about")}>
                  <small>02</small>
                  About Us
                  <ArrowUpRight />
                </button>

                <button onClick={() => scrollTo("services")}>
                  <small>03</small>
                  Our Services
                  <ArrowUpRight />
                </button>

                <button onClick={() => scrollTo("projects")}>
                  <small>04</small>
                  Our Projects
                  <ArrowUpRight />
                </button>

                <button onClick={() => scrollTo("contact")}>
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
            transition={{ delay: 0.45, duration: 0.9 }}
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
            We create refined residential and commercial interiors
            where thoughtful design, skilled craftsmanship and
            everyday functionality come together.
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
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Interiors with
            <br />
            <em>meaning.</em>
          </motion.h2>

          <motion.div
            className="intro-text"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <p>
              At Gururag Interior, we believe a beautiful space
              should do more than look good. It should feel natural,
              work effortlessly and reflect the people who live or
              work inside it.
            </p>

            <p>
              From detailed carpentry and modern kitchens to civil
              works, finishing and complete turnkey solutions,
              we bring every layer together with one clear vision.
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
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
          />

          <motion.img
            className="small-image"
            src="https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1000&q=90"
            alt="Interior detail"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          />

        </div>

      </section>

      {/* ABOUT */}

      <section id="about" className="about section">

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
              With over 13 years of experience across interior,
              construction and renovation solutions, Saran Raj
              leads Gururag Interior with a strong focus on
              craftsmanship, detail and client satisfaction.
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

      <section id="services" className="services section">

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
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
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

                  {currentService.items.map((item) => (
                    <div key={item}>
                      <Check />
                      {item}
                    </div>
                  ))}

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
                    index === service ? "active" : ""
                  }
                  onClick={() => setService(index)}
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

      <section id="projects" className="projects section">

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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
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

      <section id="contact" className="contact section">

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
              Have a home, office or renovation project in mind?
              Tell us what you are planning and let's build
              something around it.
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
                <MessageCircle />
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
            >
              <MessageCircle />
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

createRoot(document.getElementById("root")).render(
  <App />
);
