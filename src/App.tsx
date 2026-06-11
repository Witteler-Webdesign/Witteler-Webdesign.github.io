import React, { useState, useEffect, useRef } from "react";
import { 
  Paintbrush, 
  Calendar, 
  Smartphone, 
  Check, 
  X, 
  ChevronRight, 
  Menu, 
  Clock, 
  Shield, 
  Code2, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  AlertTriangle,
  Award,
  Zap,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { 
  servicesData, 
  processStepsData, 
  legalImpressum, 
  legalDatenschutz 
} from "./data";

export default function App() {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Header scrolled state
  const [isScrolled, setIsScrolled] = useState(false);

  // Typewriter state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["Kunden konvertieren", "Termine füllen", "Umsatz steigern", "begeistern"];
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delayBetweenWords = 1900;

  // Counters state (with Intersection Observer)
  const [mobileBookingCount, setMobileBookingCount] = useState(0);
  const [handwrittenCount, setHandwrittenCount] = useState(0);
  const countStatsRef = useRef<HTMLDivElement>(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // Booking simulator state
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>("10:30");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [simulatedName, setSimulatedName] = useState("");
  const [simulatedMail, setSimulatedMail] = useState("");
  const [autoSlasher, setAutoSlasher] = useState(0);
  const slots = ["9:00", "10:30", "11:00", "13:00", "14:30", "16:00"];

  // Process steps active cycle state
  const [activeStep, setActiveStep] = useState(0);
  const [isHoveredStep, setIsHoveredStep] = useState(false);

  // Pricing model active choice
  const [priceOption, setPriceOption] = useState<"einmalig" | "monatlich">("einmalig");

  // Cookie consent states
  const [consentStatus, setConsentStatus] = useState<"pending" | "accepted" | "rejected">("pending");

  // Legal modal states
  const [activeModalTab, setActiveModalTab] = useState<"impressum" | "datenschutz">("impressum");
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // FAQ state
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync Cookie Consent on load
  useEffect(() => {
    const stored = localStorage.getItem("ww_consent");
    if (stored === "accepted") {
      setConsentStatus("accepted");
    } else if (stored === "rejected") {
      setConsentStatus("rejected");
    } else {
      setConsentStatus("pending");
    }
  }, []);

  // Scroll to top on initial page render
  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem("ww_consent", "accepted");
    setConsentStatus("accepted");
  };

  const handleRejectConsent = () => {
    localStorage.setItem("ww_consent", "rejected");
    setConsentStatus("rejected");
  };

  const handleResetConsent = () => {
    localStorage.removeItem("ww_consent");
    setConsentStatus("pending");
  };

  // Preventing cal.com default clicks if rejected
  const handleCalComClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (consentStatus === "rejected") {
      e.preventDefault();
      alert("Hinweis: Du hast externe Dienste abgelehnt. Um das cal.com Buchungs-Widget zu verwenden, musst du externe Dienste in den Cookie-Einstellungen (unten links) aktivieren.");
    }
  };

  // Typewriter effect logic
  useEffect(() => {
    if (currentWordIndex === words.length - 1 && currentText === words[words.length - 1]) {
      return;
    }
    let timer: NodeJS.Timeout;
    const currentFullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex(prev => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.slice(0, currentText.length + 1));
        if (currentText === currentFullWord) {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenWords);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // Stat Counters increment animation when visible
  useEffect(() => {
    const currentRef = countStatsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);
          
          let startMobile = 0;
          const mobileInterval = setInterval(() => {
            startMobile += 2;
            if (startMobile >= 70) {
              setMobileBookingCount(70);
              clearInterval(mobileInterval);
            } else {
              setMobileBookingCount(startMobile);
            }
          }, 35);

          let startHand = 0;
          const handInterval = setInterval(() => {
            startHand += 2;
            if (startHand >= 100) {
              setHandwrittenCount(100);
              clearInterval(handInterval);
            } else {
              setHandwrittenCount(startHand);
            }
          }, 25);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasAnimatedStats]);

  // Simulated live slot switching to highlight real-time reactivity
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * slots.length);
      setAutoSlasher(randomIdx);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Process steps active cycle auto-stepper
  useEffect(() => {
    if (isHoveredStep) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % processStepsData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHoveredStep]);

  // Open Legal Modal helper
  const openLegalModal = (tab: "impressum" | "datenschutz") => {
    setActiveModalTab(tab);
    setIsLegalModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLegalModal = () => {
    setIsLegalModalOpen(false);
    document.body.style.overflow = "";
  };

  const handleBookingSimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedName.trim() || !simulatedMail.trim()) {
      alert("Bitte gib deinen Namen und deine E-Mail-Adresse ein.");
      return;
    }
    setBookingConfirmed(true);
  };

  const handleResetBookingSim = () => {
    setBookingConfirmed(false);
    setSimulatedName("");
    setSimulatedMail("");
    setSelectedTimeSlot("10:30");
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden pb-12 selection:bg-[#00ff41]/30 selection:text-white border-[6px] md:border-[12px] border-[#161616] flex flex-col">
      
      {/* HEADER NAVBAR */}
      <header className={`fixed top-[6px] md:top-[12px] left-[6px] md:left-[12px] right-[6px] md:right-[12px] z-40 transition-all duration-300 ${isScrolled ? "bg-[#0a0a0a]/95 border-b border-white/10 py-4 shadow-xl" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 font-head text-base sm:text-lg font-black tracking-tighter uppercase text-white hover:text-[#00ff41] transition-colors">
            <span className="w-2.5 h-2.5 bg-[#00ff41] block rounded-none animate-pulse shrink-0" />
            <span>WITTELER<span className="text-[#00ff41]">.</span>WEBDESIGN</span>
          </a>

          {/* Minimalist Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200">Start</a>
            <a href="#services" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200">Leistungen</a>
            <a href="#vorteile" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200">Dein Vorteil</a>
            <a href="#process" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200">Ablauf</a>
            <a href="#pricing" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200">Investition</a>
            <a href="#cta" className="text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-200">Kontakt</a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center">
            <a 
              href="https://cal.com/julian-witteler-xdzypp/gesprach-vereinbarn" 
              onClick={handleCalComClick}
              target="_blank" 
              rel="noopener noreferrer"
              className={`text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-none border border-white/20 hover:border-[#00ff41] bg-white/[0.02] hover:bg-[#00ff41]/5 text-white transition-all duration-200 flex items-center gap-2 ${consentStatus === "rejected" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#00ff41]" />
              <span>Termin buchen</span>
            </a>
          </div>

          {/* Hamburguer Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors block md:hidden rounded-none border border-white/5"
            aria-label="Menü öffnen"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-y-[6px] md:inset-y-[12px] right-[6px] md:right-[12px] w-full max-w-xs bg-[#0c0c0c] border-l border-white/10 z-50 p-8 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden shadow-3xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="font-head text-sm font-black tracking-widest uppercase text-white">WITTELER<span className="text-[#00ff41]">.</span>WEB</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-none border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-5">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-white/65 hover:text-[#00ff41] transition-colors">Start</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-white/65 hover:text-[#00ff41] transition-colors">Leistungen</a>
            <a href="#vorteile" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-white/65 hover:text-[#00ff41] transition-colors">Dein Vorteil</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-white/65 hover:text-[#00ff41] transition-colors">Ablauf</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-white/65 hover:text-[#00ff41] transition-colors">Investition</a>
            <a href="#cta" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold uppercase tracking-widest text-white/65 hover:text-[#00ff41] transition-colors">Kontakt</a>
          </nav>
        </div>
        
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <a 
            href={consentStatus === "rejected" ? "#cookie-opt" : "https://cal.com/julian-witteler-xdzypp/gesprach-vereinbarn"}
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              handleCalComClick(e);
            }}
            target={consentStatus === "rejected" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="w-full text-center py-3.5 bg-white text-black text-xs font-bold font-mono uppercase rounded-none tracking-widest hover:bg-[#00ff41] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Erstgespräch buchen</span>
          </a>
          <p className="text-[9px] text-white/40 text-center uppercase tracking-wider font-mono">
            Boutique Agency · 100% DSGVO-Sicher
          </p>
        </div>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Main Bold Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            <div className="inline-block px-3 py-1 border border-[#00ff41] text-[#00ff41] text-[10px] uppercase font-bold tracking-widest font-mono">
              Boutique Digital Agency · Handcrafted Code
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black font-head leading-[0.95] tracking-tighter uppercase text-white text-balance">
              STRATEGISCHES<br/>
              WEBDESIGN<br/>
              <span className="text-white/30 italic font-light">{currentText}</span>
            </h1>

            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg font-sans">
              Professionelle, kompromisslos schnelle Webauftritte für kleine Betriebe, Selbständige und Salons. Inklusive hochoptimierter Online-Terminbuchung für maximale Conversion-Raten und spürbar weniger Büro-Hektik.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <a 
                href="https://cal.com/julian-witteler-xdzypp/gesprach-vereinbarn" 
                onClick={handleCalComClick}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-[#00ff41] hover:text-black hover:border-transparent transition-all duration-300 rounded-none border border-white flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Gespräch vereinbaren</span>
              </a>
              <a 
                href="#services" 
                className="px-8 py-4 bg-transparent text-white font-bold uppercase tracking-wider text-xs hover:bg-white/10 transition-all duration-300 rounded-none border border-white/20 text-center"
              >
                Angebote prüfen
              </a>
            </div>

            {/* Custom Minimalist KPI Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10 w-full text-left">
              <div className="flex flex-col">
                <span className="text-3xl font-light font-head text-white">24/7</span>
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">Ausfallfreie Buchung</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-light font-head text-white">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">Page Score Speed</span>
              </div>
              <div className="col-span-2 md:col-span-1 flex flex-col">
                <span className="text-3xl font-light font-head text-[#00ff41]">99.9</span>
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">Optimierte Codebasis</span>
              </div>
            </div>

          </div>

          {/* Right Interface Mockup (Minimalist Wireframe) */}
          <div className="lg:col-span-5 w-full relative hidden lg:block">
            
            {/* Custom tactile block tag */}
            <div className="absolute top-6 -left-6 bg-[#161616] border border-white/10 px-4 py-3 rounded-none shadow-2xl flex items-center gap-2 z-10">
              <CheckCircle className="w-4 h-4 text-[#00ff41]" />
              <div className="font-mono text-[10px] uppercase font-bold tracking-wider">
                <span className="block text-white">Termin gebucht</span>
                <span className="text-white/40 font-light">Automatische Synch aktiv</span>
              </div>
            </div>

            <div className="border border-white/10 bg-[#121212] p-8 rounded-none shadow-2xl space-y-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00ff41]/5 to-transparent blur-xl" />

              <div className="flex justify-between items-center border-b border-white/10 pb-4 font-mono">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-white/20" />
                  <div className="w-2.5 h-2.5 bg-white/20" />
                  <div className="w-2.5 h-2.5 bg-[#00ff41]" />
                </div>
                <span className="text-[10px] text-white/50 tracking-wide uppercase">www.dein-salon.de</span>
              </div>

              <div className="space-y-3 font-head">
                <div className="text-[10px] uppercase tracking-widest text-[#00ff41] font-mono font-bold">LIVE-MOCK INTERFACE</div>
                <div className="h-5 bg-white/10 w-[80%]" />
                <div className="h-3 bg-white/5 w-[50%]" />
              </div>

              {/* Grid Simulator */}
              <div className="border border-white/10 p-4 space-y-3 bg-white/[0.01]">
                <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
                  <span>FREIE TERMINE HEUTE:</span>
                  <span className="text-[#00ff41] font-bold animate-pulse">● AKTIVE VERBINDUNG</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {slots.slice(0, 3).map((s, idx) => (
                    <div 
                      key={idx}
                      className={`font-mono text-[10px] py-1.5 text-center border transition-all duration-300 ${idx === autoSlasher % 3 ? "border-[#00ff41] bg-[#00ff41]/10 text-white" : "border-white/5 text-white/40"}`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                <div className="py-2.5 bg-white text-black text-[10px] font-bold text-center uppercase tracking-wider">
                  Termin aussuchen
                </div>
                <div className="py-2.5 border border-white/10 text-white text-[10px] font-bold text-center uppercase tracking-wider">
                  Dienstleistungen
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="inline-block px-3 py-1 border border-[#00ff41] text-[#00ff41] text-[10px] uppercase font-bold tracking-widest font-mono">
              Services & Leistungen
            </span>
            <h2 className="font-head text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
              STRATEGISCHES <span className="text-white/30 italic font-light">ANGEBOT.</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl">
              Alles, was du für einen überzeugenden, zeitsparenden und umsatzfördernden digitalen Markenauftritt benötigst. Komplett modular, stabil und werbefrei.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {servicesData.map((service, index) => {
              const IconComp = index === 0 ? Paintbrush : index === 1 ? Calendar : Smartphone;
              return (
                <div 
                  key={index}
                  className="bg-[#0a0a0a] hover:bg-[#121212] p-8 md:p-10 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div className="space-y-6">
                    {/* Minimal Monospaced Number Index */}
                    <div className="font-mono text-[#00ff41] text-xs font-bold tracking-widest uppercase">
                      [0{index + 1}]
                    </div>

                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#00ff41] bg-white/[0.02] group-hover:border-[#00ff41] transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>

                    <h3 className="font-head text-lg font-bold text-white uppercase group-hover:underline decoration-[#00ff41] underline-offset-4">
                      {service.title}
                    </h3>

                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-12 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                    <span>Inklusiv-Leistung</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* DYNAMIC BOOKING FEATURE / BUCHUNGS-SIMULATOR */}
      <section id="vorteile" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="border border-white/10 bg-[#0d0d0d] p-8 md:p-14 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1 border border-[#00ff41] text-[#00ff41] text-[10px] uppercase font-bold tracking-widest font-mono">
                Systemvorteile
              </span>
              <h2 className="font-head text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-white leading-tight">
                Keine Termine mehr am Telefon verlieren. <br />
                <span className="text-white/30 italic font-mono font-light">Mehr Fokus auf deine Arbeit.</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Kunden buchen flexibel, selbständig und papierlos rund um die Uhr. Keine Telefon-Unterbrechungen beim Schneiden oder Behandeln. Automatisierte Erinnerungen rufen den Termin rechtzeitig ins Gedächtnis — du minimierst teure No-Shows auf nahezu Null.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/70 font-mono">
                  <div className="w-5 h-5 border border-white/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#00ff41]" />
                  </div>
                  <span>Kalender-Einbindung</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/70 font-mono">
                  <div className="w-5 h-5 border border-white/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#00ff41]" />
                  </div>
                  <span>Erinnerungs-Mails & SMS</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/70 font-mono">
                  <div className="w-5 h-5 border border-white/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#00ff41]" />
                  </div>
                  <span>Direktzahlung optional</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-white/70 font-mono">
                  <div className="w-5 h-5 border border-white/15 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#00ff41]" />
                  </div>
                  <span>24/7 Terminvergabe</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href="https://cal.com/julian-witteler-xdzypp/gesprach-vereinbarn" 
                  onClick={handleCalComClick}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4.5 bg-white hover:bg-[#00ff41] text-black font-bold uppercase tracking-wider text-xs transition-colors rounded-none"
                >
                  <Calendar className="w-4 h-4 text-black" />
                  <span>Widget-Demo starten</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Simulator Widget */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#121212] border border-white/10 p-6 md:p-8 space-y-5">
                
                <div className="flex justify-between items-center border-b border-white/10 pb-4 font-mono">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">[SIMULATOR] TESTBUCHUNG</span>
                  <span className="text-[9px] text-[#00ff41] font-bold uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#00ff41] block animate-pulse" />
                    Online
                  </span>
                </div>

                {!bookingConfirmed ? (
                  <form onSubmit={handleBookingSimSubmit} className="space-y-4">
                    
                    <div>
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest font-mono mb-2">
                        Schritt 1: Uhrzeit wählen
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {slots.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedTimeSlot(s)}
                            className={`font-mono text-xs py-2 border transition-all ${selectedTimeSlot === s ? "border-[#00ff41] bg-[#00ff41]/10 text-white" : "border-white/5 hover:border-white/25 text-white/40"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest font-mono">
                        Schritt 2: Kontaktdaten
                      </label>
                      <input 
                        type="text" 
                        placeholder="Dein Vorname" 
                        required
                        value={simulatedName}
                        onChange={(e) => setSimulatedName(e.target.value)}
                        className="w-full text-xs px-4 py-3 bg-[#161616] border border-white/10 rounded-none focus:border-[#00ff41] text-white focus:outline-none placeholder:text-white/20 font-mono"
                      />
                      <input 
                        type="email" 
                        placeholder="Deine E-Mail-Adresse" 
                        required
                        value={simulatedMail}
                        onChange={(e) => setSimulatedMail(e.target.value)}
                        className="w-full text-xs px-4 py-3 bg-[#161616] border border-white/10 rounded-none focus:border-[#00ff41] text-white focus:outline-none placeholder:text-white/20 font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#00ff41] hover:text-black transition-colors rounded-none mt-2 cursor-pointer"
                    >
                      Termin reservieren um {selectedTimeSlot} Uhr
                    </button>
                  </form>
                ) : (
                  <div className="py-6 text-center flex flex-col items-center justify-center space-y-4 font-mono">
                    <div className="w-12 h-12 border border-[#00ff41] bg-[#00ff41]/5 flex items-center justify-center text-[#00ff41] mb-2">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Simulation erfolgreich!</h3>
                    <p className="text-[11px] text-white/60 max-w-sm leading-relaxed font-sans">
                      Großartig, <strong>{simulatedName}</strong>! In der echten Version hättest du jetzt vollautomatisch deine Terminbestätigung per E-Mail erhalten, und dein Google/Apple-Kalender wäre synchronisiert.
                    </p>
                    <button
                      onClick={handleResetBookingSim}
                      className="text-[10px] text-[#00ff41] hover:underline uppercase tracking-wider font-bold pt-4"
                    >
                      Erneut testen
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STATS SECTION (Counter numbers) */}
      <section ref={countStatsRef} className="py-16 bg-[#121212] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center font-mono">
            
            <div className="space-y-1">
              <p className="font-head text-4xl sm:text-5xl md:text-6xl font-light text-[#00ff41] tracking-tighter">
                {mobileBookingCount}%
              </p>
              <p className="text-[10px] text-white/45 font-medium uppercase tracking-widest">
                Mobil buchbar
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-head text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tighter">
                24/7
              </p>
              <p className="text-[10px] text-white/45 font-medium uppercase tracking-widest">
                Erreichbarkeit
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-head text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tighter">
                1–2
              </p>
              <p className="text-[10px] text-white/45 font-medium uppercase tracking-widest">
                Wochen Go-Live
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-head text-4xl sm:text-5xl md:text-6xl font-light text-[#00ff41] tracking-tighter">
                {handwrittenCount}%
              </p>
              <p className="text-[10px] text-white/45 font-medium uppercase tracking-widest">
                Clean Code Handarbeit
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ & FOKUS SECTION */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-[#0d0d0d] border-b border-white/5 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <span className="inline-block px-3 py-1 border border-[#00ff41] text-[#00ff41] text-[10px] uppercase font-bold tracking-widest font-mono">
              Fokus & Transparenz FAQ
            </span>
            <h2 className="font-head text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
              HAST DU NOCH <span className="text-white/30 italic font-light">FRAGEN?</span>
            </h2>
            <p className="text-white/60 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Erfahre genau, welche Art von Webseiten ich für dich baue (und welche ganz bewusst nicht), um dein Unternehmen optimal zu entlasten. Klicke auf die Fragen zum Ausklappen.
            </p>
          </div>

          <div className="space-y-3 font-mono">
            {[
              {
                q: "Welche Webseiten baust du und welche baust du NICHT?",
                a: "Ich bin spezialisiert auf hocheffektive One-Page-Seiten (Landing Pages) und einfache, super-schnelle Infoseiten für kleine Betriebe, Salons und Freiberufler. Ich erstelle bewusst KEINE komplexen Webshops (E-Commerce-Lösungen mit Warenkörben/Kassen). Mein Ziel ist maximale Übersicht und smarte Kunden-Anfragen, kein riesiger Shop-Overhead."
              },
              {
                q: "Kann ich eine Infoseite auch ohne Terminbuchung erhalten?",
                a: "Ja, absolut! Viele Kunden nutzen einfach eine repräsentative, schlanke Online-Avisierung (Infoseite) mit klassischen Kontaktwegen wie Telefon, E-Mail-Adresse oder einem klaren Kontaktformular. Die Online-Terminbuchung ist vollkommen optional und kann jederzeit flexibel aktiviert oder weggelassen werden."
              },
              {
                q: "Wie profitiere ich von einem integrierten Buchungssystem?",
                a: "Wenn du dich für ein Buchungssystem entscheidest, können deine Kunden rund um die Uhr direkt Termine buchen, die automatisch mit deinem Kalender abgeglichen werden. Das spart dir stundenlange Telefonzeiten beim Arbeiten und reduziert Ausfälle (No-Shows) dank automatischer SMS- und E-Mail-Erinnerungen drastisch."
              },
              {
                q: "Ist das System mit WordPress oder ein Baukasten?",
                a: "Nein, mein Code ist zu 100% maßgeschneidert und handgeschrieben. WordPress-Seiten oder herkömmliche Baukästen sind oft überladen, langsam und anfällig für Sicherheitslücken. Meine Seiten laden in Millisekunden und sind extrem wartungsarm, suchmaschinenoptimiert und vollständig unabhängig."
              }
            ].map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className={`cursor-pointer p-5 rounded-none border transition-all duration-300 ${isOpen ? "bg-[#121212] border-[#00ff41] shadow-lg" : "bg-[#121212]/40 border-white/5 hover:border-white/15"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono transition-colors ${isOpen ? "text-[#00ff41]" : "text-white/40"}`}>
                        [0{idx + 1}]
                      </span>
                      <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors ${isOpen ? "text-[#00ff41]" : "text-white/80"}`}>
                        {faq.q}
                      </h4>
                    </div>
                    <div className={`w-6 h-6 border flex items-center justify-center transition-all ${isOpen ? "border-[#00ff41] text-[#00ff41] bg-[#00ff41]/5" : "border-white/10 text-white/40"}`}>
                      <span className="text-xs transition-transform duration-300 font-bold block">{isOpen ? "–" : "+"}</span>
                    </div>
                  </div>

                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[160px] opacity-100 mt-4 pt-4 border-t border-white/5" : "max-h-0 opacity-0"}`}>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans normal-case pr-2">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS / ABLAUF STEPS */}
      <section id="process" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Text Detail Column */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <span className="inline-block px-3 py-1 border border-[#00ff41] text-[#00ff41] text-[10px] uppercase font-bold tracking-widest font-mono">
              Prozess-Ablauf
            </span>
            <h2 className="font-head text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white leading-none">
              VOM ENTWURF ZUM <span className="text-white/30 italic font-light">RELEASING.</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Transparent, entspannt und komplett barrierefrei. Ich begleite dich von der ersten Brainstorming-Session bis zum schlüsselfertigen Hosting auf deiner Wunsch-Domain.
            </p>
            
            <a 
              href="https://cal.com/julian-witteler-xdzypp/gesprach-vereinbarn" 
              onClick={handleCalComClick}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-[#00ff41] hover:text-white transition-colors uppercase tracking-widest font-mono"
            >
              <span>Termin für Erstgespräch sichern</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Accordions */}
          <div className="lg:col-span-7 space-y-3 font-mono">
            {processStepsData.map((step, idx) => {
              const isOpen = activeStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => {
                    setIsHoveredStep(true);
                    setActiveStep(idx);
                  }}
                  onMouseEnter={() => {
                    setIsHoveredStep(true);
                    setActiveStep(idx);
                  }}
                  onMouseLeave={() => {
                    setIsHoveredStep(false);
                  }}
                  className={`cursor-pointer p-6 rounded-none border transition-all duration-200 relative ${isOpen ? "bg-[#121212] border-[#00ff41]/55 shadow-xl" : "bg-[#121212]/30 border-white/5 hover:border-white/15"}`}
                >
                  <div className="flex items-start gap-4">
                    
                    {/* Minimal block number */}
                    <div className={`w-9 h-9 shrink-0 flex items-center justify-center font-head text-xs font-bold border transition-colors duration-200 ${isOpen ? "bg-[#00ff41] text-black border-[#00ff41]" : "bg-transparent text-[#00ff41] border-white/10"}`}>
                      {step.num}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-none bg-white/[0.03] border border-white/10 text-[#00ff41]">
                          {step.tag}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors ${isOpen ? "text-white" : "text-white/50 hover:text-white"}`}>
                          {step.title}
                        </h4>
                      </div>
                      
                      {/* Accordion content */}
                      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[160px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed pr-2 font-sans normal-case">
                          {step.description}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-3 py-1 border border-[#00ff41] text-[#00ff41] text-[10px] uppercase font-bold tracking-widest font-mono">
              Feste Preiskonditionen
            </span>
            <h2 className="font-head text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
              BUDGETS. <span className="text-white/30 italic font-light">TRANSPARENT.</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto">
              Zwei flexible, faire Zahlungsoptionen, die exakt denselben High-End Leistungsumfang beinhalten. Du entscheidest, wie es zu deiner Finanzplanung passt.
            </p>
          </div>

          {/* Brutalist minimalist card container */}
          <div className="bg-[#121212] border border-white/10 rounded-none shadow-2xl relative">
            
            {/* Minimal banner line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00ff41]" />

            {/* Split Header */}
            <div className="p-8 md:p-12 border-b border-white/5 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <div className="md:col-span-6 space-y-4">
                <h3 className="font-head text-lg md:text-xl font-bold text-white uppercase tracking-tight">
                  Deine Web-Präsenz komplett schlüsselfertig.
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Individuelles Corporate-Layout, extrem sicherer Code auf Serverless-Infrastruktur, integriertes DSGVO-Buchungssystem, Mobiloptimierung und Einschulung.
                </p>
              </div>

              {/* Grid block toggle */}
              <div className="md:col-span-6 flex flex-col gap-3.5 w-full font-mono">
                
                {/* One time payment option */}
                <div 
                  onClick={() => setPriceOption("einmalig")}
                  className={`p-4 border text-left cursor-pointer transition-all rounded-none ${priceOption === "einmalig" ? "bg-[#00ff41]/5 border-[#00ff41]" : "bg-transparent border-white/10 hover:border-white/25"}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] uppercase font-bold text-[#00ff41] bg-[#00ff41]/10 px-2.5 py-0.5 border border-[#00ff41]/20">
                      Einmal-Investition
                    </span>
                    {priceOption === "einmalig" && <span className="text-[10px] text-[#00ff41] font-bold">● GEWÄHLT</span>}
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-head font-black text-white">ab 250€</span>
                    <span className="text-xs text-white/40">einmalig</span>
                  </div>
                  <p className="text-[9px] text-white/50 mt-1 leading-normal font-sans">
                    Keine monatlichen Fixkosten · Voller Source-Code Besitz
                  </p>
                </div>

                {/* Subscriptions option */}
                <div 
                  onClick={() => setPriceOption("monatlich")}
                  className={`p-4 border text-left cursor-pointer transition-all rounded-none ${priceOption === "monatlich" ? "bg-[#00ff41]/5 border-[#00ff41]" : "bg-transparent border-white/10 hover:border-white/25"}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] uppercase font-bold text-white/50 bg-white/[0.04] px-2.5 py-0.5 border border-white/10">
                      Monatlich · Flexibel
                    </span>
                    {priceOption === "monatlich" && <span className="text-[10px] text-[#00ff41] font-bold">● GEWÄHLT</span>}
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-head font-black text-white">45€</span>
                    <span className="text-xs text-white/40">/ Monat</span>
                  </div>
                  <p className="text-[9px] text-white/50 mt-1 leading-normal font-sans">
                    Inklusive Hosting, Software-Updates & persönlichem Support
                  </p>
                </div>

              </div>
            </div>

            {/* Checklist details column grid */}
            <div className="p-8 md:p-12 bg-white/[0.01] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                <Check className="w-4 h-4 text-[#00ff41] shrink-0" />
                <span>Individuell codiertes System (kein WordPress)</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                <Check className="w-4 h-4 text-[#00ff41] shrink-0" />
                <span>Smarte Online-Buchungsanbindung</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                <Check className="w-4 h-4 text-[#00ff41] shrink-0" />
                <span>Modernes Responsive Design für Mobile</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                <Check className="w-4 h-4 text-[#00ff41] shrink-0" />
                <span>Erinnerungs-Mails & automatisierte SMS</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                <Check className="w-4 h-4 text-[#00ff41] shrink-0" />
                <span>Persönliche Systemübergabe & Anleitung</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60">
                <Check className="w-4 h-4 text-[#00ff41] shrink-0" />
                <span>Maximale Ladegeschwindigkeit (SEO-stark)</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#00ff41] font-mono bg-[#00ff41]/5 px-4 py-2 hover:bg-[#00ff41]/10 border border-[#00ff41]/20">
                <Sparkles className="w-4 h-4 text-[#00ff41] shrink-0" />
                <span>
                  {priceOption === "einmalig" 
                    ? "Einmalige Bezahlung — keine Abopflicht"
                    : "Laufender Support & Adminpflege inklusive"
                  }
                </span>
              </div>
            </div>

            {/* Bottom info section */}
            <div className="px-8 py-6 md:px-12 md:py-8 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1.5 font-mono text-[11px]">
                <p className="text-white/50 leading-relaxed font-sans font-light">
                  Kostenloses Erstgespräch zur Abklärung des genauen Umfangs.
                </p>
                <p className="font-bold text-white flex items-center justify-center sm:justify-start gap-1">
                  <Award className="w-3.5 h-3.5 text-[#00ff41]" />
                  <span>Kein Risiko: Bezahlung erst bei vollkommener Freigabe.</span>
                </p>
              </div>
              
              <a 
                href="https://cal.com/julian-witteler-xdzypp/gesprach-vereinbarn" 
                onClick={handleCalComClick}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-[#00ff41] text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors rounded-none w-full sm:w-auto text-center"
              >
                Erstgespräch buchen
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section id="cta" className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <div className="border border-white/10 bg-[#121212] p-10 md:p-16 text-center space-y-8 relative">
          
          <div className="absolute top-0 left-0 w-24 h-px bg-[#00ff41]" />
          <div className="absolute top-0 left-0 h-24 w-px bg-[#00ff41]" />

          <span className="inline-block px-3 py-1 border border-[#00ff41] text-[#00ff41] text-[10px] uppercase font-bold tracking-widest font-mono">
            Unverbindliche Analyse
          </span>
          
          <h2 className="font-head text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter uppercase leading-none max-w-2xl mx-auto">
            BEREIT FÜR ANALOGE <br />
            ENTLASTUNG & <span className="text-[#00ff41]">DIGITALEN UMSATZ?</span>
          </h2>
          
          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto leading-relaxed font-sans">
            Lass uns gemeinsam in 15 Minuten prüfen, an welchen Stellen dein Salon oder Alltagsbetrieb mit passendem Design und Automatisierung skaliert werden kann. Vollkommen kostenlos.
          </p>
          
          <div className="pt-4 flex flex-col items-center gap-3">
            <a 
              href="https://cal.com/julian-witteler-xdzypp/gesprach-vereinbarn" 
              onClick={handleCalComClick}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white hover:bg-[#00ff41] text-black text-xs font-bold font-mono uppercase rounded-none tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>TERMIN SCHNELL SICHERN</span>
            </a>
            <span className="text-[10px] text-white/40 flex items-center gap-1.5 mt-1 font-mono uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#00ff41]" />
              <span>Garantiert DSGVO-konform ohne US-Spam</span>
            </span>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#060606] border-t border-white/10 pt-20 pb-12 px-6 md:px-12 text-sm mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          <div className="md:col-span-5 space-y-5">
            <div className="font-head text-base font-black uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff41] block rounded-none" />
              <span>WITTELER<span className="text-[#00ff41]">.</span>WEBDESIGN</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed max-w-sm">
              Premium Webentwicklung und maßgeschneiderte Buchungssysteme für kleine Betriebe, Friseure und Kanzleien. Ohne unnötigen Balg und optimiert für Suchmaschinen.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[9px] font-mono font-bold uppercase text-[#00ff41] bg-[#00ff41]/5 border border-[#00ff41]/20 px-2 py-0.5 rounded-none">
                Gewerblicher Partner
              </span>
              <span className="text-[9px] font-mono font-bold uppercase text-white/50 bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded-none">
                React 19 & Tailwind v4
              </span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono font-bold text-[10px] uppercase text-white tracking-widest text-[#00ff41]">
              [KONTAKTKANÄLE]
            </h4>
            <div className="space-y-3 font-mono text-xs">
              <p className="text-white">
                Julian Witteler
              </p>
              <a href="tel:+491786860610" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>0178 6860610</span>
              </a>
              <a href="mailto:julian.witteler@gmail.com" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>julian.witteler@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono font-bold text-[10px] uppercase text-white tracking-widest text-[#00ff41]">
              [ANSCHRIFT]
            </h4>
            <div className="space-y-2 text-white/60 text-xs font-mono">
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#00ff41] shrink-0 mt-0.5" />
                <span>
                  Alfred-Delp-Straße 16 <br />
                  59348 Lüdinghausen <br />
                  Germany
                </span>
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} Witteler-Webdesign. Alle Rechte vorbehalten.</p>
          
          <div className="flex flex-wrap items-center gap-6 justify-center">
            <button 
              onClick={() => openLegalModal("impressum")}
              className="hover:text-white underline decoration-[#00ff41] cursor-pointer"
            >
              Impressum
            </button>
            <button 
              onClick={() => openLegalModal("datenschutz")}
              className="hover:text-white underline decoration-[#00ff41] cursor-pointer"
            >
              Datenschutz
            </button>
            <button 
              onClick={handleResetConsent}
              className="hover:text-white text-[9px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 px-2.5 py-1 transition-all rounded-none uppercase tracking-wider font-bold"
            >
              Cookie-Preferences
            </button>
          </div>
        </div>
      </footer>

      {/* STICKY/FIXED COOKIE CONSENT BANNER */}
      {consentStatus === "pending" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-6" id="cookie-opt">
          <div className="bg-[#121212] border border-white/10 p-6 md:p-8 rounded-none max-w-2xl w-full shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono">
            <div className="space-y-2 max-w-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">🍪</span>
                <h3 className="font-head font-bold text-xs uppercase tracking-widest text-white">EXTERNAL RESOURCES & PRIVACY</h3>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-sans">
                Diese Website verwendet Google Fonts und das Buchungs-Widget von Cal.com. Aus technischen Gründen wird dabei deine IP-Adresse übertragen. Mit Klick auf "Akzeptieren" stimmst du dieser Übermittlung zu. Genauere Informationen findest du in unserer{" "}
                <button 
                  onClick={() => openLegalModal("datenschutz")}
                  className="text-[#00ff41] underline hover:text-white inline cursor-pointer font-bold font-mono"
                >
                  Datenschutzerklärung
                </button>.
              </p>
            </div>
            
            <div className="flex shrink-0 gap-3 w-full md:w-auto">
              <button
                onClick={handleRejectConsent}
                className="flex-1 md:flex-none px-4 py-2.5 bg-transparent hover:bg-white/[0.05] border border-white/10 rounded-none text-xs text-white/50 hover:text-white transition-all font-semibold uppercase tracking-wider cursor-pointer"
              >
                Ablehnen
              </button>
              <button
                onClick={handleAcceptConsent}
                className="flex-1 md:flex-none px-5 py-2.5 bg-white hover:bg-[#00ff41] text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEGAL POPUP MODAL */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 transition-opacity duration-300">
          <div 
            className="bg-[#121212] border border-white/10 rounded-none max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Top Nav Bar */}
            <div className="px-6 py-4 bg-[#0a0a0a] border-b border-white/10 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 font-mono">
                <Shield className="w-5 h-5 text-[#00ff41]" />
                <span className="font-head font-extrabold text-xs uppercase tracking-widest text-white">RECHTLICHE HINWEISE</span>
              </div>
              <button 
                onClick={closeLegalModal}
                className="p-1.5 bg-[#161616] hover:bg-white/5 text-white/50 hover:text-white border border-white/10 transition-all cursor-pointer rounded-none"
                aria-label="Schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="px-6 py-2.5 bg-[#121212] border-b border-white/5 flex gap-2 shrink-0 overflow-x-auto font-mono">
              <button
                onClick={() => setActiveModalTab("impressum")}
                className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeModalTab === "impressum" ? "bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30" : "bg-transparent text-white/50 hover:text-white"}`}
              >
                Impressum
              </button>
              <button
                onClick={() => setActiveModalTab("datenschutz")}
                className={`px-4 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeModalTab === "datenschutz" ? "bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30" : "bg-transparent text-white/50 hover:text-white"}`}
              >
                Datenschutz
              </button>
            </div>

            {/* Modal Contents Scroll Area */}
            <div className="p-8 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-white/60">
              
              {activeModalTab === "impressum" ? (
                <div className="space-y-6">
                  <h2 className="font-head text-2xl font-black text-white uppercase tracking-tight">{legalImpressum.title}</h2>
                  
                  {legalImpressum.sections.map((sec, i) => (
                    <div key={i} className="space-y-2 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-head font-bold text-sm text-white uppercase tracking-wide">{sec.heading}</h3>
                      <p className="whitespace-pre-line text-white/50 leading-relaxed font-sans">{sec.content}</p>
                    </div>
                  ))}
                  
                  <div className="p-4 bg-[#00ff41]/5 border border-[#00ff41]/20 text-[#00ff41] mt-4 font-mono text-xs">
                    <p className="font-bold uppercase tracking-wider mb-1">Haftungsausschluss:</p>
                    <p className="leading-normal font-sans text-white/70">
                      Die Inhalte dieses Internetauftritts wurden mit größtmöglicher Sorgfalt erstellt. Dennoch übernehme ich für Richtigkeit, Vollständigkeit und Aktualität keine über das TMG hinausgehende Gewährleistung.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="font-head text-2xl font-black text-white uppercase tracking-tight">{legalDatenschutz.title}</h2>
                  
                  {legalDatenschutz.sections.map((sec, i) => (
                    <div key={i} className="space-y-2 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-head font-bold text-sm text-white uppercase tracking-wide">{sec.heading}</h3>
                      <p className="whitespace-pre-line text-white/50 leading-relaxed font-sans">{sec.content}</p>
                    </div>
                  ))}

                  <div className="p-4 bg-white/[0.02] border border-white/10 text-white/40 mt-4 font-mono text-xs">
                    <p className="font-bold text-white uppercase tracking-wider mb-1">Hostingsicherheit:</p>
                    <p className="leading-normal font-sans text-white/55">
                      Wir nutzen verschlüsselte Verbindungen (HTTPS) über führende deutsche Cloud Server. Ihre IP wird pseudonymisiert erfasst, um Angriffe auf das System zu protokollieren und Schäden abzuwenden.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Close Button Row */}
            <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/10 flex justify-end shrink-0">
              <button
                onClick={closeLegalModal}
                className="px-6 py-2.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#00ff41] transition-all cursor-pointer rounded-none"
              >
                Schließen
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
