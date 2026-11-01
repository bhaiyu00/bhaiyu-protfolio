import React, { useState } from 'react';
import { ProjectItem } from '../utils/portfolioLogic';
import { X, Send, CheckCircle2, Search, ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // WhatsApp Demo state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Namaste! Welcome to HealthPlus Clinic automated assistance. How can I assist you today?' },
    { sender: 'user', text: 'Do you have appointments available tomorrow for Dr. Anya Sharma?' },
    { sender: 'bot', text: 'Yes, Dr. Anya has slots at 10:30 AM and 3:00 PM. Would you like me to book one for you?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user' as const, text }];
    setChatMessages(newMsgs);
    setChatInput('');

    setTimeout(() => {
      let botReply = 'I have synced your request with our database. A confirmation has been generated!';
      if (text.toLowerCase().includes('book') || text.toLowerCase().includes('10:30') || text.toLowerCase().includes('yes')) {
        botReply = 'Confirmed! Your appointment with Dr. Anya Sharma is booked for tomorrow at 10:30 AM. Token #HP-408.';
      } else if (text.toLowerCase().includes('timing') || text.toLowerCase().includes('hours')) {
        botReply = 'The clinic operates Monday to Saturday from 8:00 AM to 8:00 PM.';
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    }, 700);
  };

  // Inventory demo state
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryStock, setInventoryStock] = useState([
    { sku: 'MED-104', name: 'Vitamin D3 60k', stock: 120, status: 'In Stock' },
    { sku: 'EQP-202', name: 'Digital BP Monitor', stock: 8, status: 'Low Stock' },
    { sku: 'CON-089', name: 'Sterile Gauze Packs', stock: 240, status: 'In Stock' },
    { sku: 'MED-550', name: 'Paracetamol 650mg', stock: 45, status: 'Reorder' },
  ]);

  const handleAddStock = (sku: string) => {
    setInventoryStock((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, stock: item.stock + 20, status: 'In Stock' } : item))
    );
  };

  // Clinic CRM demo state
  const [activeAppointment, setActiveAppointment] = useState({
    patient: 'Sarah Chen',
    time: '10:15 AM',
    reason: 'Routine Health Review & Vitals Check',
    bp: '120/80 mmHg',
    pulse: '72 bpm',
    status: 'Checked In',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF9F6] rounded-3xl shadow-2xl border border-[#E5E0D5] overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE7DF] bg-white">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#666666]">
              Case Study
            </span>
            <span className="text-xs text-[#999999]">·</span>
            <span className="text-xs font-semibold text-[#1A1A1A]">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#666666] hover:text-[#111111] hover:bg-black/5 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Header Title & Tagline */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A1A1A]">
              {project.title}
            </h3>
            <p className="text-lg text-[#555555] mt-2 font-medium">{project.tagline}</p>
          </div>

          {/* Project High-Res Visual Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-[#E5E0D5] shadow-sm bg-white">
            <img
              src={project.imagePath}
              alt={project.title}
              className="w-full aspect-[16/9] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Technologies Used (Unboxed text with typographic separators per zero-pill rule) */}
          <div className="p-4 bg-white rounded-2xl border border-[#EBE7DF]">
            <span className="text-xs uppercase tracking-wider font-bold text-[#666666] block mb-2">
              Technologies & Architecture
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#333333]">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="font-semibold">{tech}</span>
                  {idx < project.technologies.length - 1 && <span className="text-[#BBBBBB]">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-2xl border border-[#EBE7DF]">
              <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                The Challenge
              </h4>
              <p className="text-sm text-[#555555] leading-relaxed">{project.challenge}</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#EBE7DF]">
              <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                The Engineering Solution
              </h4>
              <p className="text-sm text-[#555555] leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#666666]">
              Key Features & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#EBE7DF]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#333333] leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="p-6 bg-white rounded-2xl border-2 border-[#EBE7DF] shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE4] mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Interactive Sandbox Preview
                </span>
                <p className="text-xs text-[#777777]">Test live simulated interactions for this build</p>
              </div>
              <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#EAE6DD] text-[#555555]">
                Live Preview
              </span>
            </div>

            {/* Simulated Live View depending on project type */}
            {project.demoType === 'chat' && (
              <div className="max-w-md mx-auto bg-[#F4F1EA] rounded-2xl border border-[#E2DDD4] overflow-hidden">
                <div className="p-3 bg-[#0F5132] text-white flex items-center justify-between">
                  <span className="text-xs font-bold">HealthPlus WhatsApp Bot</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Active Agent</span>
                </div>
                <div className="p-4 space-y-3 max-h-56 overflow-y-auto text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-2.5 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-[#0F5132] text-white rounded-br-xs'
                            : 'bg-white text-[#222222] shadow-2xs rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-[#E5E0D5] bg-white flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Type a query (e.g. 'Clinic timings')..."
                    className="flex-1 text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E5E0D5] rounded-full focus:outline-none focus:border-[#0F5132]"
                  />
                  <button
                    onClick={() => handleSendChat()}
                    className="p-2 bg-[#0F5132] text-white rounded-full hover:bg-[#0A3622] transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-2 bg-[#FAF9F6] border-t border-[#EAE6DD] flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-[#777777] self-center mr-1">Quick prompts:</span>
                  <button
                    onClick={() => handleSendChat('Book 10:30 AM slot')}
                    className="text-[10px] px-2 py-1 bg-white border border-[#DDD] rounded-full hover:bg-[#EEE]"
                  >
                    Book 10:30 AM
                  </button>
                  <button
                    onClick={() => handleSendChat('Clinic timings?')}
                    className="text-[10px] px-2 py-1 bg-white border border-[#DDD] rounded-full hover:bg-[#EEE]"
                  >
                    Clinic timings?
                  </button>
                </div>
              </div>
            )}

            {project.demoType === 'inventory' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#888888]" />
                    <input
                      type="text"
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      placeholder="Filter by SKU or item name..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF9F6] border border-[#E5E0D5] rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#EAE6DD] text-[#777777]">
                        <th className="py-2">SKU</th>
                        <th className="py-2">Product</th>
                        <th className="py-2">Stock Level</th>
                        <th className="py-2">Status</th>
                        <th className="py-2 text-right">Quick Restock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0ECE4]">
                      {inventoryStock
                        .filter(
                          (item) =>
                            item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                            item.sku.toLowerCase().includes(inventorySearch.toLowerCase())
                        )
                        .map((item) => (
                          <tr key={item.sku} className="hover:bg-[#FAF9F6]">
                            <td className="py-2 font-mono-code">{item.sku}</td>
                            <td className="py-2 font-medium">{item.name}</td>
                            <td className="py-2 font-mono-code tabular-nums font-bold">{item.stock} units</td>
                            <td className="py-2">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full ${
                                  item.status === 'In Stock'
                                    ? 'bg-[#BFF4D5]/60 text-[#0F5132]'
                                    : item.status === 'Low Stock'
                                    ? 'bg-[#FFE58F]/70 text-[#594400]'
                                    : 'bg-[#FF887D]/40 text-[#841910]'
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-2 text-right">
                              <button
                                onClick={() => handleAddStock(item.sku)}
                                className="text-[11px] font-semibold text-[#111111] hover:underline"
                              >
                                +20 Units
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {project.demoType === 'dashboard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E0D5] space-y-2">
                  <span className="font-bold text-[#1A1A1A] block">Current Selected Patient</span>
                  <div className="text-sm font-semibold">{activeAppointment.patient}</div>
                  <div className="text-[#666666]">{activeAppointment.reason}</div>
                  <div className="flex gap-4 pt-1 font-mono-code">
                    <span>BP: {activeAppointment.bp}</span>
                    <span>Pulse: {activeAppointment.pulse}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E5E0D5] space-y-2">
                  <span className="font-bold text-[#1A1A1A] block">Clinic Quick Actions</span>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() =>
                        setActiveAppointment((prev) => ({
                          ...prev,
                          status: prev.status === 'Checked In' ? 'In Consultation' : 'Checked In',
                        }))
                      }
                      className="px-3 py-1.5 bg-white border border-[#DDD] rounded-lg text-left font-medium hover:bg-[#EEE] transition-colors"
                    >
                      Toggle Status: <span className="font-bold text-[#371B70]">{activeAppointment.status}</span>
                    </button>
                    <button
                      onClick={() => alert('Simulated WhatsApp appointment reminder SMS sent to Sarah Chen!')}
                      className="px-3 py-1.5 bg-[#BFF4D5]/40 text-[#0F5132] border border-[#BFF4D5] rounded-lg text-left font-medium hover:bg-[#BFF4D5]/60 transition-colors"
                    >
                      Send WhatsApp Appointment Reminder
                    </button>
                  </div>
                </div>
              </div>
            )}

            {project.demoType === 'web' && (
              <div className="text-center py-6 bg-[#FAF9F6] rounded-xl border border-[#E5E0D5]">
                <p className="font-handwriting text-2xl text-[#111111] mb-2">
                  "Interaction is emotion in motion."
                </p>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  Interactive typography, velocity scroll physics, and kinetic motion engineered with modern web standards.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#EBE7DF] flex items-center justify-between">
          <span className="text-xs text-[#777777] font-mono-code hidden sm:inline-block">
            Designed & Engineered by Nishant (bhaiyu)
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#444444] hover:text-[#111111] rounded-full"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#1A1A1A] hover:bg-black rounded-full transition-all shadow-xs"
            >
              <span>Discuss a similar project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
