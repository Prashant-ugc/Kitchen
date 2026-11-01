import React, { useState, useRef } from 'react';
import { TRANSFORMATION_PROJECTS } from '../utils/remodelLogic';
import { ArchitecturalScene } from './ArchitecturalScene';
import { MoveHorizontal, Quote, Check, ArrowUpRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  onRequestQuoteForProject: (projectName: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  onRequestQuoteForProject,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const project = TRANSFORMATION_PROJECTS[activeIndex];

  const updateSliderFromClientX = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(4, Math.min(96, Math.round((offsetX / rect.width) * 100)));
    setSliderPosition(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const getScenePair = (
    sceneType: 'oak_to_quartz' | 'tub_to_spa' | 'galley_to_island'
  ): {
    before: 'oak-before' | 'tub-before' | 'galley-before';
    after: 'quartz-after' | 'spa-after' | 'island-after';
  } => {
    if (sceneType === 'tub_to_spa') {
      return { before: 'tub-before', after: 'spa-after' };
    }
    if (sceneType === 'galley_to_island') {
      return { before: 'galley-before', after: 'island-after' };
    }
    return { before: 'oak-before', after: 'quartz-after' };
  };

  const scenes = getScenePair(project.sceneType);

  return (
    <section
      id="before-after"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Heading */}
      <div className="max-w-3xl mb-10">
        <div className="text-xs font-medium text-[#B45309] mb-2">
          Verified Austin Portfolio · Fixed-Price Execution
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#1C1917] tracking-tight text-balance">
          Slide to See Real Austin Transformations (Completed in 3–5 Weeks)
        </h2>
        <p className="mt-3 text-base text-stone-600">
          Drag the center architectural handle or switch between recent Travis County homes to inspect our craftsmanship, exact project investment, and turnaround speed.
        </p>
      </div>

      {/* 3 Project Switcher Tabs */}
      <div
        role="tablist"
        aria-label="Austin transformation case studies"
        className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-8 p-1.5 bg-stone-200/70 rounded-xl"
      >
        {TRANSFORMATION_PROJECTS.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setSliderPosition(52);
              }}
              className={`py-3 px-4 rounded-lg text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                  : 'bg-transparent text-stone-700 hover:bg-white/60 hover:text-[#1C1917]'
              }`}
            >
              <div className="text-xs opacity-75 font-mono-tabular">
                0{idx + 1} · {item.timeline}
              </div>
              <div className="text-sm font-semibold mt-0.5 truncate">
                {item.tabLabel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Draggable Comparison Viewport */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[540px] overflow-hidden cursor-ew-resize select-none touch-none bg-stone-900"
          data-testid="before-after-viewport"
        >
          {/* Base Layer: AFTER Transformation (Full Width) */}
          <div className="absolute inset-0 w-full h-full">
            <ArchitecturalScene variant={scenes.after} />
          </div>

          {/* Clipped Overlay Layer: BEFORE State */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <ArchitecturalScene variant={scenes.before} />
          </div>

          {/* Top Left "BEFORE" Label & Top Right "AFTER" Label */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-[#1C1917]/85 text-[#FAF8F5] px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-xs">
            BEFORE REMODEL
          </div>
          <div className="absolute top-4 right-4 z-10 pointer-events-none bg-[#B45309] text-white px-3 py-1.5 rounded-md text-xs font-semibold">
            AFTER VANGUARD ({project.timeline.toUpperCase()})
          </div>

          {/* Vertical Divider Line & Center Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-[#FAF8F5] shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#B45309] border-2 border-[#FAF8F5] text-white shadow-lg flex items-center justify-center">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>

          {/* Bottom Scrim with Before/After Captions */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-xs text-[#FAF8F5]">
            <span className="max-w-md opacity-90">{project.beforeCaption}</span>
            <span className="max-w-md sm:text-right font-medium text-amber-200">
              {project.afterCaption}
            </span>
          </div>
        </div>

        {/* Accessible Range Control Bar Below Viewport */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#FAF8F5] border-t border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[220px]">
            <label
              htmlFor="ba-range-control"
              className="text-xs font-semibold text-stone-700 whitespace-nowrap"
            >
              Reveal Transformation:
            </label>
            <input
              id="ba-range-control"
              type="range"
              min={5}
              max={95}
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Before and after comparison slider"
              className="w-full max-w-xs luxury-range bg-stone-300 rounded-lg h-2"
            />
            <span className="text-xs font-mono-tabular text-stone-600 w-10">
              {sliderPosition}%
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setSliderPosition(12)}
              className="px-2.5 py-1 rounded border border-stone-300 hover:border-stone-500 text-stone-700 cursor-pointer whitespace-nowrap"
            >
              Full After
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className="px-2.5 py-1 rounded border border-stone-300 hover:border-stone-500 text-stone-700 cursor-pointer whitespace-nowrap"
            >
              50 / 50 Split
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(88)}
              className="px-2.5 py-1 rounded border border-stone-300 hover:border-stone-500 text-stone-700 cursor-pointer whitespace-nowrap"
            >
              Original Before
            </button>
          </div>
        </div>

        {/* Dynamic Project Stats & Client Quote Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Project Metrics & Materials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs text-stone-500">{project.neighborhood}</div>
                <h3 className="text-2xl font-serif-display font-semibold text-[#1C1917] mt-0.5">
                  {project.shortTitle}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm tabular-nums">
                <div>
                  <span className="text-xs text-stone-500 block">Project Cost</span>
                  <span className="font-bold text-[#1C1917]">{project.cost}</span>
                </div>
                <span className="text-stone-300" aria-hidden="true">|</span>
                <div>
                  <span className="text-xs text-stone-500 block">Turnaround</span>
                  <span className="font-bold text-[#B45309]">{project.timeline}</span>
                </div>
                <span className="text-stone-300" aria-hidden="true">|</span>
                <div>
                  <span className="text-xs text-stone-500 block">Equity Impact</span>
                  <span className="font-bold text-[#15803D]">{project.equityAdded}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-stone-500 mb-3">
                Curated Architectural Materials Installed:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.materialsUsed.map((material) => (
                  <div
                    key={material}
                    className="flex items-center gap-2 text-sm text-[#1C1917]"
                  >
                    <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span>{material}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Testimonial & Action */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200/90 rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <Quote className="w-6 h-6 text-[#D97706] mb-2" />
              <p className="text-sm sm:text-base text-[#1C1917] italic leading-relaxed">
                “{project.clientQuote}”
              </p>
              <div className="mt-3 text-xs font-semibold text-stone-600">
                — {project.clientAuthor}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRequestQuoteForProject(project.tabLabel)}
              className="w-full py-3 px-4 bg-[#1C1917] hover:bg-stone-800 text-[#FAF8F5] text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Price a Transformation Like This for My Home</span>
              <ArrowUpRight className="w-4 h-4 text-[#D97706]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
