import React, { useState } from 'react';
import { FIVE_WEEK_TIMELINE } from '../utils/remodelLogic';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  Wind,
  Sparkles,
  UserCheck,
  Smartphone,
  ArrowRight,
} from 'lucide-react';

interface TimelineProcessProps {
  onBookGuaranteeCall: () => void;
}

export const TimelineProcess: React.FC<TimelineProcessProps> = ({
  onBookGuaranteeCall,
}) => {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(1); // Default to Week 2 warehouse rule highlight or allow clicking any week

  const familyProtectionPillars = [
    {
      title: 'HEPA Air Scrubbers & ZipWall Dust Barriers (99% Dust Containment)',
      description:
        'Floor-to-ceiling magnetic zipper walls and medical-grade negative-air HEPA filtration capture silica and drywall particulates before they ever reach your living room or nursery.',
      icon: Wind,
      metric: '99.3% Particulate Capture',
    },
    {
      title: 'Daily 5:00 PM Sweep & Cleanup — Never Live in a Construction Zone',
      description:
        'Every afternoon at 4:45 PM, our crew vacuums pathways, coils hoses, secures tools in locked jobsite chests, and wipes down surfaces so your evenings remain peaceful.',
      icon: Sparkles,
      metric: 'Mandatory 12-Point Daily Checklist',
    },
    {
      title: 'Background-Checked Master Craftsmen (No Random Day Laborers)',
      description:
        'Every carpenter, tile setter, and project lead in your home is a vetted, uniformed, drug-tested Vanguard artisan backed by $2M in liability coverage.',
      icon: UserCheck,
      metric: '100% Vetted In-House & Master Trades',
    },
    {
      title: 'Dedicated Project Manager Updates via Daily Photo App',
      description:
        'Whether you are at the office or traveling, receive daily 5:00 PM photo logs, milestone checklists, and next-day arrival schedules directly on your phone.',
      icon: Smartphone,
      metric: 'Real-Time Client Portal Access',
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* PART 1: THE 5-WEEK TIMELINE & $100/DAY ON-TIME GUARANTEE */}
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-medium text-[#B45309] mb-2">
          Zero Contractor Disappearing Acts · Contractual Accountability
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#1C1917] tracking-tight text-balance">
          Our Stress-Free 5-Step Process — Completed On Time, Or We Pay You $100/Day!
        </h2>
        <p className="mt-3 text-base text-stone-600">
          The #1 homeowner nightmare is a contractor who tears out your kitchen on Day 1 and vanishes for 4 months waiting on backordered cabinets. We engineered our 5-week protocol so you never experience remodeling limbo.
        </p>
      </div>

      {/* Interactive Week Selector Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Left 5 Cols: Step-by-Step Vertical Selector */}
        <div className="lg:col-span-5 space-y-2.5" role="tablist" aria-label="5-Week Remodeling Process">
          {FIVE_WEEK_TIMELINE.map((item, idx) => {
            const isSelected = idx === selectedWeekIndex;
            return (
              <button
                key={item.week}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedWeekIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm'
                    : 'bg-white text-[#1C1917] border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-mono-tabular font-semibold ${
                      isSelected ? 'text-[#D97706]' : 'text-[#B45309]'
                    }`}
                  >
                    0{idx + 1}. {item.week}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    Click to inspect
                  </span>
                </div>
                <div className="text-sm sm:text-base font-semibold mt-1 leading-snug">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right 7 Cols: Active Week Deep-Dive + Full 5-Week Overview */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-200 pb-5">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#B45309] mb-1">
              <span>{FIVE_WEEK_TIMELINE[selectedWeekIndex].week} Milestone Deep-Dive</span>
              <span className="font-mono-tabular text-[#15803D]">
                On-Time Penalty Protected
              </span>
            </div>
            <h3 className="text-2xl font-serif-display font-semibold text-[#1C1917]">
              {FIVE_WEEK_TIMELINE[selectedWeekIndex].title}
            </h3>
            <p className="text-sm text-stone-600 mt-1.5">
              {FIVE_WEEK_TIMELINE[selectedWeekIndex].subtitle}
            </p>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold text-stone-500">
              What Happens During {FIVE_WEEK_TIMELINE[selectedWeekIndex].week}:
            </div>
            {FIVE_WEEK_TIMELINE[selectedWeekIndex].deliverables.map((deliverable) => (
              <div
                key={deliverable}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80"
              >
                <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                <span className="text-sm text-[#1C1917]">{deliverable}</span>
              </div>
            ))}
          </div>

          {/* Contractual Protection Callout */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-[#D97706]/40 flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#1C1917]">
              <strong className="font-semibold text-[#B45309]">
                Homeowner Protection Clause:{' '}
              </strong>
              {FIVE_WEEK_TIMELINE[selectedWeekIndex].clientProtection}
            </div>
          </div>

          {/* Complete 5-Week Summary Bar */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-stone-600">
              Signed into every Vanguard contract:{' '}
              <strong className="text-[#1C1917]">$100/Day Late Penalty Paid to You</strong>
            </div>
            <button
              type="button"
              onClick={onBookGuaranteeCall}
              className="py-2.5 px-4 bg-[#1C1917] hover:bg-stone-800 text-[#FAF8F5] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Reserve Next Month’s Production Slot</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D97706]" />
            </button>
          </div>
        </div>
      </div>

      {/* PART 2: "DUST-FREE & LIVE-IN READY" FAMILY PROTECTION BANNER */}
      <div className="bg-[#1C1917] text-[#FAF8F5] rounded-2xl p-6 sm:p-10 lg:p-12 border border-stone-800">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>The Vanguard “Dust-Free &amp; Live-In Ready” Family Protection Protocol</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif-display font-semibold text-[#FAF8F5] tracking-tight text-balance">
            Stay Comfortably in Your Home While We Build — Zero Dust Clouds, Zero Strangers
          </h3>
          <p className="mt-2.5 text-sm sm:text-base text-stone-300">
            You shouldn’t have to move into a short-term rental or breathe drywall dust for a month. Here is how our crew protects your family, pets, and hardwood floors every single day:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {familyProtectionPillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-col justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-[#D97706]" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#FAF8F5] leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <span>Standard on every Austin project</span>
                  <span className="font-mono-tabular text-amber-400 font-medium">
                    {pillar.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
