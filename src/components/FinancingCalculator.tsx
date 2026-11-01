import React, { useState } from 'react';
import {
  calculateMonthlyPayment,
  FinancingTerm,
  formatCurrency,
} from '../utils/remodelLogic';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface FinancingCalculatorProps {
  onOpenPreQualModal: (budget: number, term: FinancingTerm, monthly: number) => void;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  onOpenPreQualModal,
}) => {
  const [budget, setBudget] = useState<number>(21000);
  const [term, setTerm] = useState<FinancingTerm>(120);

  const calculation = calculateMonthlyPayment(budget, term);

  const termOptions: Array<{
    value: FinancingTerm;
    label: string;
    subtext: string;
  }> = [
    {
      value: 120,
      label: '120 Months',
      subtext: 'Lowest Monthly Payment · 7.49% APR',
    },
    {
      value: 60,
      label: '60 Months',
      subtext: 'Balanced 5-Year Payoff · 6.99% APR',
    },
    {
      value: 18,
      label: '18 Months 0% Promo',
      subtext: '0% Interest Same-As-Cash Promo',
    },
  ];

  return (
    <section
      id="financing"
      className="py-16 sm:py-24 bg-[#F3EFE8] border-t border-b border-stone-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-medium text-[#B45309] mb-2">
            Flexible Luxury Remodel Financing · Zero Prepayment Penalties
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#1C1917] tracking-tight text-balance">
            Build Your Dream Kitchen or Bath Starting at $249/Month
          </h2>
          <p className="mt-3 text-base text-stone-600">
            Keep your home equity and cash reserves working for you. Slide the budget selector below to preview real-time monthly payments across our Austin lending partners.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left 7 Cols: Interactive Budget Slider & Term Selector */}
          <div className="lg:col-span-7 space-y-8">
            {/* Range Slider Block */}
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <label
                  htmlFor="financing-budget-slider"
                  className="text-sm font-semibold text-[#1C1917]"
                >
                  Select Estimated Project Budget:
                </label>
                <span
                  className="text-2xl sm:text-3xl font-serif-display font-bold text-[#B45309] tabular-nums"
                  data-testid="financing-budget-display"
                >
                  {formatCurrency(budget)}
                </span>
              </div>

              <input
                id="financing-budget-slider"
                type="range"
                min={15000}
                max={85000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                aria-label="Project budget slider from 15000 to 85000 dollars"
                className="w-full luxury-range bg-stone-200 rounded-lg h-2.5"
              />

              <div className="flex items-center justify-between text-xs text-stone-500 mt-2 font-mono-tabular">
                <span>$15,000 (Guest Bath)</span>
                <span>$45,000 (Custom Chef Kitchen)</span>
                <span>$85,000 (Full Suite Bundle)</span>
              </div>
            </div>

            {/* 3 Term Selector Buttons */}
            <div>
              <div className="text-sm font-semibold text-[#1C1917] mb-3">
                Select Payment Plan Term:
              </div>
              <div
                role="group"
                aria-label="Financing term options"
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {termOptions.map((option) => {
                  const isSelected = term === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTerm(option.value)}
                      className={`p-4 rounded-xl border text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm'
                          : 'bg-[#FAF8F5] text-[#1C1917] border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="text-sm font-bold whitespace-nowrap">
                        {option.label}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          isSelected ? 'text-stone-300' : 'text-stone-600'
                        }`}
                      >
                        {option.subtext}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lending Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>$0 Down Payment Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>No Home Equity Lien Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Pay Off Early Anytime ($0 Fee)</span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Real-Time Monthly Payment Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="text-xs font-semibold text-stone-500">
                Estimated Monthly Investment ({calculation.termLabel})
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-serif-display font-bold text-[#1C1917] tabular-nums"
                  data-testid="financing-monthly-display"
                >
                  {formatCurrency(calculation.monthlyPayment)}
                </span>
                <span className="text-base font-medium text-stone-600">/ month</span>
              </div>
              <div className="mt-2 text-xs font-medium text-[#15803D]">
                {calculation.aprLabel} · $0 Due Until Materials Arrive
              </div>
            </div>

            <div className="space-y-2.5 border-t border-b border-stone-200 py-4 text-xs text-stone-600 tabular-nums">
              <div className="flex items-center justify-between">
                <span>Financed Project Budget:</span>
                <span className="font-semibold text-[#1C1917]">
                  {formatCurrency(calculation.financedAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Upfront Deposit at Approval:</span>
                <span className="font-semibold text-[#15803D]">$0 Down</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Est. Home Equity Offset (~78% ROI):</span>
                <span className="font-semibold text-[#15803D]">
                  +{formatCurrency(Math.round(budget * 0.78))} Value Added
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenPreQualModal(budget, term, calculation.monthlyPayment)
              }
              className="w-full py-4 px-5 bg-[#B45309] hover:bg-[#D97706] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 shrink-0" />
              <span>
                Check Pre-Qualification in 60 Seconds (Soft Pull — 0% Impact on Credit Score)
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
              <span>256-Bit Encrypted Soft Credit Check via Hearth &amp; Acorn Financial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
