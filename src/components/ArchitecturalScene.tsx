import React from 'react';

interface ArchitecturalSceneProps {
  variant:
    | 'oak-before'
    | 'quartz-after'
    | 'tub-before'
    | 'spa-after'
    | 'galley-before'
    | 'island-after'
    | 'style-farmhouse'
    | 'style-contemporary'
    | 'style-coastal';
  className?: string;
}

export const ArchitecturalScene: React.FC<ArchitecturalSceneProps> = ({
  variant,
  className = '',
}) => {
  if (variant === 'oak-before') {
    return (
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className={`w-full h-full object-cover select-none ${className}`}
        role="img"
        aria-label="1990s Dated Honey Oak Kitchen Before Remodel"
      >
        <defs>
          <linearGradient id="oakWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8C8AE" />
            <stop offset="100%" stopColor="#BFA989" />
          </linearGradient>
          <linearGradient id="oakCab" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B87A3D" />
            <stop offset="50%" stopColor="#9E6227" />
            <stop offset="100%" stopColor="#7D4918" />
          </linearGradient>
          <linearGradient id="oldTileFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4B499" />
            <stop offset="100%" stopColor="#9B896E" />
          </linearGradient>
          <pattern id="tileGrid90s" width="80" height="45" patternUnits="userSpaceOnUse">
            <rect width="80" height="45" fill="none" stroke="#7A6B53" strokeWidth="2" />
          </pattern>
        </defs>

        {/* Ceiling & Walls */}
        <rect width="1200" height="120" fill="#CFC2AE" />
        <rect y="120" width="1200" height="390" fill="url(#oakWall)" />

        {/* 1990s Fluorescent Drop Ceiling Light Box */}
        <rect x="410" y="18" width="380" height="58" fill="#F2EAD3" stroke="#7D4918" strokeWidth="8" />
        <line x1="505" y1="18" x2="505" y2="76" stroke="#A68053" strokeWidth="3" />
        <line x1="600" y1="18" x2="600" y2="76" stroke="#A68053" strokeWidth="3" />
        <line x1="695" y1="18" x2="695" y2="76" stroke="#A68053" strokeWidth="3" />

        {/* Soffit Bulkhead */}
        <rect x="80" y="105" width="1040" height="48" fill="#BDAA8C" stroke="#9B886C" strokeWidth="2" />

        {/* 4x4 Beige Tile Backsplash */}
        <rect x="100" y="295" width="1000" height="90" fill="#D5C5A8" stroke="#A89677" strokeWidth="1" />

        {/* Upper Honey Oak Arch-Panel Cabinets */}
        {[110, 230, 350, 730, 850, 970].map((x, idx) => (
          <g key={idx} transform={`translate(${x}, 153)`}>
            <rect width="112" height="142" fill="url(#oakCab)" stroke="#5E340E" strokeWidth="3" />
            <path
              d="M 16 125 L 16 32 Q 56 8 96 32 L 96 125 Z"
              fill="none"
              stroke="#522B0A"
              strokeWidth="3"
            />
            <circle cx="98" cy="112" r="4" fill="#4A2F13" />
          </g>
        ))}

        {/* Small Window with Mini-Blinds */}
        <rect x="485" y="160" width="225" height="125" fill="#E6DEC8" stroke="#7D4918" strokeWidth="6" />
        {[178, 194, 210, 226, 242, 258, 274].map((y) => (
          <line key={y} x1="491" y1={y} x2="704" y2={y} stroke="#B8AC93" strokeWidth="3" />
        ))}

        {/* Beige Laminate Countertop */}
        <rect x="85" y="378" width="1030" height="22" fill="#C9B99B" stroke="#8C7B60" strokeWidth="2" />

        {/* Base Honey Oak Cabinets */}
        <rect x="95" y="400" width="1010" height="165" fill="url(#oakCab)" stroke="#5E340E" strokeWidth="3" />
        {[115, 255, 395, 535, 675, 815, 955].map((x, i) => (
          <g key={i} transform={`translate(${x}, 412)`}>
            <rect width="124" height="32" fill="#9E6227" stroke="#522B0A" strokeWidth="2.5" />
            <rect y="42" width="124" height="100" fill="#9E6227" stroke="#522B0A" strokeWidth="2.5" />
          </g>
        ))}

        {/* Dated White Coil-Top Stove */}
        <rect x="525" y="375" width="150" height="190" fill="#E8E4DA" stroke="#8E897E" strokeWidth="3" />
        <rect x="545" y="425" width="110" height="85" fill="#2B2927" />

        {/* 12x12 Grouted Ceramic Tile Floor */}
        <polygon points="0,720 1200,720 1105,565 95,565" fill="url(#oldTileFloor)" />
        <polygon points="0,720 1200,720 1105,565 95,565" fill="url(#tileGrid90s)" opacity="0.6" />

        {/* Cramped Peninsula */}
        <rect x="240" y="485" width="520" height="150" fill="url(#oakCab)" stroke="#4F2A0A" strokeWidth="3" />
        <rect x="225" y="468" width="550" height="20" fill="#D5C6AA" stroke="#8C7B60" strokeWidth="2" />

        {/* Architectural Callout Tag */}
        <g transform="translate(420, 48)">
          <rect width="360" height="32" rx="4" fill="#1C1917" fillOpacity="0.82" />
          <text x="180" y="21" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="600">
            1994 Fluorescent Box &amp; Soffit Bulkhead
          </text>
        </g>
        <g transform="translate(330, 520)">
          <rect width="340" height="32" rx="4" fill="#1C1917" fillOpacity="0.82" />
          <text x="170" y="21" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="600">
            Honey Oak Arch Doors &amp; Laminate Tops
          </text>
        </g>
      </svg>
    );
  }

  if (variant === 'quartz-after' || variant === 'style-farmhouse') {
    return (
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className={`w-full h-full object-cover select-none ${className}`}
        role="img"
        aria-label="Remodeled Luxury Austin Chef Kitchen with Alabaster Shaker Cabinets and Calacatta Gold Waterfall Island"
      >
        <defs>
          <linearGradient id="luxCeiling" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAF8F5" />
            <stop offset="100%" stopColor="#F0ECE3" />
          </linearGradient>
          <linearGradient id="alabasterCab" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7F4EE" />
            <stop offset="100%" stopColor="#EAE4D8" />
          </linearGradient>
          <linearGradient id="whiteOakFloor" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#D6B991" />
            <stop offset="50%" stopColor="#C6A67A" />
            <stop offset="100%" stopColor="#B39164" />
          </linearGradient>
          <linearGradient id="calacattaMarble" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F8F5EF" />
            <stop offset="100%" stopColor="#EFEAE0" />
          </linearGradient>
          <linearGradient id="brassGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <radialGradient id="pendantLightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ceiling & Sunlit Architectural Wall */}
        <rect width="1200" height="90" fill="url(#luxCeiling)" />
        <rect y="90" width="1200" height="450" fill="#F3EFE6" />

        {/* Recessed Canned Ceiling Lights */}
        {[220, 480, 720, 980].map((cx) => (
          <ellipse key={cx} cx={cx} cy="45" rx="22" ry="6" fill="#FFFBEB" stroke="#D6D0C4" strokeWidth="2" />
        ))}

        {/* Slab Calacatta Gold Backsplash with Warm Gold/Taupe Veining */}
        <rect x="90" y="255" width="1020" height="125" fill="url(#calacattaMarble)" />
        <path
          d="M 110 365 Q 240 290 360 320 T 620 275 T 890 340 T 1090 280"
          fill="none"
          stroke="#D4B483"
          strokeWidth="3"
          opacity="0.65"
        />
        <path
          d="M 190 265 Q 320 330 490 300 T 820 355"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.8"
          opacity="0.45"
        />

        {/* Full-Height Custom Inset Alabaster Shaker Uppers */}
        {[95, 225, 355, 725, 855, 985].map((x, idx) => (
          <g key={idx} transform={`translate(${x}, 95)`}>
            <rect width="122" height="162" fill="url(#alabasterCab)" stroke="#D5CFC2" strokeWidth="2" />
            <rect x="14" y="14" width="94" height="134" fill="none" stroke="#C5BEB0" strokeWidth="2" />
            {/* Brushed Brass Pull */}
            <rect x="100" y="112" width="4" height="26" rx="2" fill="url(#brassGlow)" />
          </g>
        ))}

        {/* Custom Plaster Artisan Range Hood with Brushed Brass Strapping */}
        <path
          d="M 495 95 L 705 95 L 718 252 L 482 252 Z"
          fill="#F9F6F0"
          stroke="#D5CFC2"
          strokeWidth="2.5"
        />
        <rect x="482" y="228" width="236" height="10" fill="url(#brassGlow)" />
        <line x1="535" y1="95" x2="528" y2="228" stroke="url(#brassGlow)" strokeWidth="4" />
        <line x1="665" y1="95" x2="672" y2="228" stroke="url(#brassGlow)" strokeWidth="4" />

        {/* Perimeter Quartz Countertop */}
        <rect x="80" y="376" width="1040" height="16" fill="#FFFFFF" stroke="#D6CFC2" strokeWidth="1.5" />

        {/* Perimeter Shaker Base Cabinets + 48" Pro Chef Range */}
        <rect x="90" y="392" width="1020" height="160" fill="url(#alabasterCab)" stroke="#CFC8BA" strokeWidth="2" />
        {[105, 245, 375, 735, 865, 985].map((x, i) => (
          <g key={i} transform={`translate(${x}, 402)`}>
            <rect width="115" height="34" fill="#F5F2EB" stroke="#C8C0B0" strokeWidth="1.5" />
            <rect x="46" y="15" width="24" height="4" rx="2" fill="url(#brassGlow)" />
            <rect y="44" width="115" height="96" fill="#F5F2EB" stroke="#C8C0B0" strokeWidth="1.5" />
            <rect x="46" y="56" width="24" height="4" rx="2" fill="url(#brassGlow)" />
          </g>
        ))}

        {/* 48" Dual-Fuel Professional Range with Brass Knobs */}
        <rect x="500" y="378" width="200" height="174" fill="#292524" stroke="#1C1917" strokeWidth="3" />
        <rect x="500" y="382" width="200" height="28" fill="#1C1917" />
        {[520, 545, 570, 595, 620, 645, 675].map((kx) => (
          <circle key={kx} cx={kx} cy="396" r="6" fill="url(#brassGlow)" />
        ))}
        <rect x="516" y="422" width="80" height="106" rx="3" fill="#1C1917" stroke="url(#brassGlow)" strokeWidth="2" />
        <rect x="606" y="422" width="78" height="106" rx="3" fill="#1C1917" stroke="url(#brassGlow)" strokeWidth="2" />

        {/* European White Oak Wide-Plank Flooring */}
        <polygon points="0,720 1200,720 1110,552 90,552" fill="url(#whiteOakFloor)" />
        {[580, 615, 655, 695].map((y) => (
          <line key={y} x1="20" y1={y} x2="1180" y2={y} stroke="#9C7A4E" strokeWidth="1.5" opacity="0.5" />
        ))}

        {/* Expansive 10-Foot Bookmatched Calacatta Gold Waterfall Island */}
        <g transform="translate(185, 455)">
          {/* Island Shadow */}
          <ellipse cx="415" cy="225" rx="430" ry="22" fill="#1C1917" opacity="0.22" />
          {/* Island Base Dark Charcoal / Navy or Warm Alabaster */}
          <rect x="26" y="28" width="778" height="186" fill="#292524" />
          {/* Fluted Oak Panel Detail on Island Back */}
          {Array.from({ length: 26 }).map((_, idx) => (
            <rect
              key={idx}
              x={55 + idx * 28}
              y="38"
              width="20"
              height="168"
              fill="#3A3431"
              stroke="#1C1917"
              strokeWidth="1"
            />
          ))}
          {/* Thick Mitred Calacatta Gold Top + Left/Right Waterfall Legs */}
          <rect x="0" y="0" width="830" height="32" fill="url(#calacattaMarble)" stroke="#D9D2C5" strokeWidth="1.5" />
          <rect x="0" y="0" width="32" height="215" fill="url(#calacattaMarble)" stroke="#D9D2C5" strokeWidth="1.5" />
          <rect x="798" y="0" width="32" height="215" fill="url(#calacattaMarble)" stroke="#D9D2C5" strokeWidth="1.5" />

          {/* Bookmatched Gold & Taupe Veining Across Waterfall Island */}
          <path
            d="M 6 195 L 28 24 Q 240 8 440 22 T 802 18 L 824 190"
            fill="none"
            stroke="#C89D54"
            strokeWidth="3.5"
            opacity="0.7"
          />
          <path
            d="M 18 140 L 30 14 Q 310 26 590 12 T 808 120"
            fill="none"
            stroke="#8B7E6A"
            strokeWidth="1.6"
            opacity="0.45"
          />

          {/* Unlacquered Brass Gooseneck Faucet on Island Workstation Sink */}
          <path
            d="M 415 2 L 415 -42 Q 415 -68 442 -68 Q 465 -68 465 -38"
            fill="none"
            stroke="url(#brassGlow)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Designer Upholstered Counter Stools */}
          {[140, 365, 590].map((sx) => (
            <g key={sx} transform={`translate(${sx}, 85)`}>
              <rect x="0" y="0" width="96" height="42" rx="10" fill="#DFD8CA" stroke="#B8AFA0" strokeWidth="2" />
              <line x1="16" y1="42" x2="10" y2="140" stroke="#1C1917" strokeWidth="5" />
              <line x1="80" y1="42" x2="86" y2="140" stroke="#1C1917" strokeWidth="5" />
              <line x1="13" y1="98" x2="83" y2="98" stroke="url(#brassGlow)" strokeWidth="3.5" />
            </g>
          ))}
        </g>

        {/* Sculptural Brushed Brass & Alabaster Glass Pendants */}
        {[360, 600, 840].map((px) => (
          <g key={px}>
            <circle cx={px} cy="220" r="85" fill="url(#pendantLightGlow)" />
            <line x1={px} y1="0" x2={px} y2="188" stroke="url(#brassGlow)" strokeWidth="3" />
            <path
              d={`M ${px - 36} 215 Q ${px} 172 ${px + 36} 215 Z`}
              fill="url(#brassGlow)"
            />
            <ellipse cx={px} cy="218" rx="22" ry="12" fill="#FFFBEB" />
          </g>
        ))}

        {/* Architectural Spec Callout */}
        <g transform="translate(765, 412)">
          <rect width="380" height="32" rx="4" fill="#1C1917" fillOpacity="0.88" />
          <text x="190" y="21" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="600">
            3cm Bookmatched Calacatta Gold Waterfall Island
          </text>
        </g>
      </svg>
    );
  }

  if (variant === 'tub-before') {
    return (
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className={`w-full h-full object-cover select-none ${className}`}
        role="img"
        aria-label="1990s Cramped Beige Fiberglass Tub Bathroom Before Remodel"
      >
        <rect width="1200" height="720" fill="#D5C7B2" />
        {/* Partition Wall */}
        <rect x="640" y="80" width="40" height="500" fill="#B8A68E" />
        {/* Fiberglass Alcove Tub & 4x4 Beige Tile Surround */}
        <rect x="90" y="130" width="550" height="320" fill="#DFD3BE" stroke="#9C8B72" strokeWidth="3" />
        {[170, 210, 250, 290, 330, 370, 410].map((y) => (
          <line key={y} x1="90" y1={y} x2="640" y2={y} stroke="#B5A48B" strokeWidth="2" />
        ))}
        {/* Cramped Beige Apron Tub */}
        <rect x="90" y="430" width="550" height="150" rx="8" fill="#E5DAC6" stroke="#998870" strokeWidth="4" />
        {/* Shower Curtain Rod */}
        <line x1="90" y1="145" x2="640" y2="145" stroke="#8C7A62" strokeWidth="6" />
        <path d="M 95 145 L 250 145 L 265 560 L 95 560 Z" fill="#C4B59E" opacity="0.85" />

        {/* Dated Cultured Marble Single Vanity */}
        <rect x="720" y="410" width="380" height="170" fill="#9E652E" stroke="#5C3612" strokeWidth="3" />
        <rect x="710" y="390" width="400" height="22" fill="#E8DEC8" />
        {/* Hollywood Strip Light Bar & Unframed Mirror */}
        <rect x="740" y="185" width="340" height="185" fill="#B5C0C4" stroke="#8F7D65" strokeWidth="4" />
        <rect x="770" y="140" width="280" height="22" fill="#B89246" />
        {[795, 845, 895, 945, 995, 1030].map((cx) => (
          <circle key={cx} cx={cx} cy="151" r="11" fill="#FFF3C4" />
        ))}

        {/* Floor */}
        <polygon points="0,720 1200,720 1120,580 80,580" fill="#B8A589" />

        <g transform="translate(150, 485)">
          <rect width="420" height="34" rx="4" fill="#1C1917" fillOpacity="0.82" />
          <text x="210" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="600">
            Fiberglass Alcove Tub &amp; Grout-Stained 4x4 Tile
          </text>
        </g>
      </svg>
    );
  }

  if (variant === 'spa-after') {
    return (
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className={`w-full h-full object-cover select-none ${className}`}
        role="img"
        aria-label="Luxury Frameless Glass Spa Bathroom and Freestanding Tub After Remodel"
      >
        <defs>
          <linearGradient id="spaWall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F7F5F0" />
            <stop offset="100%" stopColor="#E9E4DA" />
          </linearGradient>
          <linearGradient id="flutedOak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A87C" />
            <stop offset="100%" stopColor="#B38E5E" />
          </linearGradient>
        </defs>

        {/* Large-Format Bookmatched Calacatta Porcelain Walls */}
        <rect width="1200" height="575" fill="url(#spaWall)" />
        <path
          d="M 80 520 Q 260 320 420 260 T 760 110"
          fill="none"
          stroke="#D4BC94"
          strokeWidth="3.5"
          opacity="0.55"
        />
        <path
          d="M 160 140 Q 410 290 640 440 T 1080 310"
          fill="none"
          stroke="#C2B9A7"
          strokeWidth="2"
          opacity="0.45"
        />

        {/* Heated Charcoal & Alabaster Spa Floor */}
        <polygon points="0,720 1200,720 1120,575 80,575" fill="#DFDAD0" />

        {/* Zero-Threshold Walk-In Rain Shower with 3/8" Starphire Frameless Glass */}
        <g transform="translate(85, 65)">
          {/* Illuminated Recessed Marble Niche */}
          <rect x="85" y="195" width="210" height="90" fill="#EAE2D3" stroke="#C59341" strokeWidth="2.5" />
          <rect x="87" y="197" width="206" height="8" fill="#FDE68A" opacity="0.85" />
          {/* Ceiling Rainfall Showerhead + Brass Mixing Valve */}
          <rect x="160" y="0" width="65" height="8" fill="#D97706" />
          <line x1="192" y1="8" x2="192" y2="38" stroke="#D97706" strokeWidth="4" />
          <rect x="148" y="38" width="88" height="10" rx="3" fill="#B45309" />
          {/* Frameless Glass Enclosure Panel */}
          <rect
            x="0"
            y="0"
            width="430"
            height="510"
            fill="#E0F2FE"
            fillOpacity="0.18"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          {/* Brass Glass Clamps & Handle */}
          <rect x="416" y="60" width="18" height="14" fill="#B45309" />
          <rect x="416" y="430" width="18" height="14" fill="#B45309" />
          <rect x="385" y="230" width="6" height="68" rx="3" fill="#B45309" />
        </g>

        {/* Sculptural 67" Freestanding Soaking Tub */}
        <g transform="translate(360, 415)">
          <ellipse cx="165" cy="185" rx="165" ry="18" fill="#1C1917" opacity="0.16" />
          <path
            d="M 15 30 Q 165 44 315 30 L 292 168 Q 165 186 38 168 Z"
            fill="#FFFFFF"
            stroke="#E5E0D5"
            strokeWidth="3"
          />
          {/* Floor-Mounted Brass Tub Filler */}
          <line x1="305" y1="-35" x2="305" y2="155" stroke="#B45309" strokeWidth="6" />
          <path d="M 305 -35 Q 280 -50 272 -18" fill="none" stroke="#B45309" strokeWidth="6" />
        </g>

        {/* Floating Fluted White Oak Double Vanity + Backlit Arch Mirrors */}
        <g transform="translate(720, 115)">
          {[28, 228].map((mx) => (
            <g key={mx}>
              <rect
                x={mx - 4}
                y="-4"
                width="156"
                height="238"
                rx="78"
                fill="none"
                stroke="#FDE68A"
                strokeWidth="6"
                opacity="0.7"
              />
              <rect
                x={mx}
                y="0"
                width="148"
                height="230"
                rx="74"
                fill="#E2E8F0"
                stroke="#B45309"
                strokeWidth="3.5"
              />
            </g>
          ))}

          {/* Quartz Countertop + Undermount Sinks */}
          <rect x="0" y="265" width="410" height="22" fill="#FFFFFF" stroke="#D6CFC2" strokeWidth="1.5" />
          {/* Floating Fluted Rift-Oak Vanity Cabinet */}
          <rect x="6" y="287" width="398" height="135" fill="url(#flutedOak)" stroke="#8F6B3E" strokeWidth="2" />
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1={18 + i * 16}
              y1="289"
              x2={18 + i * 16}
              y2="420"
              stroke="#8C673A"
              strokeWidth="2"
              opacity="0.65"
            />
          ))}
        </g>

        <g transform="translate(105, 595)">
          <rect width="465" height="34" rx="4" fill="#1C1917" fillOpacity="0.88" />
          <text x="232" y="22" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="600">
            Zero-Threshold Starphire Glass Shower &amp; Soaking Tub
          </text>
        </g>
      </svg>
    );
  }

  if (variant === 'galley-before') {
    return (
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className={`w-full h-full object-cover select-none ${className}`}
        role="img"
        aria-label="Closed-Off Narrow Galley Kitchen Before Structural Wall Removal"
      >
        <rect width="1200" height="720" fill="#C9BCA6" />
        {/* Load-Bearing Partition Wall Blocking View */}
        <rect x="290" y="0" width="620" height="580" fill="#BEB098" stroke="#8C7E68" strokeWidth="4" />
        {/* Narrow Doorway Opening */}
        <rect x="470" y="135" width="240" height="445" fill="#7D6B54" stroke="#5C4D3B" strokeWidth="8" />
        {/* Cramped Galley Corridor Cabinets Inside */}
        <rect x="485" y="180" width="75" height="390" fill="#634121" />
        <rect x="620" y="180" width="75" height="390" fill="#634121" />
        <polygon points="0,720 1200,720 1050,580 150,580" fill="#8C775B" />

        <g transform="translate(380, 75)">
          <rect width="440" height="36" rx="4" fill="#1C1917" fillOpacity="0.88" />
          <text x="220" y="23" textAnchor="middle" fill="#FAF8F5" fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="600">
            Load-Bearing Partition Wall Isolating Kitchen
          </text>
        </g>
      </svg>
    );
  }

  if (variant === 'island-after' || variant === 'style-contemporary') {
    return (
      <svg
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        className={`w-full h-full object-cover select-none ${className}`}
        role="img"
        aria-label="Sleek Contemporary Open-Concept Walnut and Marble Waterfall Kitchen"
      >
        <defs>
          <linearGradient id="walnutGrain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B442A" />
            <stop offset="50%" stopColor="#52331E" />
            <stop offset="100%" stopColor="#3B2313" />
          </linearGradient>
          <linearGradient id="slateFloor" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#3F3E3C" />
            <stop offset="100%" stopColor="#292826" />
          </linearGradient>
        </defs>

        {/* Flush LVL Structural Ceiling Beam + Warm Alabaster Ceiling */}
        <rect width="1200" height="85" fill="#F5F2EB" />
        <rect x="60" y="65" width="1080" height="26" fill="#4A301D" />

        {/* Architectural Back Wall */}
        <rect y="91" width="1200" height="465" fill="#EAE5DC" />

        {/* Bookmatched Taj Mahal / Concrete-Marble Full-Height Backsplash */}
        <rect x="110" y="240" width="980" height="145" fill="#DFDBD2" />
        <path
          d="M 130 350 Q 340 265 560 310 T 1050 260"
          fill="none"
          stroke="#B45309"
          strokeWidth="2.5"
          opacity="0.55"
        />

        {/* Grain-Matched American Walnut Slab Upper Cabinetry */}
        {[110, 250, 390, 670, 810, 950].map((x, idx) => (
          <rect
            key={idx}
            x={x}
            y="95"
            width="136"
            height="145"
            fill="url(#walnutGrain)"
            stroke="#2E1B0E"
            strokeWidth="2"
          />
        ))}
        {/* Concealed Flush Architectural Hood */}
        <rect x="530" y="95" width="136" height="145" fill="#292524" stroke="#1C1917" strokeWidth="2" />

        {/* Warm Integrated LED Task Strip */}
        <rect x="110" y="240" width="980" height="5" fill="#FDE68A" />

        {/* Walnut Base Cabinets */}
        <rect x="110" y="385" width="980" height="170" fill="url(#walnutGrain)" stroke="#2E1B0E" strokeWidth="2" />
        {[125, 285, 445, 605, 765, 925].map((bx) => (
          <rect key={bx} x={bx} y="400" width="140" height="5" rx="2" fill="#D97706" />
        ))}

        {/* Large-Format Rectified Slate Tile Flooring */}
        <polygon points="0,720 1200,720 1100,555 100,555" fill="url(#slateFloor)" />

        {/* Waterfall Concrete & Veined Marble Island */}
        <g transform="translate(190, 455)">
          <rect x="24" y="28" width="772" height="185" fill="url(#walnutGrain)" />
          <rect x="0" y="0" width="820" height="30" fill="#E5E1D8" />
          <rect x="0" y="0" width="30" height="213" fill="#E5E1D8" />
          <rect x="790" y="0" width="30" height="213" fill="#E5E1D8" />
          <path
            d="M 12 195 L 24 18 Q 390 8 798 20 L 808 195"
            fill="none"
            stroke="#C59341"
            strokeWidth="3"
            opacity="0.75"
          />
        </g>

        {/* Architectural Linear Brass Suspension Light */}
        <line x1="380" y1="65" x2="380" y2="195" stroke="#D97706" strokeWidth="2.5" />
        <line x1="820" y1="65" x2="820" y2="195" stroke="#D97706" strokeWidth="2.5" />
        <rect x="310" y="195" width="580" height="10" rx="5" fill="#D97706" />
        <rect x="320" y="205" width="560" height="4" fill="#FEF08A" />
      </svg>
    );
  }

  // Default: 'style-coastal' (Timeless Coastal Luxury)
  return (
    <svg
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full object-cover select-none ${className}`}
      role="img"
      aria-label="Timeless Coastal Luxury Kitchen with Soft Sage-Navy Island and Carrara Marble"
    >
      <rect width="1200" height="90" fill="#FAF8F5" />
      <rect y="90" width="1200" height="465" fill="#F2F5F4" />

      {/* Hand-Glazed Herringbone Tile Backsplash */}
      <rect x="100" y="245" width="1000" height="135" fill="#DCE3E2" />
      {Array.from({ length: 22 }).map((_, i) => (
        <path
          key={i}
          d={`M ${120 + i * 44} 255 L ${142 + i * 44} 285 L ${120 + i * 44} 315 L ${142 + i * 44} 345 L ${120 + i * 44} 375`}
          fill="none"
          stroke="#BAC6C5"
          strokeWidth="2"
        />
      ))}

      {/* Glass-Front Mullion Linen Upper Cabinets */}
      {[105, 245, 385, 685, 825, 965].map((x, idx) => (
        <g key={idx} transform={`translate(${x}, 95)`}>
          <rect width="128" height="150" fill="#FAF8F5" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="14" y="14" width="100" height="122" fill="#E0F2FE" fillOpacity="0.45" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="64" y1="14" x2="64" y2="136" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="14" y1="75" x2="114" y2="75" stroke="#CBD5E1" strokeWidth="2" />
        </g>
      ))}

      {/* Crisp Perimeter Cabinetry + Carrara Countertop */}
      <rect x="95" y="380" width="1010" height="16" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="100" y="396" width="1000" height="158" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />

      {/* Warm Light White Oak Floor */}
      <polygon points="0,720 1200,720 1100,554 100,554" fill="#DFCBB2" />

      {/* Bespoke Soft Sage / Coastal Navy Centerpiece Island with Carrara Marble Top */}
      <g transform="translate(190, 455)">
        <rect x="20" y="26" width="780" height="186" fill="#3A4F59" stroke="#273840" strokeWidth="2" />
        {[60, 250, 440, 630].map((dx) => (
          <g key={dx}>
            <rect x={dx} y="44" width="160" height="148" fill="none" stroke="#526B77" strokeWidth="2" />
            <rect x={dx + 66} y="62" width="28" height="6" rx="3" fill="#B89B72" />
          </g>
        ))}
        {/* Italian Carrara Venato Marble Countertop */}
        <rect x="0" y="0" width="820" height="28" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <path
          d="M 25 14 Q 250 4 490 19 T 795 10"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2.5"
          opacity="0.65"
        />
      </g>
    </svg>
  );
};
