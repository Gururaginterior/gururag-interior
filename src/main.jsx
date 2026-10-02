

import React, { useEffect, useRef, useState } from "react";  



import { createRoot } from "react-dom/client";  



import {  



  ArrowUpRight,  



  ArrowLeft,  



  ArrowRight,  



  X,  



  Phone,  



  MapPin,  



  Check,  



  Send,  



  Bot,  



} from "lucide-react";  



import { motion, AnimatePresence } from "framer-motion";  



import { supabase } from "./supabaseClient";  



import OwnerDashboard from "./OwnerDashboard";  



import "./styles.css";  



import logo from "./logo.jpg";  



import founder from "./founder.jpg";  



const WHATSAPP = "https://wa.me/919789695878";  



const INSTAGRAM = "https://www.instagram.com/sgr_decors_interior_designer?stkn=bDNyaWVleDY2dDI=";  



const YOUTUBE = "https://www.youtube.com/@GuruRagSignaturehome";  



const services = [  



  {  



    title: "Carpentry Works",  



    text: "Precision-built interiors for kitchens, wardrobes, furniture and custom spaces.",  



    chatbotDescription:  



      "Complete carpentry solutions designed around your space, lifestyle and storage needs.",  



    keywords: [  



      "carpentry",  



      "kitchen",  



      "modular kitchen",  



      "modular",  



      "pvc kitchen",  



      "wardrobe",  



      "wardrobes",  



      "cupboard",  



      "door",  



      "doors",  



      "furniture",  



      "custom furniture",  



      "wpc",  



      "upvc",  



      "glass partition",  



      "glass",  



      "cnc",  



      "office furniture",  



    ],  



    pros: [  



      "Custom-built to match your space",  



      "Wide range of kitchen and wardrobe solutions",  



      "Better storage planning",  



      "Flexible designs and finishes",  



    ],  



    considerations: [  



      "Material selection affects the final cost",  



      "Custom work requires proper measurements",  



      "Finish and hardware quality should be checked before execution",  



    ],  



    items: [  



      "PVC Modular Kitchen",  



      "PVC Wardrobes & Doors",  



      "WPC Door Works",  



      "UPVC Windows",  



      "Glass Partitions",  



      "Office Furniture",  



      "Custom Furniture",  



      "CNC Cutting & Partition",  



    ],  



    image:  



      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1600&q=90",  



  },  



  {  



    title: "Painting & Waterproofing",  



    text: "Premium finishes combined with practical protection for beautiful, long-lasting spaces.",  



    chatbotDescription:  



      "Interior and exterior painting combined with waterproofing solutions for better protection and finish.",  



    keywords: [  



      "painting",  



      "paint",  



      "colour",  



      "color",  



      "wall paint",  



      "3d painting",  



      "elevation painting",  



      "waterproofing",  



      "water proofing",  



      "leakage",  



      "leak",  



      "damp",  



      "damp proof",  



      "terrace",  



      "heat reflection",  



      "bathroom waterproofing",  



    ],  



    pros: [  



      "Improves the overall appearance",  



      "Multiple finish and colour options",  



      "Helps protect walls and surfaces",  



      "Waterproofing can reduce moisture-related issues",  



    ],  



    considerations: [  



      "Surface preparation is important",  



      "Waterproofing requires identifying the source of leakage",  



      "Drying and curing time should be considered",  



    ],  



    items: [  



      "Interior Painting",  



      "3D Painting",  



      "Elevation Painting",  



      "Terrace Heat Reflection",  



      "Bathroom Waterproofing",  



      "Terrace Damp Proofing",  



    ],  



    image:  



      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1600&q=90",  



  },  



  {  



    title: "Civil Works",  



    text: "Complete civil and finishing solutions that bring your interior vision together.",  



    chatbotDescription:  



      "Civil, flooring and finishing work coordinated as part of your interior or renovation project.",  



    keywords: [  



      "civil",  



      "civil work",  



      "renovation",  



      "renovate",  



      "tiles",  



      "tile",  



      "flooring",  



      "wooden flooring",  



      "granite",  



      "demolition",  



      "wallpaper",  



      "wall paper",  



      "false ceiling",  



      "ceiling",  



      "pvc ceiling",  



    ],  



    pros: [  



      "Complete execution under one service",  



      "Suitable for renovation and new interiors",  



      "Better coordination between civil and interior work",  



      "Wide range of finishing options",  



    ],  



    considerations: [  



      "Civil work can create dust and temporary disruption",  



      "Project timelines depend on site conditions",  



      "Material choices affect budget and maintenance",  



    ],  



    items: [  



      "Tiles & Wooden Flooring",  



      "Granite Works",  



      "Civil & Demolition",  



      "Wall Papers",  



      "False Ceiling",  



      "PVC False Ceiling",  



    ],  



    image:  



      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90",  



  },  



  {  



    title: "Electrical & Plumbing",  



    text: "Modern infrastructure designed around safety, comfort and everyday convenience.",  



    chatbotDescription:  



      "Electrical and plumbing solutions planned to support safe, practical and comfortable interiors.",  



    keywords: [  



      "electrical",  



      "electric",  



      "wiring",  



      "plumbing",  



      "plumber",  



      "cctv",  



      "camera",  



      "inverter",  



      "inverter wiring",  



      "automation",  



      "smart home",  



      "switch",  



      "switches",  



      "motor",  



      "gas pipe",  



      "gas pipeline",  



    ],  



    pros: [  



      "Better planning before finishing work",  



      "Supports modern appliances and automation",  



      "Improves everyday convenience",  



      "Can be integrated with interior planning",  



    ],  



    considerations: [  



      "Electrical work should be properly planned before walls are closed",  



      "Quality wiring and components matter",  



      "Plumbing access should be considered for future maintenance",  



    ],  



    items: [  



      "CCTV Installation",  



      "Inverter Wiring",  



      "Automation Switches",  



      "Motor Control",  



      "Electrical Works",  



      "Copper Gas Pipe Work",  



    ],  



    image:  



      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1600&q=90",  



  },  



  {  



    title: "Metal Fabrication",  



    text: "Strong and contemporary metal solutions for homes, offices and outdoor spaces.",  



    chatbotDescription:  



      "Custom metal, aluminium and grille solutions for security, partitions, ventilation and modern design.",  



    keywords: [  



      "metal",  



      "fabrication",  



      "grill",  



      "grille",  



      "gate",  



      "gates",  



      "ss gate",  



      "ms gate",  



      "aluminium",  



      "aluminum",  



      "mosquito net",  



      "sliding door",  



      "sliding doors",  



      "aluminium partition",  



      "partition",  



    ],  



    pros: [  



      "Strong and durable solutions",  



      "Custom sizes and designs",  



      "Useful for security and partitions",  



      "Suitable for residential and commercial spaces",  



    ],  



    considerations: [  



      "Design and finish should match the overall interior",  



      "Outdoor metalwork needs suitable protection",  



      "Measurements should be confirmed before fabrication",  



    ],  



    items: [  



      "SS Grille Gates",  



      "MS Grille Gates",  



      "Aluminium Mosquito Nets",  



      "Sliding Doors",  



      "Aluminium Partitions",  



    ],  



    image:  



      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=90",  



  },  



];  



const projects = [  



  {  



    title: "Modern Kitchen",  



    category: "Kitchen",  



    image:  



      "https://images.unsplash.com/photo-1758240689297-d8613ca753f3?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1600",  



  },  



  {  



    title: "Contemporary Living",  



    category: "Residential",  



    image:  



      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",  



  },  



  {  



    title: "Quiet Luxury Bedroom",  



    category: "Bedroom",  



    image:  



      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=90",  



  },  



  {  



    title: "Modern Workspace",  



    category: "Commercial",  



    image:  



      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90",  



  },  



];  



function InstagramBrandIcon({ size = 22 }) {  



  const gradientId = `instagramGradient-${size}`;  



  return (  



    <svg  



      width={size}  



      height={size}  



      viewBox="0 0 24 24"  



      fill="none"  



      xmlns="http://www.w3.org/2000/svg"  



      aria-label="Instagram"  



    >  



      <defs>  



        <linearGradient id={gradientId} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">  



          <stop stopColor="#FFDC80" />  



          <stop offset="0.35" stopColor="#F77737" />  



          <stop offset="0.65" stopColor="#E1306C" />  



          <stop offset="1" stopColor="#833AB4" />  



        </linearGradient>  



      </defs>  



      <rect x="3" y="3" width="18" height="18" rx="5" fill={`url(#${gradientId})`} />  



      <rect x="7.2" y="7.2" width="9.6" height="9.6" rx="3" stroke="white" strokeWidth="1.9" />  



      <circle cx="12" cy="12" r="2.5" stroke="white" strokeWidth="1.9" />  



      <circle cx="16.5" cy="7.6" r="1.05" fill="white" />  



    </svg>  



  );  



}  



function YouTubeBrandIcon({ size = 22 }) {  



  return (  



    <svg  



      width={size}  



      height={size}  



      viewBox="0 0 24 24"  



      fill="none"  



      xmlns="http://www.w3.org/2000/svg"  



      aria-label="YouTube"  



    >  



      <rect x="2.2" y="5" width="19.6" height="14" rx="4.2" fill="#FF0000" />  



      <path d="M10.2 8.5L16.1 12L10.2 15.5V8.5Z" fill="white" />  



    </svg>  



  );  



}  



function WhatsAppIcon({ size = 22 }) {  



  return (  



    <svg  



      width={size}  



      height={size}  



      viewBox="0 0 32 32"  



      fill="none"  



      xmlns="http://www.w3.org/2000/svg"  



      aria-label="WhatsApp"  



    >  



      <path  



        d="M16 3C8.82 3 3 8.82 3 16C3 18.3 3.6 20.46 4.65 22.34L3.1 28.9L9.82 27.38C11.65 28.4 13.77 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3Z"  



        fill="#25D366"  



      />  



      <path  



        d="M21.55 18.78C21.26 18.64 19.88 17.96 19.62 17.87C19.35 17.77 19.16 17.72 18.97 18.01C18.77 18.3 18.24 18.96 18.08 19.15C17.91 19.34 17.74 19.36 17.45 19.21C17.16 19.07 16.22 18.76 15.11 17.77C14.24 17 13.65 16.05 13.49 15.76C13.33 15.47 13.47 15.31 13.61 15.17C13.75 15.03 13.9 14.81 14.04 14.64C14.18 14.47 14.23 14.35 14.33 14.16C14.42 13.97 14.38 13.81 14.31 13.67C14.23 13.53 13.65 12.11 13.41 11.53C13.18 10.97 12.95 11.06 12.77 11.05C12.6 11.04 12.41 11.03 12.22 11.03C12.03 11.03 11.72 11.1 11.46 11.39C11.2 11.68 10.46 12.38 10.46 13.8C10.46 15.22 11.48 16.59 11.62 16.78C11.76 16.97 13.62 19.83 16.46 21.06C17.14 21.35 17.67 21.52 18.09 21.65C18.77 21.87 19.39 21.84 19.88 21.77C20.43 21.69 21.57 21.08 21.81 20.42C22.05 19.75 22.05 19.18 21.98 19.06C21.92 18.94 21.78 18.88 21.55 18.78Z"  



        fill="white"  



      />  



    </svg>  



  );  



}  



function normalizeText(text = "") {  



  return text  



    .toLowerCase()  



    .replace(/[^\w\s.]/g, " ")  



    .replace(/\s+/g, " ")  



    .trim();  



}  



function includesAny(text, words) {  



  return words.some((word) => text.includes(word));  



}  



function findService(text) {  



  const normalized = normalizeText(text);  



  let bestService = null;  



  let bestScore = 0;  



  services.forEach((service) => {  



    let score = 0;  



    service.keywords.forEach((keyword) => {  



      const key = normalizeText(keyword);  



      if (normalized.includes(key)) {  



        score += key.includes(" ")  



          ? 4  



          : 2;  



      }  



    });  



    if (score > bestScore) {  



      bestScore = score;  



      bestService = service;  



    }  



  });  



  return bestScore > 0 ? bestService : null;  



}  



function isGreeting(text) {  



  return includesAny(normalizeText(text), [  



    "hi",  



    "hello",  



    "hey",  



    "hii",  



    "hlo",  



    "vanakkam",  



    "good morning",  



    "good evening",  



    "good afternoon",  



  ]);  



}  



function isAboutQuestion(text) {  



  const normalized = normalizeText(text);  



  return includesAny(normalized, [  



    "about you",  



    "about us",  



    "about gururag",  



    "who are you",  



    "founder",  



    "owner",  



    "saran",  



    "experience",  



    "how many years",  



    "years experience",  



    "projects completed",  



  ]);  



}  



function isPriceQuestion(text) {  



  const normalized = normalizeText(text);  



  return includesAny(normalized, [  



    "price",  



    "pricing",  



    "cost",  



    "budget",  



    "rate",  



    "rates",  



    "quotation",  



    "quote",  



    "estimate",  



    "how much",  



    "evlo",  



    "evalo",  



    "amount",  



    "lakh",  



    "lakhs",  



    "rs",  



    "Rs",  



  ]);  



}  



function isContactQuestion(text) {  



  const normalized = normalizeText(text);  



  return includesAny(normalized, [  



    "contact",  



    "phone",  



    "call",  



    "number",  



    "whatsapp",  



    "talk to designer",  



    "designer",  



    "human",  



    "person",  



    "team",  



  ]);  



}  



function isEnquiryRequest(text) {  



  const normalized = normalizeText(text);  



  return includesAny(normalized, [  



    "enquire",  



    "enquiry",  



    "enquire now",  



    "quote venum",  



    "quote",  



    "book",  



    "booking",  



    "start project",  



    "project venum",  



    "contact me",  



    "talk to someone",  



    "yes",  



    "okay",  



    "ok",  



    "sure",  



  ]);  



}  



function detectBudget(text) {  



  const normalized = normalizeText(text);  



  const match = normalized.match(  



    /(?:rs)?\s*(\d+(?:\.\d+)?)\s*(lakh|lakhs|k|thousand)?/  



  );  



  if (!match) return null;  



  const number = Number(match[1]);  



  const unit = match[2];  



  if (!number) return null;  



  if (unit === "lakh" || unit === "lakhs") {  



    return `Rs. ${number} lakh`;  



  }  



  if (unit === "k" || unit === "thousand") {  



    return `Rs. ${number}k`;  



  }  



  if (  



    normalized.includes("budget") ||  



    normalized.includes("price") ||  



    normalized.includes("cost")  



  ) {  



    return `Rs. ${number}`;  



  }  



  return null;  



}  



function Chatbot({ onWhatsApp }) {  



  const [open, setOpen] = useState(false);  



  const [messages, setMessages] = useState([  



    {  



      id: 1,  



      role: "bot",  



      type: "text",  



      text:  



        "Hi there! Welcome to Gururag Interior. Tell me what you're planning for your space - you can type naturally, like \"I need a modular kitchen\" or \"2 lakh budget kitchen possible ah?\"",  



    },  



  ]);  



  const [input, setInput] = useState("");  



  const [activeService, setActiveService] = useState(null);  



  const [leadName, setLeadName] = useState("");  



  const [waitingForName, setWaitingForName] = useState(false);  



  const [isThinking, setIsThinking] = useState(false);  



  const messagesEndRef = useRef(null);  



  const inputRef = useRef(null);  



  useEffect(() => {  



    messagesEndRef.current?.scrollIntoView({  



      behavior: "smooth",  



    });  



  }, [messages]);  



  const addBotMessage = (text, extra = {}) => {  



    setMessages((current) => [  



      ...current,  



      {  



        id: Date.now() + Math.random(),  



        role: "bot",  



        type: "text",  



        text,  



        ...extra,  



      },  



    ]);  



  };  



  const addUserMessage = (text) => {  



    setMessages((current) => [  



      ...current,  



      {  



        id: Date.now() + Math.random(),  



        role: "user",  



        type: "text",  



        text,  



      },  



    ]);  



  };  



  const showServiceCard = (service) => {  



    setActiveService(service);  



    setMessages((current) => [  



      ...current,  



      {  



        id: Date.now() + Math.random(),  



        role: "bot",  



        type: "service",  



        service,  



      },  



    ]);  



  };  



  const resetChat = () => {  



    setMessages([  



      {  



        id: Date.now(),  



        role: "bot",  



        type: "text",  



        text:  



          "Hi there! Welcome to Gururag Interior. Tell me what you're planning for your space.",  



      },  



    ]);  



    setInput("");  



    setActiveService(null);  



    setLeadName("");  



    setWaitingForName(false);  



    setIsThinking(false);  



  };  



  const startEnquiry = (service = activeService) => {  



    if (service) {  



      addBotMessage(  



        `Absolutely. I can help you enquire about ${service.title}. Before I connect you with Gururag Interior, may I know your name?`  



      );  



    } else {  



      addBotMessage(  



        "Sure! I'd be happy to connect you with the Gururag Interior team. May I know your name first?"  



      );  



    }  



    setWaitingForName(true);  



    setTimeout(() => {  



      inputRef.current?.focus();  



    }, 100);  



  };  



  const sendWhatsAppEnquiry = () => {  



    const serviceName =  



      activeService?.title || "Interior Services";  



    const customerName =  



      leadName.trim() || "Customer";  



    const message =  



      `Hi Sir, I'm ${customerName}. ` +  



      `I'm interested in ${serviceName} from Gururag Interior. ` +  



      `I discussed my requirement with the website assistant and would like to know more and get a quotation.`;  



    onWhatsApp(message);  



  };  



  const askAiAssistant = async (rawText) => {  



    setIsThinking(true);  



    try {  



      const history = messages  



        .filter((message) => message.type === "text")  



        .slice(-10)  



        .map((message) => ({  



          role: message.role,  



          text: message.text,  



        }));  



      const response = await fetch("/api/chat", {  



        method: "POST",  



        headers: {  



          "Content-Type": "application/json",  



        },  



        body: JSON.stringify({  



          message: rawText,  



          history,  



          service: activeService?.title || null,  



        }),  



      });  



      const data = await response.json();  



      if (!response.ok || !data.reply) {  



        throw new Error(data.error || "AI request failed");  



      }  



      addBotMessage(data.reply);  



    } catch (error) {  



      addBotMessage(  



        "I can help with Gururag Interior services, design ideas, materials and project questions. For a live AI answer, please try again in a moment or contact us on WhatsApp at +91 97896 95878."  



      );  



    } finally {  



      setIsThinking(false);  



    }  



  };  



  const handleBotResponse = async (rawText) => {  



    const text = normalizeText(rawText);  



    if (!text) return;  



    if (waitingForName) {  



      const cleanedName = rawText  



        .replace(  



          /^(my name is|i am|i'm|im|name is)\s+/i,  



          ""  



        )  



        .trim();  



      const finalName =  



        cleanedName.length > 1  



          ? cleanedName  



          : rawText.trim();  



      setLeadName(finalName);  



      setWaitingForName(false);  



      if (activeService) {  



        addBotMessage(  



          `Nice to meet you, ${finalName}! You're enquiring about ${activeService.title}.`  



        );  



        setTimeout(() => {  



          addBotMessage(  



            "You can continue asking me about the design, materials or budget. If you're ready, tap 'Send Enquiry on WhatsApp' below."  



          );  



        }, 250);  



      } else {  



        addBotMessage(  



          `Nice to meet you, ${finalName}! Which service are you looking for? You can simply type something like "modular kitchen", "wardrobe", "painting" or "false ceiling".`  



        );  



      }  



      return;  



    }  



    if (isGreeting(text)) {  



      addBotMessage(  



        "Hello! What are you planning for your space? You can ask me anything about kitchens, wardrobes, painting, false ceiling, civil work, electrical work, metal fabrication, or complete interiors."  



      );  



      return;  



    }  



    if (isAboutQuestion(text)) {  



      addBotMessage(  



        "Gururag Interior is led by Saran Raj, with 13+ years of experience and 1,500+ completed projects. The team handles interior design, carpentry, civil works, finishing and allied solutions for residential and commercial spaces."  



      );  



      return;  



    }  



    if (isContactQuestion(text)) {  



      addBotMessage(  



        "Sure. You can contact Gururag Interior directly on WhatsApp at +91 97896 95878. If you tell me your requirement first, I can also prepare the enquiry for you."  



      );  



      setTimeout(() => {  



        addBotMessage(  



          `For example: "I need a 2BHK interior", "modular kitchen", or "false ceiling for my living room".`  



        );  



      }, 250);  



      return;  



    }  



    if (isEnquiryRequest(text)) {  



      startEnquiry();  



      return;  



    }  



    const budget = detectBudget(text);  



    if (budget) {  



      if (activeService) {  



        addBotMessage(  



          `Got it. You're considering around ${budget} for ${activeService.title}. The final cost depends on the size, materials, finish, hardware and site requirements.`  



        );  



        setTimeout(() => {  



          addBotMessage(  



            "I don't want to give you a misleading fixed price without seeing the actual requirement. The Gururag team can check the site/details and give you a proper quotation."  



          );  



        }, 300);  



        setTimeout(() => {  



          addBotMessage(  



            "If you'd like, I can prepare a WhatsApp enquiry for this service."  



          );  



        }, 550);  



      } else {  



        addBotMessage(  



          `Rs. ${budget.replace("Rs. ", "")} budget noted. Which space are you planning - kitchen, wardrobe, full home interior, office, painting or something else?`  



        );  



      }  



      return;  



    }  



    const detectedService = findService(text);  



    if (detectedService) {  



      showServiceCard(detectedService);  



      setTimeout(() => {  



        addBotMessage(  



          `Yes, ${detectedService.title} is something Gururag Interior can help with. You can ask me about options, advantages, materials, budget considerations, or how to enquire.`  



        );  



      }, 350);  



      return;  



    }  



    if (activeService) {  



      if (  



        includesAny(text, [  



          "advantage",  



          "advantages",  



          "benefit",  



          "benefits",  



          "pros",  



          "good",  



          "why",  



        ])  



      ) {  



        addBotMessage(  



          `For ${activeService.title}, some key advantages are:\n\n| ${activeService.pros.join(  



            "\n| "  



          )}`  



        );  



        return;  



      }  



      if (  



        includesAny(text, [  



          "consider",  



          "cons",  



          "disadvantage",  



          "problem",  



          "things to know",  



          "before",  



        ])  



      ) {  



        addBotMessage(  



          `A few things to consider for ${activeService.title}:\n\n| ${activeService.considerations.join(  



            "\n| "  



          )}`  



        );  



        return;  



      }  



      if (  



        includesAny(text, [  



          "option",  



          "options",  



          "types",  



          "what do you provide",  



          "what you provide",  



          "what is available",  



          "available",  



          "items",  



        ])  



      ) {  



        addBotMessage(  



          `For ${activeService.title}, we can provide:\n\n| ${activeService.items.join(  



            "\n| "  



          )}`  



        );  



        return;  



      }  



      if (  



        includesAny(text, [  



          "quote",  



          "quotation",  



          "estimate",  



          "enquiry",  



          "enquire",  



          "book",  



        ])  



      ) {  



        startEnquiry(activeService);  



        return;  



      }  



      addBotMessage(  



        `Sure, I can help with ${activeService.title}. Are you looking for information about the options, advantages, things to consider, budget, or a quotation?`  



      );  



      return;  



    }  



    if (  



      includesAny(text, [  



        "full interior",  



        "home interior",  



        "house interior",  



        "complete interior",  



        "interior design",  



        "interior work",  



        "interior works",  



        "2bhk",  



        "3bhk",  



        "4bhk",  



        "flat interior",  



        "apartment interior",  



      ])  



    ) {  



      addBotMessage(  



        "Absolutely. Gururag Interior can coordinate multiple parts of a home interior - carpentry, kitchen, wardrobes, civil work, flooring, false ceiling, painting, electrical and more."  



      );  



      setTimeout(() => {  



        addBotMessage(  



          `If you tell me your home type, like "3BHK", and your approximate budget, I can guide you on what to discuss with the designer.`  



        );  



      }, 300);  



      return;  



    }  



    if (  



      includesAny(text, [  



        "office",  



        "commercial interior",  



        "shop interior",  



        "showroom",  



        "workspace",  



      ])  



    ) {  



      addBotMessage(  



        "Yes  Gururag Interior also provides commercial interior solutions such as office furniture, partitions, electrical planning, painting, civil work and custom spaces."  



      );  



      setTimeout(() => {  



        addBotMessage(  



          "Tell me what type of space you have - office, showroom, shop or workspace - and I can guide you further."  



        );  



      }, 300);  



      return;  



    }  



    await askAiAssistant(rawText);  



  };  



  const sendMessage = () => {  



    const value = input.trim();  



    if (!value) return;  



    addUserMessage(value);  



    setInput("");  



    handleBotResponse(value);  



  };  



  return (  



    <>  



      <AnimatePresence>  



        {!open && (  



          <motion.button  



            className="chatbot-launcher"  



            onClick={() => setOpen(true)}  



            initial={{  



              opacity: 0,  



              scale: 0.7,  



              y: 30,  



            }}  



            animate={{  



              opacity: 1,  



              scale: 1,  



              y: 0,  



            }}  



            transition={{  



              delay: 1,  



              duration: 0.5,  



            }}  



          >  



            <span className="chatbot-live-dot" />  



            <Bot size={23} />  



            <span>Live Now</span>  



          </motion.button>  



        )}  



      </AnimatePresence>  



      <AnimatePresence>  



        {open && (  



          <motion.div  



            className="chatbot-window"  



            initial={{  



              opacity: 0,  



              y: 30,  



              scale: 0.94,  



            }}  



            animate={{  



              opacity: 1,  



              y: 0,  



              scale: 1,  



            }}  



            exit={{  



              opacity: 0,  



              y: 30,  



              scale: 0.94,  



            }}  



            transition={{  



              duration: 0.25,  



            }}  



          >  



            <div className="chatbot-header">  



              <div className="chatbot-agent">  



                <div className="chatbot-avatar">  



                  <Bot size={21} />  



                </div>  



                <div>  



                  <strong>Gururag Assistant</strong>  



                  <span>  



                    <i />  



                    Live Now | 24/7  



                  </span>  



                </div>  



              </div>  



              <button  



                className="chatbot-close"  



                onClick={() => setOpen(false)}  



                aria-label="Close chatbot"  



              >  



                <X size={19} />  



              </button>  



            </div>  



            <div className="chatbot-body">  



              <div className="chatbot-conversation">  



                {messages.map((message) => {  



                  if (message.type === "service") {  



                    const item = message.service;  



                    return (  



                      <motion.div  



                        key={message.id}  



                        className="chat-service-card"  



                        initial={{  



                          opacity: 0,  



                          y: 15,  



                        }}  



                        animate={{  



                          opacity: 1,  



                          y: 0,  



                        }}  



                      >  



                        <div className="chat-service-image">  



                          <img  



                            src={item.image}  



                            alt={item.title}  



                          />  



                        </div>  



                        <div className="chat-service-card-content">  



                          <span className="chat-mini-label">  



                            GURURAG INTERIOR  



                          </span>  



                          <h4>{item.title}</h4>  



                          <p>  



                            {item.chatbotDescription}  



                          </p>  



                          <div className="chat-detail-section">  



                            <strong>  



                              What you get  



                            </strong>  



                            {item.items  



                              .slice(0, 5)  



                              .map((serviceItem) => (  



                                <div  



                                  key={serviceItem}  



                                >  



                                  <Check size={14} />  



                                  {serviceItem}  



                                </div>  



                              ))}  



                          </div>  



                          <div className="chat-detail-section">  



                            <strong>  



                              Advantages  



                            </strong>  



                            {item.pros  



                              .slice(0, 4)  



                              .map((pros) => (  



                                <div key={pros}>  



                                  <Check size={14} />  



                                  {pros}  



                                </div>  



                              ))}  



                          </div>  



                          <div className="chat-detail-section consideration">  



                            <strong>  



                              Things to consider  



                            </strong>  



                            {item.considerations  



                              .slice(0, 3)  



                              .map(  



                                (consideration) => (  



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



                            onClick={() =>  



                              startEnquiry(item)  



                            }  



                          >  



                            Enquire About This  



                            <ArrowUpRight  



                              size={17}  



                            />  



                          </button>  



                        </div>  



                      </motion.div>  



                    );  



                  }  



                  return (  



                    <motion.div  



                      key={message.id}  



                      className={`chat-message ${  



                        message.role === "user"  



                          ? "user-message"  



                          : "bot-message"  



                      }`}  



                      initial={{  



                        opacity: 0,  



                        y: 10,  



                      }}  



                      animate={{  



                        opacity: 1,  



                        y: 0,  



                      }}  



                    >  



                      {message.role === "bot" && (  



                        <div className="message-avatar">  



                          <Bot size={14} />  



                        </div>  



                      )}  



                      <div className="message-bubble">  



                        {message.text  



                          .split("\n")  



                          .map((line, index) => (  



                            <React.Fragment  



                              key={index}  



                            >  



                              {line}  



                              {index <  



                                message.text.split(  



                                  "\n"  



                                ).length -  



                                  1 && <br />}  



                            </React.Fragment>  



                          ))}  



                      </div>  



                    </motion.div>  



                  );  



                })}  



                {isThinking && (  



                  <motion.div  



                    className="chat-message bot-message"  



                    initial={{ opacity: 0, y: 10 }}  



                    animate={{ opacity: 1, y: 0 }}  



                  >  



                    <div className="message-avatar">  



                      <Bot size={14} />  



                    </div>  



                    <div className="message-bubble">Thinking...</div>  



                  </motion.div>  



                )}  



                <div ref={messagesEndRef} />  



              </div>  



              {leadName && (  



                <button  



                  className="chat-whatsapp-button"  



                  onClick={  



                    sendWhatsAppEnquiry  



                  }  



                >  



                  <WhatsAppIcon size={20} />  



                  Send Enquiry on WhatsApp  



                </button>  



              )}  



              <div className="chat-input-wrap">  



                <input  



                  ref={inputRef}  



                  className="chat-input"  



                  type="text"  



                  value={input}  



                  disabled={isThinking}  



                  placeholder={  



                    waitingForName  



                      ? "Type your name..."  



                      : "Type your message..."  



                  }  



                  onChange={(e) =>  



                    setInput(e.target.value)  



                  }  



                  onKeyDown={(e) => {  



                    if (  



                      e.key === "Enter" &&  



                      !e.shiftKey  



                    ) {  



                      e.preventDefault();  



                      sendMessage();  



                    }  



                  }}  



                />  



                <button  



                  className="chat-send-button"  



                  onClick={sendMessage}  



                  disabled={!input.trim() || isThinking}  



                  aria-label="Send message"  



                >  



                  <Send size={17} />  



                </button>  



              </div>  



              <div className="chat-bottom-actions">  



                <button  



                  onClick={() => {  



                    resetChat();  



                    setTimeout(() => {  



                      inputRef.current?.focus();  



                    }, 100);  



                  }}  



                >  



                  Start New Chat  



                </button>  



                <button  



                  onClick={() =>  



                    startEnquiry()  



                  }  



                >  



                  Talk to Designer  



                </button>  



              </div>  



            </div>  



            <div className="chatbot-footer">  



              <span>GURURAG INTERIOR</span>  



              <span>CHENNAI</span>  



            </div>  



          </motion.div>  



        )}  



      </AnimatePresence>  



    </>  



  );  



}  



function TypewriterText({ lines }) {  



  const [lineIndex, setLineIndex] = useState(0);  



  const [text, setText] = useState("");  



  const [deleting, setDeleting] = useState(false);  



  useEffect(() => {  



    const current = lines[lineIndex] || "";  



    const speed = deleting ? 38 : 72;  



    const timer = setTimeout(() => {  



      if (!deleting) {  



        const next = current.slice(0, text.length + 1);  



        setText(next);  



        if (next === current) {  



          setTimeout(() => setDeleting(true), 1400);  



        }  



      } else {  



        const next = current.slice(0, Math.max(0, text.length - 1));  



        setText(next);  



        if (!next) {  



          setDeleting(false);  



          setLineIndex((index) => (index + 1) % lines.length);  



        }  



      }  



    }, speed);  



    return () => clearTimeout(timer);  



  }, [text, deleting, lineIndex, lines]);  



  return (  



    <span className="new-page-typewriter">  



      {text}  



      <span className="typewriter-cursor">|</span>  



    </span>  



  );  



}  



function NewPageOverlay({ page, onClose, onWhatsApp, managedServices, managedProjects }) {  



  const pageData = {  



    about: {  



      number: "02",  



      eyebrow: "ABOUT US",  



      title: "Designing Spaces.\nCreating Experiences.",  



    },  



    services: {  



      number: "03",  



      eyebrow: "WHAT WE CREATE",  



      title: "From first idea\nto final detail.",  



    },  



    projects: {  



      number: "04",  



      eyebrow: "SELECTED DIRECTIONS",  



      title: "Spaces made\nto be lived in.",  



    },  



    contact: {  



      number: "05",  



      eyebrow: "LET'S TALK",  



      title: "Your space.\nOur next conversation.",  



    },  



  };  



  const data = pageData[page];  



  if (!data) return null;  



  return (  



    <AnimatePresence>  



      <motion.div  



        className="new-page-overlay"  



        initial={{ opacity: 0 }}  



        animate={{ opacity: 1 }}  



        exit={{ opacity: 0 }}  



      >  



        <motion.div  



          className="new-page-shell"  



          initial={{ y: 45, scale: 0.985 }}  



          animate={{ y: 0, scale: 1 }}  



          exit={{ y: 30, scale: 0.985 }}  



          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}  



        >  



          <div className="new-page-topbar">  



            <button className="new-page-brand" onClick={onClose}>  



              <span className="new-page-logo">  



                <img src={logo} alt="Gururag Interior" />  



              </span>  



              <span>  



                <strong>GURURAG</strong>  



                <small>INTERIOR</small>  



              </span>  



            </button>  



            <div className="new-page-top-actions">  



              <a  



                className="new-page-top-whatsapp"  



                href={WHATSAPP}  



                target="_blank"  



                rel="noreferrer"  



                aria-label="WhatsApp Gururag Interior"  



              >  



                <WhatsAppIcon size={19} />  



                <span>WhatsApp</span>  



              </a>  



              <a  



                className="new-page-top-whatsapp"  



                href={YOUTUBE}  



                target="_blank"  



                rel="noreferrer"  



                aria-label="YouTube GuruRag Signature Home"  



              >  



                <YouTubeBrandIcon size={19} />  



                <span>YouTube</span>  



              </a>  



              <button  



                className="new-page-close"  



                onClick={onClose}  



                aria-label="Close page"  



              >  



                <X size={21} />  



              </button>  



            </div>  



          </div>  



          <div className="new-page-scroll">  



            <div className="new-page-hero-copy">  



              <div>  



                <span className="new-page-eyebrow">  



                  {data.number} - {data.eyebrow}  



                </span>  



                <h2>  



                  {data.title.split("\n").map((line, index) => (  



                    <React.Fragment key={line}>  



                      {index > 0 && <br />}  



                      {index === data.title.split("\n").length - 1 ? (  



                        <em>{line}</em>  



                      ) : (  



                        line  



                      )}  



                    </React.Fragment>  



                  ))}  



                </h2>  



              </div>  



              {page === "about" && (  



                <p>  



                  <TypewriterText  



                    lines={[  



                      "13+ years of experience.",  



                      "1,500+ completed projects.",  



                      "One clear vision for every space.",  



                    ]}  



                  />  



                </p>  



              )}  



              {page === "contact" && (  



                <p>  



                  <TypewriterText  



                    lines={[  



                      "Let's turn your idea into a space.",  



                      "Tell Saran Raj what you are planning.",  



                      "Your project can start with one message.",  



                    ]}  



                  />  



                </p>  



              )}  



              {page === "services" && (  



                <p>  



                  <TypewriterText  



                    lines={[  



                      "Carpentry. Civil. Painting. Electrical.",  



                      "Every layer, thoughtfully coordinated.",  



                      "Residential and commercial solutions.",  



                    ]}  



                  />  



                </p>  



              )}  



              {page === "projects" && (  



                <p>  



                  <TypewriterText  



                    lines={[  



                      "Contemporary living spaces.",  



                      "Modern kitchens and bedrooms.",  



                      "Workspaces with character.",  



                    ]}  



                  />  



                </p>  



              )}  



            </div>  



            {page === "about" && (  



              <div className="new-about-grid">  



                <div className="new-founder-card">  



                  <div className="new-founder-image-wrap">  



                    <img src={founder} alt="Saran Raj" />  



                    <div className="new-founder-image-overlay" />  



                    <span>FOUNDER | GURURAG INTERIOR</span>  



                  </div>  



                  <div className="new-founder-content">  



                    <span className="new-page-label">FOUNDER / DESIGN VISION</span>  



                    <h3>Guru Rags Signature Homes</h3>  



                    <p>  



                      With over 13 years of experience in interior design,  



                      construction and renovation solutions, Guru Rags Signature  



                      Homes is built on a passion for creating spaces that  



                      combine aesthetics, functionality and lasting quality.  



                    </p>  



                    <p>  



                      The company, previously operating under the name Sri Guru  



                      Ragavendra Decors, has now evolved into Guru Rags Signature  



                      Homes — a new identity that reflects our continued growth,  



                      refined design approach and commitment to delivering  



                      distinctive spaces.  



                    </p>  



                    <p>  



                      Led by Saran Raj, our approach brings together thoughtful  



                      design, practical execution and meticulous attention to  



                      detail. Every project is carefully planned around the  



                      client— lifestyle, requirements and vision, ensuring that  



                      the final space is not only visually appealing but also  



                      comfortable, functional and truly personal.  



                    </p>  



                    <p>  



                      From concept to completion, we focus on quality  



                      craftsmanship, transparent execution and client  



                      satisfaction, with every detail receiving the attention it  



                      deserves.  



                    </p>  



                    <p>  



                      At Guru Rags Signature Homes, we believe that a  



                      well-designed space is more than just beautiful — it should  



                      reflect the people who live in it.  



                    </p>  



                    <div className="new-stat-row">  



                      <div>  



                        <strong>13+</strong>  



                        <span>Years Experience</span>  



                      </div>  



                      <div>  



                        <strong>1,500+</strong>  



                        <span>Completed Projects</span>  



                      </div>  



                    </div>  



                  </div>  



                </div>  



                <div className="new-about-side">  



                  <div className="new-info-card">  



                    <span>OUR APPROACH</span>  



                    <h4>Thoughtful interiors. Crafted with character.</h4>  



                    <p>  



                      From detailed carpentry and modern kitchens to civil  



                      works, finishing and turnkey solutions, every layer is  



                      planned around the way you use your space.  



                    </p>  



                  </div>  



                  <div className="new-contact-mini">  



                    <span>CONNECT WITH SARAN</span>  



                    <a href="tel:+919789695878">  



                      <Phone size={19} />  



                      <span>+91 97896 95878</span>  



                      <ArrowUpRight size={17} />  



                    </a>  



                    <a href={WHATSAPP} target="_blank" rel="noreferrer">  



                      <WhatsAppIcon size={20} />  



                      <span>WhatsApp Saran Raj</span>  



                      <ArrowUpRight size={17} />  



                    </a>  



                    <a href={INSTAGRAM} target="_blank" rel="noreferrer">  



                      <InstagramBrandIcon size={20} />  



                      <span>Instagram Profile</span>  



                      <ArrowUpRight size={17} />  



                    </a>  



                    <a href={YOUTUBE} target="_blank" rel="noreferrer">  



                      <YouTubeBrandIcon size={20} />  



                      <span>YouTube Channel</span>  



                      <ArrowUpRight size={17} />  



                    </a>  



                  </div>  



                </div>  



              </div>  



            )}  



            {page === "services" && (  



              <div className="new-service-grid">  



                {managedServices.map((item, index) => (  



                  <motion.article  



                    className="new-service-page-card"  



                    key={item.title}  



                    initial={{ opacity: 0, y: 20 }}  



                    animate={{ opacity: 1, y: 0 }}  



                    transition={{ delay: index * 0.07 }}  



                  >  



                    <div className="new-service-page-image">  



                      <img src={item.image} alt={item.title} />  



                      <span>0{index + 1}</span>  



                    </div>  



                    <div>  



                      <span className="new-page-label">SERVICE 0{index + 1}</span>  



                      <h3>{item.title}</h3>  



                      <p>{item.text}</p>  



                      <button  



                        className="new-outline-button"  



                        onClick={() =>  



                          onWhatsApp(  



                            `Hi Gururag Interior, I am interested in ${item.title}.`  



                          )  



                        }  



                      >  



                        Enquire About This <ArrowUpRight size={17} />  



                      </button>  



                    </div>  



                  </motion.article>  



                ))}  



              </div>  



            )}  



            {page === "projects" && (  



              <div className="new-project-page-grid">  



                {managedProjects.map((project, index) => (  



                  <motion.article  



                    className="new-project-page-card"  



                    key={project.title}  



                    initial={{ opacity: 0, y: 25 }}  



                    animate={{ opacity: 1, y: 0 }}  



                    transition={{ delay: index * 0.08 }}  



                  >  



                    <div className="new-project-page-image">  



                      <img src={project.image} alt={project.title} />  



                      <div className="new-project-page-arrow">  



                        <ArrowUpRight size={18} />  



                      </div>  



                    </div>  



                    <span>{project.category}</span>  



                    <h3>{project.title}</h3>  



                  </motion.article>  



                ))}  



              </div>  



            )}  



            {page === "contact" && (  



              <div className="new-contact-page">  



                <div className="new-contact-intro">  



                  <span className="new-page-label">GURURAG INTERIOR | CHENNAI</span>  



                  <h3>  



                    <TypewriterText  



                      lines={[  



                        "Let's create something beautiful.",  



                        "Let's plan your next interior.",  



                        "Let's talk about your space.",  



                      ]}  



                    />  



                  </h3>  



                  <p>  



                    Share your home, office or renovation requirement with us.  



                    One message is enough to start the conversation.  



                  </p>  



                </div>  



                <div className="new-contact-actions">  



                  <a className="new-contact-action phone" href="tel:+919789695878">  



                    <span className="new-action-icon"><Phone size={22} /></span>  



                    <span className="new-action-copy">  



                      <small>CALL DIRECTLY</small>  



                      <strong>+91 97896 95878</strong>  



                    </span>  



                    <ArrowUpRight size={19} />  



                  </a>  



                  <a  



                    className="new-contact-action whatsapp"  



                    href={WHATSAPP}  



                    target="_blank"  



                    rel="noreferrer"  



                  >  



                    <span className="new-action-icon"><WhatsAppIcon size={23} /></span>  



                    <span className="new-action-copy">  



                      <small>CHAT ON WHATSAPP</small>  



                      <strong>Send Your Requirement</strong>  



                    </span>  



                    <ArrowUpRight size={19} />  



                  </a>  



                  <a  



                    className="new-contact-action instagram"  



                    href={INSTAGRAM}  



                    target="_blank"  



                    rel="noreferrer"  



                  >  



                    <span className="new-action-icon"><InstagramBrandIcon size={23} /></span>  



                    <span className="new-action-copy">  



                      <small>FOLLOW OUR WORK</small>  



                      <strong>@sgr_decors_interior_designer</strong>  



                    </span>  



                    <ArrowUpRight size={19} />  



                  </a>  



                  <a  



                    className="new-contact-action youtube"  



                    href={YOUTUBE}  



                    target="_blank"  



                    rel="noreferrer"  



                  >  



                    <span className="new-action-icon"><YouTubeBrandIcon size={23} /></span>  



                    <span className="new-action-copy">  



                      <small>WATCH OUR WORK</small>  



                      <strong>GuruRag Signature Home</strong>  



                    </span>  



                    <ArrowUpRight size={19} />  



                  </a>  



                </div>  



                <div className="new-contact-bottom-row">  



                  <span>Available for residential & commercial enquiries</span>  



                  <span>Chennai | Tamil Nadu</span>  



                </div>  



              </div>  



            )}  



          </div>  



        </motion.div>  



      </motion.div>  



    </AnimatePresence>  



  );  



}  



function NewPageStyles() {  



  return (  



    <style>{`  



      .menu-owner-trigger{border:0;background:transparent;color:inherit;font:inherit;padding:0;cursor:pointer;text-align:left}  



      .new-page-overlay{position:fixed;inset:0;z-index:1200;background:rgba(5,16,29,.78);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);padding:14px;display:flex;align-items:center;justify-content:center}  



      .new-page-shell{width:min(1180px,100%);height:min(94vh,900px);overflow:hidden;border:1px solid rgba(255,255,255,.13);border-radius:28px;background:#071827;color:#f7f5ed;box-shadow:0 35px 100px rgba(0,0,0,.48);position:relative}  



      .new-page-topbar{height:78px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.09);background:rgba(7,24,39,.92);position:sticky;top:0;z-index:5}  



      .new-page-brand{border:0;background:transparent;color:#fff;display:flex;align-items:center;gap:11px;cursor:pointer;padding:0;text-align:left}.new-page-brand>span:last-child{display:flex;flex-direction:column}.new-page-brand strong{font-size:14px;letter-spacing:.18em}.new-page-brand small{font-size:8px;letter-spacing:.28em;color:#9ee7cf;margin-top:2px}.new-page-logo{width:34px;height:34px;border-radius:8px;overflow:hidden;display:block;border:1px solid rgba(255,255,255,.18)}.new-page-logo img{width:100%;height:100%;object-fit:cover}  



      .new-page-top-actions{display:flex;align-items:center;gap:10px}.new-page-top-whatsapp{display:flex;align-items:center;gap:8px;text-decoration:none;color:#dff8ef;border:1px solid rgba(158,231,207,.25);padding:10px 14px;border-radius:999px;font-size:12px;font-weight:700;transition:.25s}.new-page-top-whatsapp:hover{background:#9ee7cf;color:#071827;box-shadow:0 0 24px rgba(158,231,207,.22)}.new-page-close{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#fff;display:grid;place-items:center;cursor:pointer;transition:.25s}.new-page-close:hover{transform:rotate(90deg);background:#f3d36a;color:#071827;box-shadow:0 0 28px rgba(243,211,106,.28)}  



      .new-page-scroll{height:calc(100% - 78px);overflow:auto;padding:48px clamp(20px,5vw,64px) 60px;scroll-behavior:smooth}.new-page-scroll::-webkit-scrollbar{width:5px}.new-page-scroll::-webkit-scrollbar-thumb{background:rgba(158,231,207,.35);border-radius:20px}  



      .new-page-hero-copy{display:grid;grid-template-columns:1.2fr .8fr;gap:35px;align-items:end;margin-bottom:42px}.new-page-eyebrow,.new-page-label{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9ee7cf;font-weight:800}.new-page-hero-copy h2{font-size:clamp(38px,6vw,76px);line-height:.98;letter-spacing:-.045em;margin:15px 0 0;font-weight:500}.new-page-hero-copy h2 em{font-family:Georgia,serif;font-weight:400;color:#f3d36a}.new-page-hero-copy p{margin:0;color:rgba(255,255,255,.68);font-size:16px;line-height:1.8;max-width:390px}.new-page-typewriter{display:inline}.typewriter-cursor{color:#f3d36a;font-weight:800;margin-left:2px;animation:typeBlink .8s infinite}@keyframes typeBlink{0%,45%{opacity:1}46%,100%{opacity:0}}  



      .new-about-grid{display:grid;grid-template-columns:1.6fr .75fr;gap:22px}.new-founder-card{display:grid;grid-template-columns:.82fr 1.18fr;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.1);border-radius:24px;overflow:hidden}.new-founder-image-wrap{min-height:500px;position:relative;overflow:hidden}.new-founder-image-wrap img{width:100%;height:100%;object-fit:cover;display:block}.new-founder-image-overlay{position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.78))}.new-founder-image-wrap>span{position:absolute;left:22px;bottom:20px;font-size:9px;letter-spacing:.17em;line-height:1.6;color:#fff}.new-founder-content{padding:34px;display:flex;flex-direction:column;justify-content:center}.new-founder-content h3{font-size:46px;line-height:.95;margin:13px 0 22px}.new-founder-content h3 em{font-family:Georgia,serif;color:#f3d36a;font-weight:400}.new-founder-content p{color:rgba(255,255,255,.68);line-height:1.75;font-size:14px;margin:0 0 15px}.new-stat-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}.new-stat-row>div{padding:17px;border-radius:15px;background:rgba(158,231,207,.07);border:1px solid rgba(158,231,207,.12)}.new-stat-row strong{display:block;font-size:28px;color:#9ee7cf}.new-stat-row span{display:block;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.58);margin-top:5px}.new-about-side{display:flex;flex-direction:column;gap:22px}.new-info-card,.new-contact-mini{border-radius:24px;padding:28px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1)}.new-info-card>span,.new-contact-mini>span{font-size:9px;letter-spacing:.18em;color:#9ee7cf;font-weight:800}.new-info-card h4{font-size:25px;line-height:1.2;margin:14px 0}.new-info-card p{color:rgba(255,255,255,.63);line-height:1.7;font-size:13px}.new-contact-mini{display:flex;flex-direction:column;gap:10px}.new-contact-mini>a{display:flex;align-items:center;gap:11px;text-decoration:none;color:#fff;padding:14px;border-radius:13px;border:1px solid rgba(255,255,255,.09);transition:.25s}.new-contact-mini>a span{flex:1;font-size:12px;font-weight:700}.new-contact-mini>a:hover{transform:translateX(4px);border-color:rgba(243,211,106,.42);background:rgba(243,211,106,.07);box-shadow:0 0 25px rgba(243,211,106,.08)}  



      .new-service-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.new-service-page-card{display:grid;grid-template-columns:.9fr 1.1fr;min-height:240px;border-radius:22px;overflow:hidden;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09)}.new-service-page-image{position:relative;min-height:240px}.new-service-page-image img{width:100%;height:100%;object-fit:cover}.new-service-page-image>span{position:absolute;top:14px;left:14px;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#f3d36a;color:#071827;font-size:10px;font-weight:900}.new-service-page-card>div:last-child{padding:24px}.new-service-page-card h3{font-size:23px;margin:9px 0}.new-service-page-card p{font-size:12px;line-height:1.65;color:rgba(255,255,255,.62);margin-bottom:17px}.new-outline-button{border:1px solid rgba(158,231,207,.28);background:transparent;color:#9ee7cf;padding:10px 13px;border-radius:999px;display:inline-flex;align-items:center;gap:8px;font-size:10px;font-weight:800;cursor:pointer;transition:.25s}.new-outline-button:hover{background:#9ee7cf;color:#071827;box-shadow:0 0 25px rgba(158,231,207,.2)}  



      .new-project-page-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.new-project-page-card{cursor:default}.new-project-page-image{height:340px;border-radius:22px;overflow:hidden;position:relative;margin-bottom:14px}.new-project-page-image img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.new-project-page-card:hover img{transform:scale(1.05)}.new-project-page-arrow{position:absolute;right:15px;top:15px;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:#f3d36a;color:#071827}.new-project-page-card>span{font-size:9px;letter-spacing:.18em;color:#9ee7cf;text-transform:uppercase}.new-project-page-card h3{font-size:23px;margin:7px 0 0}  



      .new-contact-page{padding-bottom:20px}.new-contact-intro{max-width:680px}.new-contact-intro h3{font-size:clamp(34px,5vw,62px);line-height:1.05;margin:18px 0;font-weight:500;letter-spacing:-.04em}.new-contact-intro>p{color:rgba(255,255,255,.65);font-size:15px;line-height:1.8;max-width:600px}.new-contact-actions{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:35px}.new-contact-action{position:relative;overflow:hidden;min-height:170px;border-radius:22px;padding:24px;text-decoration:none;color:#fff;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.11);display:flex;flex-direction:column;justify-content:space-between;transition:.3s}.new-contact-action:before{content:"";position:absolute;inset:-80px auto auto -70px;width:170px;height:170px;border-radius:50%;filter:blur(30px);opacity:.18;transition:.3s}.new-contact-action.phone:before{background:#f3d36a}.new-contact-action.whatsapp:before{background:#9ee7cf}.new-contact-action.instagram:before{background:#f1a7cf}.new-contact-action.youtube:before{background:#ff6b6b}.new-contact-action:hover{transform:translateY(-7px);box-shadow:0 18px 45px rgba(0,0,0,.25);border-color:rgba(255,255,255,.25)}.new-contact-action:hover:before{opacity:.32}.new-action-icon{position:relative;width:48px;height:48px;border-radius:15px;display:grid;place-items:center;background:rgba(255,255,255,.08)}.new-contact-action.phone .new-action-icon{color:#f3d36a}.new-contact-action.whatsapp .new-action-icon{color:#9ee7cf}.new-contact-action.instagram .new-action-icon{color:#f1a7cf}.new-contact-action.youtube .new-action-icon{color:#ff8a8a}.new-action-copy{position:relative;display:flex;flex-direction:column;gap:6px}.new-action-copy small{font-size:8px;letter-spacing:.17em;color:rgba(255,255,255,.48);font-weight:800}.new-action-copy strong{font-size:13px;line-height:1.35}.new-contact-action>svg{position:absolute;right:20px;top:20px;color:rgba(255,255,255,.5)}.new-contact-bottom-row{display:flex;justify-content:space-between;gap:20px;margin-top:22px;padding-top:20px;border-top:1px solid rgba(255,255,255,.09);font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.45)}  



      @media(max-width:800px){.new-page-overlay{padding:0}.new-page-shell{height:100vh;border-radius:0;border:0}.new-page-topbar{height:70px;padding:0 16px}.new-page-top-whatsapp span{display:none}.new-page-scroll{height:calc(100% - 70px);padding:34px 17px 50px}.new-page-hero-copy{grid-template-columns:1fr;gap:20px;margin-bottom:28px}.new-page-hero-copy h2{font-size:42px}.new-page-hero-copy p{font-size:14px}.new-about-grid,.new-founder-card{grid-template-columns:1fr}.new-founder-image-wrap{min-height:360px}.new-founder-content{padding:24px}.new-about-side{gap:14px}.new-service-grid,.new-project-page-grid,.new-contact-actions{grid-template-columns:1fr}.new-service-page-card{grid-template-columns:1fr}.new-service-page-image{min-height:210px}.new-project-page-image{height:270px}.new-contact-action{min-height:145px}.new-contact-bottom-row{flex-direction:column;gap:8px}.new-founder-content h3{font-size:38px}}  



    `}</style>  



  );  



}  



const FESTIVAL_IMAGES = {  



  Diwali:"https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1600&q=90",  



  "Gandhi Jayanti":"https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1600&q=90",  



  Pongal:"https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1600&q=90",  



  "Vinayagar Chaturthi":"https://images.unsplash.com/photo-1599629954294-14df9b3b7c04?auto=format&fit=crop&w=1600&q=90",  



  "New Year":"https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=1600&q=90",  



  Christmas:"https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=1600&q=90",  



  "Ramzan / Eid":"https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1600&q=90",  



  "Bakrid / Eid-ul-Adha":"https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1600&q=90",  



  "Krishna Jayanti":"https://images.unsplash.com/photo-1567591414240-e9c1e608c9c7?auto=format&fit=crop&w=1600&q=90"  



};  



const DEFAULT_PROMO = {type:"normal",name:"LIMITED TIME OFFER",title:"FREE DESIGN",description:"Tell us about your space, property type and location. Our team will guide you towards the right interior solution.",offer_text:"15% OFF",button_text:"Book a Free Consultation",image_url:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90"};  



const FESTIVAL_DATES = {  



  2026:{"New Year":["2026-01-01","2026-01-03"],Pongal:["2026-01-14","2026-01-17"],"Ramzan / Eid":["2026-03-20","2026-03-22"],"Bakrid / Eid-ul-Adha":["2026-05-27","2026-05-29"],"Krishna Jayanti":["2026-09-03","2026-09-05"],"Vinayagar Chaturthi":["2026-09-14","2026-09-16"],"Gandhi Jayanti":["2026-10-01","2026-10-03"],Diwali:["2026-11-07","2026-11-10"],Christmas:["2026-12-24","2026-12-26"]},  



  2027:{"New Year":["2027-01-01","2027-01-03"],Pongal:["2027-01-14","2027-01-17"],"Ramzan / Eid":["2027-03-09","2027-03-11"],"Bakrid / Eid-ul-Adha":["2027-05-17","2027-05-19"],"Krishna Jayanti":["2027-08-24","2027-08-26"],"Vinayagar Chaturthi":["2027-09-04","2027-09-06"],"Gandhi Jayanti":["2027-10-01","2027-10-03"],Diwali:["2027-10-28","2027-10-31"],Christmas:["2027-12-24","2027-12-26"]},  



  2028:{"New Year":["2028-01-01","2028-01-03"],Pongal:["2028-01-14","2028-01-17"],"Krishna Jayanti":["2028-08-17","2028-08-19"],"Vinayagar Chaturthi":["2028-08-25","2028-08-27"],"Gandhi Jayanti":["2028-10-01","2028-10-03"],Diwali:["2028-10-16","2028-10-19"],Christmas:["2028-12-24","2028-12-26"]},  



  2029:{"New Year":["2029-01-01","2029-01-03"],Pongal:["2029-01-14","2029-01-17"],"Krishna Jayanti":["2029-09-02","2029-09-04"],"Vinayagar Chaturthi":["2029-09-12","2029-09-14"],"Gandhi Jayanti":["2029-10-01","2029-10-03"],Diwali:["2029-10-15","2029-10-18"],Christmas:["2029-12-24","2029-12-26"]},  



  2030:{"New Year":["2030-01-01","2030-01-03"],Pongal:["2030-01-14","2030-01-17"],"Krishna Jayanti":["2030-08-24","2030-08-26"],"Vinayagar Chaturthi":["2030-09-02","2030-09-04"],"Gandhi Jayanti":["2030-10-01","2030-10-03"],Diwali:["2030-11-04","2030-11-07"],Christmas:["2030-12-24","2030-12-26"]}  



};  



function autoFestivalPromo(){const now=new Date(),today=now.toISOString().slice(0,10),dates=FESTIVAL_DATES[now.getFullYear()]||{};for(const [name,[start,end]] of Object.entries(dates))if(today>=start&&today<=end)return {...DEFAULT_PROMO,type:"festival",name,title:name,image_url:FESTIVAL_IMAGES[name]||DEFAULT_PROMO.image_url,offer_text:"15% OFF"};return null;}  



function promoToPopup(item=DEFAULT_PROMO){const festival=item.type==="festival";return {eyebrow:festival?(item.name||"FESTIVE OFFER"):"LIMITED TIME OFFER",title:festival?(item.name||"FESTIVE OFFER"):"FREE DESIGN",highlight:festival?"SPECIAL OFFER":"CONSULTATION",description:item.description||DEFAULT_PROMO.description,badge:item.offer_text||"15% OFF",button:item.button_text||"Book a Free Consultation",image:item.image_url||FESTIVAL_IMAGES[item.name]||DEFAULT_PROMO.image_url,isFestival:festival};}  



function OfferPopup({ open, promo, onClose }) {  



  const [propertyType, setPropertyType] = useState("1 BHK");  



  const [location, setLocation] = useState("");  



  const [name, setName] = useState("");  



  const [phone, setPhone] = useState("");  



  const [whatsappUpdates, setWhatsappUpdates] = useState(false);  



  const [submitted, setSubmitted] = useState(false);  



  const currentPromo = promo || promoToPopup(DEFAULT_PROMO);  



  useEffect(() => {  



    if (!open) return;  



    const previousOverflow = document.body.style.overflow;  



    document.body.style.overflow = "hidden";  



    return () => {  



      document.body.style.overflow = previousOverflow;  



    };  



  }, [open]);  



  useEffect(() => {  



    if (!open) return;  



    setSubmitted(false);  



  }, [open]);  



  const submitLead = async (event) => {  



    event.preventDefault();  



    const cleanName=name.trim(),cleanPhone=phone.trim(),cleanLocation=location.trim();  



    if(!cleanName||cleanPhone.length<10)return;  



    const booking={customer_name:cleanName,phone:cleanPhone,service:"Interior Consultation",preferred_date:null,message:`Offer: ${currentPromo.badge} | Property: ${propertyType} | Location: ${cleanLocation||"Not provided"} | WhatsApp Updates: ${whatsappUpdates?"Yes":"No"}`,source:"Offer Popup"};  



    setSubmitted(true);  



    try{const {data,error}=await supabase.from("bookings").insert(booking).select("*").single();if(!error){try{await fetch("/api/booking-notify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({booking:data||booking})});}catch{}}}catch{}  



  };  



  if (!open) return null;  



  return (  



    <AnimatePresence>  



      <motion.div  



        className="offer-popup-backdrop"  



        initial={{ opacity: 0 }}  



        animate={{ opacity: 1 }}  



        exit={{ opacity: 0 }}  



        onMouseDown={(event) => {  



          if (event.target === event.currentTarget) onClose();  



        }}  



      >  



        <motion.div  



          className="offer-popup-card"  



          initial={{ opacity: 0, y: 28, scale: 0.96 }}  



          animate={{ opacity: 1, y: 0, scale: 1 }}  



          exit={{ opacity: 0, y: 22, scale: 0.96 }}  



          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}  



          role="dialog"  



          aria-modal="true"  



          aria-label="Gururag Interior free consultation"  



        >  



          <button  



            className="offer-popup-close"  



            onClick={onClose}  



            aria-label="Close offer"  



          >  



            <X size={22} />  



          </button>  



          <div className={`offer-popup-banner ${currentPromo.isFestival ? "festival-banner" : ""}`}>  



            <img src={currentPromo.image} alt="Gururag Interior interior" />  



            <div className="offer-popup-banner-overlay" />  



            <div className="offer-popup-brand">  



              <span className="offer-popup-brand-logo">  



                <img src={logo} alt="Gururag Interior" />  



              </span>  



              <span>  



                <strong>GURURAG</strong>  



                <small>INTERIOR</small>  



              </span>  



            </div>  



            <div className="offer-popup-banner-copy">  



              <span>{currentPromo.eyebrow}</span>  



              <strong>{currentPromo.title}</strong>  



              <em>{currentPromo.highlight}</em>  



              <b>{currentPromo.badge}</b>  



            </div>  



          </div>  



          <div className="offer-popup-consultation-title">  



            Get a free design consultation  



          </div>  



          <form className="offer-popup-form" onSubmit={submitLead}>  



            <div className="offer-popup-content">  



              <div className="offer-popup-description">  



                {currentPromo.description}  



              </div>  



              <div className="offer-popup-label">  



                Property type  



              </div>  



              <div className="property-type-grid">  



                {["1 BHK", "2 BHK", "3 BHK", "4+ BHK / Duplex"].map(  



                  (type) => (  



                    <button  



                      type="button"  



                      key={type}  



                      className={  



                        propertyType === type  



                          ? "property-type-button active"  



                          : "property-type-button"  



                      }  



                      onClick={() => setPropertyType(type)}  



                    >  



                      {type}  



                    </button>  



                  )  



                )}  



              </div>  



              <label className="offer-input">  



                <input  



                  value={location}  



                  onChange={(event) => setLocation(event.target.value)}  



                  placeholder="Property Location"  



                  type="text"  



                />  



              </label>  



              <label className="offer-input">  



                <input  



                  value={name}  



                  onChange={(event) => setName(event.target.value)}  



                  placeholder="Name"  



                  type="text"  



                  required  



                />  



              </label>  



              <label className="offer-phone-input">  



                <span>+91</span>  



                <input  



                  value={phone}  



                  onChange={(event) =>  



                    setPhone(  



                      event.target.value.replace(/[^\d]/g, "").slice(0, 10)  



                    )  



                  }  



                  placeholder="Mobile Number"  



                  type="tel"  



                  inputMode="numeric"  



                  required  



                />  



              </label>  



              <label className="offer-whatsapp-check"> 


                <input 


                  type="checkbox" 


                  checked={whatsappUpdates} 


                  onChange={(event) => setWhatsappUpdates(event.target.checked)} 


                /> 


                <span className={`offer-check-box ${whatsappUpdates ? "checked" : ""}`} aria-hidden="true"> 


                  {whatsappUpdates ? "✓" : ""} 


                </span> 


                <span>Yes, send me updates via WhatsApp.</span> 


                <WhatsAppIcon size={25} /> 


              </label>  



              {submitted ? (  



                <div className="offer-submit-success">  



                  <Check size={19} />  



                  Booking sent successfully. Thank you for booking with Gururag Interior! Our team will contact you shortly.  



                </div>  



              ) : (  



                <button className="offer-submit-button" type="submit">  



                  {currentPromo.button}  



                  <ArrowUpRight size={20} />  



                </button>  



              )}  



              <p className="offer-terms">  



                By submitting, you agree to be contacted by Gururag Interior  



                regarding your project requirement.  



              </p>  



            </div>  



          </form>  



        </motion.div>  



      </motion.div>  



    </AnimatePresence>  



  );  



}  



function OfferPopupStyles() {  



  return (  



    <style>{`  



      .offer-popup-backdrop{  



        position:fixed;  



        inset:0;  



        z-index:5000;  



        padding:18px;  



        display:flex;  



        align-items:center;  



        justify-content:center;  



        background:rgba(3,10,17,.76);  



        backdrop-filter:blur(10px);  



        -webkit-backdrop-filter:blur(10px);  



        overflow:auto;  



      }  



      .offer-popup-card{  



        width:min(820px,100%);  



        max-height:min(92vh,820px);  



        overflow:auto;  



        position:relative;  



        border-radius:30px;  



        background:#f7f8f8;  



        color:#17202a;  



        box-shadow:0 35px 100px rgba(0,0,0,.48);  



        border:1px solid rgba(255,255,255,.8);  



      }  



      .offer-popup-card::-webkit-scrollbar{width:5px}  



      .offer-popup-card::-webkit-scrollbar-thumb{  



        background:rgba(7,24,39,.22);  



        border-radius:20px;  



      }  



      .offer-popup-close{  



        position:absolute;  



        z-index:8;  



        top:13px;  



        right:13px;  



        width:42px;  



        height:42px;  



        border:0;  



        border-radius:50%;  



        display:grid;  



        place-items:center;  



        background:rgba(255,255,255,.9);  



        color:#071827;  



        cursor:pointer;  



        box-shadow:0 8px 25px rgba(0,0,0,.16);  



        transition:.25s;  



      }  



      .offer-popup-close:hover{  



        transform:rotate(90deg);  



        background:#f3d36a;  



      }  



      .offer-popup-banner{  



        height:285px;  



        position:relative;  



        overflow:hidden;  



        background:#071827;  



      }  



      .offer-popup-banner>img{  



        width:100%;  



        height:100%;  



        object-fit:cover;  



        display:block;  



      }  



      .offer-popup-banner-overlay{  



        position:absolute;  



        inset:0;  



        background:  



          linear-gradient(90deg,rgba(4,16,27,.88) 0%,rgba(4,16,27,.58) 45%,rgba(4,16,27,.18) 100%),  



          linear-gradient(0deg,rgba(4,16,27,.55),transparent 50%);  



      }  



      .offer-popup-brand{  



        position:absolute;  



        top:20px;  



        left:24px;  



        display:flex;  



        align-items:center;  



        gap:9px;  



        color:#fff;  



      }  



      .offer-popup-brand-logo{  



        width:38px;  



        height:38px;  



        border-radius:10px;  



        overflow:hidden;  



        border:1px solid rgba(255,255,255,.28);  



        display:block;  



        background:#fff;  



      }  



      .offer-popup-brand-logo img{  



        width:100%;  



        height:100%;  



        object-fit:cover;  



      }  



      .offer-popup-brand>span:last-child{  



        display:flex;  



        flex-direction:column;  



      }  



      .offer-popup-brand strong{  



        font-size:14px;  



        letter-spacing:.18em;  



      }  



      .offer-popup-brand small{  



        margin-top:2px;  



        color:#9ee7cf;  



        font-size:8px;  



        letter-spacing:.28em;  



      }  



       .offer-popup-banner-copy{position:absolute;z-index:3;left:34px;right:34px;top:82px;bottom:22px;display:grid;grid-template-columns:1.2fr .8fr;gap:18px;align-items:end} 


      .offer-popup-banner-copy>span{grid-column:1/-1;color:#9ee7cf;font-size:10px;font-weight:900;letter-spacing:.22em;margin-bottom:-4px} 


      .offer-popup-banner-copy>strong{grid-column:1;color:#fff;font-size:clamp(38px,6vw,66px);line-height:.9;letter-spacing:-.055em;font-weight:700;max-width:100%} 


      .offer-popup-banner-copy>em{grid-column:1;color:#f3d36a;font-family:Georgia,serif;font-size:clamp(20px,3vw,30px);font-style:italic;margin-top:-5px} 


      .offer-popup-banner-copy>b{grid-column:2;grid-row:2 / span 2;justify-self:center;align-self:center;position:relative;min-width:205px;min-height:118px;display:flex;align-items:center;justify-content:center;padding:14px 20px;border:3px solid #f7bd22;border-radius:18px;background:linear-gradient(145deg,#ef3f3a 0%,#dc2e2e 70%,#c92229 100%);color:#fff;text-align:center;font-size:clamp(34px,5vw,58px);line-height:.88;font-weight:950;letter-spacing:-.055em;text-shadow:3px 4px 0 rgba(119,25,25,.55);box-shadow:8px 10px 0 #f7bd22,0 18px 35px rgba(0,0,0,.3);transform:rotate(-2deg)} 


      .offer-popup-banner-copy>b:before{content:"";position:absolute;left:-28px;top:14px;width:42px;height:18px;background:#f7bd22;transform:rotate(-16deg);box-shadow:0 55px 0 #f7bd22} 


      .offer-popup-banner-copy>b:after{content:"";position:absolute;right:-25px;bottom:18px;width:38px;height:16px;background:#f7bd22;transform:rotate(-12deg)} 


      .offer-popup-consultation-title{  



        background:#9ee7cf;  



        color:#071827;  



        text-align:center;  



        padding:13px 20px;  



        font-size:clamp(22px,4vw,31px);  



        font-weight:700;  



        letter-spacing:-.025em;  



      }  



      .offer-popup-content{  



        padding:28px 30px 25px;  



      }  



      .offer-popup-description{  



        color:#5f6973;  



        font-size:14px;  



        line-height:1.65;  



        margin-bottom:22px;  



      }  



      .offer-popup-label{  



        font-size:21px;  



        color:#3d4650;  



        font-weight:600;  



        margin-bottom:13px;  



      }  



      .property-type-grid{  



        display:grid;  



        grid-template-columns:repeat(4,1fr);  



        gap:10px;  



      }  



      .property-type-button{  



        min-height:56px;  



        padding:9px 8px;  



        border:1px solid #d4dbe0;  



        border-radius:15px;  



        background:#fff;  



        color:#69737d;  



        font-size:14px;  



        font-weight:600;  



        cursor:pointer;  



        transition:.22s;  



      }  



      .property-type-button:hover{  



        border-color:#72cdb3;  



        transform:translateY(-1px);  



      }  



      .property-type-button.active{  



        background:#0c6f73;  



        color:#fff;  



        border-color:#0c6f73;  



        box-shadow:0 8px 20px rgba(12,111,115,.18);  



      }  



      .offer-input,  



      .offer-phone-input{  



        display:flex;  



        width:100%;  



        min-height:58px;  



        border:1px solid #cfd6dc;  



        background:#fff;  



        border-radius:14px;  



        margin-bottom:13px;  



        overflow:hidden;  



        transition:.2s;  



      }  



      .offer-input:focus-within,  



      .offer-phone-input:focus-within{  



        border-color:#49a994;  



        box-shadow:0 0 0 3px rgba(73,169,148,.1);  



      }  



      .offer-input input,  



      .offer-phone-input input{  



        width:100%;  



        border:0;  



        outline:0;  



        background:transparent;  



        color:#27313b;  



        font:inherit;  



        font-size:17px;  



        padding:0 18px;  



      }  



      .offer-input input::placeholder,  



      .offer-phone-input input::placeholder{  



        color:#6d7782;  



      }  



      .offer-phone-input{  



        align-items:center;  



      }  



      .offer-phone-input>span{  



        padding:0 16px;  



        height:36px;  



        display:flex;  



        align-items:center;  



        border-right:1px solid #e2e5e8;  



        color:#65717b;  



        font-weight:700;  



      }  



      .offer-phone-input input{  



        padding-left:14px;  



      }  



      .offer-whatsapp-check{  



        display:flex;  



        align-items:center;  



        gap:8px;  



        color:#5e6871;  



        font-size:14px;  



        font-weight:700;  



        margin:4px 0 17px;  



        cursor:pointer;  



      }  



      .offer-whatsapp-check input{  



        position:absolute;  



        opacity:0;  



        pointer-events:none;  



      }  



      .offer-check-box{ 


        width:25px; 


        height:25px; 


        border:2px solid #aeb8c0; 


        border-radius:6px; 


        display:grid; 


        place-items:center; 


        flex:none; 


        background:#fff; 


        color:#fff; 


        font-size:17px; 


        font-weight:900; 


        line-height:1; 


        transition:.2s; 


      } 


      .offer-check-box.checked{ 


        border-color:#25D366; 


        background:#25D366; 


        box-shadow:0 4px 12px rgba(37,211,102,.2); 


      } 


      .offer-whatsapp-check>svg{  



        flex:none;  



      }  



      .offer-submit-button{  



        width:100%;  



        min-height:60px;  



        border:0;  



        border-radius:12px;  



        background:#071827;  



        color:#fff;  



        display:flex;  



        align-items:center;  



        justify-content:center;  



        gap:10px;  



        font-size:19px;  



        font-weight:700;  



        cursor:pointer;  



        box-shadow:0 12px 28px rgba(7,24,39,.2);  



        transition:.25s;  



      }  



      .offer-submit-button:hover{  



        background:#0c6f73;  



        transform:translateY(-1px);  



        box-shadow:0 16px 32px rgba(7,24,39,.25);  



      }  



      .offer-submit-success{  



        width:100%;  



        min-height:60px;  



        padding:14px 18px;  



        border-radius:12px;  



        background:#e5f8f0;  



        color:#0b6251;  



        display:flex;  



        align-items:center;  



        justify-content:center;  



        gap:9px;  



        text-align:center;  



        font-size:14px;  



        font-weight:800;  



      }  



      .offer-terms{  



        margin:13px 0 0;  



        color:#727b84;  



        font-size:12px;  



        line-height:1.55;  



        text-align:center;  



      }  



      .navbar-quote-button{  



        min-height:40px;  



        padding:0 14px;  



        border:1px solid rgba(243,211,106,.5);  



        border-radius:999px;  



        background:#f3d36a;  



        color:#071827;  



        font-size:10px;  



        font-weight:900;  



        letter-spacing:.06em;  



        cursor:pointer;  



        transition:.25s;  



        white-space:nowrap;  



      }  



      .navbar-quote-button:hover{  



        transform:translateY(-2px);  



        box-shadow:0 10px 25px rgba(243,211,106,.22);  



      }  



      .quote-floating-button{  



        position:fixed;  



        z-index:3000;  



        right:24px;  



        bottom:92px;  



        min-height:45px;  



        padding:0 17px;  



        border:1px solid rgba(158,231,207,.35);  



        border-radius:999px;  



        background:rgba(7,24,39,.94);  



        color:#fff;  



        display:flex;  



        align-items:center;  



        gap:8px;  



        font-size:11px;  



        font-weight:900;  



        letter-spacing:.06em;  



        box-shadow:0 12px 35px rgba(0,0,0,.24),0 0 25px rgba(158,231,207,.08);  



        cursor:pointer;  



        backdrop-filter:blur(10px);  



        -webkit-backdrop-filter:blur(10px);  



        transition:.25s;  



      }  



      .quote-floating-button:before{  



        content:"";  



        width:7px;  



        height:7px;  



        border-radius:50%;  



        background:#f3d36a;  



        box-shadow:0 0 0 5px rgba(243,211,106,.1);  



      }  



      .quote-floating-button:hover{  



        transform:translateY(-3px);  



        background:#9ee7cf;  



        color:#071827;  



        border-color:#9ee7cf;  



        box-shadow:0 15px 40px rgba(0,0,0,.28);  



      }  



      @media(max-width:650px){  



        .offer-popup-backdrop{  



          padding:10px;  



          align-items:center;  



        }  



        .offer-popup-card{  



          max-height:calc(100dvh - 20px);  



          border-radius:22px;  



        }  



        .offer-popup-banner{  



          height:205px;  



        }  



        .offer-popup-brand{  



          top:13px;  



          left:15px;  



        }  



        .offer-popup-brand-logo{  



          width:31px;  



          height:31px;  



          border-radius:8px;  



        }  



        .offer-popup-brand strong{  



          font-size:11px;  



        }  



        .offer-popup-brand small{  



          font-size:6px;  



        }  



         .offer-popup-banner-copy{ 


          left:18px; 


          right:18px; 


          top:63px; 


          bottom:18px; 


          grid-template-columns:1fr .82fr; 


          gap:9px; 


        }  



        .offer-popup-banner-copy>span{  



          font-size:7px;  



          margin-bottom:5px;  



        }  






        .offer-popup-banner-copy>b{ 


          min-width:0; 


          width:100%; 


          min-height:78px; 


          padding:8px 10px; 


          font-size:clamp(23px,7vw,34px); 


          border-width:2px; 


          border-radius:12px; 


          box-shadow:5px 6px 0 #f7bd22,0 12px 24px rgba(0,0,0,.28); 


        }  



        .offer-popup-banner-copy>strong{  



          font-size:46px;  



        }  



        .offer-popup-banner-copy>em{  



          font-size:20px;  



          margin-top:5px;  



        }  



        .offer-popup-banner-copy>b{ 


          font-size:clamp(23px,7vw,34px); 


          padding:8px 10px; 


          margin-top:0; 


        }  



        .offer-popup-consultation-title{  



          padding:11px 13px;  



          font-size:21px;  



        }  



        .offer-popup-content{  



          padding:19px 15px 18px;  



        }  



        .offer-popup-description{  



          font-size:12px;  



          margin-bottom:15px;  



        }  



        .offer-popup-label{  



          font-size:18px;  



          margin-bottom:10px;  



        }  



        .property-type-grid{  



          grid-template-columns:repeat(2,1fr);  



          gap:8px;  



        }  



        .property-type-button{  



          min-height:48px;  



          font-size:12px;  



          border-radius:11px;  



        }  



        .offer-input,  



        .offer-phone-input{  



          min-height:51px;  



          border-radius:11px;  



          margin-bottom:9px;  



        }  



        .offer-input input,  



        .offer-phone-input input{  



          font-size:15px;  



          padding:0 14px;  



        }  



        .offer-phone-input>span{  



          padding:0 12px;  



        }  



        .offer-whatsapp-check{  



          font-size:11px;  



          margin:2px 0 13px;  



        }  



        .offer-check-box{  



          width:22px;  



          height:22px;  



          font-size:14px;  



        }  



        .offer-submit-button,  



        .offer-submit-success{  



          min-height:54px;  



          font-size:15px;  



        }  



        .offer-terms{  



          font-size:10px;  



          margin-top:9px;  



        }  



        .offer-popup-close{  



          width:36px;  



          height:36px;  



          top:9px;  



          right:9px;  



        }  



        .navbar-quote-button{  



          display:none;  



        }  



        .quote-floating-button{  



          right:12px;  



          bottom:82px;  



          min-height:42px;  



          padding:0 14px;  



          font-size:10px;  



        }  



      }  



      @media(max-width:390px){  



        .offer-popup-banner{  



          height:184px;  



        }  



        .offer-popup-banner-copy>strong{  



          font-size:40px;  



        }  



        .offer-popup-banner-copy>em{  



          font-size:17px;  



        }  



        .offer-popup-content{  



          padding:16px 12px;  



        }  



        .offer-popup-description{  



          font-size:11px;  



        }  



        .property-type-button{  



          font-size:11px;  



        }  



      }  



    `}</style>  



  );  



}  



function App() {  



  const [menu, setMenu] = useState(false);  



  const [service, setService] = useState(0);  



  const [newPage, setNewPage] = useState(null);  



  const [ownerOpen, setOwnerOpen] = useState(false);  



  const [offerOpen, setOfferOpen] = useState(false); 


  const autoPopupStepRef = useRef(0); 


  const autoPopupTimerRef = useRef(null);  



  const [popupPromotion, setPopupPromotion] = useState(DEFAULT_PROMO);  



  const [managedServices, setManagedServices] = useState(services);  



  const [managedProjects, setManagedProjects] = useState(projects);  



  useEffect(() => {  



    let mounted = true;  



    const loadManagedContent = async () => {  



      try {  



        const [servicesResult, projectsResult, promotionsResult] = await Promise.all([  



          supabase.from("services").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true }),  



          supabase.from("projects").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true }),  



          supabase.from("promotions").select("*").eq("enabled", true).order("sort_order", { ascending: true }).order("created_at", { ascending: false }),  



        ]);  



        if (!mounted) return;  



        if (!servicesResult.error && servicesResult.data?.length) {  



          setManagedServices(  



            servicesResult.data.map((item) => ({  



              ...item,  



              title: item.title || "Untitled Service",  



              text: item.description || item.text || "",  



              image: item.image_url || item.image || "",  



              items: Array.isArray(item.items) ? item.items : [],  



              pros: Array.isArray(item.pros) ? item.pros : [],  



              considerations: Array.isArray(item.considerations)  



                ? item.considerations  



                : [],  



              chatbotDescription:  



                item.chatbotDescription ||  



                item.description ||  



                "Gururag Interior service solution.",  



              keywords: Array.isArray(item.keywords) ? item.keywords : [],  



            }))  



          );  



        }  



        if (!projectsResult.error && projectsResult.data?.length) {  



          setManagedProjects(  



            projectsResult.data.map((item) => ({  



              ...item,  



              title: item.title || "Untitled Project",  



              category: item.category || "Project",  



              image: item.image_url || item.image || "",  



            }))  



          );  



        }  



        const today = new Date().toISOString().slice(0,10);  



        const dbFestival = !promotionsResult.error ? promotionsResult.data?.find(p => p.type === "festival" && p.start_date <= today && p.end_date >= today) : null;  



        const dbNormal = !promotionsResult.error ? promotionsResult.data?.find(p => p.type === "normal") : null;  



        setPopupPromotion(dbFestival || autoFestivalPromo() || dbNormal || DEFAULT_PROMO);  



      } catch {  



        // Keep the original static website content if Supabase is unavailable.  



      }  



    };  



    loadManagedContent();  



    const festivalTimer = setInterval(loadManagedContent, 60000);  



    return () => {  



      mounted = false;  



      clearInterval(festivalTimer);  



    };  



  }, []);  



  useEffect(() => { 


    autoPopupStepRef.current = 0; 


    const firstPopupTimer = setTimeout(() => { 


      autoPopupStepRef.current = 1; 


      setOfferOpen(true); 


    }, 5000); 


    return () => { 


      clearTimeout(firstPopupTimer); 


      if (autoPopupTimerRef.current) { 


        clearTimeout(autoPopupTimerRef.current); 


        autoPopupTimerRef.current = null; 


      } 


    }; 


  }, []); 


  const closeOfferPopup = () => { 


    setOfferOpen(false); 


    if (autoPopupStepRef.current === 1) { 


      autoPopupStepRef.current = 2; 


      if (autoPopupTimerRef.current) { 


        clearTimeout(autoPopupTimerRef.current); 


      } 


      autoPopupTimerRef.current = setTimeout(() => { 


        setOfferOpen(true); 


        autoPopupTimerRef.current = null; 


      }, 10000); 


    } 


  };  



  useEffect(() => {  



    const timer = setInterval(() => {  



      setService(  



        (current) =>  



          (current + 1) % services.length  



      );  



    }, 5000);  



    return () => clearInterval(timer);  



  }, []);  



  const openOfferPopup = () => setOfferOpen(true);  



  const scrollTo = (id) => {  



    setMenu(false);  



    setTimeout(() => {  



      document  



        .getElementById(id)  



        ?.scrollIntoView({  



          behavior: "smooth",  



        });  



    }, 100);  



  };  



  const openPage = (page) => {  



    setMenu(false);  



    setNewPage(page);  



    document.body.style.overflow = "hidden";  



  };  



  const closeNewPage = () => {  



    setNewPage(null);  



    document.body.style.overflow = "";  



  };  



  const whatsapp = (message) => {  



    window.open(  



      `${WHATSAPP}?text=${encodeURIComponent(  



        message  



      )}`,  



      "_blank"  



    );  



  };  



  const nextService = () => {  



    setService(  



      (current) =>  



        (current + 1) % services.length  



    );  



  };  



  const previousService = () => {  



    setService(  



      (current) =>  



        (current - 1 + services.length) %  



        services.length  



    );  



  };  



  const currentService = services[service];  



  return (  



    <div className="website">  



      <header className="navbar">  



        <button  



          className="brand"  



          onClick={() => scrollTo("home")}  



        >  



          <span className="logo-box">  



            <img  



              src={logo}  



              alt="Gururag Interior"  



            />  



          </span>  



          <span className="brand-name">  



            <strong>GURURAG</strong>  



            <small>INTERIOR</small>  



          </span>  



        </button>  



        <div className="nav-actions">  



          <a  



            className="whatsapp-button"  



            href={INSTAGRAM}  



            target="_blank"  



            rel="noreferrer"  



            aria-label="Instagram"  



          >  



            <InstagramBrandIcon size={22} />  



          </a>  



          <a  



            className="whatsapp-button"  



            href={YOUTUBE}  



            target="_blank"  



            rel="noreferrer"  



            aria-label="YouTube"  



          >  



            <YouTubeBrandIcon size={22} />  



          </a>  



          <button  



            className="whatsapp-button"  



            aria-label="WhatsApp"  



            onClick={() =>  



              whatsapp(  



                "Hi Gururag Interior, I would like to get a free quote."  



              )  



            }  



          >  



            <WhatsAppIcon size={22} />  



          </button>  



          <button  



            className="navbar-quote-button"  



            onClick={() => openOfferPopup()}  



          >  



            Get Free Quote  



          </button>  



          <button  



            className="menu-button"  



            aria-label="Open menu"  



            onClick={() => setMenu(true)}  



          >  



            <span />  



            <span />  



            <span />  



          </button>  



        </div>  



      </header>  



      <AnimatePresence>  



        {menu && (  



          <motion.div  



            className="menu-backdrop"  



            initial={{  



              opacity: 0,  



            }}  



            animate={{  



              opacity: 1,  



            }}  



            exit={{  



              opacity: 0,  



            }}  



          >  



            <motion.div  



              className="menu-panel"  



              initial={{  



                x: "100%",  



              }}  



              animate={{  



                x: 0,  



              }}  



              exit={{  



                x: "100%",  



              }}  



            >  



              <div className="menu-header">  



                <button  



                  className="menu-owner-trigger"  



                  onClick={() => {  



                    setMenu(false);  



                    setOwnerOpen(true);  



                  }}  



                  aria-label="Owner access"  



                >  



                  GURURAG INTERIOR  



                </button>  



                <button  



                  onClick={() =>  



                    setMenu(false)  



                  }  



                >  



                  <X />  



                </button>  



              </div>  



              <nav>  



                <button  



                  onClick={() =>  



                    scrollTo("home")  



                  }  



                >  



                  <small>01</small>  



                  Home  



                  <ArrowUpRight />  



                </button>  



                <button  



                  onClick={() => openPage("about")}  



                >  



                  <small>02</small>  



                  About Us  



                  <ArrowUpRight />  



                </button>  



                <button  



                  onClick={() => openPage("services")}  



                >  



                  <small>03</small>  



                  Our Services  



                  <ArrowUpRight />  



                </button>  



                <button  



                  onClick={() => openPage("projects")}  



                >  



                  <small>04</small>  



                  Our Projects  



                  <ArrowUpRight />  



                </button>  



                <button  



                  onClick={() => openPage("contact")}  



                >  



                  <small>05</small>  



                  Contact  



                  <ArrowUpRight />  



                </button>  



              </nav>  



              <div className="menu-footer">  



                <p>  



                  Thoughtful interiors.  



                  <br />  



                  Crafted with character.  



                </p>  



                <a href="tel:+919789695878">  



                  +91 97896 95878  



                </a>  



              </div>  



            </motion.div>  



          </motion.div>  



        )}  



      </AnimatePresence>  



      <section  



        id="home"  



        className="hero"  



      >  



        <div className="hero-image" />  



        <div className="hero-overlay" />  



        <div className="hero-content">  



          <motion.div  



            className="eyebrow"  



            initial={{  



              opacity: 0,  



              y: 25,  



            }}  



            animate={{  



              opacity: 1,  



              y: 0,  



            }}  



            transition={{  



              delay: 0.3,  



            }}  



          >  



            INTERIOR DESIGN | TURNKEY  



            SOLUTIONS  



          </motion.div>  



          <motion.h1  



            initial={{  



              opacity: 0,  



              y: 45,  



            }}  



            animate={{  



              opacity: 1,  



              y: 0,  



            }}  



            transition={{  



              delay: 0.45,  



              duration: 0.9,  



            }}  



          >  



            Spaces that  



            <br />  



            <em>feel like home.</em>  



          </motion.h1>  



          <motion.p  



            initial={{  



              opacity: 0,  



              y: 30,  



            }}  



            animate={{  



              opacity: 1,  



              y: 0,  



            }}  



            transition={{  



              delay: 0.65,  



            }}  



          >  



            We create refined residential and  



            commercial interiors where thoughtful  



            design, skilled craftsmanship and  



            everyday functionality come  



            together.  



          </motion.p>  



          <motion.div  



            className="hero-buttons"  



            initial={{  



              opacity: 0,  



              y: 25,  



            }}  



            animate={{  



              opacity: 1,  



              y: 0,  



            }}  



            transition={{  



              delay: 0.8,  



            }}  



          >  



            <button  



              className="yellow-button"  



              onClick={() =>  



                scrollTo("projects")  



              }  



            >  



              Explore Projects  



              <ArrowUpRight />  



            </button>  



            <button  



              className="line-button"  



              onClick={() =>  



                whatsapp(  



                  "Hi Gururag Interior, I would like to start an interior project."  



                )  



              }  



            >  



              Start a Project  



              <ArrowUpRight />  



            </button>  



          </motion.div>  



        </div>  



        <div className="hero-bottom">  



          <span>SCROLL TO EXPLORE</span>  



          <div />  



          <span>CHENNAI | INDIA</span>  



        </div>  



      </section>  



      <section className="intro section">  



        <div className="label">  



          01 - THE STUDIO  



        </div>  



        <div className="intro-grid">  



          <motion.h2  



            initial={{  



              opacity: 0,  



              y: 45,  



            }}  



            whileInView={{  



              opacity: 1,  



              y: 0,  



            }}  



            viewport={{  



              once: true,  



            }}  



          >  



            Interiors with  



            <br />  



            <em>meaning.</em>  



          </motion.h2>  



          <motion.div  



            className="intro-text"  



            initial={{  



              opacity: 0,  



              y: 45,  



            }}  



            whileInView={{  



              opacity: 1,  



              y: 0,  



            }}  



            viewport={{  



              once: true,  



            }}  



          >  



            <p>  



              At Gururag Interior, we believe  



              a beautiful space should do more  



              than look good. It should feel  



              natural, work effortlessly and  



              reflect the people who live or  



              work inside it.  



            </p>  



            <p>  



              From detailed carpentry and  



              modern kitchens to civil works,  



              finishing and complete turnkey  



              solutions, we bring every layer  



              together with one clear vision.  



            </p>  



            <button  



              className="dark-link"  



              onClick={() =>  



                scrollTo("about")  



              }  



            >  



              Discover our story  



              <ArrowUpRight />  



            </button>  



          </motion.div>  



        </div>  



        <div className="intro-images">  



          <motion.img  



            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90"  



            alt="Luxury interior"  



            initial={{  



              scale: 1.1,  



            }}  



            whileInView={{  



              scale: 1,  



            }}  



            viewport={{  



              once: true,  



            }}  



            transition={{  



              duration: 1.1,  



            }}  



          />  



          <motion.img  



            className="small-image"  



            src="https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1000&q=90"  



            alt="Interior detail"  



            initial={{  



              y: 80,  



              opacity: 0,  



            }}  



            whileInView={{  



              y: 0,  



              opacity: 1,  



            }}  



            viewport={{  



              once: true,  



            }}  



          />  



        </div>  



      </section>  



      <section  



        id="about"  



        className="about section"  



      >  



        <div className="label light">  



          02 - ABOUT US  



        </div>  



        <div className="about-heading">  



          <h2>  



            Designed around  



            <br />  



            <em>your life.</em>  



          </h2>  



          <p>  



            Gururag Interior is built around  



            a simple idea - every space  



            deserves its own character.  



          </p>  



        </div>  



        <div className="founder">  



          <div className="founder-photo">  



            <img  



              src={founder}  



              alt="Saran Raj"  



            />  



            <div className="photo-gradient" />  



            <span>  



              FOUNDER  



              <br />  



              GURURAG INTERIOR  



            </span>  



          </div>  



          <div className="founder-info">  



            <div className="label mint">  



              THE PERSON BEHIND THE VISION  



            </div>  



            <h3 style={{ whiteSpace: "nowrap" }}>  



              Saran Raj  



            </h3>  



            <div className="stats">  



              <div>  



                <strong>13+</strong>  



                <span>  



                  Years Experience  



                </span>  



              </div>  



              <div>  



                <strong>1,500+</strong>  



                <span>  



                  Completed Projects  



                </span>  



              </div>  



            </div>  



            <p>  



              With over 13 years of experience across interior, construction  



              and renovation solutions, Saran Raj leads Gururag Interior, now  



              operating under the name Sri Guru Ragavendra Decors, with a  



              strong focus on craftsmanship, detail and client satisfaction.  



            </p>  



            <p>  



              His approach brings design and practical execution together,  



              creating spaces that feel distinctive, comfortable and personal.  



            </p>  



            <div className="signature">  



              Saran Raj  



            </div>  



          </div>  



        </div>  



      </section>  



      <section  



        id="services"  



        className="services section"  



      >  



        <div className="label light">  



          03 - OUR SERVICES  



        </div>  



        <div className="services-heading">  



          <h2>  



            From concept  



            <br />  



            to <em>completion.</em>  



          </h2>  



          <p>  



            Complete interior, renovation,  



            civil and allied solutions managed  



            with one design vision.  



          </p>  



        </div>  



        <div className="service-carousel">  



          <AnimatePresence mode="wait">  



            <motion.div  



              key={currentService.title}  



              className="service-card"  



              initial={{  



                opacity: 0,  



                x: 60,  



              }}  



              animate={{  



                opacity: 1,  



                x: 0,  



              }}  



              exit={{  



                opacity: 0,  



                x: -60,  



              }}  



              transition={{  



                duration: 0.5,  



              }}  



            >  



              <div className="service-image">  



                <img  



                  src={currentService.image}  



                  alt={  



                    currentService.title  



                  }  



                />  



              </div>  



              <div className="service-content">  



                <span className="service-number">  



                  SERVICE 0{service + 1}  



                </span>  



                <h3>  



                  {currentService.title}  



                </h3>  



                <p>  



                  {currentService.text}  



                </p>  



                <div className="service-list">  



                  {currentService.items.map(  



                    (item) => (  



                      <div key={item}>  



                        <Check />  



                        {item}  



                      </div>  



                    )  



                  )}  



                </div>  



                <button  



                  className="service-link"  



                  onClick={() =>  



                    whatsapp(  



                      `Hi Gururag Interior, I am interested in ${currentService.title}.`  



                    )  



                  }  



                >  



                  Enquire About This Service  



                  <ArrowUpRight />  



                </button>  



              </div>  



            </motion.div>  



          </AnimatePresence>  



          <div className="carousel-controls">  



            <button  



              onClick={previousService}  



            >  



              <ArrowLeft />  



            </button>  



            <div className="dots">  



              {services.map(  



                (item, index) => (  



                  <button  



                    key={item.title}  



                    className={  



                      index === service  



                        ? "active"  



                        : ""  



                    }  



                    onClick={() =>  



                      setService(index)  



                    }  



                  />  



                )  



              )}  



            </div>  



            <button  



              onClick={nextService}  



            >  



              <ArrowRight />  



            </button>  



          </div>  



        </div>  



      </section>  



      <section  



        id="projects"  



        className="projects section"  



      >  



        <div className="label">  



          04 - OUR PROJECTS  



        </div>  



        <div className="projects-heading">  



          <h2>  



            Spaces made  



            <br />  



            to be <em>lived in.</em>  



          </h2>  



          <p>  



            A collection of modern interior  



            directions shaped by comfort,  



            proportion and timeless detailing.  



          </p>  



        </div>  



        <div className="project-grid">  



          {projects.map(  



            (project, index) => (  



              <motion.article  



                className={  



                  index === 0  



                    ? "project project-large"  



                    : "project"  



                }  



                key={project.title}  



                initial={{  



                  opacity: 0,  



                  y: 50,  



                }}  



                whileInView={{  



                  opacity: 1,  



                  y: 0,  



                }}  



                viewport={{  



                  once: true,  



                }}  



                transition={{  



                  delay: index * 0.08,  



                }}  



              >  



                <div className="project-image">  



                  <img  



                    src={project.image}  



                    alt={  



                      project.title  



                    }  



                  />  



                  <div className="project-arrow">  



                    <ArrowUpRight />  



                  </div>  



                </div>  



                <div className="project-info">  



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



      <section className="cta">  



        <div className="cta-image" />  



        <div className="cta-overlay" />  



        <div className="cta-content">  



          <span className="label mint">  



            YOUR SPACE. YOUR STORY.  



          </span>  



          <h2>  



            Let's create  



            <br />  



            something{" "}  



            <em>beautiful.</em>  



          </h2>  



          <button  



            className="yellow-button"  



            onClick={() =>  



              whatsapp(  



                "Hi Gururag Interior, I would like to discuss my interior project."  



              )  



            }  



          >  



            Start Your Project  



            <ArrowUpRight />  



          </button>  



        </div>  



      </section>  



      <section  



        id="contact"  



        className="contact section"  



      >  



        <div className="label">  



          05 - CONTACT  



        </div>  



        <div className="contact-grid">  



          <div>  



            <h2>  



              Let's talk  



              <br />  



              <em>interiors.</em>  



            </h2>  



            <p>  



              Have a home, office or renovation  



              project in mind? Tell us what you  



              are planning and let's build  



              something around it.  



            </p>  



            <div className="contact-details">  



              <a href="tel:+919789695878">  



                <Phone />  



                +91 97896 95878  



              </a>  



              <a  



                href={WHATSAPP}  



                target="_blank"  



                rel="noreferrer"  



              >  



                <WhatsAppIcon size={22} />  



                WhatsApp  



              </a>  



              <a  



                href={YOUTUBE}  



                target="_blank"  



                rel="noreferrer"  



              >  



                <YouTubeBrandIcon size={22} />  



                YouTube  



              </a>  



              <div>  



                <MapPin />  



                Chennai, Tamil Nadu  



              </div>  



            </div>  



          </div>  



          <div className="quote-card">  



            <span className="label mint">  



              GET A FREE QUOTE  



            </span>  



            <h3>  



              Tell us about  



              <br />  



              your project.  



            </h3>  



            <p>  



              Send your project type, location  



              and reference images directly  



              through WhatsApp.  



            </p>  



            <button  



              className="yellow-button"  



              onClick={() =>  



                whatsapp(  



                  "Hi Gururag Interior, I would like a free quote."  



                )  



              }  



            >  



              WhatsApp Us  



              <ArrowUpRight />  



            </button>  



          </div>  



        </div>  



      </section>  



      <footer>  



        <div className="footer-top">  



          <div className="footer-brand">  



            <span className="footer-logo">  



              <img  



                src={logo}  



                alt="Gururag Interior"  



              />  



            </span>  



            <div>  



              <strong>GURURAG</strong>  



              <small>INTERIOR</small>  



            </div>  



          </div>  



          <p>  



            Thoughtful interiors,  



            <br />  



            crafted with character.  



          </p>  



          <div className="socials">  



            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">  



              <InstagramBrandIcon size={21} />  



            </a>  



            <a  



              href={WHATSAPP}  



              target="_blank"  



              rel="noreferrer"  



              aria-label="WhatsApp"  



            >  



              <WhatsAppIcon size={21} />  



            </a>  



            <a  



              href={YOUTUBE}  



              target="_blank"  



              rel="noreferrer"  



              aria-label="YouTube"  



            >  



              <YouTubeBrandIcon size={21} />  



            </a>  



          </div>  



        </div>  



        <div className="footer-bottom">  



          <span>  



            (c) 2026 Gururag Interior  



          </span>  



          <span>  



            Saran Raj | Founder  



          </span>  



        </div>  



      </footer>  



      <NewPageStyles />  



      <OfferPopupStyles />  



      <motion.button  



        className="quote-floating-button"  



        onClick={() => openOfferPopup()}  



        initial={{ opacity: 0, y: 20 }}  



        animate={{ opacity: 1, y: 0 }}  



        transition={{ delay: 1.5, duration: 0.4 }}  



      >  



        Get Free Quote  



        <ArrowUpRight size={16} />  



      </motion.button>  



      {newPage && (  



        <NewPageOverlay  



          page={newPage}  



          onClose={closeNewPage}  



          onWhatsApp={whatsapp}  



          managedServices={managedServices}  



          managedProjects={managedProjects}  



        />  



      )}  



      {ownerOpen && (  



        <OwnerDashboard  



          onClose={() => setOwnerOpen(false)}  



        />  



      )}  



      <OfferPopup 


        open={offerOpen} 


        promo={promoToPopup(popupPromotion)} 


        onClose={closeOfferPopup} 


      />  



      <Chatbot  



        onWhatsApp={whatsapp}  



      />  



    </div>  



  );  



}  



createRoot(  



  document.getElementById("root")  



).render(<App />);  
