/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RoiCalculator } from './components/RoiCalculator';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { StyleVisualizer } from './components/StyleVisualizer';
import { TimelineProcess } from './components/TimelineProcess';
import { FinancingCalculator } from './components/FinancingCalculator';
import { ConsultationModal, ModalContextState } from './components/ConsultationModal';
import { FinancingTerm } from './utils/remodelLogic';
import {
  Phone,
  Sparkles,
  ArrowDownRight,
  ShieldCheck,
  Award,
  Star,
  Calendar,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

export default function App() {
  const [modalState, setModalState] = useState<ModalContextState>({
    isOpen: false,
    mode: '3d_consultation',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<{
    name: string;
    space: string;
    day: string;
    phone: string;
    mode: '3d_consultation' | 'financing_prequal';
  } | null>(null);

  const open3dModal = (prefilledNote?: string) => {
    setModalState({
      isOpen: true,
      mode: '3d_consultation',
      prefilledNote,
    });
  };

  const openFinancingModal = (
    budget: number,
    term: FinancingTerm,
    monthly: number
  ) => {
    setModalState({
      isOpen: true,
      mode: 'financing_prequal',
      financingData: { budget, term, monthly },
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] pb-16 md:pb-0">
      {/* 1. TOP SCARCITY BANNER (Static on mobile to stay well within 15% mobile sticky cap) */}
      <div className="bg-[#1C1917] text-[#FAF8F5] border-b border-stone-800 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <p className="font-medium leading-snug">
            <span aria-hidden="true" className="mr-1.5">
              🟠
            </span>
            <strong className="text-[#D97706] font-semibold">
              PRODUCTION UPDATE:
            </strong>{' '}
            Only 2 Kitchen or Bath Remodel Slots Remaining for Next Month — Book Your Free 3D Design Consultation Today
          </p>
          <button
            type="button"
            onClick={() => open3dModal('Next Month Production Slot Reservation')}
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
          >
            Claim 1 of 2 Remaining Slots →
          </button>
        </div>
      </div>

      {/* STICKY LUXURY NAVBAR (Strict 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/90 px-3 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-8">
          {/* Zone 1: Brand Title (Single text element, one line) */}
          <a
            href="#top"
            className="text-sm sm:text-xl font-serif-display font-bold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            Vanguard Custom Remodeling
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Showroom Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700"
          >
            <a
              href="#roi-calculator"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              ROI Calculator
            </a>
            <a
              href="#before-after"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Before/After
            </a>
            <a
              href="#style-visualizer"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Style Visualizer
            </a>
            <a
              href="#process"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Process
            </a>
            <a
              href="#financing"
              className="hover:text-[#B45309] transition-colors whitespace-nowrap shrink-0"
            >
              Financing
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href="tel:5125550148"
              className="px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#FAF8F5] bg-[#1C1917] hover:bg-[#B45309] rounded-lg transition-colors whitespace-nowrap shrink-0 font-mono-tabular"
            >
              (512) 555-0148
            </a>
          </div>
        </div>
      </header>

      {/* ACTIVE RESERVATION CONFIRMATION STRIP (Appears when user books via modal) */}
      {confirmedReservation && (
        <div
          className="bg-[#15803D] text-white px-4 py-2.5 text-xs sm:text-sm"
          data-testid="active-reservation-banner"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                <strong>Confirmed for {confirmedReservation.name}:</strong>{' '}
                {confirmedReservation.space} · {confirmedReservation.day} (SMS sent to{' '}
                {confirmedReservation.phone})
              </span>
            </div>
            <span className="font-mono-tabular text-xs opacity-90">
              Code: VG-ATX-2026
            </span>
          </div>
        </div>
      )}

      <main id="top" className="flex-1">
        {/* 2. HERO SECTION + INTERACTIVE "REMODEL BUDGET & HOME VALUE ROI CALCULATOR" */}
        <section className="pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left 7 Columns: Editorial Luxury Proposition & Trust Credentials */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                {/* Unboxed Metadata Trust Kicker */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#B45309]">
                  <span>Licensed &amp; Insured</span>
                  <span aria-hidden="true">·</span>
                  <span>5-Year Craftsmanship Warranty</span>
                  <span aria-hidden="true">·</span>
                  <span>Austin, TX Design-Build Showroom</span>
                </div>

                {/* Editorial Luxury Headline */}
                <h1
                  className="font-serif-display font-semibold text-[#1C1917] tracking-tight text-balance leading-[1.12]"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
                >
                  Transform Your Outdated Kitchen or Bath Into a Custom Sanctuary — On Time &amp; On Budget, Guaranteed
                </h1>

                <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                  Experience Austin’s white-glove design-build showroom. We pair photorealistic 3D architectural rendering with a contractually locked fixed price—and we never Swing a Hammer until 100% of your stone, tile, and cabinetry is staged in our South Austin warehouse.
                </p>

                {/* Primary & Secondary Hero Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => open3dModal('Complimentary In-Home 3D Sanctuary Design')}
                    className="py-3.5 px-6 bg-[#B45309] hover:bg-[#D97706] text-white font-semibold text-sm rounded-xl transition-colors flex items-center gap-2.5 cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Book Free 3D Design Consultation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('before-after')}
                    className="py-3.5 px-5 bg-white hover:bg-stone-100 text-[#1C1917] border border-stone-300 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Explore Before &amp; Afters</span>
                    <ArrowDownRight className="w-4 h-4 text-[#B45309]" />
                  </button>
                </div>
              </div>

              {/* Trust Badges & Austin Credentials Block */}
              <div className="pt-6 border-t border-stone-200/90 space-y-4">
                <div className="text-xs font-medium text-stone-500">
                  Verified Architectural &amp; Homeowner Ratings Across Travis &amp; Williamson County:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/90">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                      <Award className="w-4 h-4 text-[#D97706] shrink-0" />
                      <span>Houzz Best of Design</span>
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                      6-Time Consecutive Austin Winner (2021–2026)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/90">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                      <ShieldCheck className="w-4 h-4 text-[#15803D] shrink-0" />
                      <span>BBB A+ Rated</span>
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                      Zero Unresolved Complaints · TX Lic #RMDL-88412
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/90">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1C1917]">
                      <Star className="w-4 h-4 fill-[#D97706] text-[#D97706] shrink-0" />
                      <span>5.0★ on Google</span>
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                      180+ Verified Local Austin Homeowner Reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive 4-Step ROI Calculator Card */}
            <div className="lg:col-span-5">
              <RoiCalculator
                onBook3dRender={(note) => open3dModal(note)}
              />
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
          <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1C1917] tabular-nums">
                21–28 Days
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Average Kitchen or Primary Spa Turnaround Time
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-display font-bold text-[#15803D] tabular-nums">
                +78% Avg. ROI
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Immediate Resale Equity Boost in Austin Metro
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-display font-bold text-[#B45309] tabular-nums">
                $100 / Day
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Contractual On-Time Guarantee Paid Directly to You
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-display font-bold text-[#1C1917] tabular-nums">
                100% Staged
              </div>
              <div className="text-xs text-stone-600 mt-1">
                All Slabs, Tile &amp; Millwork Warehoused Before Demo
              </div>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE DRAGGABLE "BEFORE & AFTER" TRANSFORMATION SLIDER */}
        <BeforeAfterSlider
          onRequestQuoteForProject={(projectName) =>
            open3dModal(`Inspired by Case Study: ${projectName}`)
          }
        />

        {/* 4. INTERACTIVE "LIVE STYLE & MATERIAL MOODBOARD PICKER" */}
        <StyleVisualizer
          onSelectStyleForRender={(styleName, styleSummary) =>
            open3dModal(`${styleName} Package (${styleSummary})`)
          }
        />

        {/* 5 & 6. 5-WEEK TIMELINE & ON-TIME GUARANTEE + DUST-FREE FAMILY PROTECTION BANNER */}
        <TimelineProcess
          onBookGuaranteeCall={() =>
            open3dModal('5-Week On-Time Guaranteed Remodel Slot')
          }
        />

        {/* 7. INTERACTIVE "DREAM KITCHEN NOW, PAY MONTHLY" FINANCING CALCULATOR */}
        <FinancingCalculator onOpenPreQualModal={openFinancingModal} />
      </main>

      {/* QUIET ARCHITECTURAL FOOTER */}
      <footer className="bg-[#1C1917] text-stone-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
          <div className="md:col-span-5 space-y-3">
            <div className="text-xl font-serif-display font-bold text-[#FAF8F5]">
              Vanguard Custom Remodeling
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Austin’s premier design-build kitchen and bathroom sanctuary firm. Featuring in-house 3D architectural rendering, dust-free HEPA execution, and a 5-year craftsmanship warranty.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-300 pt-1">
              <MapPin className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>3801 N Capital of Texas Hwy, Suite E-240 · Austin, TX 78746</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="font-semibold text-[#FAF8F5] mb-2">
              Austin Service Neighborhoods
            </div>
            <p className="text-stone-400 leading-relaxed">
              Westlake Hills · Barton Creek · Tarrytown · Travis Heights · Circle C Ranch · Lakeway · Rollingwood · Steiner Ranch · Dripping Springs · Mueller
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-semibold text-[#FAF8F5]">
              Showroom &amp; Consultations
            </div>
            <div>Mon–Sat: 8:30 AM – 6:00 PM</div>
            <div>
              Direct Line:{' '}
              <a
                href="tel:5125550148"
                className="text-[#D97706] font-mono-tabular font-semibold hover:underline"
              >
                (512) 555-0148
              </a>
            </div>
            <button
              type="button"
              onClick={() => open3dModal('Footer Showroom Consultation')}
              className="mt-1 py-2 px-3.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-[#FAF8F5] font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Schedule 3D Measurement
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Vanguard Custom Remodeling LLC. All Rights Reserved. Licensed &amp; Insured in Texas.
          </div>
          <div className="flex items-center gap-4">
            <a href="#roi-calculator" className="hover:text-stone-300">
              ROI Calculator
            </a>
            <span>·</span>
            <a href="#before-after" className="hover:text-stone-300">
              Portfolio
            </a>
            <span>·</span>
            <a href="#style-visualizer" className="hover:text-stone-300">
              3D Moodboards
            </a>
            <span>·</span>
            <a href="#financing" className="hover:text-stone-300">
              Financing
            </a>
          </div>
        </div>
      </footer>

      {/* 8. FLOATING "BOOK FREE 3D DESIGN CONSULTATION" WIDGET (Bottom-Right Corner) */}
      {!modalState.isOpen && (
        <div className="hidden md:block fixed bottom-4 right-4 z-40">
          <button
            type="button"
            onClick={() => open3dModal('Floating 3D Kitchen/Bath Preview Widget')}
            className="group py-2.5 px-4 bg-[#1C1917] hover:bg-[#B45309] text-[#FAF8F5] rounded-full shadow-lg border border-[#D97706]/50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706] group-hover:text-white transition-colors shrink-0" />
            <span className="text-xs font-semibold whitespace-nowrap">
              ✨ Free 3D Kitchen/Bath Preview
            </span>
          </button>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM BAR ("Get Free 3D Design" & "Call Now") */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#1C1917] border-t border-stone-800 px-3 py-2 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => open3dModal('Mobile Sticky 3D Design Request')}
          className="flex-1 py-2.5 px-3 bg-[#B45309] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Get Free 3D Design</span>
        </button>
        <a
          href="tel:5125550148"
          className="py-2.5 px-4 bg-stone-800 text-[#FAF8F5] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
          <span>Call Now</span>
        </a>
      </div>

      {/* INTERACTIVE CONSULTATION & PRE-QUALIFICATION MODAL */}
      <ConsultationModal
        modalState={modalState}
        onClose={closeModal}
        onBookingConfirmed={(summary) => setConfirmedReservation(summary)}
      />
    </div>
  );
}
