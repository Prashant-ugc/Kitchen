import React, { useState, useEffect } from 'react';
import { formatCurrency, FinancingTerm } from '../utils/remodelLogic';
import {
  X,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Clock,
  Sparkles,
} from 'lucide-react';

export interface ModalContextState {
  isOpen: boolean;
  mode: '3d_consultation' | 'financing_prequal';
  prefilledNote?: string;
  financingData?: {
    budget: number;
    term: FinancingTerm;
    monthly: number;
  };
}

interface ConsultationModalProps {
  modalState: ModalContextState;
  onClose: () => void;
  onBookingConfirmed: (summary: {
    name: string;
    space: string;
    day: string;
    phone: string;
    mode: '3d_consultation' | 'financing_prequal';
  }) => void;
}

const AVAILABLE_DAYS = [
  'Tomorrow Morning (9:00 AM – 12:00 PM)',
  'Tomorrow Afternoon (1:30 PM – 4:30 PM)',
  'This Thursday (10:00 AM – 2:00 PM)',
  'This Saturday (Weekend Showroom Slot)',
];

const SPACE_CHOICES = [
  'Full Kitchen Remodel',
  'Master Bathroom Spa',
  'Kitchen + Bath Bundle',
  'Guest Bath Refresh',
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  modalState,
  onClose,
  onBookingConfirmed,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>(AVAILABLE_DAYS[0]);
  const [selectedSpace, setSelectedSpace] = useState<string>(SPACE_CHOICES[0]);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [addressOrZip, setAddressOrZip] = useState<string>('78746');
  const [creditTier, setCreditTier] = useState<string>('720+ (Excellent)');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (modalState.isOpen) {
      setSubmitted(false);
      setErrorMessage('');
    }
  }, [modalState.isOpen, modalState.mode]);

  if (!modalState.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    setErrorMessage('');
    setSubmitted(true);
    onBookingConfirmed({
      name: fullName.trim(),
      space: selectedSpace,
      day: selectedDay,
      phone: phone.trim(),
      mode: modalState.mode,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Top Modal Header */}
        <div className="bg-[#1C1917] text-[#FAF8F5] px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-[#D97706] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {modalState.mode === 'financing_prequal'
                  ? '60-Second Soft-Pull Pre-Qualification'
                  : 'Complimentary In-Home 3D LiDAR Scan & Render ($1,500 Value)'}
              </span>
            </div>
            <h2
              id="modal-heading"
              className="text-xl sm:text-2xl font-serif-display font-semibold mt-1"
            >
              {modalState.mode === 'financing_prequal'
                ? 'Verify Your Monthly Remodel Rate'
                : 'Book Your Free 3D Kitchen/Bath Preview'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {modalState.prefilledNote && (
                <div className="p-3 rounded-lg bg-amber-50 border border-[#D97706]/40 text-xs text-[#1C1917]">
                  <span className="font-semibold text-[#B45309]">Selected Package: </span>
                  {modalState.prefilledNote}
                </div>
              )}

              {modalState.mode === 'financing_prequal' && modalState.financingData && (
                <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-500 block">Selected Budget &amp; Term</span>
                    <strong className="text-sm text-[#1C1917] tabular-nums">
                      {formatCurrency(modalState.financingData.budget)} ·{' '}
                      {modalState.financingData.term} Months
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 block">Target Payment</span>
                    <strong className="text-base text-[#15803D] tabular-nums">
                      {formatCurrency(modalState.financingData.monthly)}/mo
                    </strong>
                  </div>
                </div>
              )}

              {/* Room / Project Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-2">
                  1. Select Space to Measure &amp; Render in 3D:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SPACE_CHOICES.map((space) => (
                    <button
                      key={space}
                      type="button"
                      onClick={() => setSelectedSpace(space)}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold text-left transition-colors cursor-pointer ${
                        selectedSpace === space
                          ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                          : 'bg-white text-[#1C1917] border-stone-300 hover:border-stone-500'
                      }`}
                    >
                      {space}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Day or Credit Tier */}
              {modalState.mode === '3d_consultation' ? (
                <div>
                  <label
                    htmlFor="modal-day-select"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    2. Pick Preferred Day for Your 45-Minute 3D LiDAR Measurement:
                  </label>
                  <select
                    id="modal-day-select"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
                  >
                    {AVAILABLE_DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="modal-credit-select"
                    className="block text-xs font-semibold text-[#1C1917] mb-1.5"
                  >
                    2. Estimated Household Credit Tier (Soft Pull Only):
                  </label>
                  <select
                    id="modal-credit-select"
                    value={creditTier}
                    onChange={(e) => setCreditTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
                  >
                    <option value="740+ (Tier 1 Super Prime)">740+ (Tier 1 Super Prime)</option>
                    <option value="700–739 (Prime)">700–739 (Prime)</option>
                    <option value="660–699 (Standard Homeowner)">660–699 (Standard Homeowner)</option>
                  </select>
                </div>
              )}

              {/* Homeowner Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="modal-fullname"
                    className="block text-xs font-semibold text-[#1C1917] mb-1"
                  >
                    Your Full Name
                  </label>
                  <input
                    id="modal-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Victoria Hayes"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="modal-phone"
                    className="block text-xs font-semibold text-[#1C1917] mb-1"
                  >
                    Mobile Number (For SMS Confirmation)
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(512) 555-0184"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="modal-zip"
                  className="block text-xs font-semibold text-[#1C1917] mb-1"
                >
                  Austin Neighborhood or ZIP Code
                </label>
                <input
                  id="modal-zip"
                  type="text"
                  value={addressOrZip}
                  onChange={(e) => setAddressOrZip(e.target.value)}
                  placeholder="Westlake Hills / 78746"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
                />
              </div>

              {errorMessage && (
                <p className="text-xs font-medium text-red-700" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-5 bg-[#B45309] hover:bg-[#D97706] text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {modalState.mode === 'financing_prequal'
                    ? 'Instant Soft-Pull Pre-Qualification Check'
                    : 'Confirm Free 3D Design Consultation'}
                </span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                  Zero Obligation
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B45309]" />
                  Written Fixed-Price Quote Included
                </span>
              </div>
            </form>
          ) : (
            <div className="py-4 text-center space-y-4" data-testid="modal-confirmation">
              <div className="w-12 h-12 rounded-full bg-[#15803D]/15 text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif-display font-semibold text-[#1C1917]">
                {modalState.mode === 'financing_prequal'
                  ? `Pre-Qualification Verified for ${fullName}!`
                  : `Your 3D Design Slot is Reserved, ${fullName}!`}
              </h3>

              <p className="text-sm text-stone-600 max-w-md mx-auto">
                {modalState.mode === 'financing_prequal' && modalState.financingData
                  ? `Based on your ${creditTier} profile in ${addressOrZip}, you pre-qualify for ${formatCurrency(
                      modalState.financingData.budget
                    )} at ~${formatCurrency(
                      modalState.financingData.monthly
                    )}/mo with $0 down and 0% credit score impact.`
                  : `Lead Senior Designer Julian Vance will text ${phone} to confirm your ${selectedSpace} 3D LiDAR measurement for ${selectedDay}.`}
              </p>

              <div className="p-4 rounded-xl bg-white border border-stone-200 text-left text-xs space-y-1.5 font-mono-tabular">
                <div className="flex justify-between">
                  <span className="text-stone-500">Reservation Code:</span>
                  <span className="font-bold text-[#1C1917]">VG-ATX-2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Project Scope:</span>
                  <span className="font-semibold text-[#1C1917]">{selectedSpace}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Complimentary Bonus:</span>
                  <span className="font-semibold text-[#15803D]">
                    3D Architectural Render ($1,500 Value)
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:5125550148"
                  className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-xs font-semibold text-[#1C1917] hover:bg-stone-100 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                  <span>Call (512) 555-0148</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold hover:bg-stone-800 cursor-pointer whitespace-nowrap"
                >
                  Return to Showroom
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
