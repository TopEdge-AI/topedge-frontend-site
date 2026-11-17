/** Product imagery: a studio-lit shoe render and the real linen-shirt photo. */

export function ShoeShot({ w = '100%', h = '100%', bg = true }: { w?: number | string; h?: number | string; bg?: boolean }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: bg ? 'radial-gradient(90% 80% at 50% 30%, #F4F9FF 0%, #DCEBFA 55%, #C9DDF2 100%)' : undefined }}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '6% 4% 2%', width: '92%', height: '92%' }}>
        <defs>
          <linearGradient id="upper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="0.55" stopColor="#4338CA" />
            <stop offset="1" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id="toe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#818CF8" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#EEF0F6" />
            <stop offset="1" stopColor="#D5D9E4" />
          </linearGradient>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
        </defs>
        <ellipse cx="205" cy="205" rx="160" ry="11" fill="#2B3A67" opacity="0.28" filter="url(#soft)" />
        {/* outsole */}
        <path d="M44 178 C44 192 58 199 80 199 L330 199 C356 199 372 190 372 176 L370 170 L46 170 Z" fill="#3F3F52" />
        {/* midsole */}
        <path d="M42 160 C40 178 54 190 82 190 L326 190 C352 190 370 182 372 164 C373 152 366 146 352 146 L70 150 C54 150 43 152 42 160 Z" fill="url(#mid)" />
        <path d="M70 172 C140 168 250 168 352 170" stroke="#C7CCDA" strokeWidth="2" fill="none" />
        {/* upper */}
        <path d="M58 152 C60 128 82 112 120 104 C150 98 168 82 182 62 C190 50 206 44 224 46 L262 50 C276 52 284 60 288 74 C294 96 312 112 340 122 C360 129 370 140 368 150 L360 152 Z" fill="url(#upper)" />
        {/* toe cap */}
        <path d="M58 152 C60 130 80 116 112 108 C122 120 128 136 128 152 Z" fill="url(#toe)" opacity="0.9" />
        {/* heel counter */}
        <path d="M262 50 C276 52 284 60 288 74 C294 96 312 112 340 122 C352 126 362 134 366 142 L300 146 C296 118 286 82 262 50 Z" fill="#3730A3" opacity="0.85" />
        {/* accent band */}
        <path d="M118 140 C170 128 220 104 270 92 C282 89 292 92 296 100 C250 112 196 136 140 150 Z" fill="#fff" opacity="0.92" />
        {/* collar + tab */}
        <path d="M182 62 C200 66 236 66 262 50" stroke="#1E1B4B" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M262 50 L270 30 C272 26 278 26 280 30 L284 58" fill="#4F46E5" stroke="#312E81" strokeWidth="2" />
        {/* laces */}
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${150 + i * 12} ${96 - i * 9} l18 6`} stroke="#F8FAFC" strokeWidth="4.5" strokeLinecap="round" />
        ))}
        {/* sheen */}
        <path d="M70 140 C120 112 200 70 250 56 L256 64 C206 80 130 122 80 148 Z" fill="url(#sheen)" />
      </svg>
    </div>
  );
}

export function ShirtShot({ w = '100%', h = '100%' }: { w?: number | string; h?: number | string }) {
  return (
    <div style={{ width: w, height: h, background: '#F6F2EC', position: 'relative', overflow: 'hidden' }}>
      <img src="/marketing/journeys/product-linen-shirt.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
    </div>
  );
}

/** Glow Co hydrating gel serum on a blush backdrop (SVG render). */
export function SerumShot({ w = '100%', h = '100%' }: { w?: number | string; h?: number | string }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: 'radial-gradient(90% 80% at 50% 30%, #FFF4F1 0%, #F9DCD5 60%, #F0C3B8 100%)' }}>
      <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8% 10%', width: '80%', height: '84%' }}>
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E9A48F" />
            <stop offset="0.35" stopColor="#F7C9B9" />
            <stop offset="0.6" stopColor="#E7A08A" />
            <stop offset="1" stopColor="#C8603F" />
          </linearGradient>
          <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2B2B2E" /><stop offset="0.4" stopColor="#5A5A60" /><stop offset="1" stopColor="#1C1C1E" /></linearGradient>
          <filter id="sh" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        <ellipse cx="100" cy="226" rx="52" ry="7" fill="#7A3A28" opacity="0.25" filter="url(#sh)" />
        <rect x="80" y="20" width="40" height="44" rx="8" fill="url(#cap)" />
        <rect x="88" y="6" width="24" height="20" rx="6" fill="#3A3A3E" />
        <rect x="64" y="60" width="72" height="166" rx="20" fill="url(#glass)" />
        <rect x="72" y="112" width="56" height="64" rx="6" fill="#FFF8F4" opacity="0.92" />
        <text x="100" y="134" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fill="#8A3B22">G</text>
        <text x="100" y="152" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1.5" fill="#8A3B22">HYDRATING</text>
        <text x="100" y="164" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1.5" fill="#8A3B22">GEL SERUM</text>
        <rect x="70" y="66" width="9" height="150" rx="4.5" fill="#fff" opacity="0.35" />
      </svg>
    </div>
  );
}

/** Nova Home Smart Doorbell Ultra on a warm wall (SVG render). */
export function DoorbellShot({ w = '100%', h = '100%', tag }: { w?: number | string; h?: number | string; tag?: string }) {
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: 'linear-gradient(90deg,#EFE6DA 0%,#E8DCCB 58%,#B98A5E 58%,#A87A50 100%)' }}>
      <div style={{ position: 'absolute', left: '58%', right: 0, top: 0, bottom: 0, backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.10) 0 2px, transparent 2px 38px)' }} />
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', left: '30%', top: '10%', width: '40%', height: '80%' }}>
        <defs>
          <linearGradient id="db" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2A2A2E" /><stop offset="0.45" stopColor="#4A4A50" /><stop offset="1" stopColor="#1A1A1D" /></linearGradient>
          <radialGradient id="lens" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stopColor="#5B6CFF" /><stop offset="0.4" stopColor="#1B1F3A" /><stop offset="1" stopColor="#05060C" /></radialGradient>
          <filter id="dbs" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        <rect x="70" y="26" width="64" height="156" rx="30" fill="#000" opacity="0.25" filter="url(#dbs)" transform="translate(6 6)" />
        <rect x="68" y="20" width="64" height="156" rx="30" fill="url(#db)" />
        <circle cx="100" cy="64" r="20" fill="url(#lens)" stroke="#111" strokeWidth="3" />
        <circle cx="94" cy="58" r="5" fill="#fff" opacity="0.35" />
        <circle cx="100" cy="136" r="17" fill="#2E2E33" stroke="#5DE0B1" strokeWidth="3" />
        <rect x="76" y="27" width="6" height="140" rx="3" fill="#fff" opacity="0.12" />
      </svg>
      {tag ? <span style={{ position: 'absolute', left: 10, top: 10, background: '#111', color: '#fff', fontWeight: 700, fontSize: 13, borderRadius: 7, padding: '3px 7px' }}>{tag}</span> : null}
    </div>
  );
}
