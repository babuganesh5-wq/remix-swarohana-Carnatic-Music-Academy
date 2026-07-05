import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SwarohanaLogo } from "./components/SwarohanaLogo";
import { 
  Music,
  Check,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  Star,
  User,
  Phone,
  Mail,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Menu,
  X,
  Clock,
  ChevronRight,
  BookOpen,
  DollarSign,
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  UserPlus,
  Filter,
  MessageSquare,
  Activity
} from "lucide-react";

// --- DYNAMIC MUSICAL NOTES GENERATOR ---
const NOTE_SYMBOLS = ['♪', '♫', '♬', '♩', '♭', '♮', '♯', '𝄞', '𝄢'];

// --- ANIMATION VARIANTS ---
const mobileLinkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

interface FloatingNote {
  id: number;
  symbol: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

// --- DATA STRUCTURES ---
const STATS = [
  { id: "students", target: 500, label: "Students Trained", prefix: "", suffix: "+", icon: Users },
  { id: "instructors", target: 25, label: "Expert Instructors", prefix: "", suffix: "+", icon: Star },
  { id: "experience", target: 15, label: "Years Experience", prefix: "", suffix: "+", icon: Clock },
  { id: "awards", target: 50, label: "Awards Won", prefix: "", suffix: "+", icon: Award }
];

const SHOWCASE_CARDS = [
  {
    id: 1,
    title: "Performance Drive",
    desc: "Master high-energy stage presence, posture, and technical power.",
    bgUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80",
    color: "from-amber-500/25 to-transparent"
  },
  {
    id: 2,
    title: "Creative Expression",
    desc: "Unleash your artistic potential with contemporary improvisation.",
    bgUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    color: "from-yellow-500/25 to-transparent"
  },
  {
    id: 3,
    title: "Harmony in Nature",
    desc: "Connect with musical frequencies organically in open natural acoustics.",
    bgUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    color: "from-amber-600/25 to-transparent"
  }
];

const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Keyboard Virtuoso Practice",
    desc: "One of our dedicated young scholars practicing posture, rhythmic syncopation, and finger dexterity on a keyboard synthesizer.",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "g2",
    title: "Vocal and Artistic Expression",
    desc: "A young student expressing pure musical joy during her classical raga training, showcasing poise and confidence.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "g3",
    title: "Stage Performance Recital",
    desc: "Bringing theoretical classical training to life in our grand annual showcase with professional stage lighting and acoustic design.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80"
  }
];

const COURSES = [
  {
    id: "piano",
    title: "Classical Piano",
    icon: "🎹",
    desc: "Master scales, arpeggios, and classical repertoire from Bach to Beethoven with structured, premium lessons.",
    duration: "6 Months",
    price: 12000,
    category: "Keys"
  },
  {
    id: "guitar",
    title: "Contemporary Guitar",
    icon: "🎸",
    desc: "Acoustic and electric techniques including sophisticated fingerstyle, dynamic strumming, and solo improvisation.",
    duration: "4 Months",
    price: 9500,
    category: "Strings"
  },
  {
    id: "vocals",
    title: "Vocal Training",
    icon: "🎤",
    desc: "Professional coaching for breathing mechanics, pitch precision, range extension, and command of stage presence.",
    duration: "3 Months",
    price: 8000,
    category: "Voice"
  },
  {
    id: "drums",
    title: "Drums & Percussion",
    icon: "🥁",
    desc: "Build immaculate rhythm, timing, and multi-limb coordination with rock, classic jazz, and fusion styles.",
    duration: "5 Months",
    price: 10500,
    category: "Percussion"
  },
  {
    id: "violin",
    title: "Violin & Strings",
    icon: "🎻",
    desc: "From fundamental bowing to advanced vibrato and posture — explore the soulful and expressive world of strings.",
    duration: "8 Months",
    price: 15000,
    category: "Strings"
  },
  {
    id: "production",
    title: "Music Production",
    icon: "🎧",
    desc: "Learn advanced digital audio workstations (DAWs), professional mixing, mastering, and high-fidelity sound design.",
    duration: "6 Months",
    price: 18000,
    category: "Tech"
  }
];

const INSTRUCTORS = [
  {
    name: "Rajesh Iyer",
    role: "Classical Piano Maestro",
    bio: "20+ years of concert experience, formerly a primary pianist with the Bombay Symphony Orchestra.",
    advice: "Practice doesn't make perfect. Perfect practice makes perfect. Focus on slow, intentional repetitions.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Priya Sharma",
    role: "Vocal Coach & Artistry",
    bio: "Leading playback vocalist with over 50 silver-screen credits and classical Hindustani training.",
    advice: "Your vocal cords are muscles. Warm them up, keep them hydrated, and sing from the diaphragm.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Amit Khanna",
    role: "Guitarist & Master Producer",
    bio: "Multi-instrumentalist and recording engineer who has engineered chart-busters for premier artists.",
    advice: "Listen more than you play. The spaces between the notes are just as important as the notes themselves.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Sneha Patel",
    role: "Violin Virtuoso",
    bio: "Graduated with absolute honors from the Royal Academy of Music, London, specializing in western classical.",
    advice: "Let the bow do the breathing. Feel the string's resistance, and flow with its organic vibration.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
  }
];

// --- PLAYABLE KEYBOARD NOTE CONFIGURATION (WEB AUDIO API) ---
const PIANO_KEYS = [
  { note: "C4", label: "Sa", isBlack: false, frequency: 261.63 },
  { note: "C#4", label: "re", isBlack: true, frequency: 277.18 },
  { note: "D4", label: "Re", isBlack: false, frequency: 293.66 },
  { note: "D#4", label: "ga", isBlack: true, frequency: 311.13 },
  { note: "E4", label: "Ga", isBlack: false, frequency: 329.63 },
  { note: "F4", label: "ma", isBlack: false, frequency: 349.23 },
  { note: "F#4", label: "Ma", isBlack: true, frequency: 369.99 },
  { note: "G4", label: "Pa", isBlack: false, frequency: 392.00 },
  { note: "G#4", label: "dha", isBlack: true, frequency: 415.30 },
  { note: "A4", label: "Dha", isBlack: false, frequency: 440.00 },
  { note: "A#4", label: "ni", isBlack: true, frequency: 466.16 },
  { note: "B4", label: "Ni", isBlack: false, frequency: 493.88 },
  { note: "C5", label: "Sa'", isBlack: false, frequency: 523.25 }
];

// --- SHRUTI BOX & THALAM DATA STRUCTURES ---
const SHRUTI_KEYS = [
  { key: "C3", label: "C (1 Kattai / Sa)", frequency: 130.81 },
  { key: "C#3", label: "C# (1.5 Kattai / re)", frequency: 138.59 },
  { key: "D3", label: "D (2 Kattai / Re)", frequency: 146.83 },
  { key: "D#3", label: "D# (2.5 Kattai / ga)", frequency: 155.56 },
  { key: "E3", label: "E (3 Kattai / Ga)", frequency: 164.81 },
  { key: "F3", label: "F (4 Kattai / ma)", frequency: 174.61 },
  { key: "F#3", label: "F# (4.5 Kattai / Ma)", frequency: 185.00 },
  { key: "G3", label: "G (5 Kattai / Pa)", frequency: 196.00 },
  { key: "G#3", label: "G# (5.5 Kattai / dha)", frequency: 207.65 },
  { key: "A3", label: "A (6 Kattai / Dha)", frequency: 220.00 },
  { key: "A#3", label: "A# (6.5 Kattai / ni)", frequency: 233.08 },
  { key: "B3", label: "B (7 Kattai / Ni)", frequency: 246.94 },
  { key: "C4", label: "C Middle (Sa')", frequency: 261.63 }
];

const THALAM_CONFIGS = {
  Adi: {
    name: "Adi Thalam (8 Beats)",
    beats: 8,
    pattern: ["Clap 👏", "Pinky 🖐", "Ring 🖐", "Middle 🖐", "Clap 👏", "Wave 👋", "Clap 👏", "Wave 👋"],
    accent: [true, false, false, false, true, false, true, false]
  },
  Rupaka: {
    name: "Rupaka Thalam (3 Beats)",
    beats: 3,
    pattern: ["Clap 👏", "Clap 👏", "Wave 👋"],
    accent: [true, false, false]
  },
  RoopakaChapu: {
    name: "Roopaka / Chapu (4 Beats)",
    beats: 4,
    pattern: ["Clap 👏", "Pinky 🖐", "Ring 🖐", "Wave 👋"],
    accent: [true, false, false, false]
  },
  KhandaChapu: {
    name: "Khanda Chapu (5 Beats)",
    beats: 5,
    pattern: ["Clap 👏", "Pause 🤫", "Clap 👏", "Wave 👋", "Pause 🤫"],
    accent: [true, false, true, false, false]
  }
};

// --- TYPES FOR CRM & BILLING ---
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseId: string;
  status: "New" | "Trial Scheduled" | "Enrolled" | "Inactive";
  notes: string;
  date: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  studentName: string;
  courseTitle: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
}

interface Transaction {
  id: string;
  invoiceNumber: string;
  studentName: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export default function App() {
  // Mobile navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Floating background notes
  const [bgNotes, setBgNotes] = useState<FloatingNote[]>([]);

  // Sound Engine
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  // --- SHRUTI BOX & THALAM STATES & REFS ---
  const [shrutiActive, setShrutiActive] = useState(false);
  const [shrutiKey, setShrutiKey] = useState("C3");
  const [shrutiType, setShrutiType] = useState("Sa-Pa-Sa");
  const [shrutiVolume, setShrutiVolume] = useState(0.4);

  const [thalamActive, setThalamActive] = useState(false);
  const [thalamType, setThalamType] = useState<"Adi" | "Rupaka" | "RoopakaChapu" | "KhandaChapu">("Adi");
  const [thalamTempo, setThalamTempo] = useState(80);
  const [currentBeat, setCurrentBeat] = useState(0);

  const shrutiOscsRef = useRef<any[]>([]);
  const shrutiGainRef = useRef<any | null>(null);
  const thalamTimerRef = useRef<any | null>(null);

  // Active key being played (for visual keyboard state)
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Showcase Slider
  const [activeShowcase, setActiveShowcase] = useState(0);

  // Staggered count animations state
  const [statsCount, setStatsCount] = useState({
    students: 0,
    instructors: 0,
    experience: 0,
    awards: 0
  });

  // Selected Course category filter
  const [activeCourseFilter, setActiveCourseFilter] = useState("All");

  // Booking Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "piano",
    goals: ""
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Navigation Toast
  const [toast, setToast] = useState<string | null>(null);

  // --- CRM LIVE STATE ---
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "lead-1",
      name: "Siddharth Rao",
      email: "siddharth.rao@gmail.com",
      phone: "+91 98123 45678",
      courseId: "piano",
      status: "Trial Scheduled",
      notes: "Aims to prepare for Trinity College London Grade 3 examinations.",
      date: "2026-07-02"
    },
    {
      id: "lead-2",
      name: "Ananya Iyer",
      email: "ananya.iyer@outlook.com",
      phone: "+91 99887 76655",
      courseId: "vocals",
      status: "New",
      notes: "Looking to work on breath control and classical Hindustani foundation.",
      date: "2026-07-04"
    },
    {
      id: "lead-3",
      name: "Vikram Seth",
      email: "vikram.seth@yahoo.com",
      phone: "+91 97654 32109",
      courseId: "drums",
      status: "Enrolled",
      notes: "Enrolled in 5-month rock drumming and syncopation patterns.",
      date: "2026-06-25"
    },
    {
      id: "lead-4",
      name: "Riya Sen",
      email: "riya.sen@gmail.com",
      phone: "+91 98765 43219",
      courseId: "guitar",
      status: "Inactive",
      notes: "Trial class completed. Postponed enrollment due to school exams.",
      date: "2026-06-20"
    }
  ]);

  const [crmFilter, setCrmFilter] = useState<string>("All");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: "piano",
    status: "New" as Lead["status"],
    notes: ""
  });

  // --- BILLING LIVE STATE ---
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "inv-101",
      invoiceNumber: "SW-2026-0101",
      studentName: "Aarav Mehta",
      courseTitle: "Classical Piano",
      amount: 12000,
      status: "Pending",
      dueDate: "2026-07-15"
    },
    {
      id: "inv-102",
      invoiceNumber: "SW-2026-0102",
      studentName: "Deepika Sen",
      courseTitle: "Vocal Training",
      amount: 8000,
      status: "Overdue",
      dueDate: "2026-06-30"
    },
    {
      id: "inv-103",
      invoiceNumber: "SW-2026-0103",
      studentName: "Kabir Malhotra",
      courseTitle: "Contemporary Guitar",
      amount: 9500,
      status: "Paid",
      dueDate: "2026-07-01"
    },
    {
      id: "inv-104",
      invoiceNumber: "SW-2026-0104",
      studentName: "Ishita Patel",
      courseTitle: "Violin & Strings",
      amount: 15000,
      status: "Pending",
      dueDate: "2026-07-20"
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx-1",
      invoiceNumber: "SW-2026-0103",
      studentName: "Kabir Malhotra",
      amount: 9500,
      date: "2026-07-01 10:24 AM",
      paymentMethod: "UPI (Google Pay)"
    }
  ]);

  const [selectedInvoiceToPay, setSelectedInvoiceToPay] = useState<string>("inv-101");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Initialize Web Audio Context on first interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  // Play a beautiful synthesized piano frequency
  const playNoteFrequency = (freq: number, noteName: string) => {
    if (!soundEnabled) return;
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Create custom synthesizer nodes
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine"; // Pure harmonic flute/sine wave tone
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Dynamic secondary oscillator for richer acoustics (gold standard)
    const subOsc = ctx.createOscillator();
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.08, ctx.currentTime);

    // Premium ADSR envelope (Attack-Decay-Sustain-Release)
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05); // quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9); // smooth release decay

    osc.connect(gainNode);
    subOsc.connect(subGain);
    subGain.connect(gainNode);

    gainNode.connect(ctx.destination);

    osc.start();
    subOsc.start();
    setActiveKey(noteName);

    // Stop tone gracefully
    osc.stop(ctx.currentTime + 1.0);
    subOsc.stop(ctx.currentTime + 1.0);

    setTimeout(() => {
      setActiveKey((prev) => (prev === noteName ? null : prev));
    }, 250);
  };

  // Play a Carnatic or Classical signature loop
  const playDemoSong = () => {
    initAudio();
    const song = [
      { note: "C4", delay: 0 },
      { note: "E4", delay: 300 },
      { note: "G4", delay: 600 },
      { note: "C5", delay: 900 },
      { note: "B4", delay: 1300 },
      { note: "G4", delay: 1600 },
      { note: "E4", delay: 1900 },
      { note: "C4", delay: 2200 }
    ];

    setToast("🎼 Playing signature raga loop...");

    song.forEach((item) => {
      setTimeout(() => {
        const found = PIANO_KEYS.find((k) => k.note === item.note);
        if (found) {
          playNoteFrequency(found.frequency, found.note);
        }
      }, item.delay);
    });
  };

  // --- SHRUTI BOX AUDIO CONTROLLERS ---
  const stopShrutiDrone = () => {
    if (shrutiOscsRef.current.length > 0) {
      shrutiOscsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      shrutiOscsRef.current = [];
    }
    if (shrutiGainRef.current) {
      try {
        shrutiGainRef.current.disconnect();
      } catch (e) {}
      shrutiGainRef.current = null;
    }
  };

  const startShrutiDrone = () => {
    stopShrutiDrone();
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0, ctx.currentTime);
    mainGain.gain.linearRampToValueAtTime(shrutiVolume, ctx.currentTime + 0.15);
    mainGain.connect(ctx.destination);
    shrutiGainRef.current = mainGain;

    const found = SHRUTI_KEYS.find((k) => k.key === shrutiKey);
    const baseFreq = found ? found.frequency : 130.81;

    const oscs: OscillatorNode[] = [];

    const addHarmonic = (freq: number, type: OscillatorType, volumeRatio: number, detuneCents: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(detuneCents, ctx.currentTime);

      gain.gain.setValueAtTime(volumeRatio, ctx.currentTime);

      osc.connect(gain);
      gain.connect(mainGain);
      osc.start();
      oscs.push(osc);
    };

    // Thick double-reed physical sound simulation
    addHarmonic(baseFreq, "triangle", 0.35, 0);
    addHarmonic(baseFreq, "sine", 0.45, 2);
    addHarmonic(baseFreq * 0.5, "triangle", 0.25, -2); // sub-octave depth

    if (shrutiType === "Sa-Pa-Sa") {
      const paFreq = baseFreq * 1.5;
      addHarmonic(paFreq, "triangle", 0.22, 1);
      addHarmonic(paFreq, "sine", 0.3, -1);
    } else if (shrutiType === "Sa-Ma-Sa") {
      const maFreq = baseFreq * 1.3348;
      addHarmonic(maFreq, "triangle", 0.22, 1);
      addHarmonic(maFreq, "sine", 0.3, -1);
    }

    // High octave crisp register
    addHarmonic(baseFreq * 2.0, "sine", 0.2, 3);
    addHarmonic(baseFreq * 2.0, "triangle", 0.1, -3);

    shrutiOscsRef.current = oscs;
  };

  useEffect(() => {
    if (shrutiActive && soundEnabled) {
      startShrutiDrone();
    } else {
      stopShrutiDrone();
    }

    return () => {
      stopShrutiDrone();
    };
  }, [shrutiActive, shrutiKey, shrutiType, shrutiVolume, soundEnabled]);

  // --- THALAM SEQUENCER CONTROLLERS ---
  const playThalamTick = (isAccent: boolean) => {
    if (!soundEnabled) return;
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(isAccent ? 1200 : 750, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  useEffect(() => {
    if (thalamActive) {
      const beatInterval = (60 / thalamTempo) * 1000;
      const config = THALAM_CONFIGS[thalamType];

      setCurrentBeat(0);
      playThalamTick(config.accent[0]);

      const intervalId = setInterval(() => {
        setCurrentBeat((prevBeat) => {
          const nextBeat = (prevBeat + 1) % config.beats;
          playThalamTick(config.accent[nextBeat]);
          return nextBeat;
        });
      }, beatInterval);

      thalamTimerRef.current = intervalId;

      return () => {
        clearInterval(intervalId);
      };
    } else {
      setCurrentBeat(0);
      if (thalamTimerRef.current) {
        clearInterval(thalamTimerRef.current);
        thalamTimerRef.current = null;
      }
    }
  }, [thalamActive, thalamTempo, thalamType, soundEnabled]);

  // Generate floating musical notes in the background
  useEffect(() => {
    const initialNotes = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
      left: Math.random() * 95,
      size: 1.2 + Math.random() * 2.2, // sizes from 1.2rem to 3.4rem
      duration: 10 + Math.random() * 12, // durations from 10s to 22s
      delay: Math.random() * -10 // start staggered
    }));
    setBgNotes(initialNotes);

    // Periodically replace old notes
    const interval = setInterval(() => {
      setBgNotes((prev) => {
        const kept = prev.slice(1);
        const added = {
          id: Date.now(),
          symbol: NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)],
          left: Math.random() * 95,
          size: 1.2 + Math.random() * 2.2,
          duration: 10 + Math.random() * 12,
          delay: 0
        };
        return [...kept, added];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Stats Counting Animation when page loads
  useEffect(() => {
    const duration = 1500; // ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setStatsCount({
        students: Math.min(Math.round(progress * STATS[0].target), STATS[0].target),
        instructors: Math.min(Math.round(progress * STATS[1].target), STATS[1].target),
        experience: Math.min(Math.round(progress * STATS[2].target), STATS[2].target),
        awards: Math.min(Math.round(progress * STATS[3].target), STATS[3].target)
      });

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, []);

  // Auto-hide Toast notifications
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle Free Trial Form Submission (Connects to CRM Leads list in Real-Time!)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("Please complete all required fields with your contact details.");
      return;
    }
    setErrorMessage("");
    
    // Add new lead directly to active state database
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      courseId: formData.course,
      status: "New",
      notes: formData.goals || "Submitted enquiry via online Landing Page form.",
      date: new Date().toISOString().split("T")[0]
    };

    setLeads((prev) => [newLead, ...prev]);
    setFormSuccess(true);
    setToast("✨ Orientation booked & logged into CRM system!");
  };

  // Handle adding lead internally from CRM view
  const handleAddLeadInternally = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email || !newLeadForm.phone) {
      setToast("Please fill in Name, Email and Phone.");
      return;
    }

    const internalLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone,
      courseId: newLeadForm.courseId,
      status: newLeadForm.status,
      notes: newLeadForm.notes || "Added internally by studio manager.",
      date: new Date().toISOString().split("T")[0]
    };

    setLeads((prev) => [internalLead, ...prev]);
    setNewLeadForm({
      name: "",
      email: "",
      phone: "",
      courseId: "piano",
      status: "New",
      notes: ""
    });
    setShowAddLeadModal(false);
    setToast("👤 Internal lead created successfully!");
  };

  // Change lead status in CRM
  const handleUpdateLeadStatus = (leadId: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    setToast(`Status updated to ${newStatus}`);
  };

  // Delete lead from CRM
  const handleDeleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    setToast("Lead removed from directory.");
  };

  // Add customized notes to a lead
  const handleAddNoteToLead = (leadId: string, noteContent: string) => {
    if (!noteContent.trim()) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, notes: `${l.notes}\n[Update]: ${noteContent.trim()}` }
          : l
      )
    );
    setToast("Interaction log updated.");
  };

  // Export Leads to CSV for Studio Manager
  const exportLeadsToCSV = () => {
    if (leads.length === 0) {
      setToast("No leads available to export.");
      return;
    }

    // Define CSV headers
    const headers = ["ID", "Name", "Email", "Phone", "Course", "Status", "Date", "Notes"];

    // Map leads array to CSV rows
    const rows = leads.map(lead => {
      const courseTitle = COURSES.find(c => c.id === lead.courseId)?.title || lead.courseId;
      // Escape double quotes and handle multi-line strings for CSV compatibility
      const escapedNotes = lead.notes ? `"${lead.notes.replace(/"/g, '""').replace(/\n/g, ' ')}"` : '""';
      const escapedName = lead.name ? `"${lead.name.replace(/"/g, '""')}"` : '""';
      const escapedEmail = lead.email ? `"${lead.email.replace(/"/g, '""')}"` : '""';
      const escapedPhone = lead.phone ? `"${lead.phone.replace(/"/g, '""')}"` : '""';
      const escapedCourse = courseTitle ? `"${courseTitle.replace(/"/g, '""')}"` : '""';

      return [
        lead.id,
        escapedName,
        escapedEmail,
        escapedPhone,
        escapedCourse,
        lead.status,
        lead.date,
        escapedNotes
      ].join(",");
    });

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Swarohana_CRM_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToast("📊 CRM Leads exported to CSV successfully!");
  };

  // Handle Simulated Invoice Payment
  const handlePayInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceToPay = invoices.find((inv) => inv.id === selectedInvoiceToPay);
    if (!invoiceToPay) {
      setToast("Please select a valid invoice to pay.");
      return;
    }
    if (invoiceToPay.status === "Paid") {
      setToast("This tuition invoice has already been fully paid.");
      return;
    }
    if (!cardHolderName || !cardNumber) {
      setToast("Please complete the required card details.");
      return;
    }

    setIsProcessingPayment(true);

    // Simulate luxury API gateway payment response
    setTimeout(() => {
      // Update invoice status to "Paid"
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === selectedInvoiceToPay ? { ...inv, status: "Paid" } : inv
        )
      );

      // Add to transaction logs
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        invoiceNumber: invoiceToPay.invoiceNumber,
        studentName: invoiceToPay.studentName,
        amount: invoiceToPay.amount,
        date: `${new Date().toISOString().split("T")[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        paymentMethod: "Credit Card (Simulated Secure)"
      };

      setTransactions((prev) => [newTx, ...prev]);
      setIsProcessingPayment(false);
      setToast(`🎉 Success! Paid ₹${invoiceToPay.amount.toLocaleString("en-IN")} for ${invoiceToPay.studentName}`);

      // Clear card inputs
      setCardHolderName("");
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");

      // Play victory sound note
      playNoteFrequency(523.25, "C5");
    }, 1800);
  };

  // Smooth scroll to element helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  // Filter courses based on active classification
  const filteredCourses = activeCourseFilter === "All" 
    ? COURSES 
    : COURSES.filter((c) => c.category === activeCourseFilter);

  // CRM Statistics calculations
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const trialLeadsCount = leads.filter((l) => l.status === "Trial Scheduled").length;
  const enrolledLeadsCount = leads.filter((l) => l.status === "Enrolled").length;

  // Filter CRM list
  const filteredLeads = crmFilter === "All" 
    ? leads 
    : leads.filter((l) => l.status === crmFilter);

  // Billing Statistics calculations
  const totalOutstandingBalance = invoices
    .filter((inv) => inv.status !== "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="relative w-full min-h-screen flex flex-col font-body bg-[#050505] text-[#e8e0d5] overflow-x-hidden">
      
      {/* BACKGROUND FLOATING NOTES ENGINE */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {bgNotes.map((note) => (
          <span
            key={note.id}
            className="absolute text-gold/30 md:text-gold/35 note-animation select-none drop-shadow-[0_0_8px_rgba(245,197,24,0.4)] font-black"
            style={{
              left: `${note.left}%`,
              fontSize: `${note.size}rem`,
              animationDuration: `${note.duration}s`,
              animationDelay: `${note.delay}s`,
              bottom: "-50px"
            }}
          >
            {note.symbol}
          </span>
        ))}
      </div>

      {/* FIXED PREMIUM NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-gold/15 transition-all duration-300">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Brand Block (Left) */}
          <button 
            onClick={() => scrollToSection("home")} 
            className="flex items-center group focus:outline-none text-left"
            id="nav-logo"
          >
            <SwarohanaLogo variant="horizontal" size={34} />
          </button>

          {/* Desktop Links (Center) */}
          <div className="hidden md:flex items-center gap-6">
            {['Courses', 'Acoustics', 'Gallery', 'Showcase', 'Instructors', 'Billing', 'CRM'].map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                className="text-[11px] font-bold tracking-widest text-[#e8e0d5]/80 hover:text-gold transition-colors relative py-1 focus:outline-none uppercase"
                id={`nav-link-${link.toLowerCase()}`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Desktop Right Call-To-Action (Right) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                setToast(soundEnabled ? "Audio engine muted" : "Audio engine active! Click piano keys to test.");
              }}
              className="p-2 rounded-full border border-gold/20 hover:border-gold/60 text-gold/80 hover:text-gold transition-all focus:outline-none"
              title={soundEnabled ? "Mute interactive piano" : "Enable interactive piano"}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gold hover:bg-gold-light text-[#050505] font-bold text-[11px] tracking-wider uppercase rounded-full px-5 py-2.5 transition-all shadow-[0_0_20px_rgba(245,197,24,0.25)] hover:shadow-[0_0_30px_rgba(245,197,24,0.45)]"
              id="desktop-enroll-btn"
            >
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                setToast(soundEnabled ? "Audio engine muted" : "Audio engine active!");
              }}
              className="p-1.5 rounded-full border border-gold/20 text-gold"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-gold hover:bg-gold/5 transition-colors z-50 focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN SLIDE-IN SHEET */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#050505]/85 backdrop-blur-md z-40"
              id="mobile-backdrop"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
              className="fixed right-0 top-0 w-full max-w-[320px] h-full bg-[#0a0a0a] shadow-[-10px_0_40px_rgba(0,0,0,0.8)] z-50 p-6 flex flex-col justify-between border-l border-gold/15"
              id="mobile-sheet"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gold/10">
                  <div className="flex items-center gap-2">
                    <Music className="text-gold w-5 h-5" />
                    <span className="font-heading font-black text-lg tracking-[2px] text-gold uppercase">
                      Swarohana
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full text-[#e8e0d5]/60 hover:text-gold hover:bg-white/5 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 py-8">
                  {['Courses', 'Acoustics', 'Gallery', 'Showcase', 'Instructors', 'Billing', 'CRM'].map((link, i) => (
                    <motion.button
                      key={link}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={mobileLinkVariants}
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="block text-left text-base font-bold tracking-widest text-[#e8e0d5] hover:text-gold transition-colors py-1 focus:outline-none uppercase font-body"
                      id={`mobile-nav-link-${link.toLowerCase()}`}
                    >
                      {link}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-gold/10">
                <button
                  onClick={playDemoSong}
                  className="w-full bg-white/5 text-gold border border-gold/30 hover:border-gold font-semibold rounded-full py-3.5 transition-all text-xs tracking-wider uppercase"
                >
                  Play Demo Song
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-gold text-[#050505] font-black rounded-full py-3.5 hover:bg-gold-light transition-all text-center text-xs tracking-widest uppercase shadow-lg shadow-gold/15"
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[95vh] w-full flex flex-col justify-center items-center pt-24 pb-16 overflow-hidden z-10 px-5 sm:px-8">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        {/* Ambient background video */}
        <div className="absolute inset-0 z-0 opacity-10 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
          />
        </div>

        <div className="mx-auto w-full max-w-[1280px] text-center z-10 flex flex-col items-center justify-center">
          
          {/* Animated Float Logo */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8 flex justify-center"
          >
            <SwarohanaLogo variant="vertical" size={60} />
          </motion.div>

          {/* Golden Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gold text-xs font-black tracking-[6px] sm:tracking-[8px] uppercase bg-gold/10 px-5 py-2.5 rounded-full inline-block mb-6 border border-gold/15"
          >
            Swarohana Carnatic Music Academy
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-heading text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-[#fff5d6] to-gold leading-[1.1] mb-6"
            id="hero-heading"
          >
            Where Music<br />Comes Alive
          </motion.h1>

          {/* Hero Description */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#e8e0d5]/70 leading-relaxed mb-8 px-4">
            Unleash your artistic potential under the guidance of S.V. Madhesvaran and elite Carnatic maestros. Discover a structured sargam curriculum, custom electronic Shruti practice boxes, Thalam rhythm synchronizers, and a integrated administrative dashboard for billing and CRM.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection("courses")}
              className="bg-gold hover:bg-gold-light text-[#050505] font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full px-8 py-3.5 transition-all shadow-[0_0_25px_rgba(245,197,24,0.25)] hover:-translate-y-1"
            >
              Explore Courses
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-transparent border-2 border-gold/40 hover:border-gold text-gold hover:text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full px-8 py-3.5 transition-all hover:-translate-y-1"
            >
              Book a Free Trial
            </button>
          </div>

          {/* INTERACTIVE PLAYABLE VIRTUOSO PIANO KEYS WIDGET */}
          <div className="w-full max-w-3xl bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-gold/20 p-5 sm:p-6 rounded-3xl shadow-2xl relative mb-4">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#050505] border border-gold/30 px-4 py-1.5 rounded-full text-[10px] tracking-widest font-black uppercase text-gold">
              Interactive Audio Synthesizer
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
              <div className="text-left">
                <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                  <Sparkles size={16} /> Keyboard Virtuoso Sandbox
                </h3>
                <p className="text-xs text-[#e8e0d5]/60 mt-0.5">Click keys below or use the play demo button to trigger pure, simulated flute frequencies.</p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={playDemoSong}
                  className="bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-black text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Play size={10} /> Play Demo Loop
                </button>
                <div className="text-xs text-gold/80 bg-[#050505] border border-gold/10 px-2.5 py-1 rounded">
                  {activeKey ? `Tone: ${activeKey}` : "Awaiting play..."}
                </div>
              </div>
            </div>

            {/* Virtual Piano Layout Container */}
            <div className="relative w-full h-[150px] sm:h-[180px] rounded-xl overflow-hidden bg-[#050505] p-1 flex border border-white/5">
              {PIANO_KEYS.map((key) => {
                if (key.isBlack) return null;

                const currentIdx = PIANO_KEYS.findIndex((pk) => pk.note === key.note);
                const nextKey = PIANO_KEYS[currentIdx + 1];
                const hasBlackNext = nextKey && nextKey.isBlack;

                const isActive = activeKey === key.note;
                const isBlackActive = hasBlackNext && activeKey === nextKey.note;

                return (
                  <div key={key.note} className="flex-1 relative h-full group px-[1px]">
                    {/* White Key */}
                    <button
                      onClick={() => playNoteFrequency(key.frequency, key.note)}
                      className={`w-full h-full rounded-b-lg transition-all flex flex-col justify-end pb-3 items-center cursor-pointer select-none outline-none focus:outline-none ${
                        isActive 
                          ? "bg-gold text-black shadow-inner" 
                          : "bg-[#e8e0d5] text-[#0a0a0a] hover:bg-white"
                      }`}
                    >
                      <span className="text-[9px] font-black tracking-tighter opacity-50 uppercase">{key.label}</span>
                      <span className="text-[8px] font-mono font-bold opacity-30 mt-0.5">{key.note}</span>
                    </button>

                    {/* Overlay Black Key */}
                    {hasBlackNext && (
                      <button
                        onClick={() => playNoteFrequency(nextKey.frequency, nextKey.note)}
                        style={{
                          width: "60%",
                          height: "60%",
                          left: "70%",
                          zIndex: 10
                        }}
                        className={`absolute top-0 rounded-b-md transition-all flex flex-col justify-end pb-2 items-center cursor-pointer select-none outline-none focus:outline-none ${
                          isBlackActive 
                            ? "bg-gold-light text-black" 
                            : "bg-[#111] hover:bg-neutral-800 border-l border-r border-b border-white/10"
                        }`}
                      >
                        <span className="text-[7px] font-bold text-white/50 uppercase">{nextKey.label}</span>
                        <span className="text-[7px] font-mono text-white/20 mt-0.5">{nextKey.note}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* STATS COUNT COUNTER SECTION */}
      <section id="stats" className="relative w-full py-16 bg-[#0a0a0a] border-t border-b border-gold/15 z-10">
        <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              const currentCount = (statsCount as any)[stat.id];

              return (
                <div key={stat.id} className="space-y-2 group">
                  <div className="w-10 h-10 rounded-full bg-gold/5 flex items-center justify-center mx-auto border border-gold/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold/10">
                    <Icon className="text-gold w-4 h-4" />
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-black text-gold gold-glow">
                    {stat.prefix}{currentCount}{stat.suffix}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#e8e0d5]/50 font-semibold">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3D VIDEO CAROUSEL SHOWCASE SECTION */}
      <section id="showcase" className="relative w-full py-24 bg-[#050505] z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
              Visual Symphony
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-gold font-black tracking-tight mb-4">
              Our Musical Journey
            </h2>
            <p className="font-body text-[#e8e0d5]/70 text-sm">
              Experience dynamic lessons designed around elite stage performance, creative flow state, and organic acoustics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left selector menu */}
            <div className="lg:col-span-4 space-y-3.5">
              {SHOWCASE_CARDS.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => setActiveShowcase(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 focus:outline-none ${
                    activeShowcase === idx
                      ? "bg-gold/10 border-gold shadow-[0_0_20px_rgba(245,197,24,0.1)]"
                      : "bg-[#111]/40 border-white/5 hover:border-gold/30 hover:bg-[#111]/70"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-xs flex-shrink-0 ${
                    activeShowcase === idx ? "bg-gold text-black" : "bg-white/5 text-[#e8e0d5]/60"
                  }`}>
                    0{card.id}
                  </span>
                  <div>
                    <h4 className={`font-heading font-black text-xs sm:text-sm tracking-wider uppercase ${
                      activeShowcase === idx ? "text-gold" : "text-white"
                    }`}>
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#e8e0d5]/60 mt-1 line-clamp-1">{card.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Interactive Premium Display Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShowcase}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  className="relative h-[280px] sm:h-[380px] rounded-3xl overflow-hidden border border-gold/20 shadow-2xl group cursor-pointer"
                  onClick={() => {
                    playNoteFrequency(261.63 + activeShowcase * 65, "Showcase Tone");
                  }}
                >
                  <img
                    src={SHOWCASE_CARDS[activeShowcase].bgUrl}
                    alt={SHOWCASE_CARDS[activeShowcase].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent ${SHOWCASE_CARDS[activeShowcase].color}`} />

                  {/* Elegant floating tag */}
                  <div className="absolute top-5 left-5 bg-[#050505]/80 backdrop-blur border border-gold/30 rounded-full px-3.5 py-1.5 text-[9px] tracking-widest font-bold uppercase text-gold flex items-center gap-2">
                    <Sparkles size={11} className="animate-spin text-gold" />
                    Interactive Showcase
                  </div>

                  {/* Bottom Text Information block */}
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 z-10 space-y-1.5">
                    <h3 className="font-heading text-lg sm:text-xl font-black text-gold uppercase">
                      {SHOWCASE_CARDS[activeShowcase].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#e8e0d5]/85 max-w-xl leading-relaxed">
                      {SHOWCASE_CARDS[activeShowcase].desc}
                    </p>
                    <div className="pt-1 flex items-center gap-1 text-gold font-bold text-[11px] uppercase tracking-wider">
                      <span>Tap card to play preview frequency</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                  {/* Visualizer bars */}
                  <div className="absolute bottom-5 right-5 flex items-end gap-[3px] h-6 pointer-events-none">
                    <div className="w-[3px] h-3 bg-gold/80 animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-[3px] h-5 bg-gold/80 animate-bounce" style={{ animationDelay: "0.3s" }} />
                    <div className="w-[3px] h-2 bg-gold/80 animate-bounce" style={{ animationDelay: "0.5s" }} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ACOUSTICS & RHYTHM CHAMBER (SHRUTI BOX & THALAM) */}
      <section id="acoustics" className="relative w-full py-24 bg-[#050505] border-t border-b border-gold/10 z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
              Acoustic Sandbox
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-gold font-black tracking-tight mb-4">
              Acoustics & Rhythm Chamber
            </h2>
            <p className="font-body text-[#e8e0d5]/70 text-sm">
              Explore professional Indian classical practice tools. Toggle the warm double-reed Shruti Box drone, and align your vocals with the Thalam rhythmic metronome.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* 1. SHRUTI BOX WIDGET */}
            <div className="bg-[#111]/40 border border-gold/15 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
              <div className="absolute -top-3.5 left-6 bg-[#050505] border border-gold/30 px-4 py-1 rounded-full text-[9px] tracking-widest font-black uppercase text-gold flex items-center gap-1.5">
                <Music size={11} className={shrutiActive ? "animate-spin" : ""} />
                Electronic Shruti Box (Drone)
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-black text-sm text-white uppercase tracking-wider">Drone Master Swara</h4>
                    <p className="text-[10px] text-[#e8e0d5]/60 mt-0.5">Continuous harmonious reed drone to practice alaap & sargam.</p>
                  </div>

                  <button
                    onClick={() => {
                      setShrutiActive(!shrutiActive);
                      setToast(shrutiActive ? "Shruti Box deactivated" : "Shruti Box activated! Deep bellows resonance online.");
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-md ${
                      shrutiActive 
                        ? "bg-gold text-black shadow-gold/20 scale-105" 
                        : "bg-[#111] hover:bg-[#1a1a1a] text-gold border border-gold/30 hover:border-gold"
                    }`}
                  >
                    {shrutiActive ? "● ACTIVE" : "ACTIVATE"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Pitch key selector */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1.5">Selected Key / Pitch</label>
                    <select
                      value={shrutiKey}
                      onChange={(e) => {
                        setShrutiKey(e.target.value);
                        setToast(`Pitch shifted to ${e.target.value}`);
                      }}
                      className="w-full bg-[#0a0a0a] border border-white/10 hover:border-gold/30 text-[#e8e0d5] text-xs py-2.5 px-3 rounded-xl focus:outline-none focus:border-gold transition-colors font-body"
                    >
                      {SHRUTI_KEYS.map((k) => (
                        <option key={k.key} value={k.key}>
                          {k.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tuning Harmonizer Type selector */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1.5">Harmonizer Tuning</label>
                    <div className="flex bg-[#0a0a0a] border border-white/10 rounded-xl p-1 gap-1">
                      {["Sa-Pa-Sa", "Sa-Ma-Sa", "Sa-Only"].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setShrutiType(type);
                            setToast(`Tuning mode adjusted: ${type}`);
                          }}
                          className={`flex-1 py-1.5 text-[9px] font-bold tracking-wider rounded-lg uppercase transition-all ${
                            shrutiType === type 
                              ? "bg-gold/15 text-gold border border-gold/25" 
                              : "text-[#e8e0d5]/60 hover:text-white"
                          }`}
                        >
                          {type === "Sa-Pa-Sa" ? "Sa-Pa" : type === "Sa-Ma-Sa" ? "Sa-Ma" : "Sa Only"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Volume slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gold font-bold">Drone Volume</label>
                    <span className="text-[10px] font-mono text-gold/80">{Math.round(shrutiVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={shrutiVolume}
                    onChange={(e) => setShrutiVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/5 border-none rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                  />
                </div>

                {/* Interactive Status indicator */}
                <div className="p-3 bg-[#0a0a0a] rounded-2xl border border-white/5 flex items-center gap-3.5">
                  <div className={`w-3.5 h-3.5 rounded-full border border-gold/30 flex items-center justify-center ${shrutiActive ? "bg-gold shadow-[0_0_10px_rgba(245,197,24,0.6)]" : "bg-transparent"}`}>
                    {shrutiActive && <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />}
                  </div>
                  <div className="text-[10px] text-[#e8e0d5]/70 font-mono">
                    {shrutiActive 
                      ? `Playing warm Reed bellows at ${SHRUTI_KEYS.find(k => k.key === shrutiKey)?.frequency} Hz with harmonics.` 
                      : "Drone inactive. Tap Activate to start practicing sargams."}
                  </div>
                </div>

              </div>
            </div>

            {/* 2. THALAM WIDGET */}
            <div className="bg-[#111]/40 border border-gold/15 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
              <div className="absolute -top-3.5 left-6 bg-[#050505] border border-gold/30 px-4 py-1 rounded-full text-[9px] tracking-widest font-black uppercase text-gold flex items-center gap-1.5">
                <Sparkles size={11} className={thalamActive ? "animate-pulse text-gold" : ""} />
                Carnatic Thalam (Metronome)
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-black text-sm text-white uppercase tracking-wider">Rhythm Synchronizer</h4>
                    <p className="text-[10px] text-[#e8e0d5]/60 mt-0.5">Acoustic woodblock metronome configured for classic Indian Tala styles.</p>
                  </div>

                  <button
                    onClick={() => {
                      setThalamActive(!thalamActive);
                      setToast(thalamActive ? "Metronome stopped" : "Metronome active! Syncopation sequence started.");
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-md ${
                      thalamActive 
                        ? "bg-gold text-black shadow-gold/20 scale-105" 
                        : "bg-[#111] hover:bg-[#1a1a1a] text-gold border border-gold/30 hover:border-gold"
                    }`}
                  >
                    {thalamActive ? "● TICKING" : "START TICK"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Thalam Selector */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1.5">Select Thalam (Tala)</label>
                    <select
                      value={thalamType}
                      onChange={(e) => {
                        setThalamType(e.target.value as any);
                        setToast(`Style adjusted to ${THALAM_CONFIGS[e.target.value as keyof typeof THALAM_CONFIGS].name}`);
                      }}
                      className="w-full bg-[#0a0a0a] border border-white/10 hover:border-gold/30 text-[#e8e0d5] text-xs py-2.5 px-3 rounded-xl focus:outline-none focus:border-gold transition-colors font-body"
                    >
                      <option value="Adi">Adi Thalam (8 beats - Standard)</option>
                      <option value="Rupaka">Rupaka Thalam (3 beats - Fast/Lively)</option>
                      <option value="RoopakaChapu">Roopaka / Chapu (4 beats)</option>
                      <option value="KhandaChapu">Khanda Chapu (5 beats - Syncopated)</option>
                    </select>
                  </div>

                  {/* Tempo BPM slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-gold font-bold">Laya (Tempo / BPM)</label>
                      <span className="text-[10px] font-mono text-gold/80">{thalamTempo} BPM</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="180"
                      value={thalamTempo}
                      onChange={(e) => setThalamTempo(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/5 border-none rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Interactive Dynamic Thalam strip with gestural annotations */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-gold/60 font-bold block">Thalam Cycle Visualizer (Current: {THALAM_CONFIGS[thalamType].name})</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {THALAM_CONFIGS[thalamType].pattern.map((patternLabel, idx) => {
                      const isActive = thalamActive && currentBeat === idx;
                      const isAccent = THALAM_CONFIGS[thalamType].accent[idx];
                      return (
                        <div
                          key={idx}
                          className={`flex-1 min-w-[55px] text-center p-2 rounded-xl border flex flex-col items-center justify-between gap-1 transition-all duration-250 ${
                            isActive
                              ? "bg-gold/20 border-gold shadow-[0_0_15px_rgba(245,197,24,0.25)] scale-103"
                              : "bg-[#0a0a0a] border-white/5"
                          }`}
                        >
                          <span className="text-[9px] font-mono text-[#e8e0d5]/40">Beat {idx + 1}</span>
                          <span className={`text-base my-0.5 ${isActive ? "animate-bounce" : ""}`}>
                            {patternLabel.split(" ")[1]}
                          </span>
                          <span className={`text-[8px] tracking-tight uppercase font-bold leading-none ${
                            isActive ? "text-gold" : isAccent ? "text-gold/50" : "text-[#e8e0d5]/40"
                          }`}>
                            {patternLabel.split(" ")[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3D SCROLL GALLERY */}
      <section id="gallery" className="relative w-full py-20 bg-[#0a0a0a] border-t border-b border-gold/10 overflow-hidden z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
                Visual Symphony
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-gold font-black tracking-tight">
                Musical Innovation Gallery
              </h2>
            </div>
            <p className="text-xs text-[#e8e0d5]/60 max-w-md">
              A responsive catalog reflecting our high-tier premium acoustic workstations and teaching setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="group relative h-[260px] rounded-2xl overflow-hidden border border-gold/10 bg-gradient-to-b from-[#111] to-[#050505] transition-all duration-500 hover:border-gold hover:shadow-[0_12px_30px_rgba(245,197,24,0.15)] cursor-pointer"
                onClick={() => {
                  setToast(`Exploring ${item.title}`);
                  playNoteFrequency(392.00, "G4");
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 z-10 space-y-1">
                  <h4 className="font-heading text-base font-black text-gold uppercase">{item.title}</h4>
                  <p className="text-xs text-[#e8e0d5]/70 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROGRAMS / COURSES FILTER DIRECTORY */}
      <section id="courses" className="relative w-full py-24 bg-[#050505] z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
              Our Programs
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold font-black tracking-tight mb-4">
              Curated Courses for Every Aspiration
            </h2>
            <p className="font-body text-[#e8e0d5]/70 text-sm">
              Discover foundational rules to advanced mastering under the industry's most dedicated tutors.
            </p>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {["All", "Keys", "Strings", "Voice", "Percussion", "Tech"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveCourseFilter(filter)}
                  className={`text-[10px] font-black px-4 py-2 rounded-full border transition-all focus:outline-none uppercase tracking-wider ${
                    activeCourseFilter === filter
                      ? "bg-gold text-black border-gold shadow-[0_4px_12px_rgba(245,197,24,0.3)]"
                      : "bg-[#111] text-[#e8e0d5]/60 border-white/5 hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-gradient-to-b from-[#111] to-[#0d0d0d] border border-gold/10 hover:border-gold/35 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_25px_rgba(245,197,24,0.06)] group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-gold via-gold-light to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span className="text-3xl p-2 rounded-xl bg-gold/5 border border-gold/10 block leading-none">
                      {course.icon}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-black text-[#e8e0d5]/40 px-2.5 py-1 bg-white/5 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2.5 group-hover:text-gold transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#e8e0d5]/65 leading-relaxed mb-6 font-body">
                    {course.desc}
                  </p>
                </div>

                {/* Footer and Price block */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#e8e0d5]/40 uppercase tracking-widest block font-bold">Duration</span>
                    <span className="text-xs font-bold text-white uppercase">{course.duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-[#e8e0d5]/40 uppercase tracking-widest block font-bold">Monthly Fee</span>
                    <span className="text-sm font-black text-gold gold-glow">₹{course.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Card action */}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, course: course.id });
                      scrollToSection("contact");
                      setToast(`Selected ${course.title} for trial booking.`);
                    }}
                    className="w-full bg-gold hover:bg-gold-light text-[#050505] text-[11px] font-black uppercase tracking-widest py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve Free Spot</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MEET OUR MAESTROS SECTION */}
      <section id="instructors" className="relative w-full py-24 bg-[#0a0a0a] z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
              Meet Our Maestros
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-gold font-black tracking-tight mb-4">
              Learn From the Best
            </h2>
            <p className="font-body text-[#e8e0d5]/70 text-sm">
              Our award-winning instructors are certified veterans with high-tier industry experience.
            </p>
          </div>

          {/* Instructors grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTRUCTORS.map((inst, i) => (
              <div
                key={i}
                className="group flex flex-col bg-[#111]/30 border border-white/5 rounded-2xl p-5 hover:border-gold/30 hover:bg-[#111]/60 transition-all text-center relative"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold/40 mx-auto mb-4 transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={inst.img}
                    alt={inst.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="font-heading font-black text-base text-white">{inst.name}</h3>
                <span className="text-gold text-xs font-bold uppercase tracking-wider block mt-0.5">{inst.role}</span>
                <p className="text-xs text-[#e8e0d5]/50 mt-3 leading-relaxed flex-1">
                  {inst.bio}
                </p>

                {/* Advice block */}
                <div className="mt-4 pt-4 border-t border-white/5 text-left">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-gold/60 block">Maestro Advice</span>
                  <p className="text-[10px] text-[#e8e0d5]/80 italic mt-1 leading-normal">
                    "{inst.advice}"
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* NEW SECTION: INTERACTIVE BILLING & TUITION PORTAL */}
      <section id="billing" className="relative w-full py-24 bg-[#050505] border-t border-b border-gold/15 z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
              Student Finance
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-gold font-black tracking-tight mb-4">
              Tuition & Billing Portal
            </h2>
            <p className="font-body text-[#e8e0d5]/70 text-sm">
              Manage custom music program installments, clear pending invoices, and review past transactions securely.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Outstanding Invoices & Payment Logs (Left) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Outstanding Invoices Directory */}
              <div className="bg-[#111]/30 border border-gold/15 rounded-3xl p-5 sm:p-6 shadow-xl">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <FileText className="text-gold" size={18} />
                    <h3 className="font-heading font-black text-sm tracking-wider uppercase text-white">Active Invoices</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#e8e0d5]/40 uppercase tracking-widest block font-bold">Outstanding Balance</span>
                    <span className="text-sm font-black text-gold gold-glow">₹{totalOutstandingBalance.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      onClick={() => {
                        if (inv.status !== "Paid") {
                          setSelectedInvoiceToPay(inv.id);
                          setToast(`Selected invoice ${inv.invoiceNumber} for payment.`);
                        } else {
                          setToast("This invoice is already paid.");
                        }
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                        selectedInvoiceToPay === inv.id && inv.status !== "Paid"
                          ? "bg-gold/5 border-gold shadow-[0_0_15px_rgba(245,197,24,0.1)]"
                          : "bg-[#050505]/40 border-white/5 hover:border-gold/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                          inv.status === "Paid" 
                            ? "bg-green-500/15 text-green-400 border border-green-500/30" 
                            : inv.status === "Overdue" 
                              ? "bg-red-500/15 text-red-400 border border-red-500/30"
                              : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}>
                          ₹
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-white">{inv.studentName}</span>
                            <span className="text-[9px] font-mono text-[#e8e0d5]/40">{inv.invoiceNumber}</span>
                          </div>
                          <span className="text-xs text-[#e8e0d5]/60 mt-0.5 block">{inv.courseTitle}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-white/5">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-[#e8e0d5]/40 uppercase tracking-widest block font-bold">Due Date</span>
                          <span className="text-xs text-[#e8e0d5]/75 font-mono">{inv.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-white text-xs">₹{inv.amount.toLocaleString("en-IN")}</span>
                          <span className={`text-[9px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full ${
                            inv.status === "Paid" 
                              ? "bg-green-500/20 text-green-400" 
                              : inv.status === "Overdue" 
                                ? "bg-red-500/20 text-red-400"
                                : "bg-amber-500/20 text-amber-400"
                          }`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transactions logs */}
              <div className="bg-[#111]/20 border border-white/5 rounded-3xl p-5 shadow-xl">
                <h4 className="font-heading font-black text-xs tracking-wider uppercase text-gold mb-4 flex items-center gap-2">
                  <Activity size={14} /> Payment Receipts & Audits
                </h4>

                {transactions.length === 0 ? (
                  <p className="text-xs text-[#e8e0d5]/40 py-4 text-center">No transactions recorded yet in this session.</p>
                ) : (
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="p-3 bg-[#050505]/30 rounded-xl border border-white/5 flex items-center justify-between text-xs font-mono">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#e8e0d5]/80 font-bold">{tx.studentName}</span>
                            <span className="text-[10px] text-[#e8e0d5]/40">({tx.invoiceNumber})</span>
                          </div>
                          <span className="text-[10px] text-[#e8e0d5]/55 block mt-0.5">{tx.date} • {tx.paymentMethod}</span>
                        </div>
                        <span className="text-green-400 font-bold">+₹{tx.amount.toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Column 2: Simulated Secure Credit Card Gateway (Right) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#111] to-[#050505] border-2 border-gold/30 rounded-3xl p-5 sm:p-7 shadow-2xl relative">
              <div className="absolute top-4 right-4 bg-gold/10 border border-gold/30 text-gold text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                Gateway Secure
              </div>

              <h3 className="font-heading text-lg font-black text-white uppercase mb-5">Pay Online Instantly</h3>

              {/* Visual Card Mock */}
              <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-gold/25 via-amber-900/40 to-black border border-gold/30 p-5 flex flex-col justify-between shadow-lg relative overflow-hidden mb-6">
                {/* Chip and logo */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-7 rounded bg-amber-400/20 border border-amber-400/40" />
                  <SwarohanaLogo variant="card" />
                </div>

                {/* Card Number display */}
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-widest text-gold/60 block">Secure Card Number</span>
                  <p className="font-mono text-sm sm:text-base tracking-widest text-white font-bold">
                    {cardNumber ? cardNumber.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• ••••"}
                  </p>
                </div>

                {/* Card Holder & Expiry */}
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-gold/60 block">Cardholder</span>
                    <span className="text-xs font-bold text-[#e8e0d5] truncate block max-w-[140px]">
                      {cardHolderName || "MEMBER DETAILS"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase tracking-widest text-gold/60 block">Expires</span>
                    <span className="text-xs font-bold text-[#e8e0d5] font-mono block">
                      {cardExpiry || "MM/YY"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive payment form */}
              <form onSubmit={handlePayInvoice} className="space-y-4">
                
                {/* Invoice mapping picker */}
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Select Outstanding Tuition Fee *</label>
                  <select
                    value={selectedInvoiceToPay}
                    onChange={(e) => setSelectedInvoiceToPay(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                  >
                    {invoices.filter(i => i.status !== "Paid").length === 0 ? (
                      <option>All Invoices Fully Cleared!</option>
                    ) : (
                      invoices
                        .filter((inv) => inv.status !== "Paid")
                        .map((inv) => (
                          <option key={inv.id} value={inv.id}>
                            {inv.studentName} - {inv.invoiceNumber} (₹{inv.amount.toLocaleString("en-IN")})
                          </option>
                        ))
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Cardholder Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors font-body"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Card Number *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="e.g. 4532187654321098"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Expiry Date *</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">CVV Security *</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPayment || invoices.filter(i => i.status !== "Paid").length === 0}
                  className="w-full bg-gold hover:bg-gold-light text-[#050505] disabled:bg-gold/45 disabled:text-[#050505]/60 font-black py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-gold/10"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Validating Security...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={14} />
                      <span>Process Secure Tuition Payment</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* NEW SECTION: MAESTRO CRM PORTAL (ADMIN PANEL) */}
      <section id="crm" className="relative w-full py-24 bg-[#0a0a0a] z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
                Staff Dashboard
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-gold font-black tracking-tight mb-2">
                Maestro Student CRM Directory
              </h2>
              <p className="font-body text-[#e8e0d5]/70 text-sm">
                Real-time lead monitoring, student progress tracking, and consultation management.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportLeadsToCSV}
                className="bg-[#111] hover:bg-[#1a1a1a] text-gold border border-gold/30 hover:border-gold font-black text-xs tracking-wider uppercase px-5 py-3 rounded-full flex items-center gap-2 focus:outline-none w-fit shadow-md transition-all"
                title="Export current leads database to CSV file"
              >
                <Download size={14} /> Export CSV
              </button>
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="bg-gold hover:bg-gold-light text-black font-black text-xs tracking-wider uppercase px-5 py-3 rounded-full flex items-center gap-2 focus:outline-none w-fit shadow-md transition-all"
              >
                <Plus size={14} /> Add Manual Lead
              </button>
            </div>
          </div>

          {/* CRM Quick Stats Widget */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="p-4 bg-[#111]/30 border border-white/5 rounded-2xl text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#e8e0d5]/45 block font-bold">Total Inquiries</span>
              <span className="text-2xl font-black text-gold block mt-1">{totalLeadsCount}</span>
            </div>
            <div className="p-4 bg-[#111]/30 border border-white/5 rounded-2xl text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#e8e0d5]/45 block font-bold">Unattended Leads</span>
              <span className="text-2xl font-black text-amber-400 block mt-1">{newLeadsCount}</span>
            </div>
            <div className="p-4 bg-[#111]/30 border border-white/5 rounded-2xl text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#e8e0d5]/45 block font-bold">Trials Scheduled</span>
              <span className="text-2xl font-black text-cyan-400 block mt-1">{trialLeadsCount}</span>
            </div>
            <div className="p-4 bg-[#111]/30 border border-white/5 rounded-2xl text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#e8e0d5]/45 block font-bold">Enrolled Students</span>
              <span className="text-2xl font-black text-green-400 block mt-1">{enrolledLeadsCount}</span>
            </div>
          </div>

          {/* Directory Control Bar */}
          <div className="bg-[#111]/40 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="text-gold" size={14} />
              <span className="text-xs uppercase tracking-widest font-bold text-[#e8e0d5]/60">Filter Pipeline Status:</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["All", "New", "Trial Scheduled", "Enrolled", "Inactive"].map((statusOption) => (
                <button
                  key={statusOption}
                  onClick={() => setCrmFilter(statusOption)}
                  className={`text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border transition-all ${
                    crmFilter === statusOption
                      ? "bg-gold text-[#050505] border-gold"
                      : "bg-[#050505] text-[#e8e0d5]/50 border-white/5 hover:border-gold/20"
                  }`}
                >
                  {statusOption}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Grid/Table Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLeads.length === 0 ? (
              <div className="md:col-span-2 text-center py-12 border border-white/5 bg-[#111]/10 rounded-2xl text-[#e8e0d5]/45 text-xs">
                No matching student lead inquiries found for this filter.
              </div>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-[#111]/25 border border-white/5 rounded-2xl p-5 hover:border-gold/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Name and Status update block */}
                    <div className="flex justify-between items-start gap-2.5 pb-3 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h4 className="font-heading font-black text-sm text-white">{lead.name}</h4>
                          <span className="text-[9px] font-mono text-[#e8e0d5]/35">{lead.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[10px] text-[#e8e0d5]/65 mt-1 font-body">
                          <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>
                          <span className="flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>
                        </div>
                      </div>

                      {/* Interactive Pipeline status dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as Lead["status"])}
                        className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-[#050505] border focus:outline-none ${
                          lead.status === "New" 
                            ? "border-amber-500/40 text-amber-400" 
                            : lead.status === "Trial Scheduled" 
                              ? "border-cyan-500/40 text-cyan-400" 
                              : lead.status === "Enrolled" 
                                ? "border-green-500/40 text-green-400" 
                                : "border-neutral-500/40 text-neutral-400"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Trial Scheduled">Trial Scheduled</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Program Information */}
                    <div className="py-3 text-xs flex items-center gap-2 font-semibold">
                      <span className="text-[#e8e0d5]/40 block font-normal uppercase tracking-wider text-[10px]">Requested:</span>
                      <span className="text-gold uppercase tracking-wider font-bold">
                        {COURSES.find((c) => c.id === lead.courseId)?.title || lead.courseId}
                      </span>
                    </div>

                    {/* Interaction Log History / Notes */}
                    <div className="p-3 bg-[#050505]/40 border border-white/5 rounded-xl">
                      <span className="text-[8px] uppercase tracking-widest text-gold/60 block font-bold mb-1">Interaction Log Notes</span>
                      <p className="text-xs text-[#e8e0d5]/75 leading-relaxed font-body whitespace-pre-line">
                        {lead.notes}
                      </p>
                    </div>
                  </div>

                  {/* Footer: Quick Update Note controls */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Add interaction note update..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const input = e.currentTarget;
                          handleAddNoteToLead(lead.id, input.value);
                          input.value = "";
                        }
                      }}
                      className="flex-1 bg-[#050505] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-gold font-body"
                    />
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1.5 rounded-lg border border-red-500/10 text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
                      title="Delete lead record"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* MODAL WINDOW FOR ADDING LEAD MANUALLY */}
      <AnimatePresence>
        {showAddLeadModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddLeadModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              id="crm-modal-backdrop"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0c0c0c] border border-gold/35 rounded-3xl w-full max-w-lg p-5 sm:p-7 shadow-2xl relative"
                id="crm-modal-card"
              >
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
                  <h3 className="font-heading font-black text-sm tracking-widest text-gold uppercase flex items-center gap-2">
                    <UserPlus size={16} /> Create Student Lead Record
                  </h3>
                  <button
                    onClick={() => setShowAddLeadModal(false)}
                    className="p-1.5 rounded-full text-white/50 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddLeadInternally} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Deshpande"
                        value={newLeadForm.name}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. ramesh@gmail.com"
                        value={newLeadForm.email}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 91234 56789"
                        value={newLeadForm.phone}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Assigned Program *</label>
                      <select
                        value={newLeadForm.courseId}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, courseId: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                      >
                        {COURSES.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Lead status *</label>
                    <select
                      value={newLeadForm.status}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value as Lead["status"] })}
                      className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                    >
                      <option value="New">New</option>
                      <option value="Trial Scheduled">Trial Scheduled</option>
                      <option value="Enrolled">Enrolled</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-gold font-bold block mb-1">Interaction Notes</label>
                    <textarea
                      placeholder="Log initial communication, targets, past experience, or requested timings..."
                      value={newLeadForm.notes}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-gold min-h-[80px] font-body resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-[#050505] font-black py-3 rounded-full text-xs uppercase tracking-widest transition-all shadow-md mt-2"
                  >
                    Save Lead Details
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ENROLLMENT / TRIAL FREE TRIAL BOOKING SECTION */}
      <section id="contact" className="relative w-full py-24 bg-[#050505] z-10">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Column 1: Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-gold text-xs font-bold uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
                  Join Our Ranks
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-gold font-black tracking-tight mb-4">
                  Begin Your Musical Journey
                </h2>
                <p className="font-body text-[#e8e0d5]/70 text-sm sm:text-base leading-relaxed mb-6">
                  Book an absolutely free individual orientation and trial class. Learn the core principles, get hands-on experience on professional gear, and align with your perfect maestro tutor. No previous experience needed!
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                      <Check size={12} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#e8e0d5]">Zero experience required to start</span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                      <Check size={12} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#e8e0d5]">Physical premium acoustic instruments provided</span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                      <Check size={12} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#e8e0d5]">Syllabus compliant with leading global exam boards</span>
                  </div>
                </div>
              </div>

              {/* Direct Studio contact details */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Studio Registrar & Academy Office</h4>
                <div className="space-y-3">
                  <div className="text-xs sm:text-sm text-[#e8e0d5]/90 font-semibold">
                    S.V. Madhesvaran
                    <span className="text-gold/60 text-[10px] uppercase tracking-wider block font-normal">Academy Registrar & Lead Instructor</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-[#e8e0d5]/70">
                    <BookOpen size={16} className="text-gold mt-1 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Swarohana Music Academy,<br />
                      54. Shanmugapuram, O. Rajapalayam Post,<br />
                      Tiruchengode Tk, Namakkal District,<br />
                      Tamil Nadu, Pin: 637211
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#e8e0d5]/70">
                    <MessageSquare size={16} className="text-gold flex-shrink-0" />
                    <span>WhatsApp: <a href="https://wa.me/919842592718" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-mono font-bold">+91 98425 92718</a></span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#e8e0d5]/70">
                    <Phone size={16} className="text-gold flex-shrink-0" />
                    <span className="font-mono">Office: +91 98425 92718</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#e8e0d5]/70">
                    <Mail size={16} className="text-gold flex-shrink-0" />
                    <span>info@swarohana.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Booking Form Card (Feeds CRM Directory!) */}
            <div className="lg:col-span-7 bg-[#111]/30 border border-gold/15 rounded-3xl p-6 sm:p-8 relative shadow-2xl">
              
              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold border border-gold/40">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-gold uppercase">Enquiry Logged</h3>
                  <p className="text-xs sm:text-sm text-[#e8e0d5]/85 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-gold font-bold">{formData.name}</span>! We have successfully created your student record on the <span className="text-gold font-bold">{COURSES.find((c) => c.id === formData.course)?.title || "Classical Piano"}</span> program. Your pipeline card has been instantly updated in our **CRM Staff view** above!
                  </p>
                  <button
                    onClick={() => {
                      setFormSuccess(false);
                      setFormData({ name: "", email: "", phone: "", course: "piano", goals: "" });
                    }}
                    className="bg-gold hover:bg-gold-light text-[#050505] font-black text-xs tracking-widest uppercase rounded-full px-6 py-3 transition-all mt-4 inline-block"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-4 uppercase text-left">
                    Schedule Your Free Trial Class
                  </h3>

                  {errorMessage && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1">Your Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                        <input
                          type="email"
                          required
                          placeholder="e.g. rahul@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors font-body"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1">Select Program *</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-gold transition-colors font-body"
                      >
                        {COURSES.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-gold font-bold block mb-1">Tell us about your musical goals / background</label>
                    <textarea
                      placeholder="e.g. Absolute beginner starting classical piano, or experienced vocalist looking for expert guidance..."
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors min-h-[90px] font-body resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-[#050505] font-black py-3.5 rounded-full text-xs uppercase tracking-widest transition-all shadow-md shadow-gold/10 hover:shadow-gold/25 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Schedule Free Class</span>
                    <Send size={12} />
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="relative w-full py-16 bg-[#080808] border-t border-white/5 z-10">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <SwarohanaLogo variant="horizontal" size={32} />
              </div>
              <p className="text-xs text-[#e8e0d5]/50 leading-relaxed font-body">
                Swarohana Music Studio is dedicated to nurturing musical talent through comprehensive, world-class education since 2009. Join our progressive community of creators.
              </p>
              
              {/* Social icons */}
              <div className="flex gap-2.5 pt-2">
                <a href="#facebook" onClick={() => setToast("Connecting to Facebook...")} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#e8e0d5]/60 hover:text-gold hover:border-gold transition-colors">
                  <Facebook size={14} />
                </a>
                <a href="#instagram" onClick={() => setToast("Connecting to Instagram...")} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#e8e0d5]/60 hover:text-gold hover:border-gold transition-colors">
                  <Instagram size={14} />
                </a>
                <a href="#twitter" onClick={() => setToast("Connecting to Twitter...")} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#e8e0d5]/60 hover:text-gold hover:border-gold transition-colors">
                  <Twitter size={14} />
                </a>
                <a href="#youtube" onClick={() => setToast("Connecting to Youtube...")} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#e8e0d5]/60 hover:text-gold hover:border-gold transition-colors">
                  <Youtube size={14} />
                </a>
              </div>
            </div>

             {/* Column 2: Quick links */}
            <div className="md:col-span-2 space-y-4 text-left">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Quick Links</h4>
              <ul className="space-y-2 text-xs text-[#e8e0d5]/60 font-body">
                <li><button onClick={() => scrollToSection("home")} className="hover:text-gold transition-colors text-left">Home</button></li>
                <li><button onClick={() => scrollToSection("courses")} className="hover:text-gold transition-colors text-left">Courses</button></li>
                <li><button onClick={() => scrollToSection("acoustics")} className="hover:text-gold transition-colors text-left">Acoustics</button></li>
                <li><button onClick={() => scrollToSection("gallery")} className="hover:text-gold transition-colors text-left">Gallery</button></li>
                <li><button onClick={() => scrollToSection("showcase")} className="hover:text-gold transition-colors text-left">Showcase</button></li>
              </ul>
            </div>

            {/* Column 3: Billing & Admin CRM */}
            <div className="md:col-span-2 space-y-4 text-left">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Internal Tools</h4>
              <ul className="space-y-2 text-xs text-[#e8e0d5]/60 font-body">
                <li><button onClick={() => scrollToSection("billing")} className="hover:text-gold transition-colors text-left">Tuition Portal</button></li>
                <li><button onClick={() => scrollToSection("crm")} className="hover:text-gold transition-colors text-left">Staff CRM Dashboard</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-gold transition-colors text-left">Enrollment Desk</button></li>
              </ul>
            </div>

            {/* Column 4: Contact details */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="text-xs uppercase tracking-widest text-gold font-bold">Academy Headquarters</h4>
              <ul className="space-y-2 text-xs text-[#e8e0d5]/60 font-body leading-relaxed">
                <li className="font-bold text-[#e8e0d5]">Swarohana Music Academy</li>
                <li>S.V. Madhesvaran</li>
                <li>54. Shanmugapuram, O. Rajapalayam Post,</li>
                <li>Tiruchengode Tk, Namakkal District, Tamil Nadu.</li>
                <li className="font-semibold text-gold">Pin: 637211</li>
                <li className="font-mono text-gold/90 font-bold">WhatsApp: +91 98425 92718</li>
                <li>info@swarohana.com</li>
              </ul>
            </div>

          </div>

          {/* Copyright block */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs text-[#e8e0d5]/45 gap-4">
            <div>&copy; 2026 Swarohana Music Studio. All rights reserved. Crafted with passion for music.</div>
            <div className="flex gap-4">
              <button onClick={() => setToast("Terms & Conditions applied.")} className="hover:text-gold transition-colors">Terms of Service</button>
              <button onClick={() => setToast("Privacy policy secure.")} className="hover:text-gold transition-colors">Privacy Policy</button>
            </div>
          </div>

        </div>
      </footer>

      {/* PREMIUM NOTIFICATION TOAST SYSTEM */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-[#111] text-gold px-5 py-3.5 rounded-full shadow-[0_10px_35px_rgba(245,197,24,0.35)] flex items-center gap-3 border border-gold/30"
            id="interactive-toast"
          >
            <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase font-body text-white">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
