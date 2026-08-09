/**
 * Iconografía propia — trazo grueso, sombreado caricaturesco y luces especulares
 * al estilo Warcraft / Hearthstone. Todo es SVG dibujado a mano (sin librerías).
 */

type P = { className?: string | undefined; title?: string | undefined };

const OUT = "#1b1109";

function Svg({ className, title, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

/* ---------------- Recompensas ---------------- */

export function GoldCoinIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <defs>
        <radialGradient id="gc-face" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fff3bd" />
          <stop offset="45%" stopColor="#f2c14b" />
          <stop offset="100%" stopColor="#95611a" />
        </radialGradient>
      </defs>
      <ellipse cx="24" cy="27" rx="18" ry="17" fill="#6d4212" stroke={OUT} strokeWidth="2.5" />
      <circle cx="24" cy="23" r="18" fill="url(#gc-face)" stroke={OUT} strokeWidth="2.5" />
      <circle cx="24" cy="23" r="13" fill="none" stroke="#8a5a17" strokeWidth="2" opacity=".7" />
      <path
        d="M24 14l3 6 6 .8-4.4 4.2 1.1 6L24 28.2 18.3 31l1.1-6L15 20.8l6-.8z"
        fill="#8a5a17"
        opacity=".75"
      />
      <path d="M14 15.5c2-3 5-5 8.5-5.6" stroke="#fff8d8" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".85" />
    </Svg>
  );
}

export function XpCrystalIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <defs>
        <linearGradient id="xp-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8ffd0" />
          <stop offset="55%" stopColor="#37c96f" />
          <stop offset="100%" stopColor="#0e5c31" />
        </linearGradient>
      </defs>
      <path
        d="M24 3l13 12-13 30L11 15z"
        fill="url(#xp-a)"
        stroke={OUT}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M24 3l0 42" stroke="#0e5c31" strokeWidth="2" opacity=".6" />
      <path d="M11 15h26" stroke="#0e5c31" strokeWidth="2" opacity=".5" />
      <path d="M24 6.5L20 15l4 24" fill="#d7ffe7" opacity=".55" />
      <path d="M17 10.5l4-4.5" stroke="#f3fff7" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

export function StreakFlameIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <defs>
        <radialGradient id="fl-a" cx="50%" cy="72%" r="70%">
          <stop offset="0%" stopColor="#ffe9a8" />
          <stop offset="45%" stopColor="#ff9d2e" />
          <stop offset="100%" stopColor="#a02a10" />
        </radialGradient>
      </defs>
      <path
        d="M24 3c1.5 8-6 10-6 17 0 3-2 3.5-2.5 1C12 25 10 30 10 33.5 10 41 16.5 45 24 45s14-4 14-11.5c0-9-6.5-12-8.5-19C28.3 10 26.7 6 24 3z"
        fill="url(#fl-a)"
        stroke={OUT}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 24c3 4 5 6.5 5 10.5S26.8 41 24 41s-5-2.5-5-6.5S21 28 24 24z"
        fill="#ffe9a8"
        opacity=".9"
      />
    </Svg>
  );
}

/* ---------------- Categorías ---------------- */

// Entrenamiento — martillo de guerra
export function ForgeHammerIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <path d="M18 30L9 39a3.5 3.5 0 005 5l9-9z" fill="#7a4a20" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path
        d="M25 8l15 15-6 6-3.5-3.5-6.5 6.5-8-8 6.5-6.5L19 14z"
        fill="#c9ced6"
        stroke={OUT}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M27 11l11 11" stroke="#f2f6fb" strokeWidth="3" strokeLinecap="round" opacity=".8" />
      <path d="M20 24l4 4" stroke="#8c939d" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

// Estudio — grimorio
export function GrimoireIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <path d="M8 10c6-3 12-3 16 1v29c-4-4-10-4-16-1z" fill="#e8d7ac" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M40 10c-6-3-12-3-16 1v29c4-4 10-4 16-1z" fill="#cdb887" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M4 12l4-2v29l-4 2z" fill="#7a2a22" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M44 12l-4-2v29l4 2z" fill="#7a2a22" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 18v10M19 23h10" stroke="#3f79d6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="23" r="7" fill="none" stroke="#3f79d6" strokeWidth="2" opacity=".55" />
    </Svg>
  );
}

// Hogar — hogar de piedra / fortaleza
export function HearthIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <path d="M6 22L24 7l18 15v3H6z" fill="#8b8f96" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M9 25h30v16H9z" fill="#6f7278" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M17 41V32a7 7 0 0114 0v9z" fill="#2a1b10" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 41c-3 0-5-2-5-4.5S22 33 24 30c2 3 5 4 5 6.5S27 41 24 41z" fill="#ff9d2e" />
      <path d="M12 28h6M30 28h6" stroke="#4f5257" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

// Social — estandarte del clan
export function BannerIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <path d="M10 5h28v26l-14 8-14-8z" fill="#2f5fa8" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 5v34" stroke="#1e3f74" strokeWidth="2" opacity=".7" />
      <path d="M7 3h34l-3 5H10z" fill="#e2b64b" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 14l3.5 6.5L34 22l-5 4.5 1.2 6.5L24 30l-6.2 3 1.2-6.5L14 22l6.5-1.5z" fill="#f2d489" stroke={OUT} strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 40h4v5h-4z" fill="#7a4a20" stroke={OUT} strokeWidth="2" />
    </Svg>
  );
}

// Salud — poción de vitalidad
export function PotionIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <path d="M19 6h10v7l7 12a12 12 0 11-24 0l7-12z" fill="#cfe3f2" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M13.5 26h21A12 12 0 0124 44a12 12 0 01-10.5-18z" fill="#d63a3a" stroke={OUT} strokeWidth="2" />
      <path d="M17 4h14v4H17z" fill="#7a4a20" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="19" cy="33" rx="2.6" ry="4" fill="#ffd0d0" opacity=".75" transform="rotate(-20 19 33)" />
      <circle cx="28" cy="31" r="2" fill="#ff9a9a" opacity=".8" />
    </Svg>
  );
}

// Creatividad — pluma de bardo
export function QuillIcon({ className, title }: P) {
  return (
    <Svg className={className} title={title}>
      <path
        d="M42 5C27 6 15 14 11 27c-1.5 5-2 8-4 11l4 4c3-2 6-2.5 11-4C35 34 41 21 42 5z"
        fill="#a86bd8"
        stroke={OUT}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M38 9C28 15 20 24 13 38" stroke="#3a1a52" strokeWidth="2.5" strokeLinecap="round" opacity=".7" />
      <path d="M24 13c-3 5-4 9-4 13M32 10c-4 6-6 11-7 16" stroke="#e0c6f5" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <path d="M11 38l-6 6" stroke={OUT} strokeWidth="3.5" strokeLinecap="round" />
    </Svg>
  );
}

export type GameIcon = (p: P) => React.ReactElement;
