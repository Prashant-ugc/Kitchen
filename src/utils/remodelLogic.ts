export type RoomType = 'kitchen' | 'master_bath' | 'guest_bath' | 'bundle';
export type RoomSize = 'compact' | 'standard' | 'expansive';
export type FinishLevel = 'refresh' | 'custom_quartz' | 'chefs_grade';
export type FinancingTerm = 60 | 120 | 18;

export interface RemodelEstimateResult {
  minCost: number;
  maxCost: number;
  midpointCost: number;
  equityBoost: number;
  roiPercent: number;
  timelineWeeks: string;
  roomLabel: string;
  sizeLabel: string;
  finishLabel: string;
  formattedRange: string;
  formattedEquity: string;
}

export interface LeadFormInput {
  name: string;
  phone: string;
  email: string;
  zip: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof LeadFormInput, string>>;
}

export const ROOM_OPTIONS: Array<{
  id: RoomType;
  label: string;
  subtitle: string;
  baseMin: number;
  baseMax: number;
  baseRoiRate: number;
  timelineWeeks: string;
}> = [
  {
    id: 'kitchen',
    label: 'Full Kitchen Remodel',
    subtitle: 'Custom cabinetry, stone islands, lighting & layout reconfiguration',
    baseMin: 34000,
    baseMax: 46000,
    baseRoiRate: 0.78,
    timelineWeeks: '4–5 Weeks',
  },
  {
    id: 'master_bath',
    label: 'Master Bathroom Spa',
    subtitle: 'Frameless walk-in rain shower, freestanding soaking tub & double vanity',
    baseMin: 24000,
    baseMax: 33000,
    baseRoiRate: 0.74,
    timelineWeeks: '3–4 Weeks',
  },
  {
    id: 'guest_bath',
    label: 'Guest Bath Refresh',
    subtitle: 'Custom vanity, porcelain tile surround, brass or matte black fixtures',
    baseMin: 15500,
    baseMax: 21500,
    baseRoiRate: 0.81,
    timelineWeeks: '2–3 Weeks',
  },
  {
    id: 'bundle',
    label: 'Kitchen + Bath Bundle',
    subtitle: 'Whole-home sanctuary transformation with bundled trade scheduling savings',
    baseMin: 52000,
    baseMax: 68000,
    baseRoiRate: 0.83,
    timelineWeeks: '5–6 Weeks',
  },
];

export const SIZE_OPTIONS: Array<{
  id: RoomSize;
  label: string;
  dimensions: string;
  multiplier: number;
}> = [
  {
    id: 'compact',
    label: 'Compact Footprint',
    dimensions: 'Under 120 sq. ft. · Condos, bungalows & guest suites',
    multiplier: 0.82,
  },
  {
    id: 'standard',
    label: 'Standard Suburban',
    dimensions: '120 – 220 sq. ft. · Classic Austin family residences',
    multiplier: 1.0,
  },
  {
    id: 'expansive',
    label: 'Expansive Custom',
    dimensions: '220+ sq. ft. · Structural wall removal & oversized islands',
    multiplier: 1.32,
  },
];

export const FINISH_OPTIONS: Array<{
  id: FinishLevel;
  label: string;
  materials: string;
  multiplier: number;
  roiBonus: number;
}> = [
  {
    id: 'refresh',
    label: 'Modern Refresh',
    materials: 'Refinished Shaker doors, Level-2 quartz tops, LVP or porcelain tile',
    multiplier: 0.85,
    roiBonus: 0.02,
  },
  {
    id: 'custom_quartz',
    label: 'Custom Mid-Range Quartz & Shaker',
    materials: 'Solid maple dovetail cabinets, Calacatta quartz, designer Kohler hardware',
    multiplier: 1.0,
    roiBonus: 0.0,
  },
  {
    id: 'chefs_grade',
    label: "Ultra-Luxury Chef's Grade",
    materials: 'Inset walnut/oak millwork, bookmatched waterfall stone, Brizo brass fixtures',
    multiplier: 1.35,
    roiBonus: -0.03,
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function calculateRemodelEstimate(
  room: RoomType,
  size: RoomSize,
  finish: FinishLevel
): RemodelEstimateResult {
  const roomConfig = ROOM_OPTIONS.find((r) => r.id === room) ?? ROOM_OPTIONS[0];
  const sizeConfig = SIZE_OPTIONS.find((s) => s.id === size) ?? SIZE_OPTIONS[1];
  const finishConfig = FINISH_OPTIONS.find((f) => f.id === finish) ?? FINISH_OPTIONS[1];

  const rawMin = roomConfig.baseMin * sizeConfig.multiplier * finishConfig.multiplier;
  const rawMax = roomConfig.baseMax * sizeConfig.multiplier * finishConfig.multiplier;

  // Round to nearest $500 for realistic architectural proposals
  const minCost = Math.round(rawMin / 500) * 500;
  const maxCost = Math.round(rawMax / 500) * 500;
  const midpointCost = (minCost + maxCost) / 2;

  const effectiveRoiRate = Math.min(0.88, Math.max(0.68, roomConfig.baseRoiRate + finishConfig.roiBonus));
  const equityBoost = Math.round((midpointCost * effectiveRoiRate) / 500) * 500;
  const roiPercent = Math.round((equityBoost / midpointCost) * 100);

  return {
    minCost,
    maxCost,
    midpointCost,
    equityBoost,
    roiPercent,
    timelineWeeks: roomConfig.timelineWeeks,
    roomLabel: roomConfig.label,
    sizeLabel: sizeConfig.label,
    finishLabel: finishConfig.label,
    formattedRange: `${formatCurrency(minCost)} – ${formatCurrency(maxCost)}`,
    formattedEquity: `+${formatCurrency(equityBoost)} Instant Equity / ~${roiPercent}% ROI`,
  };
}

export function validateLeadForm(input: LeadFormInput): ValidationResult {
  const errors: Partial<Record<keyof LeadFormInput, string>> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const digitsOnlyPhone = (input.phone || '').replace(/\D/g, '');
  if (digitsOnlyPhone.length < 10) {
    errors.phone = 'Enter a valid 10-digit phone number.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailPattern.test(input.email.trim())) {
    errors.email = 'Enter a valid email address for your report.';
  }

  const zipPattern = /^\d{5}$/;
  if (!input.zip || !zipPattern.test(input.zip.trim())) {
    errors.zip = 'Enter a valid 5-digit Austin metro ZIP code.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface FinancingCalculation {
  monthlyPayment: number;
  aprLabel: string;
  termLabel: string;
  totalPrincipal: number;
  downPayment: number;
  financedAmount: number;
}

export function calculateMonthlyPayment(
  budget: number,
  termMonths: FinancingTerm
): FinancingCalculation {
  const clampedBudget = Math.max(15000, Math.min(85000, budget));
  const downPayment = 0; // $0 down financing available
  const financedAmount = clampedBudget - downPayment;

  if (termMonths === 18) {
    // 18-Month 0% APR Promotional Equal Monthly Payment
    const monthlyPayment = Math.round(financedAmount / 18);
    return {
      monthlyPayment,
      aprLabel: '0.0% Promo APR for 18 Months',
      termLabel: '18 Months (0% APR Promo)',
      totalPrincipal: clampedBudget,
      downPayment,
      financedAmount,
    };
  }

  const annualRate = termMonths === 60 ? 0.0699 : 0.0749;
  const monthlyRate = annualRate / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);
  const exactMonthly = (financedAmount * (monthlyRate * factor)) / (factor - 1);

  return {
    monthlyPayment: Math.round(exactMonthly),
    aprLabel: termMonths === 60 ? '6.99% Fixed APR' : '7.49% Fixed APR',
    termLabel: `${termMonths} Months (${termMonths / 12} Years)`,
    totalPrincipal: clampedBudget,
    downPayment,
    financedAmount,
  };
}

export interface TransformationProject {
  id: string;
  tabLabel: string;
  shortTitle: string;
  neighborhood: string;
  cost: string;
  equityAdded: string;
  timeline: string;
  materialsUsed: string[];
  clientQuote: string;
  clientAuthor: string;
  beforeCaption: string;
  afterCaption: string;
  sceneType: 'oak_to_quartz' | 'tub_to_spa' | 'galley_to_island';
}

export const TRANSFORMATION_PROJECTS: TransformationProject[] = [
  {
    id: 'oak-kitchen',
    tabLabel: "1990s Oak Kitchen to White Quartz Chef's Kitchen",
    shortTitle: 'Westlake Hills Chef Sanctuary',
    neighborhood: 'Westlake Hills · Austin, TX 78746',
    cost: '$42,500 Fixed Proposal',
    equityAdded: '+$34,000 Appraised Value Boost',
    timeline: 'Completed in 24 Days',
    materialsUsed: [
      'Warm Alabaster Inset Shaker Cabinetry',
      'Bookmatched Calacatta Gold Quartz Island',
      'Unlacquered Brushed Brass Brizo Fixtures',
      '7-Inch European White Oak Plank Flooring',
    ],
    clientQuote:
      'Vanguard finished 3 days ahead of schedule. Their ZipWall dust barriers kept our living room spotless, and our morning coffee at the new waterfall island feels like a five-star resort.',
    clientAuthor: 'Lauren & Marcus Vance · Homeowners in Westlake Hills',
    beforeCaption: 'BEFORE: 1994 builder-grade honey oak cabinets, laminate tops & fluorescent box lighting',
    afterCaption: 'AFTER: Custom alabaster shaker millwork, 10ft Calacatta quartz island & brass pendants',
    sceneType: 'oak_to_quartz',
  },
  {
    id: 'spa-bath',
    tabLabel: 'Cramped Tub to Frameless Glass Spa Bath',
    shortTitle: 'Barton Creek Primary Spa Suite',
    neighborhood: 'Barton Creek · Austin, TX 78735',
    cost: '$29,800 Fixed Proposal',
    equityAdded: '+$23,500 Appraised Value Boost',
    timeline: 'Completed in 19 Days',
    materialsUsed: [
      '3/8" Starphire Frameless Glass Enclosure',
      '67" Sculptural Freestanding Soaking Tub',
      'Fluted Rift-Cut White Oak Double Vanity',
      'Heated Large-Format Calacatta Porcelain Tile',
    ],
    clientQuote:
      'We dreaded remodeling because our neighbors waited four months for their contractor. Vanguard staged 100% of our tile and brass fixtures before day one and wrapped up in 19 days flat.',
    clientAuthor: 'Dr. Elena Rostova & David Chen · Homeowners in Barton Creek',
    beforeCaption: 'BEFORE: Cramped beige fiberglass alcove tub, cultured marble top & dim vanity strip',
    afterCaption: 'AFTER: Zero-threshold rain shower, freestanding soaking tub & fluted oak double vanity',
    sceneType: 'tub_to_spa',
  },
  {
    id: 'open-galley',
    tabLabel: 'Closed Galley to Open-Concept Island',
    shortTitle: 'Travis Heights Structural Conversion',
    neighborhood: 'Travis Heights · Austin, TX 78704',
    cost: '$54,000 Fixed Proposal',
    equityAdded: '+$46,500 Appraised Value Boost',
    timeline: 'Completed in 28 Days',
    materialsUsed: [
      'Flush LVL Structural Beam (Wall Removed)',
      'Quarter-Sawn Walnut & Matte Black Millwork',
      'Honed Taj Mahal Quartzite Countertops',
      'Integrated 36" Pro-Range & Concealed Hood',
    ],
    clientQuote:
      'Removing a load-bearing wall terrified us until Vanguard showed us the stamped engineering plan and 3D render in Week 1. Now our kitchen opens right into our dining room.',
    clientAuthor: 'Jonathan & Priya Miller · Homeowners in Travis Heights',
    beforeCaption: 'BEFORE: Narrow closed-off galley kitchen isolated from the dining room by a bearing wall',
    afterCaption: 'AFTER: Open-concept entertaining hub with flush structural beam & 9-foot seating island',
    sceneType: 'galley_to_island',
  },
];

export interface StyleMoodboard {
  id: 'farmhouse' | 'contemporary' | 'coastal';
  name: string;
  tagline: string;
  priceTier: string;
  estimatedRange: string;
  popularIn: string;
  description: string;
  specs: {
    cabinetry: { name: string; finish: string; hex: string };
    stone: { name: string; finish: string; hex: string };
    hardware: { name: string; finish: string; hex: string };
    flooring: { name: string; finish: string; hex: string };
  };
  highlights: string[];
}

export const STYLE_MOODBOARDS: StyleMoodboard[] = [
  {
    id: 'farmhouse',
    name: 'Modern Farmhouse',
    tagline: 'Warm White Shaker Cabinets, Calacatta Gold Quartz, Matte Black Fixtures, White Oak Flooring',
    priceTier: 'Signature Custom Tier · Most Requested in Austin',
    estimatedRange: '$34,000 – $48,000 Typical Investment',
    popularIn: 'Circle C Ranch, Tarrytown & Dripping Springs',
    description:
      'Timeless architectural warmth blending furniture-grade shaker millwork with warm gold-veined quartz and organic wire-brushed European white oak.',
    specs: {
      cabinetry: {
        name: 'Warm White Shaker Cabinets',
        finish: 'Sherwin-Williams Alabaster Catalyzed Conversion Varnish',
        hex: '#F4F1EA',
      },
      stone: {
        name: 'Calacatta Gold Quartz',
        finish: 'Honed 3cm Mitred Edge with Warm Amber & Taupe Veining',
        hex: '#EAE3D5',
      },
      hardware: {
        name: 'Matte Black Fixtures',
        finish: 'Forged PVD Matte Black Pulls & High-Arc Bridge Faucet',
        hex: '#262322',
      },
      flooring: {
        name: 'White Oak Flooring',
        finish: '7" Wide-Plank European White Oak in Matte Natural Oil',
        hex: '#C8A97E',
      },
    },
    highlights: [
      'Custom wood hood canopy with artisan plaster texture',
      'Apron-front fireclay workstation sink with integrated ledges',
      'Soft-close dovetail maple drawers with hidden spice pull-outs',
    ],
  },
  {
    id: 'contemporary',
    name: 'Sleek Contemporary',
    tagline: 'Walnut Flat-Panel Cabinets, Waterfall Concrete/Marble Island, Brushed Brass Hardware, Large Format Slate Tile',
    priceTier: 'Architectural Estate Tier · Gallery Aesthetic',
    estimatedRange: '$42,000 – $62,000 Typical Investment',
    popularIn: 'Downtown Austin, Rollingwood & Westlake',
    description:
      'Clean architectural geometry featuring grain-matched American black walnut slab doors, dramatic bookmatched waterfall stone, and warm knurled brass accents.',
    specs: {
      cabinetry: {
        name: 'Walnut Flat-Panel Cabinets',
        finish: 'Vertical Grain-Matched American Walnut Veneer',
        hex: '#5C3D28',
      },
      stone: {
        name: 'Waterfall Concrete/Marble Island',
        finish: 'Bookmatched Nero & Warm Veined Waterfall Stone',
        hex: '#D6D2CB',
      },
      hardware: {
        name: 'Brushed Brass Hardware',
        finish: 'Satin Knurled Solid Brass Bar Pulls & Integrated LED Channels',
        hex: '#C59341',
      },
      flooring: {
        name: 'Large Format Slate Tile',
        finish: '24"x48" Rectified Charcoal Slate Porcelain with 1/16" Grout',
        hex: '#3F3E3C',
      },
    },
    highlights: [
      'Continuous grain-matched walnut cabinetry with push-to-open uppers',
      'Double-sided waterfall island with concealed induction prep zone',
      'Recessed architectural linear LED task lighting under stone ledges',
    ],
  },
  {
    id: 'coastal',
    name: 'Timeless Coastal Luxury',
    tagline: 'Soft Sage/Navy Island, Carrara Marble Countertops, Champagne Bronze Fixtures, Herringbone Backsplash',
    priceTier: 'Bespoke Designer Tier · Airy & Serene',
    estimatedRange: '$36,000 – $52,000 Typical Investment',
    popularIn: 'Lakeway, Steiner Ranch & Mueller',
    description:
      'Breezy, light-filled refinement pairing a bespoke coastal navy-sage centerpiece island with genuine Italian marble veining and warm champagne bronze jewelry.',
    specs: {
      cabinetry: {
        name: 'Soft Sage/Navy Island',
        finish: 'Bespoke Maritime Slate-Sage Island with Crisp Linen Perimeter',
        hex: '#3A4F59',
      },
      stone: {
        name: 'Carrara Marble Countertops',
        finish: 'Polished Italian Venato Marble with Feathered Cool Grey Veins',
        hex: '#EFECE6',
      },
      hardware: {
        name: 'Champagne Bronze Fixtures',
        finish: 'Warm Muted Champagne Bronze Cup Pulls & Latches',
        hex: '#B89B72',
      },
      flooring: {
        name: 'Herringbone Backsplash',
        finish: 'Hand-Glazed Zellige Artisan Tile in Classic Herringbone Layout',
        hex: '#DCE3E2',
      },
    },
    highlights: [
      'Glass-front mullion display cabinets with warm interior dimming LEDs',
      'Handcrafted Moroccan zellige herringbone full-height backsplash',
      'Custom beverage & espresso pantry concealed behind pocket doors',
    ],
  },
];

export interface TimelineStep {
  week: string;
  title: string;
  subtitle: string;
  deliverables: string[];
  clientProtection: string;
}

export const FIVE_WEEK_TIMELINE: TimelineStep[] = [
  {
    week: 'Week 1',
    title: 'Free 3D Rendering & Upfront Fixed-Price Proposal (Zero Hidden Fees)',
    subtitle: 'See your exact kitchen or bath in photorealistic 3D before spending a dime.',
    deliverables: [
      'Laser LiDAR measurements of your existing room down to 1/16th of an inch',
      'Interactive 3D architectural walkthrough with your exact stone & cabinet picks',
      'Line-item, contractually locked Fixed-Price Proposal with zero surprise change orders',
    ],
    clientProtection: '100% Price-Lock Guarantee: The price you sign is the exact price you pay.',
  },
  {
    week: 'Week 2',
    title: 'Material Procurement & Pre-Construction Prep',
    subtitle: "We don't demolish until 100% of materials are in our warehouse!",
    deliverables: [
      'Every cabinet box, quartz slab, tile lot, and brass valve is received & inspected in our South Austin warehouse',
      'City of Austin building permits pulled and master trade schedule locked in',
      'Pre-construction home walkthrough with your dedicated Project Manager',
    ],
    clientProtection: 'Zero Backorder Limbo: Your kitchen is never torn apart waiting on a delayed truck.',
  },
  {
    week: 'Week 3',
    title: 'Dust-Free Demolition, Plumbing & Electrical',
    subtitle: 'Hospital-grade air filtration and licensed master trades.',
    deliverables: [
      'Floor-to-ceiling ZipWall® magnetic dust containment barriers & negative-air HEPA scrubbers installed',
      'Neoprene floor runners laid from your front door straight to the work zone',
      'Licensed Austin Master Plumbers and Electricians complete rough-ins & recessed lighting grids',
    ],
    clientProtection: 'Daily 5:00 PM Sweep: We vacuum, wipe down, and organize tools before leaving every single day.',
  },
  {
    week: 'Week 4',
    title: 'Precision Cabinetry, Stone Countertops & Tile Installation',
    subtitle: 'Laser-leveled millwork, CNC-cut stone slabs, and artisan tile setting.',
    deliverables: [
      'Custom cabinetry laser-leveled and scribed seamlessly to your walls and ceilings',
      'Digital template & installation of 3cm quartz or natural quartzite countertops',
      'Schluter® waterproof membrane systems and precision tile setting with stain-proof epoxy grout',
    ],
    clientProtection: 'In-House Master Craftsmen: Background-checked W-2 artisans—never random day laborers.',
  },
  {
    week: 'Week 5',
    title: 'White-Glove Walkthrough & 5-Year Craftsmanship Warranty Handover',
    subtitle: 'Final fixture trim-out, deep executive detailing, and warranty activation.',
    deliverables: [
      'Installation of designer plumbing fixtures, under-cabinet lighting, and smart dimmers',
      'White-glove blue-tape inspection alongside your Project Manager',
      'Signed 5-Year bumper-to-bumper Craftsmanship Warranty & stone care kit presentation',
    ],
    clientProtection: '$100/Day On-Time Guarantee: If we miss our promised completion date, we pay you $100 for every day late.',
  },
];
