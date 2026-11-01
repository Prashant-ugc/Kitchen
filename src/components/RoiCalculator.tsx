import React, { useState } from 'react';
import {
  ROOM_OPTIONS,
  SIZE_OPTIONS,
  FINISH_OPTIONS,
  RoomType,
  RoomSize,
  FinishLevel,
  calculateRemodelEstimate,
  validateLeadForm,
  LeadFormInput,
} from '../utils/remodelLogic';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Gift,
  RotateCcw,
  Calendar,
} from 'lucide-react';

interface RoiCalculatorProps {
  onBook3dRender: (contextNote: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onBook3dRender }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('kitchen');
  const [selectedSize, setSelectedSize] = useState<RoomSize>('standard');
  const [selectedFinish, setSelectedFinish] = useState<FinishLevel>('custom_quartz');

  const [leadForm, setLeadForm] = useState<LeadFormInput>({
    name: '',
    phone: '',
    email: '',
    zip: '78746',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormInput, string>>>({});

  const estimate = calculateRemodelEstimate(selectedRoom, selectedSize, selectedFinish);

  const handleRoomSelect = (room: RoomType) => {
    setSelectedRoom(room);
    setStep(2);
  };

  const handleSizeSelect = (size: RoomSize) => {
    setSelectedSize(size);
    setStep(3);
  };

  const handleFinishSelect = (finish: FinishLevel) => {
    setSelectedFinish(finish);
    setStep(4);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm(leadForm);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setErrors({});
  };

  return (
    <div
      id="roi-calculator"
      className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm transition-all"
    >
      {/* Calculator Header */}
      <div className="border-b border-stone-200 pb-4 mb-6">
        <div className="flex items-center justify-between gap-2 text-xs font-medium text-stone-500 mb-1.5">
          <span>2026 Austin Remodel Cost &amp; Appraisal Database</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-tabular text-[#B45309] font-semibold">
            {step <= 4 ? `Step ${step} of 4` : 'Report Unlocked'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif-display font-semibold text-[#1C1917] leading-snug">
          Instant Remodel Estimate &amp; Home Value ROI Calculator
        </h2>
        {/* Step Progress Bar */}
        <div className="mt-4 grid grid-cols-4 gap-2" aria-label="Calculator step progress">
          {[1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-colors duration-200 ${
                step >= idx ? 'bg-[#D97706]' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Select Room */}
      {step === 1 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-sans font-semibold text-[#1C1917]">
              1. Which space are you looking to transform?
            </h3>
            <span className="text-xs text-stone-500">Select one</span>
          </div>
          <div className="space-y-3">
            {ROOM_OPTIONS.map((room) => {
              const isSelected = selectedRoom === room.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleRoomSelect(room.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-[#B45309] bg-[#FAF8F5]'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#1C1917] text-sm sm:text-base">
                      {room.label}
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">{room.subtitle}</div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2 text-xs font-medium text-[#B45309] whitespace-nowrap">
                    <span>{room.timelineWeeks}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Select Room Size */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-sans font-semibold text-[#1C1917]">
              2. What is your approximate room footprint?
            </h3>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-medium text-stone-600 hover:text-[#1C1917] flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          </div>
          <div className="space-y-3">
            {SIZE_OPTIONS.map((size) => {
              const isSelected = selectedSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => handleSizeSelect(size.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-[#B45309] bg-[#FAF8F5]'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#1C1917] text-sm sm:text-base">
                      {size.label}
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">{size.dimensions}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#B45309] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Select Finish Level */}
      {step === 3 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-sans font-semibold text-[#1C1917]">
              3. Choose your desired architectural finish grade:
            </h3>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-medium text-stone-600 hover:text-[#1C1917] flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          </div>
          <div className="space-y-3">
            {FINISH_OPTIONS.map((finish) => {
              const isSelected = selectedFinish === finish.id;
              return (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => handleFinishSelect(finish.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-[#B45309] bg-[#FAF8F5]'
                      : 'border-stone-200 hover:border-stone-400 bg-white'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#1C1917] text-sm sm:text-base">
                      {finish.label}
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">{finish.materials}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#B45309] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: Lead Capture Form */}
      {step === 4 && (
        <form onSubmit={handleFormSubmit} noValidate>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-sans font-semibold text-[#1C1917]">
              4. Where should we display &amp; send your custom ROI report?
            </h3>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs font-medium text-stone-600 hover:text-[#1C1917] flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          </div>

          <div className="text-xs text-stone-600 bg-[#FAF8F5] border border-stone-200 rounded-lg p-3 mb-4 flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-[#1C1917]">Selected Scope:</span>
            <span>{estimate.roomLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{estimate.sizeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{estimate.finishLabel}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label
                htmlFor="calc-name"
                className="block text-xs font-medium text-stone-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="calc-name"
                type="text"
                value={leadForm.name}
                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                placeholder="e.g. Carter Sterling"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
              />
              {errors.name && (
                <p className="text-xs text-red-700 mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="calc-phone"
                className="block text-xs font-medium text-stone-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="calc-phone"
                type="tel"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                placeholder="(512) 555-0199"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
              />
              {errors.phone && (
                <p className="text-xs text-red-700 mt-1" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="calc-email"
                className="block text-xs font-medium text-stone-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="calc-email"
                type="email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                placeholder="carter@austinhome.com"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309]"
              />
              {errors.email && (
                <p className="text-xs text-red-700 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="calc-zip"
                className="block text-xs font-medium text-stone-700 mb-1"
              >
                Austin Metro ZIP Code
              </label>
              <input
                id="calc-zip"
                type="text"
                maxLength={5}
                value={leadForm.zip}
                onChange={(e) => setLeadForm({ ...leadForm, zip: e.target.value })}
                placeholder="78746"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#B45309] font-mono-tabular"
              />
              {errors.zip && (
                <p className="text-xs text-red-700 mt-1" role="alert">
                  {errors.zip}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 w-full py-3.5 px-5 bg-[#B45309] hover:bg-[#D97706] text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Unlock Estimate + Home Value Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-stone-500 text-center mt-2.5">
            Zero spam guarantee. Instant online breakdown + complimentary 3D render voucher.
          </p>
        </form>
      )}

      {/* STEP 5: Dynamic Result Screen */}
      {step === 5 && (
        <div className="space-y-4" data-testid="roi-result-screen">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span>
              Prepared for <strong className="text-[#1C1917]">{leadForm.name}</strong> · ZIP{' '}
              <span className="font-mono-tabular">{leadForm.zip}</span>
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-[#B45309] hover:underline flex items-center gap-1 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Recalculate
            </button>
          </div>

          {/* Primary Investment Box */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200">
            <div className="text-xs font-medium text-stone-600">
              Estimated Project Investment Range ({estimate.roomLabel} · {estimate.sizeLabel})
            </div>
            <div className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1C1917] mt-1 tabular-nums">
              {estimate.formattedRange}
            </div>
            <div className="text-xs text-stone-500 mt-1 flex flex-wrap items-center gap-1.5">
              <span>Finish: {estimate.finishLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Turnkey Timeline: {estimate.timelineWeeks}</span>
            </div>
          </div>

          {/* Estimated Home Resale Value Boost in Deep Forest Green (#15803D) */}
          <div className="p-4 rounded-xl bg-[#15803D]/10 border border-[#15803D]/30">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#15803D]">
              <TrendingUp className="w-4 h-4 shrink-0" />
              <span>Estimated Home Resale Value Boost (Travis County Comps)</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#15803D] mt-1 tabular-nums">
              {estimate.formattedEquity}
            </div>
            <p className="text-xs text-stone-700 mt-1">
              Based on 2026 Austin MLS remodeling appraisal recovery for {estimate.roomLabel.toLowerCase()} upgrades.
            </p>
          </div>

          {/* Bonus Unlocked Banner */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-[#D97706]/40 flex items-start gap-3">
            <Gift className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#1C1917]">
              <span className="font-bold text-[#B45309]">Bonus Unlocked: </span>
              Free 3D Architectural Render ($1,500 Value) Included with Your In-Home Quote!
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onBook3dRender(
                `${estimate.roomLabel} (${estimate.sizeLabel}, ${estimate.finishLabel}) — Est. ${estimate.formattedRange}`
              )
            }
            className="w-full py-3.5 px-5 bg-[#1C1917] hover:bg-stone-800 text-[#FAF8F5] font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-[#D97706]" />
            <span>Lock In My Free 3D Render &amp; Exact Fixed Quote</span>
          </button>
        </div>
      )}

      {/* Quick Step Jump Footer for steps 1-3 */}
      {step < 4 && (
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Includes Travis County Equity Comps</span>
          </div>
          <span className="font-mono-tabular">
            Preview Est: {estimate.formattedRange}
          </span>
        </div>
      )}
    </div>
  );
};
