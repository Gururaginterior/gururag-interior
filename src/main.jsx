import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Phone, Mail, MapPin, Sparkles, Check, Instagram, MessageCircle } from "lucide-react";
import "./styles.css";

const services = [
  {
    title: "Carpentry Works",
    tag: "01",
    items: ["PVC Modular Kitchen", "PVC Wardrobes / Doors", "WPC Door Works", "UPVC Windows / Ventilators", "Glass Partition", "Office Furniture", "Cot / Sofa / Other Furniture", "CNC Cutting / Partition"]
  },
  {
    title: "Painting & Proofing",
    tag: "02",
    items: ["Painting / 3D Painting", "Terrace Heat Reflection Painting", "3D Elevation Painting", "Bathroom Waterproofing", "Terrace Damp Proofing"]
  },
  {
    title: "Civil Works",
    tag: "03",
    items: ["Tiles / Wooden Flooring", "Granite Works", "Civil / Demolition Works", "Floor Mats / Wall Papers", "False Ceiling", "PVC False Ceiling"]
  },
  {
    title: "Electrical & Plumbing",
    tag: "04",
    items: ["CCTV Installation", "Inverter Wiring / Installation", "Automation Control Switches", "Automatic Motor Control Switch", "Copper Gas Pipe Work"]
  },
  {
    title: "Metal Fabrication",
    tag: "05",
    items: ["SS Grille Gates", "MS Grille Gates", "Aluminium Mosquito Nets", "Aluminium Sliding Doors", "Aluminium Partition"]
  },
  {
    title: "Other Works",
    tag: "06",
    items: ["Terrace Garden", "Water Landscape", "Landscape / Garden Works", "Pigeon Net"]
  }
];

const projects = [
  { title: "Warm Minimal Living", category: "Residential", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85" },
  { title: "Contemporary Kitchen", category: "Kitchen", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85" },
  { title: "Quiet Luxury Bedroom", category: "Bedroom", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85" },
  { title: "Modern Work Studio", category: "Commercial", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85" }
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => go("home")} aria-label="Gururag Interior home">
          <span className="brand-mark">G</span>
          <span>GURURAG <b>INTERIOR</b></span>
        </button>

        <div className="top-actions">
          <a className="quote-btn" href="#contact">Get Free Quote <ArrowUpRight size={17} /></a>
          <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.aside
              className="menu-panel"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="menu-head">
                <span>MENU</span>
                <button onClick={() => setMenu(false)} aria-label="Close menu"><X /></button>
              </div>
              <nav>
                {["home","about","services","projects","contact"].map((id, i) => (
                  <button key={id} onClick={() => go(id)}>
                    <small>0{i + 1}</small>{id === "home" ? "Home" : id === "about" ? "About Us" : id === "services" ? "Our Services" : id === "projects" ? "Our Projects" : "Contact"}
                    <ArrowUpRight size={18} />
                  </button>
                ))}
              </nav>
              <div className="menu-foot">
                <p>Designing spaces that feel like you.</p>
                <span>漏 2026 Gururag Interior</span>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="hero">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <Reveal>
              <p className="eyebrow"><span></span> INTERIOR DESIGN 鈥� TURNKEY SOLUTIONS</p>
              <h1>Spaces that<br /><em>feel like you.</em></h1>
              <p className="hero-copy">Thoughtful interiors, crafted with character, comfort and precision 鈥� from the first sketch to the final detail.</p>
              <div className="hero-buttons">
                <a className="primary-btn" href="#projects">Explore Projects <ArrowUpRight size={18} /></a>
                <a className="text-btn" href="#contact">Start a Project <span>鈫�</span></a>
              </div>
            </Reveal>
          </div>
          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line"><i></i></div>
            <span>CHENNAI 鈥� INDIA</span>
          </div>
          <div className="hero-stamp">
            <Sparkles size={19} />
            <span>CRAFTED<br />INTERIORS</span>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="section-label">01 鈥� ABOUT US</div>
          <div className="about-grid">
            <Reveal>
              <p className="display">A home is not<br />just a <span>space.</span></p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="about-copy">
                <p>At Gururag Interior, we create interiors that balance beauty, function and everyday living. Our approach brings design, craftsmanship and execution together under one roof.</p>
                <p>From a refined home interior to a productive workspace, every project is shaped around the people who use it.</p>
                <a href="#services" className="line-link">Discover our services <ArrowUpRight size={16} /></a>
              </div>
            </Reveal>
          </div>

          <div className="founder-card">
            <div className="founder-photo">
              <div className="photo-placeholder">FOUNDER<br />PHOTO</div>
            </div>
            <div className="founder-info">
              <p className="eyebrow">THE PERSON BEHIND THE VISION</p>
              <h2>Meet the <em>Founder.</em></h2>
              <p>Founder name and story can be added here. Share the founder photo and details to personalise this section.</p>
              <span className="signature">Gururag Interior</span>
            </div>
          </div>
        </section>

        <section id="services" className="services section dark-section">
          <div className="section-label">02 鈥� OUR SERVICES</div>
          <div className="services-head">
            <Reveal><h2>Everything your<br /><em>space needs.</em></h2></Reveal>
            <Reveal delay={0.1}><p>End-to-end interior and allied works, organised under one experienced team.</p></Reveal>
          </div>
          <div className="services-layout">
            <div className="service-list">
              {services.map((s, i) => (
                <button className={`service-row ${activeService === i ? "active" : ""}`} key={s.title} onClick={() => setActiveService(i)}>
                  <span>{s.tag}</span><strong>{s.title}</strong><ArrowUpRight size={21} />
                </button>
              ))}
            </div>
            <motion.div className="service-detail" key={activeService} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
              <div className="service-number">{services[activeService].tag}</div>
              <h3>{services[activeService].title}</h3>
              <ul>{services[activeService].items.map(item => <li key={item}><Check size={16} /> {item}</li>)}</ul>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="projects section">
          <div className="section-label">03 鈥� OUR PROJECTS</div>
          <div className="projects-head">
            <Reveal><h2>Made to be<br /><em>lived in.</em></h2></Reveal>
            <p>Selected spaces designed around comfort, personality and timeless detailing.</p>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <article className={`project-card ${i === 0 ? "large" : ""}`}>
                  <div className="project-image"><img src={p.image} alt={p.title} loading="lazy" /><div className="project-plus">+</div></div>
                  <div className="project-meta"><span>{p.category}</span><h3>{p.title}</h3></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="statement">
          <div className="statement-bg"></div>
          <div className="statement-content">
            <p className="eyebrow">YOUR SPACE. YOUR STORY.</p>
            <h2>Good design is<br /><em>felt, not explained.</em></h2>
            <a className="primary-btn" href="#contact">Let's Create Yours <ArrowUpRight size={18} /></a>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="section-label">04 鈥� CONTACT</div>
          <div className="contact-grid">
            <div>
              <Reveal><h2>Have a project<br /><em>in mind?</em></h2></Reveal>
              <p className="contact-intro">Tell us what you're imagining. We'll help turn the idea into a space you'll love.</p>
              <div className="contact-links">
                <a href="tel:+919841433305"><Phone size={18} /> +91 98414 33305</a>
                <a href="mailto:squarearcinteriors@gmail.com"><Mail size={18} /> Email us</a>
                <span><MapPin size={18} /> Chennai, Tamil Nadu</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <label>Name<input placeholder="Your name" /></label>
              <label>Phone<input placeholder="+91" /></label>
              <label>Project type<select defaultValue=""><option value="" disabled>Select project type</option><option>Home Interior</option><option>Kitchen</option><option>Bedroom</option><option>Commercial</option><option>Renovation</option></select></label>
              <label>Tell us about your project<textarea rows="4" placeholder="A few details about your project..."></textarea></label>
              <button className="primary-btn" type="submit">Request a Free Quote <ArrowUpRight size={18} /></button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div><span className="brand-mark">G</span><h3>GURURAG<br /><b>INTERIOR</b></h3></div>
          <p>Crafting refined spaces with purpose,<br />personality and precision.</p>
          <div className="socials"><a href="#"><Instagram size={18}/></a><a href="#"><MessageCircle size={18}/></a></div>
        </div>
        <div className="footer-bottom"><span>漏 2026 Gururag Interior. All rights reserved.</span><span>Designed for a better way of living.</span></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
