export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  technologies: string[];
  imagePath: string;
  accentColor: string;
  badgeBg: string;
  features: string[];
  challenge: string;
  solution: string;
  demoType: 'chat' | 'dashboard' | 'inventory' | 'web';
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function calculateScrollProgress(currentScrollY: number, totalHeight: number, windowHeight: number): number {
  if (totalHeight <= windowHeight) return 0;
  const maxScroll = totalHeight - windowHeight;
  const progress = (currentScrollY / maxScroll) * 100;
  return Math.min(Math.max(progress, 0), 100);
}

export function calculateParallaxOffset(elementTop: number, scrollY: number, windowHeight: number, speed = 0.15): number {
  const elementCenter = elementTop - scrollY + (windowHeight / 2);
  const offset = (windowHeight / 2 - elementCenter) * speed;
  return Math.max(Math.min(offset, 60), -60);
}

export function clampVelocity(velocity: number, min = -10, max = 10): number {
  return Math.max(Math.min(velocity, max), min);
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please share a brief message (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateMailtoUrl(data: ContactFormData, targetEmail = 'nishantbarman04k@gmail.com'): string {
  const subject = encodeURIComponent(`Project Inquiry: ${data.projectType || 'General Discussion'} — from ${data.name}`);
  const body = encodeURIComponent(
    `Hi Nishant,\n\nName: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.projectType}\n\nMessage:\n${data.message}\n\nSent via nishant-bhaiyu portfolio.`
  );
  return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
}

export function generateWhatsAppUrl(data: ContactFormData, phone = '919876543210'): string {
  const text = encodeURIComponent(
    `Hi Nishant! I visited your portfolio.\n\nName: ${data.name}\nProject: ${data.projectType || 'Creative Collaboration'}\nMessage: ${data.message}`
  );
  return `https://wa.me/${phone}?text=${text}`;
}

export const ROTATOR_WORDS = [
  { word: 'DESIGN', color: '#BFF4D5', textColor: '#0F5132' },
  { word: 'CODE', color: '#D9C8FF', textColor: '#371B70' },
  { word: 'CREATE', color: '#FFC7A9', textColor: '#7A2706' },
  { word: 'AUTOMATE', color: '#FFE58F', textColor: '#594400' },
];

export function getNextRotatorIndex(currentIndex: number, total: number = ROTATOR_WORDS.length): number {
  return (currentIndex + 1) % total;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'whatsapp-ai-agent',
    title: 'WhatsApp AI Agent',
    category: 'AI Automation',
    tagline: 'Intelligent customer conversation workflows powered by LLMs & WhatsApp API',
    description:
      'Intelligent WhatsApp automation designed to simplify customer communication and business workflows. Handles multi-step queries, appointment scheduling, and automated CRM sync.',
    technologies: ['WhatsApp Cloud API', 'Node.js', 'Python', 'LLM Agents', 'Webhooks'],
    imagePath: '/src/assets/images/project_whatsapp_ai_1793524935480.jpg',
    accentColor: '#BFF4D5',
    badgeBg: 'bg-[#BFF4D5]/40 text-[#0F5132]',
    features: [
      'Natural language conversation handling with contextual recall',
      'Automated webhook dispatch to clinic and order databases',
      'Multi-language customer routing & instant human handover',
      'End-to-end telemetry and message delivery verification',
    ],
    challenge:
      'Businesses receive hundreds of unstructured WhatsApp inquiries daily, overwhelming human support desks and causing delayed replies.',
    solution:
      'Engineered an intelligent conversational pipeline with WhatsApp Cloud API that extracts customer intent, answers FAQs instantly, and schedules appointments automatically.',
    demoType: 'chat',
  },
  {
    id: 'clinic-crm-dashboard',
    title: 'Clinic CRM Dashboard',
    category: 'Web Application',
    tagline: 'Centralized health practitioner operations and patient schedule hub',
    description:
      'A centralized dashboard for managing appointments, patients, and clinic operations with high-contrast schedules and intuitive record tracking.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'REST APIs'],
    imagePath: '/src/assets/images/project_clinic_crm_1793524936076.jpg',
    accentColor: '#D9C8FF',
    badgeBg: 'bg-[#D9C8FF]/40 text-[#371B70]',
    features: [
      'Interactive day/week appointment planner with time-slot conflict detection',
      'Patient care timeline tracking consultations, lab reviews & prescriptions',
      'Vitals and health metric analytics with trend visualization',
      'One-click WhatsApp appointment reminders for patients',
    ],
    challenge:
      'Healthcare clinics often juggle disconnected spreadsheets and slow paper notes, causing scheduling errors and patient wait times.',
    solution:
      'Designed a clean, distraction-free clinical interface tailored to doctors and clinic coordinators for rapid data entry and zero-confusion daily patient workflows.',
    demoType: 'dashboard',
  },
  {
    id: 'inventory-management-system',
    title: 'Inventory Management System',
    category: 'SaaS / Web Application',
    tagline: 'Precision stock analytics, invoice billing, and supply chain reporting',
    description:
      'A practical stock and inventory management experience with automated billing, SKU alerts, supplier tracking, and visual sales reports.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'MongoDB'],
    imagePath: '/src/assets/images/project_inventory_saas_1793524937032.jpg',
    accentColor: '#FFE58F',
    badgeBg: 'bg-[#FFE58F]/50 text-[#594400]',
    features: [
      'Real-time low stock warnings with dynamic reorder thresholds',
      'Integrated invoice generation with PDF export and tax calculation',
      'Category-level SKU stock movement trends and margin analysis',
      'Fast keyboard shortcuts for instant product search and barcoding',
    ],
    challenge:
      'Retail and warehouse operators waste hours tracking inventory manually across notebooks and disorganized ERPs.',
    solution:
      'Built a fast, keyboard-first inventory portal with tabular numerical precision, stock level indicators, and instant invoice generation.',
    demoType: 'inventory',
  },
  {
    id: 'creative-web-experiences',
    title: 'Creative Web Experiences',
    category: 'Web Design & Development',
    tagline: 'Avant-garde digital interactions, expressive layouts & motion engineering',
    description:
      'Interactive websites with expressive layouts, thoughtful animations, and modern interfaces that make users pause, explore, and remember.',
    technologies: ['Next.js', 'GSAP', 'WebGL / Canvas', 'Tailwind CSS', 'Creative Direction'],
    imagePath: '/src/assets/images/project_creative_web_1793524936652.jpg',
    accentColor: '#FF887D',
    badgeBg: 'bg-[#FF887D]/30 text-[#841910]',
    features: [
      'Custom SVG kinetic vector animations and stroke-dash draws',
      'Physics-based particle fields and cursor-reactive canvases',
      'Editorial magazine layout styling with balanced type hierarchy',
      '60fps fluid scroll transitions and micro-interaction states',
    ],
    challenge:
      'Most modern websites suffer from templated "AI-slop" looks, identical pill chips, and forgettable cookie-cutter aesthetics.',
    solution:
      'Engineered handcrafted web experiences rooted in typography, intentional motion design, and purposeful experimental interactions.',
    demoType: 'web',
  },
];
