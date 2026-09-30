import React, { useEffect, useMemo, useRef, useState } from "react";
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
const INSTAGRAM = "https://www.instagram.com/sgr_decors_interior_designer?stkn=bDNyaWVleDY2dDI=";

const services = [
  {
    title: "Carpentry Works",
    text: "Precision-built interiors for kitchens, wardrobes, furniture and custom spaces.",
    chatbotDescription:
      "Complete carpentry solutions designed around your space, lifestyle and storage needs.",
    keywords: [
      "carpentry",
      "kitchen",
      "modular kitchen",
      "modular",
      "pvc kitchen",
      "wardrobe",
      "wardrobes",
      "cupboard",
      "door",
      "doors",
      "furniture",
      "custom furniture",
      "wpc",
      "upvc",
      "glass partition",
      "glass",
      "cnc",
      "office furniture",
    ],
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
    keywords: [
      "painting",
      "paint",
      "colour",
      "color",
      "wall paint",
      "3d painting",
      "elevation painting",
      "waterproofing",
      "water proofing",
      "leakage",
      "leak",
      "damp",
      "damp proof",
      "terrace",
      "heat reflection",
      "bathroom waterproofing",
    ],
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
    keywords: [
      "civil",
      "civil work",
      "renovation",
      "renovate",
      "tiles",
      "tile",
      "flooring",
      "wooden flooring",
      "granite",
      "demolition",
      "wallpaper",
      "wall paper",
      "false ceiling",
      "ceiling",
      "pvc ceiling",
    ],
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
    keywords: [
      "electrical",
      "electric",
      "wiring",
      "plumbing",
      "plumber",
      "cctv",
      "camera",
      "inverter",
      "inverter wiring",
      "automation",
      "smart home",
      "switch",
      "switches",
      "motor",
      "gas pipe",
      "gas pipeline",
    ],
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
    keywords: [
      "metal",
      "fabrication",
      "grill",
      "grille",
      "gate",
      "gates",
      "ss gate",
      "ms gate",
      "aluminium",
      "aluminum",
      "mosquito net",
      "sliding door",
      "sliding doors",
      "aluminium partition",
      "partition",
    ],
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
   CHATBOT HELPERS
------------------------------------------------------- */

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\w\s鈧�.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function findService(text) {
  const normalized = normalizeText(text);

  let bestService = null;
  let bestScore = 0;

  services.forEach((service) => {
    let score = 0;

    service.keywords.forEach((keyword) => {
      const key = normalizeText(keyword);

      if (normalized.includes(key)) {
        score += key.includes(" ")
          ? 4
          : 2;
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestService = service;
    }
  });

  return bestScore > 0 ? bestService : null;
}

function isGreeting(text) {
  return includesAny(normalizeText(text), [
    "hi",
    "hello",
    "hey",
    "hii",
    "hlo",
    "vanakkam",
    "good morning",
    "good evening",
    "good afternoon",
  ]);
}

function isAboutQuestion(text) {
  const normalized = normalizeText(text);

  return includesAny(normalized, [
    "about you",
    "about us",
    "about gururag",
    "who are you",
    "founder",
    "owner",
    "saran",
    "experience",
    "how many years",
    "years experience",
    "projects completed",
  ]);
}

function isPriceQuestion(text) {
  const normalized = normalizeText(text);

  return includesAny(normalized, [
    "price",
    "pricing",
    "cost",
    "budget",
    "rate",
    "rates",
    "quotation",
    "quote",
    "estimate",
    "how much",
    "evlo",
    "evalo",
    "amount",
    "lakh",
    "lakhs",
    "rs",
    "鈧�",
  ]);
}

function isContactQuestion(text) {
  const normalized = normalizeText(text);

  return includesAny(normalized, [
    "contact",
    "phone",
    "call",
    "number",
    "whatsapp",
    "talk to designer",
    "designer",
    "human",
    "person",
    "team",
  ]);
}

function isEnquiryRequest(text) {
  const normalized = normalizeText(text);

  return includesAny(normalized, [
    "enquire",
    "enquiry",
    "enquire now",
    "quote venum",
    "quote",
    "book",
    "booking",
    "start project",
    "project venum",
    "contact me",
    "talk to someone",
    "yes",
    "okay",
    "ok",
    "sure",
  ]);
}

function detectBudget(text) {
  const normalized = normalizeText(text);

  const match = normalized.match(
    /(?:rs|鈧�)?\s*(\d+(?:\.\d+)?)\s*(lakh|lakhs|k|thousand)?/
  );

  if (!match) return null;

  const number = Number(match[1]);
  const unit = match[2];

  if (!number) return null;

  if (unit === "lakh" || unit === "lakhs") {
    return `鈧�${number} lakh`;
  }

  if (unit === "k" || unit === "thousand") {
    return `鈧�${number}k`;
  }

  if (
    normalized.includes("budget") ||
    normalized.includes("price") ||
    normalized.includes("cost")
  ) {
    return `鈧�${number}`;
  }

  return null;
}

/* -------------------------------------------------------
   CHATBOT
------------------------------------------------------- */

function Chatbot({ onWhatsApp }) {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      type: "text",
      text:
        "Hi there! 馃憢 Welcome to Gururag Interior. Tell me what you're planning for your space - you can type naturally, like \"I need a modular kitchen\" or \"2 lakh budget kitchen possible ah?\"",
    },
  ]);

  const [input, setInput] = useState("");
  const [activeService, setActiveService] = useState(null);
  const [leadName, setLeadName] = useState("");
  const [waitingForName, setWaitingForName] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const addBotMessage = (text, extra = {}) => {
    setMessages((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        role: "bot",
        type: "text",
        text,
        ...extra,
      },
    ]);
  };

  const addUserMessage = (text) => {
    setMessages((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        role: "user",
        type: "text",
        text,
      },
    ]);
  };

  const showServiceCard = (service) => {
    setActiveService(service);

    setMessages((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        role: "bot",
        type: "service",
        service,
      },
    ]);
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "bot",
        type: "text",
        text:
          "Hi there! 馃憢 Welcome to Gururag Interior. Tell me what you're planning for your space.",
      },
    ]);

    setInput("");
    setActiveService(null);
    setLeadName("");
    setWaitingForName(false);
  };

  const startEnquiry = (service = activeService) => {
    if (service) {
      addBotMessage(
        `Absolutely. I can help you enquire about ${service.title}. Before I connect you with Gururag Interior, may I know your name?`
      );
    } else {
      addBotMessage(
        "Sure! I'd be happy to connect you with the Gururag Interior team. May I know your name first?"
      );
    }

    setWaitingForName(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const sendWhatsAppEnquiry = () => {
    const serviceName =
      activeService?.title || "Interior Services";

    const customerName =
      leadName.trim() || "Customer";

    const message =
      `Hi Sir, I'm ${customerName}. ` +
      `I'm interested in ${serviceName} from Gururag Interior. ` +
      `I discussed my requirement with the website assistant and would like to know more and get a quotation.`;

    onWhatsApp(message);
  };

  const handleBotResponse = (rawText) => {
    const text = normalizeText(rawText);

    if (!text) return;

    /* NAME COLLECTION */
    if (waitingForName) {
      const cleanedName = rawText
        .replace(
          /^(my name is|i am|i'm|im|name is)\s+/i,
          ""
        )
        .trim();

      const finalName =
        cleanedName.length > 1
          ? cleanedName
          : rawText.trim();

      setLeadName(finalName);
      setWaitingForName(false);

      if (activeService) {
        addBotMessage(
          `Nice to meet you, ${finalName}! 馃槉 You're enquiring about ${activeService.title}.`
        );

        setTimeout(() => {
          addBotMessage(
            "You can continue asking me about the design, materials or budget. If you're ready, tap "Send Enquiry on WhatsApp" below."
          );
        }, 250);
      } else {
        addBotMessage(
          `Nice to meet you, ${finalName}! 馃槉 Which service are you looking for? You can simply type something like "modular kitchen", "wardrobe", "painting" or "false ceiling".`
        );
      }

      return;
    }

    /* GREETING */
    if (isGreeting(text)) {
      addBotMessage(
        "Hello! 馃憢 What are you planning for your space? You can ask me anything about kitchens, wardrobes, painting, false ceiling, civil work, electrical work, metal fabrication, or complete interiors."
      );

      return;
    }

    /* ABOUT */
    if (isAboutQuestion(text)) {
      addBotMessage(
        "Gururag Interior is led by Saran Raj, with 13+ years of experience and 1,500+ completed projects. The team handles interior design, carpentry, civil works, finishing and allied solutions for residential and commercial spaces."
      );

      return;
    }

    /* CONTACT */
    if (isContactQuestion(text)) {
      addBotMessage(
        "Sure 馃憤 You can contact Gururag Interior directly on WhatsApp at +91 99402 77984. If you tell me your requirement first, I can also prepare the enquiry for you."
      );

      setTimeout(() => {
        addBotMessage(
          "For example: "I need a 2BHK interior", "modular kitchen", or "false ceiling for my living room"."
        );
      }, 250);

      return;
    }

    /* ENQUIRY / YES */
    if (isEnquiryRequest(text)) {
      startEnquiry();
      return;
    }

    /* BUDGET */
    const budget = detectBudget(text);

    if (budget) {
      if (activeService) {
        addBotMessage(
          `Got it 馃憤 You're considering around ${budget} for ${activeService.title}. The final cost depends on the size, materials, finish, hardware and site requirements.`
        );

        setTimeout(() => {
          addBotMessage(
            "I don't want to give you a misleading fixed price without seeing the actual requirement. The Gururag team can check the site/details and give you a proper quotation."
          );
        }, 300);

        setTimeout(() => {
          addBotMessage(
            "If you'd like, I can prepare a WhatsApp enquiry for this service."
          );
        }, 550);
      } else {
        addBotMessage(
          `鈧�${budget.replace("鈧�", "")} budget noted 馃憤 Which space are you planning - kitchen, wardrobe, full home interior, office, painting or something else?`
        );
      }

      return;
    }

    /* SERVICE DETECTION */
    const detectedService = findService(text);

    if (detectedService) {
      showServiceCard(detectedService);

      setTimeout(() => {
        addBotMessage(
          `Yes 馃憤 ${detectedService.title} is something Gururag Interior can help with. You can ask me about options, advantages, materials, budget considerations, or how to enquire.`
        );
      }, 350);

      return;
    }

    /* ACTIVE SERVICE FOLLOW-UP */
    if (activeService) {
      if (
        includesAny(text, [
          "advantage",
          "advantages",
          "benefit",
          "benefits",
          "pros",
          "good",
          "why",
        ])
      ) {
        addBotMessage(
          `For ${activeService.title}, some key advantages are:\n\n| ${activeService.pros.join(
            "\n| "
          )}`
        );

        return;
      }

      if (
        includesAny(text, [
          "consider",
          "cons",
          "disadvantage",
          "problem",
          "things to know",
          "before",
        ])
      ) {
        addBotMessage(
          `A few things to consider for ${activeService.title}:\n\n| ${activeService.considerations.join(
            "\n| "
          )}`
        );

        return;
      }

      if (
        includesAny(text, [
          "option",
          "options",
          "types",
          "what do you provide",
          "what you provide",
          "what is available",
          "available",
          "items",
        ])
      ) {
        addBotMessage(
          `For ${activeService.title}, we can provide:\n\n| ${activeService.items.join(
            "\n| "
          )}`
        );

        return;
      }

      if (
        includesAny(text, [
          "quote",
          "quotation",
          "estimate",
          "enquiry",
          "enquire",
          "book",
        ])
      ) {
        startEnquiry(activeService);
        return;
      }

      addBotMessage(
        `Sure 馃憤 I can help with ${activeService.title}. Are you looking for information about the options, advantages, things to consider, budget, or a quotation?`
      );

      return;
    }

    /* COMMON COMPLETE INTERIOR QUESTIONS */
    if (
      includesAny(text, [
        "full interior",
        "home interior",
        "house interior",
        "complete interior",
        "interior design",
        "interior work",
        "interior works",
        "2bhk",
        "3bhk",
        "4bhk",
        "flat interior",
        "apartment interior",
      ])
    ) {
      addBotMessage(
        "Absolutely 馃憤 Gururag Interior can coordinate multiple parts of a home interior - carpentry, kitchen, wardrobes, civil work, flooring, false ceiling, painting, electrical and more."
      );

      setTimeout(() => {
        addBotMessage(
          "If you tell me your home type, like "3BHK", and your approximate budget, I can guide you on what to discuss with the designer."
        );
      }, 300);

      return;
    }

    /* OFFICE */
    if (
      includesAny(text, [
        "office",
        "commercial interior",
        "shop interior",
        "showroom",
        "workspace",
      ])
    ) {
      addBotMessage(
        "Yes 馃憤 Gururag Interior also provides commercial interior solutions such as office furniture, partitions, electrical planning, painting, civil work and custom spaces."
      );

      setTimeout(() => {
        addBotMessage(
          "Tell me what type of space you have - office, showroom, shop or workspace - and I can guide you further."
        );
      }, 300);

      return;
    }

    /* FALLBACK */
    addBotMessage(
      "I can help you with that 馃槉 Tell me a little more about what you're planning. For example:\n\n| \"I need a modular kitchen\"\n| \"wardrobe venum\"\n| \"false ceiling for hall\"\n| \"2 lakh budget kitchen\"\n| \"3BHK full interior\"\n| \"painting work venum\""
    );
  };

  const sendMessage = () => {
    const value = input.trim();

    if (!value) return;

    addUserMessage(value);
    setInput("");

    setTimeout(() => {
      handleBotResponse(value);
    }, 350);
  };

  const quickAsk = (text) => {
    addUserMessage(text);

    setTimeout(() => {
      handleBotResponse(text);
    }, 300);
  };

  const quickSuggestions = useMemo(() => {
    if (activeService) {
      return [
        "What options do you have?",
        "What are the advantages?",
        "What should I consider?",
        "I want a quotation",
      ];
    }

    return [
      "I need a modular kitchen",
      "I need a wardrobe",
      "False ceiling venum",
      "3BHK full interior",
    ];
  }, [activeService]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            className="chatbot-launcher"
            onClick={() => setOpen(true)}
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
          >
            <span className="chatbot-live-dot" />
            <Bot size={23} />
            <span>We're Live</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.94,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {/* HEADER */}

            <div className="chatbot-header">
              <div className="chatbot-agent">
                <div className="chatbot-avatar">
                  <Bot size={21} />
                </div>

                <div>
                  <strong>Gururag Assistant</strong>

                  <span>
                    <i />
                    We're Live | 24/7
                  </span>
                </div>
              </div>

              <button
                className="chatbot-close"
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
              >
                <X size={19} />
              </button>
            </div>

            {/* CHAT BODY */}

            <div className="chatbot-body">
              <div className="chatbot-conversation">
                {messages.map((message) => {
                  if (message.type === "service") {
                    const item = message.service;

                    return (
                      <motion.div
                        key={message.id}
                        className="chat-service-card"
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >
                        <div className="chat-service-image">
                          <img
                            src={item.image}
                            alt={item.title}
                          />
                        </div>

                        <div className="chat-service-card-content">
                          <span className="chat-mini-label">
                            GURURAG INTERIOR
                          </span>

                          <h4>{item.title}</h4>

                          <p>
                            {item.chatbotDescription}
                          </p>

                          <div className="chat-detail-section">
                            <strong>
                              What you get
                            </strong>

                            {item.items
                              .slice(0, 5)
                              .map((serviceItem) => (
                                <div
                                  key={serviceItem}
                                >
                                  <Check size={14} />
                                  {serviceItem}
                                </div>
                              ))}
                          </div>

                          <div className="chat-detail-section">
                            <strong>
                              Advantages
                            </strong>

                            {item.pros
                              .slice(0, 4)
                              .map((pros) => (
                                <div key={pros}>
                                  <Check size={14} />
                                  {pros}
                                </div>
                              ))}
                          </div>

                          <div className="chat-detail-section consideration">
                            <strong>
                              Things to consider
                            </strong>

                            {item.considerations
                              .slice(0, 3)
                              .map(
                                (consideration) => (
                                  <div
                                    key={
                                      consideration
                                    }
                                  >
                                    <span>|</span>
                                    {consideration}
                                  </div>
                                )
                              )}
                          </div>

                          <button
                            className="chat-primary-button"
                            onClick={() =>
                              startEnquiry(item)
                            }
                          >
                            Enquire About This
                            <ArrowUpRight
                              size={17}
                            />
                          </button>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={message.id}
                      className={`chat-message ${
                        message.role === "user"
                          ? "user-message"
                          : "bot-message"
                      }`}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                    >
                      {message.role === "bot" && (
                        <div className="message-avatar">
                          <Bot size={14} />
                        </div>
                      )}

                      <div className="message-bubble">
                        {message.text
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment
                              key={index}
                            >
                              {line}

                              {index <
                                message.text.split(
                                  "\n"
                                ).length -
                                  1 && <br />}
                            </React.Fragment>
                          ))}
                      </div>
                    </motion.div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* QUICK SUGGESTIONS */}

              <div className="chat-quick-area">
                <span>Try asking</span>

                <div className="chat-quick-buttons">
                  {quickSuggestions.map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() =>
                          quickAsk(suggestion)
                        }
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* ENQUIRY ACTION */}

              {leadName && (
                <button
                  className="chat-whatsapp-button"
                  onClick={
                    sendWhatsAppEnquiry
                  }
                >
                  <WhatsAppIcon size={20} />
                  Send Enquiry on WhatsApp
                </button>
              )}

              {/* INPUT */}

              <div className="chat-input-wrap">
                <input
                  ref={inputRef}
                  className="chat-input"
                  type="text"
                  value={input}
                  placeholder={
                    waitingForName
                      ? "Type your name..."
                      : "Type your message..."
                  }
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />

                <button
                  className="chat-send-button"
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  aria-label="Send message"
                >
                  <Send size={17} />
                </button>
              </div>

              <div className="chat-bottom-actions">
                <button
                  onClick={() => {
                    resetChat();
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 100);
                  }}
                >
                  Start New Chat
                </button>

                <button
                  onClick={() =>
                    startEnquiry()
                  }
                >
                  Talk to Designer
                </button>
              </div>
            </div>

            {/* FOOTER */}

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
   NEW MENU PAGES
------------------------------------------------------- */

function TypewriterText({ lines }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex] || "";
    const speed = deleting ? 38 : 72;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (!next) {
          setDeleting(false);
          setLineIndex((index) => (index + 1) % lines.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, lineIndex, lines]);

  return (
    <span className="new-page-typewriter">
      {text}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function NewPageOverlay({ page, onClose, onWhatsApp }) {
  const pageData = {
    about: {
      number: "02",
      eyebrow: "THE PERSON BEHIND THE VISION",
      title: "Built on experience.\nDesigned with purpose.",
    },
    services: {
      number: "03",
      eyebrow: "WHAT WE CREATE",
      title: "From first idea\nto final detail.",
    },
    projects: {
      number: "04",
      eyebrow: "SELECTED DIRECTIONS",
      title: "Spaces made\nto be lived in.",
    },
    contact: {
      number: "05",
      eyebrow: "LET'S TALK",
      title: "Your space.\nOur next conversation.",
    },
  };

  const data = pageData[page];
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="new-page-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="new-page-shell"
          initial={{ y: 45, scale: 0.985 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 30, scale: 0.985 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="new-page-topbar">
            <button className="new-page-brand" onClick={onClose}>
              <span className="new-page-logo">
                <img src={logo} alt="Gururag Interior" />
              </span>
              <span>
                <strong>GURURAG</strong>
                <small>INTERIOR</small>
              </span>
            </button>

            <div className="new-page-top-actions">
              <a
                className="new-page-top-whatsapp"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Gururag Interior"
              >
                <WhatsAppIcon size={19} />
                <span>WhatsApp</span>
              </a>
              <button
                className="new-page-close"
                onClick={onClose}
                aria-label="Close page"
              >
                <X size={21} />
              </button>
            </div>
          </div>

          <div className="new-page-scroll">
            <div className="new-page-hero-copy">
              <div>
                <span className="new-page-eyebrow">
                  {data.number} - {data.eyebrow}
                </span>
                <h2>
                  {data.title.split("\n").map((line, index) => (
                    <React.Fragment key={line}>
                      {index > 0 && <br />}
                      {index === data.title.split("\n").length - 1 ? (
                        <em>{line}</em>
                      ) : (
                        line
                      )}
                    </React.Fragment>
                  ))}
                </h2>
              </div>

              {page === "about" && (
                <p>
                  <TypewriterText
                    lines={[
                      "13+ years of experience.",
                      "1,500+ completed projects.",
                      "One clear vision for every space.",
                    ]}
                  />
                </p>
              )}

              {page === "contact" && (
                <p>
                  <TypewriterText
                    lines={[
                      "Let's turn your idea into a space.",
                      "Tell Saran Raj what you are planning.",
                      "Your project can start with one message.",
                    ]}
                  />
                </p>
              )}

              {page === "services" && (
                <p>
                  <TypewriterText
                    lines={[
                      "Carpentry. Civil. Painting. Electrical.",
                      "Every layer, thoughtfully coordinated.",
                      "Residential and commercial solutions.",
                    ]}
                  />
                </p>
              )}

              {page === "projects" && (
                <p>
                  <TypewriterText
                    lines={[
                      "Contemporary living spaces.",
                      "Modern kitchens and bedrooms.",
                      "Workspaces with character.",
                    ]}
                  />
                </p>
              )}
            </div>

            {page === "about" && (
              <div className="new-about-grid">
                <div className="new-founder-card">
                  <div className="new-founder-image-wrap">
                    <img src={founder} alt="Saran Raj" />
                    <div className="new-founder-image-overlay" />
                    <span>FOUNDER | GURURAG INTERIOR</span>
                  </div>

                  <div className="new-founder-content">
                    <span className="new-page-label">FOUNDER / DESIGN VISION</span>
                    <h3>Saran <em>Raj.</em></h3>
                    <p>
                      With over 13 years of experience across interior,
                      construction and renovation solutions, Saran Raj leads
                      Gururag Interior with a strong focus on craftsmanship,
                      detail and client satisfaction.
                    </p>
                    <p>
                      His approach brings design and practical execution
                      together, creating spaces that feel distinctive,
                      comfortable and personal.
                    </p>

                    <div className="new-stat-row">
                      <div>
                        <strong>13+</strong>
                        <span>Years Experience</span>
                      </div>
                      <div>
                        <strong>1,500+</strong>
                        <span>Completed Projects</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="new-about-side">
                  <div className="new-info-card">
                    <span>OUR APPROACH</span>
                    <h4>Thoughtful interiors. Crafted with character.</h4>
                    <p>
                      From detailed carpentry and modern kitchens to civil
                      works, finishing and turnkey solutions, every layer is
                      planned around the way you use your space.
                    </p>
                  </div>

                  <div className="new-contact-mini">
                    <span>CONNECT WITH SARAN</span>
                    <a href="tel:+919940277984">
                      <Phone size={19} />
                      <span>+91 99402 77984</span>
                      <ArrowUpRight size={17} />
                    </a>
                    <a href={WHATSAPP} target="_blank" rel="noreferrer">
                      <WhatsAppIcon size={20} />
                      <span>WhatsApp Saran Raj</span>
                      <ArrowUpRight size={17} />
                    </a>
                    <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                      <Instagram size={20} />
                      <span>Instagram Profile</span>
                      <ArrowUpRight size={17} />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {page === "services" && (
              <div className="new-service-grid">
                {services.map((item, index) => (
                  <motion.article
                    className="new-service-page-card"
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <div className="new-service-page-image">
                      <img src={item.image} alt={item.title} />
                      <span>0{index + 1}</span>
                    </div>
                    <div>
                      <span className="new-page-label">SERVICE 0{index + 1}</span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <button
                        className="new-outline-button"
                        onClick={() =>
                          onWhatsApp(
                            `Hi Gururag Interior, I am interested in ${item.title}.`
                          )
                        }
                      >
                        Enquire About This <ArrowUpRight size={17} />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {page === "projects" && (
              <div className="new-project-page-grid">
                {projects.map((project, index) => (
                  <motion.article
                    className="new-project-page-card"
                    key={project.title}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="new-project-page-image">
                      <img src={project.image} alt={project.title} />
                      <div className="new-project-page-arrow">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                  </motion.article>
                ))}
              </div>
            )}

            {page === "contact" && (
              <div className="new-contact-page">
                <div className="new-contact-intro">
                  <span className="new-page-label">GURURAG INTERIOR | CHENNAI</span>
                  <h3>
                    <TypewriterText
                      lines={[
                        "Let's create something beautiful.",
                        "Let's plan your next interior.",
                        "Let's talk about your space.",
                      ]}
                    />
                  </h3>
                  <p>
                    Share your home, office or renovation requirement with us.
                    One message is enough to start the conversation.
                  </p>
                </div>

                <div className="new-contact-actions">
                  <a className="new-contact-action phone" href="tel:+919940277984">
                    <span className="new-action-icon"><Phone size={22} /></span>
                    <span className="new-action-copy">
                      <small>CALL DIRECTLY</small>
                      <strong>+91 99402 77984</strong>
                    </span>
                    <ArrowUpRight size={19} />
                  </a>

                  <a
                    className="new-contact-action whatsapp"
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="new-action-icon"><WhatsAppIcon size={23} /></span>
                    <span className="new-action-copy">
                      <small>CHAT ON WHATSAPP</small>
                      <strong>Send Your Requirement</strong>
                    </span>
                    <ArrowUpRight size={19} />
                  </a>

                  <a
                    className="new-contact-action instagram"
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="new-action-icon"><Instagram size={23} /></span>
                    <span className="new-action-copy">
                      <small>FOLLOW OUR WORK</small>
                      <strong>@sgr_decors_interior_designer</strong>
                    </span>
                    <ArrowUpRight size={19} />
                  </a>
                </div>

                <div className="new-contact-bottom-row">
                  <span>Available for residential & commercial enquiries</span>
                  <span>Chennai | Tamil Nadu</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------
   NEW MENU / PAGE STYLES
------------------------------------------------------- */

function NewPageStyles() {
  return (
    <style>{`
      .new-page-overlay{position:fixed;inset:0;z-index:1200;background:rgba(5,16,29,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);padding:14px;display:flex;align-items:center;justify-content:center}
      .new-page-shell{width:min(1180px,100%);height:min(94vh,900px);overflow:hidden;border:1px solid rgba(255,255,255,.13);border-radius:28px;background:#071827;color:#f7f5ed;box-shadow:0 35px 100px rgba(0,0,0,.48);position:relative}
      .new-page-topbar{height:78px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.09);background:rgba(7,24,39,.92);position:sticky;top:0;z-index:5}
      .new-page-brand{border:0;background:transparent;color:#fff;display:flex;align-items:center;gap:11px;cursor:pointer;padding:0;text-align:left}.new-page-brand>span:last-child{display:flex;flex-direction:column}.new-page-brand strong{font-size:14px;letter-spacing:.18em}.new-page-brand small{font-size:8px;letter-spacing:.28em;color:#9ee7cf;margin-top:2px}.new-page-logo{width:34px;height:34px;border-radius:8px;overflow:hidden;display:block;border:1px solid rgba(255,255,255,.18)}.new-page-logo img{width:100%;height:100%;object-fit:cover}
      .new-page-top-actions{display:flex;align-items:center;gap:10px}.new-page-top-whatsapp{display:flex;align-items:center;gap:8px;text-decoration:none;color:#dff8ef;border:1px solid rgba(158,231,207,.25);padding:10px 14px;border-radius:999px;font-size:12px;font-weight:700;transition:.25s}.new-page-top-whatsapp:hover{background:#9ee7cf;color:#071827;box-shadow:0 0 24px rgba(158,231,207,.22)}.new-page-close{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#fff;display:grid;place-items:center;cursor:pointer;transition:.25s}.new-page-close:hover{transform:rotate(90deg);background:#f3d36a;color:#071827;box-shadow:0 0 28px rgba(243,211,106,.28)}
      .new-page-scroll{height:calc(100% - 78px);overflow:auto;padding:48px clamp(20px,5vw,64px) 60px;scroll-behavior:smooth}.new-page-scroll::-webkit-scrollbar{width:5px}.new-page-scroll::-webkit-scrollbar-thumb{background:rgba(158,231,207,.35);border-radius:20px}
      .new-page-hero-copy{display:grid;grid-template-columns:1.2fr .8fr;gap:35px;align-items:end;margin-bottom:42px}.new-page-eyebrow,.new-page-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9ee7cf;font-weight:800}.new-page-hero-copy h2{font-size:clamp(38px,6vw,76px);line-height:.98;letter-spacing:-.045em;margin:15px 0 0;font-weight:500}.new-page-hero-copy h2 em{font-family:Georgia,serif;font-weight:400;color:#f3d36a}.new-page-hero-copy p{margin:0;color:rgba(255,255,255,.68);font-size:16px;line-height:1.8;max-width:390px}.new-page-typewriter{display:inline}.typewriter-cursor{color:#f3d36a;font-weight:800;margin-left:2px;animation:typeBlink .8s infinite}@keyframes typeBlink{0%,45%{opacity:1}46%,100%{opacity:0}}
      .new-about-grid{display:grid;grid-template-columns:1.6fr .75fr;gap:22px}.new-founder-card{display:grid;grid-template-columns:.82fr 1.18fr;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);border-radius:24px;overflow:hidden}.new-founder-image-wrap{min-height:500px;position:relative;overflow:hidden}.new-founder-image-wrap img{width:100%;height:100%;object-fit:cover;display:block}.new-founder-image-overlay{position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.78))}.new-founder-image-wrap>span{position:absolute;left:22px;bottom:20px;font-size:9px;letter-spacing:.17em;line-height:1.6;color:#fff}.new-founder-content{padding:34px;display:flex;flex-direction:column;justify-content:center}.new-founder-content h3{font-size:46px;line-height:.95;margin:13px 0 22px}.new-founder-content h3 em{font-family:Georgia,serif;color:#f3d36a;font-weight:400}.new-founder-content p{color:rgba(255,255,255,.68);line-height:1.75;font-size:14px;margin:0 0 15px}.new-stat-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}.new-stat-row>div{padding:17px;border-radius:15px;background:rgba(158,231,207,.07);border:1px solid rgba(158,231,207,.12)}.new-stat-row strong{display:block;font-size:28px;color:#9ee7cf}.new-stat-row span{display:block;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.58);margin-top:5px}.new-about-side{display:flex;flex-direction:column;gap:22px}.new-info-card,.new-contact-mini{border-radius:24px;padding:28px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1)}.new-info-card>span,.new-contact-mini>span{font-size:9px;letter-spacing:.18em;color:#9ee7cf;font-weight:800}.new-info-card h4{font-size:25px;line-height:1.2;margin:14px 0}.new-info-card p{color:rgba(255,255,255,.63);line-height:1.7;font-size:13px}.new-contact-mini{display:flex;flex-direction:column;gap:10px}.new-contact-mini>a{display:flex;align-items:center;gap:11px;text-decoration:none;color:#fff;padding:14px;border-radius:13px;border:1px solid rgba(255,255,255,.09);transition:.25s}.new-contact-mini>a span{flex:1;font-size:12px;font-weight:700}.new-contact-mini>a:hover{transform:translateX(4px);border-color:rgba(243,211,106,.42);background:rgba(243,211,106,.07);box-shadow:0 0 25px rgba(243,211,106,.08)}
      .new-service-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.new-service-page-card{display:grid;grid-template-columns:.9fr 1.1fr;min-height:240px;border-radius:22px;overflow:hidden;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09)}.new-service-page-image{position:relative;min-height:240px}.new-service-page-image img{width:100%;height:100%;object-fit:cover}.new-service-page-image>span{position:absolute;top:14px;left:14px;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#f3d36a;color:#071827;font-size:10px;font-weight:900}.new-service-page-card>div:last-child{padding:24px}.new-service-page-card h3{font-size:23px;margin:9px 0}.new-service-page-card p{font-size:12px;line-height:1.65;color:rgba(255,255,255,.62);margin-bottom:17px}.new-outline-button{border:1px solid rgba(158,231,207,.28);background:transparent;color:#9ee7cf;padding:10px 13px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:800;cursor:pointer;transition:.25s}.new-outline-button:hover{background:#9ee7cf;color:#071827;box-shadow:0 0 25px rgba(158,231,207,.2)}
      .new-project-page-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.new-project-page-card{cursor:default}.new-project-page-image{height:340px;border-radius:22px;overflow:hidden;position:relative;margin-bottom:14px}.new-project-page-image img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.new-project-page-card:hover img{transform:scale(1.05)}.new-project-page-arrow{position:absolute;right:15px;top:15px;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:#f3d36a;color:#071827}.new-project-page-card>span{font-size:9px;letter-spacing:.18em;color:#9ee7cf;text-transform:uppercase}.new-project-page-card h3{font-size:23px;margin:7px 0 0}
      .new-contact-page{padding-bottom:20px}.new-contact-intro{max-width:680px}.new-contact-intro h3{font-size:clamp(34px,5vw,62px);line-height:1.05;margin:18px 0;font-weight:500;letter-spacing:-.04em}.new-contact-intro>p{color:rgba(255,255,255,.65);font-size:15px;line-height:1.8;max-width:600px}.new-contact-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:35px}.new-contact-action{position:relative;overflow:hidden;min-height:170px;border-radius:22px;padding:24px;text-decoration:none;color:#fff;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.11);display:flex;flex-direction:column;justify-content:space-between;transition:.3s}.new-contact-action:before{content:"";position:absolute;inset:-80px auto auto -70px;width:170px;height:170px;border-radius:50%;filter:blur(30px);opacity:.18;transition:.3s}.new-contact-action.phone:before{background:#f3d36a}.new-contact-action.whatsapp:before{background:#9ee7cf}.new-contact-action.instagram:before{background:#f1a7cf}.new-contact-action:hover{transform:translateY(-7px);box-shadow:0 18px 45px rgba(0,0,0,.25);border-color:rgba(255,255,255,.25)}.new-contact-action:hover:before{opacity:.32}.new-action-icon{position:relative;width:48px;height:48px;border-radius:15px;display:grid;place-items:center;background:rgba(255,255,255,.08)}.new-contact-action.phone .new-action-icon{color:#f3d36a}.new-contact-action.whatsapp .new-action-icon{color:#9ee7cf}.new-contact-action.instagram .new-action-icon{color:#f1a7cf}.new-action-copy{position:relative;display:flex;flex-direction:column;gap:6px}.new-action-copy small{font-size:8px;letter-spacing:.17em;color:rgba(255,255,255,.48);font-weight:800}.new-action-copy strong{font-size:13px;line-height:1.35}.new-contact-action>svg{position:absolute;right:20px;top:20px;color:rgba(255,255,255,.5)}.new-contact-bottom-row{display:flex;justify-content:space-between;gap:20px;margin-top:22px;padding-top:20px;border-top:1px solid rgba(255,255,255,.09);font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.45)}
      @media(max-width:800px){.new-page-overlay{padding:0}.new-page-shell{height:100vh;border-radius:0;border:0}.new-page-topbar{height:70px;padding:0 16px}.new-page-top-whatsapp span{display:none}.new-page-scroll{height:calc(100% - 70px);padding:34px 17px 50px}.new-page-hero-copy{grid-template-columns:1fr;gap:20px;margin-bottom:28px}.new-page-hero-copy h2{font-size:42px}.new-page-hero-copy p{font-size:14px}.new-about-grid,.new-founder-card{grid-template-columns:1fr}.new-founder-image-wrap{min-height:360px}.new-founder-content{padding:24px}.new-about-side{gap:14px}.new-service-grid,.new-project-page-grid,.new-contact-actions{grid-template-columns:1fr}.new-service-page-card{grid-template-columns:1fr}.new-service-page-image{min-height:210px}.new-project-page-image{height:270px}.new-contact-action{min-height:145px}.new-contact-bottom-row{flex-direction:column;gap:8px}.new-founder-content h3{font-size:38px}}
    `}</style>
  );
}

/* -------------------------------------------------------
   MAIN APP
------------------------------------------------------- */

function App() {
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState(0);
  const [newPage, setNewPage] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setService(
        (current) =>
          (current + 1) % services.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    setMenu(false);

    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const openPage = (page) => {
    setMenu(false);
    setNewPage(page);
    document.body.style.overflow = "hidden";
  };

  const closeNewPage = () => {
    setNewPage(null);
    document.body.style.overflow = "";
  };

  const whatsapp = (message) => {
    window.open(
      `${WHATSAPP}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const nextService = () => {
    setService(
      (current) =>
        (current + 1) % services.length
    );
  };

  const previousService = () => {
    setService(
      (current) =>
        (current - 1 + services.length) %
        services.length
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
            <motion.div
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
            >
              <div className="menu-header">
                <span>
                  GURURAG INTERIOR
                </span>

                <button
                  onClick={() =>
                    setMenu(false)
                  }
                >
                  <X />
                </button>
              </div>

              <nav>
                <button
                  onClick={() =>
                    scrollTo("home")
                  }
                >
                  <small>01</small>
                  Home
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => openPage("about")}
                >
                  <small>02</small>
                  About Us
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => openPage("services")}
                >
                  <small>03</small>
                  Our Services
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => openPage("projects")}
                >
                  <small>04</small>
                  Our Projects
                  <ArrowUpRight />
                </button>

                <button
                  onClick={() => openPage("contact")}
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

      <section
        id="home"
        className="hero"
      >
        <div className="hero-image" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <motion.div
            className="eyebrow"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
          >
            INTERIOR DESIGN | TURNKEY
            SOLUTIONS
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 45,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
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
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.65,
            }}
          >
            We create refined residential and
            commercial interiors where thoughtful
            design, skilled craftsmanship and
            everyday functionality come
            together.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
            }}
          >
            <button
              className="yellow-button"
              onClick={() =>
                scrollTo("projects")
              }
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
          <span>CHENNAI | INDIA</span>
        </div>
      </section>

      {/* INTRO */}

      <section className="intro section">
        <div className="label">
          01 - THE STUDIO
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
              At Gururag Interior, we believe
              a beautiful space should do more
              than look good. It should feel
              natural, work effortlessly and
              reflect the people who live or
              work inside it.
            </p>

            <p>
              From detailed carpentry and
              modern kitchens to civil works,
              finishing and complete turnkey
              solutions, we bring every layer
              together with one clear vision.
            </p>

            <button
              className="dark-link"
              onClick={() =>
                scrollTo("about")
              }
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
          02 - ABOUT US
        </div>

        <div className="about-heading">
          <h2>
            Designed around
            <br />
            <em>your life.</em>
          </h2>

          <p>
            Gururag Interior is built around
            a simple idea - every space
            deserves its own character.
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
                <span>
                  Years Experience
                </span>
              </div>

              <div>
                <strong>1,500+</strong>
                <span>
                  Completed Projects
                </span>
              </div>
            </div>

            <p>
              With over 13 years of experience
              across interior, construction and
              renovation solutions, Saran Raj
              leads Gururag Interior with a
              strong focus on craftsmanship,
              detail and client satisfaction.
            </p>

            <p>
              His approach combines thoughtful
              design with practical execution,
              creating spaces that are distinctive,
              comfortable and built around the
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
          03 - OUR SERVICES
        </div>

        <div className="services-heading">
          <h2>
            From concept
            <br />
            to <em>completion.</em>
          </h2>

          <p>
            Complete interior, renovation,
            civil and allied solutions managed
            with one design vision.
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
                  alt={
                    currentService.title
                  }
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
            <button
              onClick={previousService}
            >
              <ArrowLeft />
            </button>

            <div className="dots">
              {services.map(
                (item, index) => (
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
                )
              )}
            </div>

            <button
              onClick={nextService}
            >
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
          04 - OUR PROJECTS
        </div>

        <div className="projects-heading">
          <h2>
            Spaces made
            <br />
            to be <em>lived in.</em>
          </h2>

          <p>
            A collection of modern interior
            directions shaped by comfort,
            proportion and timeless detailing.
          </p>
        </div>

        <div className="project-grid">
          {projects.map(
            (project, index) => (
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
                    alt={
                      project.title
                    }
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
            )
          )}
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
            something{" "}
            <em>beautiful.</em>
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
          05 - CONTACT
        </div>

        <div className="contact-grid">
          <div>
            <h2>
              Let's talk
              <br />
              <em>interiors.</em>
            </h2>

            <p>
              Have a home, office or renovation
              project in mind? Tell us what you
              are planning and let's build
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
              Send your project type, location
              and reference images directly
              through WhatsApp.
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
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
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
            (c) 2026 Gururag Interior
          </span>

          <span>
            Saran Raj | Founder
          </span>
        </div>
      </footer>

      <NewPageStyles />

      {newPage && (
        <NewPageOverlay
          page={newPage}
          onClose={closeNewPage}
          onWhatsApp={whatsapp}
        />
      )}

      {/* CONVERSATIONAL CHAT ASSISTANT */}

      <Chatbot
        onWhatsApp={whatsapp}
      />
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
