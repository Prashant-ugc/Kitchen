import React, { useState } from 'react';
import { STYLE_MOODBOARDS, StyleMoodboard } from '../utils/remodelLogic';
import { ArchitecturalScene } from './ArchitecturalScene';
import { Layers, Check, ArrowRight } from 'lucide-react';

interface StyleVisualizerProps {
  onSelectStyleForRender: (styleName: string, styleSummary: string) => void;
}

export const StyleVisualizer: React.FC<StyleVisualizerProps> = ({
  onSelectStyleForRender,
}) => {
  const [selectedStyleId, setSelectedStyleId] =
    useState<StyleMoodboard['id']>('farmhouse');
  const [activeSwatchKey, setActiveSwatchKey] = useState<
    'cabinetry' | 'stone' | 'hardware' | 'flooring'
  >('cabinetry');

  const activeStyle =
    STYLE_MOODBOARDS.find((s) => s.id === selectedStyleId) ?? STYLE_MOODBOARDS[0];

  const getSceneVariant = (
    id: StyleMoodboard['id']
  ): 'style-farmhouse' | 'style-contemporary' | 'style-coastal' => {
    if (id === 'contemporary') return 'style-contemporary';
    if (id === 'coastal') return 'style-coastal';
    return 'style-farmhouse';
  };

  const swatchEntries: Array<{
    key: 'cabinetry' | 'stone' | 'hardware' | 'flooring';
    category: string;
    data: { name: string; finish: string; hex: string };
  }> = [
    { key: 'cabinetry', category: 'Cabinetry Millwork', data: activeStyle.specs.cabinetry },
    { key: 'stone', category: 'Countertop & Slab', data: activeStyle.specs.stone },
    { key: 'hardware', category: 'Fixtures & Hardware', data: activeStyle.specs.hardware },
    { key: 'flooring', category: 'Flooring / Backsplash', data: activeStyle.specs.flooring },
  ];

  return (
    <section
      id="style-visualizer"
      className="py-16 sm:py-24 bg-[#F3EFE8] border-t border-b border-stone-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-medium text-[#B45309] mb-2">
            Interactive Architectural Showroom · Material Palette Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display font-semibold text-[#1C1917] tracking-tight text-balance">
            Not Sure Which Style Fits Your Home? Test Combinations Below
          </h2>
          <p className="mt-3 text-base text-stone-600">
            Select an architectural package below to inspect how our Austin design team pairs custom millwork, stone slabs, and fixtures—then request a complimentary 3D render mapped to your exact floorplan.
          </p>
        </div>

        {/* 3 Interactive Style Selector Tabs */}
        <div
          role="tablist"
          aria-label="Architectural style moodboards"
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
        >
          {STYLE_MOODBOARDS.map((style, index) => {
            const isSelected = style.id === selectedStyleId;
            return (
              <button
                key={style.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedStyleId(style.id)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm'
                    : 'bg-white text-[#1C1917] border-stone-200 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-mono-tabular opacity-75">
                    Palette 0{index + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {Object.values(style.specs).map((swatch) => (
                      <span
                        key={swatch.name}
                        className="w-3.5 h-3.5 rounded-full border border-white/40 inline-block"
                        style={{ backgroundColor: swatch.hex }}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-lg font-serif-display font-semibold">
                  {style.name}
                </div>
                <div
                  className={`text-xs mt-1 line-clamp-2 ${
                    isSelected ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {style.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Material Showcase Card */}
        <div
          className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch"
          data-testid="style-showcase-card"
        >
          {/* Left 7 Cols: Curated Architectural Render + Material Swatch Bar */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-stone-900">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <ArchitecturalScene variant={getSceneVariant(activeStyle.id)} />
              <div className="absolute top-4 left-4 bg-[#1C1917]/85 text-[#FAF8F5] px-3.5 py-1.5 rounded-md text-xs font-medium backdrop-blur-xs">
                {activeStyle.name} · 3D Showroom Render
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 text-[#1C1917] px-3.5 py-1.5 rounded-md text-xs font-semibold tabular-nums shadow-sm">
                {activeStyle.estimatedRange}
              </div>
            </div>

            {/* Interactive Material Swatch Strip */}
            <div className="p-4 sm:p-5 bg-[#1C1917] text-[#FAF8F5] border-t border-stone-800">
              <div className="text-xs text-stone-400 mb-3 flex items-center justify-between">
                <span>Click any material swatch to inspect specification:</span>
                <span className="text-amber-400 font-medium">
                  {activeStyle.popularIn}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {swatchEntries.map((item) => {
                  const isActiveSwatch = activeSwatchKey === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveSwatchKey(item.key)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isActiveSwatch
                          ? 'border-[#D97706] bg-stone-800'
                          : 'border-stone-700/80 bg-stone-900/60 hover:border-stone-600'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-md shrink-0 border border-white/25 shadow-inner"
                        style={{ backgroundColor: item.data.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] text-stone-400 truncate">
                          {item.category}
                        </div>
                        <div className="text-xs font-semibold text-[#FAF8F5] truncate">
                          {item.data.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Detailed Specifications, Price Tier & CTA */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309]">
                <Layers className="w-4 h-4" />
                <span>{activeStyle.priceTier}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-display font-semibold text-[#1C1917] mt-1">
                {activeStyle.name} Palette
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {activeStyle.description}
              </p>

              {/* Detailed Material Breakdown List */}
              <div className="mt-6 space-y-3 border-t border-stone-200 pt-5">
                {swatchEntries.map((entry) => (
                  <div
                    key={entry.key}
                    className={`p-3 rounded-lg border transition-colors ${
                      activeSwatchKey === entry.key
                        ? 'bg-[#FAF8F5] border-[#D97706]'
                        : 'bg-white border-stone-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-stone-400 shrink-0"
                          style={{ backgroundColor: entry.data.hex }}
                        />
                        <span className="text-xs font-bold text-[#1C1917]">
                          {entry.data.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {entry.category}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-1 pl-6">
                      {entry.data.finish}
                    </div>
                  </div>
                ))}
              </div>

              {/* Architectural Highlights */}
              <div className="mt-5 space-y-2">
                {activeStyle.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-2 text-xs text-stone-700"
                  >
                    <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-3">
                <span>Estimated Turnkey Tier:</span>
                <span className="font-bold text-[#1C1917] tabular-nums">
                  {activeStyle.estimatedRange}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectStyleForRender(activeStyle.name, activeStyle.tagline)
                }
                className="w-full py-3.5 px-5 bg-[#B45309] hover:bg-[#D97706] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Get a Free 3D Render of This Exact Style in Your Home</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
