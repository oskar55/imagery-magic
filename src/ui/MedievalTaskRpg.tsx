/**
 * Medieval Task RPG — UI unificada.
 *
 * Todo el código de interfaz (datos de ejemplo, iconos SVG propios, tarjetas,
 * mapa de misiones, shell y pantallas) vive en este único archivo para que sea
 * fácil de exportar/portar. Los estilos viven en src/styles.css.
 */

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  Info,
  Lock,
  Plus,
  Repeat,
  RotateCcw,
  Scroll,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import emblem from "@/assets/emblem-clean.png.asset.json";
import chest from "@/assets/chest.png.asset.json";
import mapBg from "@/assets/map-bg.jpg.asset.json";


/* ==================================================================
 * 1. Iconos propios (SVG)
 * ================================================================== */

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


/* ==================================================================
 * 2. Modelo de datos y datos de ejemplo
 * ================================================================== */

export type Categoria =
  | "entrenamiento"
  | "estudio"
  | "hogar"
  | "social"
  | "salud"
  | "creatividad";

export type Dificultad = "facil" | "media" | "dificil";
export type TipoMision = "unica" | "diaria";

export interface Quest {
  id: string;
  title: string;
  description?: string;
  type: TipoMision;
  category: Categoria;
  difficulty: Dificultad;
  isCompleted: boolean;
  completedAt?: string | undefined;
  xpReward: number;
  goldReward: number;
  archived: boolean;
  order: number;
}

export const CATEGORIAS: Record<
  Categoria,
  { label: string; atributo: string; icon: GameIcon }
> = {
  entrenamiento: { label: "Entrenamiento", atributo: "Fuerza", icon: ForgeHammerIcon },
  estudio: { label: "Estudio", atributo: "Inteligencia", icon: GrimoireIcon },
  hogar: { label: "Hogar", atributo: "Disciplina", icon: HearthIcon },
  social: { label: "Social", atributo: "Carisma", icon: BannerIcon },
  salud: { label: "Salud", atributo: "Vitalidad", icon: PotionIcon },
  creatividad: { label: "Creatividad", atributo: "Sabiduría", icon: QuillIcon },
};

export const DIFICULTADES: Record<
  Dificultad,
  { label: string; color: string; runas: number }
> = {
  facil: { label: "Fácil", color: "var(--facil)", runas: 1 },
  media: { label: "Media", color: "var(--media)", runas: 2 },
  dificil: { label: "Difícil", color: "var(--dificil)", runas: 3 },
};

export const QUESTS: Quest[] = [
  {
    id: "q1",
    title: "Forjar el cuerpo",
    description: "45 minutos de entrenamiento de fuerza en el gimnasio.",
    type: "diaria",
    category: "entrenamiento",
    difficulty: "media",
    isCompleted: true,
    completedAt: "hoy",
    xpReward: 60,
    goldReward: 25,
    archived: false,
    order: 1,
  },
  {
    id: "q2",
    title: "Estudiar el grimorio",
    description: "Un capítulo del curso de arquitectura de software.",
    type: "diaria",
    category: "estudio",
    difficulty: "dificil",
    isCompleted: false,
    xpReward: 120,
    goldReward: 50,
    archived: false,
    order: 2,
  },
  {
    id: "q3",
    title: "Beber 2 litros de agua",
    type: "diaria",
    category: "salud",
    difficulty: "facil",
    isCompleted: true,
    completedAt: "hoy",
    xpReward: 25,
    goldReward: 10,
    archived: false,
    order: 3,
  },
  {
    id: "q4",
    title: "Reclamar la torre de la ropa",
    description: "Doblar y guardar la colada pendiente.",
    type: "unica",
    category: "hogar",
    difficulty: "media",
    isCompleted: false,
    xpReward: 60,
    goldReward: 25,
    archived: false,
    order: 4,
  },
  {
    id: "q5",
    title: "Convocar al clan",
    description: "Escribir a un amigo que hace tiempo no ves.",
    type: "unica",
    category: "social",
    difficulty: "facil",
    isCompleted: false,
    xpReward: 25,
    goldReward: 10,
    archived: false,
    order: 5,
  },
  {
    id: "q6",
    title: "Bocetar la carta del bardo",
    description: "30 minutos de dibujo libre.",
    type: "unica",
    category: "creatividad",
    difficulty: "media",
    isCompleted: false,
    xpReward: 60,
    goldReward: 25,
    archived: false,
    order: 6,
  },
];

export const HEROE = {
  nombre: "Aldric el Constante",
  titulo: "Guardián de la Rutina",
  nivel: 12,
  xp: 1840,
  xpSiguienteNivel: 2400,
  oro: 1275,
  racha: 9,
  atributos: [
    { nombre: "Fuerza", valor: 24, categoria: "entrenamiento" as Categoria },
    { nombre: "Inteligencia", valor: 31, categoria: "estudio" as Categoria },
    { nombre: "Disciplina", valor: 19, categoria: "hogar" as Categoria },
    { nombre: "Carisma", valor: 14, categoria: "social" as Categoria },
    { nombre: "Vitalidad", valor: 27, categoria: "salud" as Categoria },
    { nombre: "Sabiduría", valor: 16, categoria: "creatividad" as Categoria },
  ],
  titulos: [
    { nombre: "Guardián de la Rutina", desbloqueado: true },
    { nombre: "Erudito de Medianoche", desbloqueado: true },
    { nombre: "Puño de Hierro", desbloqueado: true },
    { nombre: "Señor del Hogar", desbloqueado: false },
    { nombre: "Voz del Salón", desbloqueado: false },
  ],
};


/* ==================================================================
 * 2b. Estado del juego — store compartido (persistente, sin backend)
 * ================================================================== */

export interface EstadoJuego {
  quests: Quest[];
  nivel: number;
  xp: number;
  oro: number;
  racha: number;
  atributos: Record<Categoria, number>;
  animaciones: boolean;
}

export const xpNecesaria = (nivel: number) => 200 + nivel * 180;

const ATRIB_INICIAL: Record<Categoria, number> = {
  entrenamiento: 24,
  estudio: 31,
  hogar: 19,
  social: 14,
  salud: 27,
  creatividad: 16,
};

const ESTADO_INICIAL: EstadoJuego = {
  quests: QUESTS,
  nivel: HEROE.nivel,
  xp: HEROE.xp,
  oro: HEROE.oro,
  racha: HEROE.racha,
  atributos: ATRIB_INICIAL,
  animaciones: true,
};

const CLAVE = "mtrpg-estado-v1";

let estado: EstadoJuego = ESTADO_INICIAL;
const oyentes = new Set<() => void>();

function emitir() {
  oyentes.forEach((f) => f());
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(estado));
    } catch {
      /* almacenamiento no disponible */
    }
  }
}

function suscribir(f: () => void) {
  oyentes.add(f);
  return () => oyentes.delete(f);
}

let hidratado = false;
function hidratar() {
  if (hidratado || typeof window === "undefined") return;
  hidratado = true;
  try {
    const raw = window.localStorage.getItem(CLAVE);
    if (raw) {
      const prev = JSON.parse(raw) as Partial<EstadoJuego>;
      estado = { ...estado, ...prev, atributos: { ...ATRIB_INICIAL, ...prev.atributos } };
      oyentes.forEach((f) => f());
    }
  } catch {
    /* estado corrupto: se ignora */
  }
}

export function useJuego() {
  useEffect(hidratar, []);
  return useSyncExternalStore(
    suscribir,
    () => estado,
    () => ESTADO_INICIAL,
  );
}

export interface ResultadoCompletar {
  xp: number;
  oro: number;
  subioNivel: boolean;
  nivel: number;
}

export function completarMision(id: string): ResultadoCompletar | null {
  const q = estado.quests.find((x) => x.id === id);
  if (!q) return null;

  if (q.isCompleted) {
    // Filosofía cero castigos: desmarcar NO retira XP ni oro ya ganados.
    estado = {
      ...estado,
      quests: estado.quests.map((x) =>
        x.id === id ? { ...x, isCompleted: false, completedAt: undefined } : x,
      ),
    };
    emitir();
    return null;
  }

  let nivel = estado.nivel;
  let xp = estado.xp + q.xpReward;
  let subioNivel = false;
  while (xp >= xpNecesaria(nivel)) {
    xp -= xpNecesaria(nivel);
    nivel += 1;
    subioNivel = true;
  }

  estado = {
    ...estado,
    nivel,
    xp,
    oro: estado.oro + q.goldReward,
    atributos: {
      ...estado.atributos,
      [q.category]: (estado.atributos[q.category] ?? 0) + 1,
    },
    quests: estado.quests.map((x) =>
      x.id === id ? { ...x, isCompleted: true, completedAt: "hoy" } : x,
    ),
  };
  emitir();
  return { xp: q.xpReward, oro: q.goldReward, subioNivel, nivel };
}

export function crearMision(datos: {
  title: string;
  description?: string;
  type: TipoMision;
  category: Categoria;
  difficulty: Dificultad;
}) {
  const premio = RECOMPENSAS[datos.difficulty];
  const nueva: Quest = {
    id: `q${Date.now()}`,
    title: datos.title,
    ...(datos.description ? { description: datos.description } : {}),
    type: datos.type,
    category: datos.category,
    difficulty: datos.difficulty,
    isCompleted: false,
    xpReward: premio.xp,
    goldReward: premio.oro,
    archived: false,
    order: estado.quests.length + 1,
  };
  estado = { ...estado, quests: [...estado.quests, nueva] };
  emitir();
  return nueva;
}

export function alternarAnimaciones() {
  estado = { ...estado, animaciones: !estado.animaciones };
  emitir();
}

export function reiniciarProgreso() {
  estado = { ...ESTADO_INICIAL, animaciones: estado.animaciones };
  emitir();
}


/* ==================================================================
 * 3. QuestCard — tarjeta de misión (vista Lista)
 * ================================================================== */

export function QuestCard({
  quest,
  onToggle,
}: {
  quest: Quest;
  onToggle: (id: string) => void;
}) {
  const cat = CATEGORIAS[quest.category];
  const dif = DIFICULTADES[quest.difficulty];
  const Icon = cat.icon;

  return (
    <article
      className="panel-carved carved-rivets relative overflow-hidden p-3"
      style={{
        borderColor: quest.isCompleted
          ? "color-mix(in oklab, var(--leaf) 45%, oklch(0.28 0.04 58))"
          : undefined,
      }}
    >
      <span
        className="absolute inset-y-1 left-0 w-1.5"
        style={{
          background: dif.color,
          opacity: 0.9,
          clipPath: "polygon(0 0, 100% 6px, 100% calc(100% - 6px), 0 100%)",
        }}
        aria-hidden
      />

      <div className="flex items-start gap-3 pl-2.5">
        <div className="slot-forged grid size-12 shrink-0 place-items-center">
          <Icon className="size-8" title={cat.label} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={
                quest.isCompleted
                  ? "truncate font-display text-sm text-muted-foreground line-through"
                  : "truncate font-display text-sm text-parchment"
              }
            >
              {quest.title}
            </h3>
            <span className="ml-auto flex shrink-0 items-center gap-0.5" title={dif.label}>
              {Array.from({ length: dif.runas }).map((_, i) => (
                <span
                  key={i}
                  className="size-1.5 rotate-45 border border-[oklch(0.14_0.02_50)]"
                  style={{ background: dif.color }}
                />
              ))}
            </span>
          </div>

          {quest.description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {quest.description}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-[2px] border border-[oklch(0.16_0.02_52)] bg-secondary px-1.5 py-0.5 text-muted-foreground shadow-[inset_0_1px_0_oklch(1_0_0/10%)]">
              {quest.type === "diaria" ? (
                <Repeat className="size-3" />
              ) : (
                <Scroll className="size-3" />
              )}
              {quest.type === "diaria" ? "Diaria" : "Única"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-[2px] border border-[oklch(0.16_0.02_52)] bg-secondary px-1.5 py-0.5 text-muted-foreground shadow-[inset_0_1px_0_oklch(1_0_0/10%)]">
              {cat.label} · {cat.atributo}
            </span>
            <span className="reward-chip text-leaf">
              <XpCrystalIcon className="size-4" /> {quest.xpReward} XP
            </span>
            <span className="reward-chip text-gold-bright">
              <GoldCoinIcon className="size-4" /> {quest.goldReward}
            </span>
          </div>
        </div>

        <button
          onClick={() => onToggle(quest.id)}
          aria-label={quest.isCompleted ? "Desmarcar misión" : "Completar misión"}
          className={
            quest.isCompleted
              ? "grid size-10 shrink-0 place-items-center self-center rounded-full border-2"
              : "bevel-gold grid size-10 shrink-0 place-items-center self-center rounded-full"
          }
          style={
            quest.isCompleted
              ? {
                  borderColor: "oklch(0.16 0.02 50)",
                  background:
                    "radial-gradient(circle at 35% 25%, oklch(0.55 0.14 145), oklch(0.28 0.07 145))",
                  boxShadow:
                    "0 0 14px color-mix(in oklab, var(--leaf) 40%, transparent), inset 0 2px 5px oklch(0 0 0 / 55%)",
                }
              : undefined
          }
        >
          <Check className="size-5" strokeWidth={3} />
        </button>
      </div>
    </article>
  );
}


/* ==================================================================
 * 4. QuestMap — vista Mapa
 * ================================================================== */

const CAT_COLOR: Record<Categoria, string> = {
  entrenamiento: "oklch(0.42 0.11 145)",
  estudio: "oklch(0.42 0.12 55)",
  hogar: "oklch(0.45 0.09 78)",
  social: "oklch(0.40 0.11 250)",
  salud: "oklch(0.44 0.10 160)",
  creatividad: "oklch(0.42 0.10 300)",
};

const ROW = 162;

function Shield({
  color,
  children,
  locked,
}: {
  color: string;
  children: React.ReactNode;
  locked?: boolean;
}) {
  return (
    <span
      className="relative grid size-[58px] place-items-center"
      style={{
        background: locked
          ? "linear-gradient(180deg, oklch(0.32 0.01 60), oklch(0.2 0.01 58))"
          : `linear-gradient(180deg, color-mix(in oklab, ${color} 88%, white 12%), ${color})`,
        clipPath:
          "polygon(50% 0, 100% 12%, 100% 58%, 50% 100%, 0 58%, 0 12%)",
        boxShadow: "0 6px 14px oklch(0 0 0 / 55%)",
        border: "0",
        outline: "2px solid oklch(0.62 0.1 78)",
        outlineOffset: "-2px",
      }}
    >
      {children}
    </span>
  );
}

export function QuestMap({
  quests,
  onToggle,
}: {
  quests: Quest[];
  onToggle: (id: string) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const nodos = useMemo(() => {
    let pendientes = 0;
    return quests
      .filter((q) => !q.archived)
      .sort((a, b) => a.order - b.order)
      .map((q, i) => {
        const bloqueado = !q.isCompleted && pendientes >= 3;
        if (!q.isCompleted) pendientes += 1;
        return { q, i, bloqueado, lado: i % 2 === 0 ? -1 : 1 };
      });
  }, [quests]);

  const alto = Math.max(ROW, nodos.length * ROW + 40);
  const abierta = nodos.find((n) => n.q.id === openId);

  const x = (lado: number) => 50 + lado * 22;
  const path = nodos
    .map((n, i) => {
      const cy = i * ROW + ROW / 2;
      const px = x(n.lado);
      if (i === 0) return `M ${px} ${cy}`;
      const prev = nodos[i - 1]!;
      const pcy = (i - 1) * ROW + ROW / 2;
      return `C ${x(prev.lado)} ${pcy + ROW * 0.6}, ${px} ${cy - ROW * 0.6}, ${px} ${cy}`;
    })
    .join(" ");

  return (
    <div className="animate-in fade-in duration-300">
      {/* Cinta / banner */}
      <div className="relative mb-4 flex justify-center">
        <div
          className="relative px-8 py-2.5 text-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, oklch(0.9 0.045 82), oklch(0.79 0.055 74))",
            color: "var(--ink)",
            clipPath:
              "polygon(0 8%, 6% 0, 94% 0, 100% 8%, 100% 92%, 94% 100%, 6% 100%, 0 92%)",
            boxShadow: "0 8px 18px oklch(0 0 0 / 55%)",
          }}
        >
          <h2 className="font-display text-lg leading-tight tracking-[0.06em]">
            Mapa de Misiones
          </h2>
          <p className="text-[11px] opacity-75">Tu camino, tus logros</p>
        </div>
      </div>

      {/* Lienzo del mapa */}
      <div
        className="relative overflow-hidden rounded-[6px]"
        style={{
          border: "3px solid oklch(0.34 0.05 58)",
          boxShadow:
            "0 0 0 2px oklch(0.11 0.015 50) inset, 0 12px 26px oklch(0 0 0 / 55%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${mapBg.url})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat-y",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, transparent 45%, oklch(0.12 0.02 55 / 75%) 100%)",
          }}
          aria-hidden
        />

        {nodos.length === 0 ? (
          <div className="relative px-5 py-12 text-center">
            <p className="font-display text-sm text-gilded">El camino aún no comienza</p>
            <p className="mx-auto mt-1 max-w-[16rem] text-xs text-parchment/80">
              Forja tu primera misión y aparecerá como el primer nodo de tu sendero.
            </p>
            <Link
              to="/nueva-mision"
              className="bevel-gold mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-display text-sm"
            >
              <Plus className="size-4" strokeWidth={3} /> Crear primera misión
            </Link>
          </div>
        ) : (
          <div className="relative" style={{ height: alto }}>
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 100 ${alto}`}
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d={path}
                fill="none"
                stroke="oklch(0.18 0.02 50 / 70%)"
                strokeWidth={14}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={path}
                fill="none"
                stroke="oklch(0.82 0.05 80 / 85%)"
                strokeWidth={7}
                strokeLinecap="round"
                strokeDasharray="2 13"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {nodos.map(({ q, i, bloqueado, lado }) => {
              const cat = CATEGORIAS[q.category];
              const dif = DIFICULTADES[q.difficulty];
              const Icon = cat.icon;
              const dias = q.isCompleted ? 3 : q.order % 3;
              return (
                <div
                  key={q.id}
                  className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x(lado)}%`, top: i * ROW + ROW / 2 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 -mb-6">
                      <Shield color={CAT_COLOR[q.category]} locked={bloqueado}>
                        {bloqueado ? (
                          <Lock className="mb-1.5 size-6 text-parchment/70" />
                        ) : q.type === "unica" ? (
                          <PotionIcon className="mb-1.5 size-8" />
                        ) : (
                          <Icon className="mb-1.5 size-7" />
                        )}
                      </Shield>
                    </div>

                    <button
                      onClick={() => setOpenId(q.id)}
                      disabled={bloqueado}
                      className="w-full rounded-[999px] px-3 pb-2.5 pt-7 text-center transition-transform active:scale-[0.97]"
                      style={{
                        background:
                          "linear-gradient(180deg, oklch(0.26 0.02 58 / 94%), oklch(0.17 0.015 55 / 96%))",
                        border: `3px solid ${
                          bloqueado
                            ? "oklch(0.3 0.01 60)"
                            : q.isCompleted
                              ? "color-mix(in oklab, var(--leaf) 75%, black)"
                              : "oklch(0.62 0.1 78)"
                        }`,
                        boxShadow: q.isCompleted
                          ? "0 0 16px color-mix(in oklab, var(--leaf) 40%, transparent), 0 8px 16px oklch(0 0 0 / 55%)"
                          : "0 8px 16px oklch(0 0 0 / 55%)",
                        opacity: bloqueado ? 0.7 : 1,
                      }}
                    >
                      <span className="block text-balance font-display text-[12px] leading-tight text-parchment">
                        {q.title}
                      </span>

                      {bloqueado ? (
                        <span className="mt-0.5 block text-[10px] text-parchment/60">
                          Bloqueado
                        </span>
                      ) : q.type === "diaria" ? (
                        <>
                          <span className="mt-0.5 block text-[9px] tracking-wide text-parchment/70">
                            Día 1 · Día 2 · Día 3
                          </span>
                          <span className="mt-1 flex items-center justify-center gap-1.5">
                            {[0, 1, 2].map((d) => (
                              <span
                                key={d}
                                className="size-2 rounded-full border border-[oklch(0.14_0.02_50)]"
                                style={{
                                  background:
                                    d < dias ? "var(--leaf)" : "oklch(0.34 0.02 58)",
                                }}
                              />
                            ))}
                          </span>
                        </>
                      ) : (
                        <span className="bevel-gold mx-auto mt-1.5 block w-fit rounded-[4px] px-3 py-1 font-display text-[11px]">
                          Abrir
                        </span>
                      )}

                      <span
                        className="mt-1 block text-[10px]"
                        style={{ color: bloqueado ? "oklch(0.6 0.01 60)" : dif.color }}
                      >
                        +{q.xpReward} XP · +{q.goldReward} oro
                      </span>
                    </button>
                  </div>

                  {q.isCompleted && !bloqueado && (
                    <span className="absolute right-1 top-3 z-20 grid size-6 place-items-center rounded-full border-2 border-[oklch(0.14_0.02_50)] bg-leaf">
                      <Check className="size-3.5 text-[oklch(0.16_0.02_50)]" strokeWidth={4} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Leyenda sobre el mapa */}
        <div
          className="relative mx-3 mb-3 ml-auto w-fit px-3 py-2"
          style={{
            backgroundImage:
              "linear-gradient(180deg, oklch(0.88 0.045 82), oklch(0.78 0.05 74))",
            color: "var(--ink)",
            border: "2px solid oklch(0.4 0.05 68)",
            borderRadius: "3px",
            boxShadow: "0 6px 14px oklch(0 0 0 / 55%)",
          }}
        >
          <p className="mb-1 font-display text-[11px] uppercase tracking-[0.16em]">Leyenda</p>
          <ul className="space-y-1 text-[11px]">
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-full border-2 border-[oklch(0.2_0.02_55)] bg-leaf" />
              Completado
            </li>
            <li className="flex items-center gap-2">
              <span className="size-3 rounded-full border-2 border-[oklch(0.2_0.02_55)]" />
              Pendiente
            </li>
            <li className="flex items-center gap-2">
              <PotionIcon className="size-4" /> Misión única
            </li>
          </ul>
        </div>
      </div>

      <Link
        to="/nueva-mision"
        className="bevel-gold mt-5 flex w-full items-center justify-center gap-2 rounded-md py-3 font-display text-sm tracking-wide"
      >
        <Plus className="size-4" strokeWidth={3} /> Nueva misión
      </Link>

      {abierta && (
        <div className="fixed inset-0 z-30 flex items-end" role="dialog">
          <button
            aria-label="Cerrar detalle"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpenId(null)}
          />
          <div className="panel-stone relative mx-auto w-full max-w-md animate-in slide-in-from-bottom duration-200 rounded-b-none p-4 pb-8">
            <button
              onClick={() => setOpenId(null)}
              aria-label="Cerrar"
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-border bg-secondary"
            >
              <X className="size-4" />
            </button>
            <div className="flex items-start gap-3 pr-8">
              <Shield color={CAT_COLOR[abierta.q.category]}>
                {(() => {
                  const Icon = CATEGORIAS[abierta.q.category].icon;
                  return abierta.q.type === "unica" ? (
                    <PotionIcon className="mb-1.5 size-8" />
                  ) : (
                    <Icon className="mb-1.5 size-7" />
                  );
                })()}
              </Shield>
              <div className="min-w-0">
                <h3 className="font-display text-sm text-gilded">{abierta.q.title}</h3>
                <p className="text-[11px] text-muted-foreground">
                  {CATEGORIAS[abierta.q.category].label} ·{" "}
                  {CATEGORIAS[abierta.q.category].atributo} ·{" "}
                  {DIFICULTADES[abierta.q.difficulty].label}
                </p>
              </div>
            </div>

            {abierta.q.description && (
              <p className="mt-2 text-xs text-muted-foreground">{abierta.q.description}</p>
            )}

            <div className="mt-3 flex items-center gap-2 text-[11px]">
              <span className="reward-chip text-leaf">
                <XpCrystalIcon className="size-4" /> {abierta.q.xpReward} XP
              </span>
              <span className="reward-chip text-gold-bright">
                <GoldCoinIcon className="size-4" /> {abierta.q.goldReward}
              </span>
              {abierta.q.type === "diaria" && (
                <span className="text-muted-foreground">Racha: {HEROE.racha} días</span>
              )}
            </div>

            {abierta.bloqueado ? (
              <p className="mt-4 flex items-center justify-center gap-2 rounded-md border border-border bg-secondary py-3 text-xs text-muted-foreground">
                <Lock className="size-4" /> Bloqueado: completa misiones anteriores
              </p>
            ) : (
              <button
                onClick={() => {
                  onToggle(abierta.q.id);
                  setOpenId(null);
                }}
                className={
                  abierta.q.isCompleted
                    ? "mt-4 w-full rounded-md border border-border bg-secondary py-3 font-display text-sm text-muted-foreground"
                    : "bevel-gold mt-4 w-full rounded-md py-3 font-display text-sm"
                }
              >
                {abierta.q.isCompleted ? "Desmarcar misión" : "Completar misión"}
              </button>
            )}
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Desmarcar nunca quita XP ni oro ya ganados.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


/* ==================================================================
 * 5. AppShell — cabecera + navegación
 * ================================================================== */

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pct = Math.round((HEROE.xp / HEROE.xpSiguienteNivel) * 100);

  const tabs = [
    { to: "/", label: "Misiones" },
    { to: "/personaje", label: "Personaje" },
  ] as const;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28">
      <header className="panel-stone sticky top-0 z-20 rounded-none border-x-0 border-t-0 px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={emblem.url}
            alt="Emblema del héroe"
            className="size-14 shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h1 className="truncate font-display text-base text-gilded">
                {HEROE.nombre}
              </h1>
              <span className="font-display text-xs text-muted-foreground">
                Nv. {HEROE.nivel}
              </span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full border border-border bg-[oklch(0.16_0.02_60)] shadow-[inset_0_2px_5px_rgba(0,0,0,0.6)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  backgroundImage: "var(--gradient-xp)",
                  boxShadow: "0 0 12px color-mix(in oklab, var(--leaf) 60%, transparent)",
                }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>
                {HEROE.xp} / {HEROE.xpSiguienteNivel} XP
              </span>
              <span className="flex items-center gap-3">
                <span className="reward-chip text-gold-bright">
                  <GoldCoinIcon className="size-4" /> {HEROE.oro}
                </span>
                <span className="reward-chip text-ember">
                  <StreakFlameIcon className="size-4" /> {HEROE.racha}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-5">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md">
        <div className="panel-stone grid grid-cols-2 gap-2 rounded-none border-x-0 border-b-0 p-2">
          {tabs.map((t) => {
            const active = pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={
                  active
                    ? "bevel-gold rounded-md py-2.5 text-center font-display text-sm tracking-wide"
                    : "rounded-md border border-border bg-secondary py-2.5 text-center font-display text-sm tracking-wide text-muted-foreground"
                }
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}


/* ==================================================================
 * 6. Pantalla: Misiones (/)
 * ================================================================== */

export function Misiones() {
  const [quests, setQuests] = useState<Quest[]>(QUESTS);
  const [vista, setVista] = useState<"lista" | "mapa">("lista");

  const toggle = (id: string) =>
    setQuests((qs) =>
      qs.map((q) =>
        q.id === id
          ? {
              ...q,
              isCompleted: !q.isCompleted,
              completedAt: !q.isCompleted ? "hoy" : undefined,
            }
          : q,
      ),
    );

  const activas = useMemo(
    () => quests.filter((q) => !q.archived && !q.isCompleted).sort((a, b) => a.order - b.order),
    [quests],
  );
  const completadas = useMemo(
    () => quests.filter((q) => !q.archived && q.isCompleted).sort((a, b) => a.order - b.order),
    [quests],
  );

  return (
    <AppShell>
      <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-md border border-border bg-secondary p-1">
        {(["lista", "mapa"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVista(v)}
            aria-pressed={vista === v}
            className={
              vista === v
                ? "bevel-gold rounded-[4px] py-2.5 font-display text-sm tracking-wide transition-all duration-200"
                : "rounded-[4px] py-2.5 font-display text-sm tracking-wide text-muted-foreground transition-all duration-200"
            }
          >
            {v === "lista" ? "Lista" : "Mapa"}
          </button>
        ))}
      </div>

      {vista === "mapa" ? (
        <QuestMap quests={quests} onToggle={toggle} />
      ) : (
        <div className="animate-in fade-in duration-300">
      <section className="panel-parchment mb-5 px-4 py-3 text-center">
        <h2 className="font-display text-lg tracking-wide">Tablón de Misiones</h2>
        <p className="mt-0.5 text-xs opacity-75">
          {activas.length} pendientes · {completadas.length} cumplidas hoy
        </p>
      </section>


      <h3 className="mb-2 font-display text-sm uppercase tracking-[0.18em] text-gold">
        En curso
      </h3>
      <div className="space-y-2.5">
        {activas.map((q) => (
          <QuestCard key={q.id} quest={q} onToggle={toggle} />
        ))}
      </div>

      {completadas.length > 0 && (
        <>
          <h3 className="mb-2 mt-6 font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Cumplidas
          </h3>
          <div className="space-y-2.5 opacity-80">
            {completadas.map((q) => (
              <QuestCard key={q.id} quest={q} onToggle={toggle} />
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Desmarcar una misión nunca quita XP ni oro ya ganados.
          </p>
        </>
      )}

      <Link
        to="/nueva-mision"
        className="bevel-gold mt-6 flex w-full items-center justify-center gap-2 rounded-md py-3 font-display text-sm tracking-wide"
      >
        <Plus className="size-4" strokeWidth={3} /> Nueva misión
      </Link>
        </div>
      )}
    </AppShell>

  );
}


/* ==================================================================
 * 7. Pantalla: Personaje (/personaje)
 * ================================================================== */

export function Personaje() {
  const maxAttr = Math.max(...HEROE.atributos.map((a) => a.valor));

  return (
    <AppShell>
      <section className="panel-carved carved-rivets relative mb-5 overflow-hidden p-5 text-center">
        <img
          src={emblem.url}
          alt="Escudo heráldico del héroe"
          className="mx-auto size-28 drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]"
        />
        <h2 className="mt-3 font-display text-xl text-gilded">{HEROE.nombre}</h2>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {HEROE.titulo}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          {[
            { label: "Nivel", value: HEROE.nivel, cls: "text-parchment" },
            {
              label: "Oro",
              value: (
                <span className="inline-flex items-center gap-1 text-gold">
                  <GoldCoinIcon className="size-5" /> {HEROE.oro}
                </span>
              ),
              cls: "",
            },
            {
              label: "Racha",
              value: (
                <span className="inline-flex items-center gap-1 text-ember">
                  <StreakFlameIcon className="size-5" /> {HEROE.racha}
                </span>
              ),
              cls: "",
            },
          ].map((s) => (
            <div key={s.label} className="rounded-md border border-border bg-secondary py-2">
              <div className={`font-display ${s.cls}`}>{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <h3 className="mb-2 font-display text-sm uppercase tracking-[0.18em] text-gold">
        Atributos
      </h3>
      <div className="panel-carved carved-rivets space-y-3 p-4">
        {HEROE.atributos.map((a) => {
          const cat = CATEGORIAS[a.categoria];
          const Icon = cat.icon;
          return (
            <div key={a.nombre} className="flex items-center gap-3">
              <div
                className="slot-forged grid size-10 shrink-0 place-items-center"
              >
                <Icon className="size-7" title={cat.label} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xs tracking-wide text-parchment">
                    {a.nombre}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {cat.label} · {a.valor}
                  </span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full border border-border bg-[oklch(0.16_0.02_60)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(a.valor / maxAttr) * 100}%`,
                      backgroundImage: "var(--gradient-gold)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="mb-2 mt-6 font-display text-sm uppercase tracking-[0.18em] text-gold">
        Títulos
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {HEROE.titulos.map((t) => (
          <div
            key={t.nombre}
            className={
              t.desbloqueado
                ? "panel-carved flex items-center gap-2 p-3 text-xs text-parchment"
                : "panel-carved flex items-center gap-2 p-3 text-xs text-muted-foreground opacity-60"
            }
          >
            {!t.desbloqueado && <Lock className="size-3.5 shrink-0" />}
            <span className="font-display leading-tight">{t.nombre}</span>
          </div>
        ))}
      </div>

      <section className="panel-carved carved-rivets mt-6 flex items-center gap-4 p-4">
        <img src={chest.url} alt="Cofre de recompensas" className="size-16 rounded-md" />
        <div>
          <h3 className="font-display text-sm text-gilded">Cofre semanal</h3>
          <p className="text-xs text-muted-foreground">
            Completa 5 misiones más para abrirlo. Nunca se pierde progreso.
          </p>
        </div>
      </section>
    </AppShell>
  );
}


/* ==================================================================
 * 8. Pantalla: Nueva misión (/nueva-mision)
 * ================================================================== */

export const RECOMPENSAS: Record<Dificultad, { xp: number; oro: number }> = {
  facil: { xp: 25, oro: 10 },
  media: { xp: 60, oro: 25 },
  dificil: { xp: 120, oro: 50 },
};

export function NuevaMision() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState<TipoMision>("diaria");
  const [categoria, setCategoria] = useState<Categoria>("entrenamiento");
  const [dificultad, setDificultad] = useState<Dificultad>("media");

  const premio = RECOMPENSAS[dificultad];
  const cat = CATEGORIAS[categoria];

  return (
    <AppShell>
      <div className="mb-4 flex items-center gap-2">
        <Link
          to="/"
          aria-label="Volver al tablón"
          className="slot-forged grid size-9 place-items-center text-gold-bright"
        >
          <ChevronLeft className="size-5" strokeWidth={3} />
        </Link>
        <h2 className="font-display text-lg tracking-wide text-gilded">
          Forjar nueva misión
        </h2>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section className="panel-carved carved-rivets p-4">
          <label className="mb-1.5 block font-display text-[11px] uppercase tracking-[0.18em] text-gold">
            Título de la misión
          </label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Forjar el cuerpo"
            className="w-full rounded-[3px] border-2 border-[oklch(0.18_0.02_54)] bg-[oklch(0.16_0.02_58)] px-3 py-2 text-sm text-parchment shadow-[inset_0_2px_6px_oklch(0_0_0/60%)] outline-none placeholder:text-muted-foreground focus:border-[color-mix(in_oklab,var(--gold)_60%,black)]"
          />

          <label className="mb-1.5 mt-4 block font-display text-[11px] uppercase tracking-[0.18em] text-gold">
            Crónica (opcional)
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            placeholder="45 minutos de entrenamiento de fuerza…"
            className="w-full resize-none rounded-[3px] border-2 border-[oklch(0.18_0.02_54)] bg-[oklch(0.16_0.02_58)] px-3 py-2 text-sm text-parchment shadow-[inset_0_2px_6px_oklch(0_0_0/60%)] outline-none placeholder:text-muted-foreground focus:border-[color-mix(in_oklab,var(--gold)_60%,black)]"
          />
        </section>

        <section className="panel-carved carved-rivets p-4">
          <h3 className="mb-2 font-display text-[11px] uppercase tracking-[0.18em] text-gold">
            Tipo de misión
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {([
              { v: "diaria", label: "Diaria", Icon: Repeat },
              { v: "unica", label: "Única", Icon: Scroll },
            ] as const).map(({ v, label, Icon }) => (
              <button
                key={v}
                type="button"
                onClick={() => setTipo(v)}
                className={
                  tipo === v
                    ? "bevel-gold flex items-center justify-center gap-2 rounded-[3px] py-2.5 font-display text-sm"
                    : "flex items-center justify-center gap-2 rounded-[3px] border-2 border-[oklch(0.18_0.02_54)] bg-secondary py-2.5 font-display text-sm text-muted-foreground"
                }
              >
                <Icon className="size-4" /> {label}
              </button>
            ))}
          </div>
        </section>

        <section className="panel-carved carved-rivets p-4">
          <h3 className="mb-2 font-display text-[11px] uppercase tracking-[0.18em] text-gold">
            Categoría · sube {cat.atributo}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(CATEGORIAS) as Categoria[]).map((c) => {
              const info = CATEGORIAS[c];
              const Icon = info.icon;
              const active = categoria === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategoria(c)}
                  className="flex flex-col items-center gap-1.5 rounded-[3px] p-2 text-[10px] leading-tight"
                  style={{
                    border: "2px solid",
                    borderColor: active
                      ? "color-mix(in oklab, var(--gold) 65%, black)"
                      : "oklch(0.18 0.02 54)",
                    background: active
                      ? "linear-gradient(180deg, oklch(0.34 0.045 62), oklch(0.22 0.03 58))"
                      : "oklch(0.19 0.022 56)",
                    boxShadow: active
                      ? "0 0 12px color-mix(in oklab, var(--gold) 30%, transparent), inset 0 1px 0 oklch(1 0 0 / 14%)"
                      : "inset 0 2px 5px oklch(0 0 0 / 55%)",
                  }}
                >
                  <span className="slot-forged grid size-10 place-items-center">
                    <Icon className="size-7" title={info.label} />
                  </span>
                  <span className={active ? "text-parchment" : "text-muted-foreground"}>
                    {info.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel-carved carved-rivets p-4">
          <h3 className="mb-2 font-display text-[11px] uppercase tracking-[0.18em] text-gold">
            Dificultad
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(DIFICULTADES) as Dificultad[]).map((d) => {
              const info = DIFICULTADES[d];
              const active = dificultad === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDificultad(d)}
                  className="rounded-[3px] py-2 font-display text-xs"
                  style={{
                    border: "2px solid",
                    borderColor: active ? info.color : "oklch(0.18 0.02 54)",
                    background: active
                      ? `color-mix(in oklab, ${info.color} 22%, oklch(0.2 0.025 58))`
                      : "oklch(0.19 0.022 56)",
                    color: active ? "var(--parchment)" : "var(--muted-foreground)",
                    boxShadow: active
                      ? `0 0 12px color-mix(in oklab, ${info.color} 40%, transparent)`
                      : "inset 0 2px 5px oklch(0 0 0 / 55%)",
                  }}
                >
                  <span className="mb-1 flex items-center justify-center gap-0.5">
                    {Array.from({ length: info.runas }).map((_, i) => (
                      <span
                        key={i}
                        className="size-1.5 rotate-45 border border-[oklch(0.14_0.02_50)]"
                        style={{ background: info.color }}
                      />
                    ))}
                  </span>
                  {info.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel-parchment px-4 py-3 text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.18em] opacity-70">
            Recompensa al cumplir
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="reward-chip text-leaf">
              <XpCrystalIcon className="size-5" /> {premio.xp} XP
            </span>
            <span className="reward-chip text-gold-bright">
              <GoldCoinIcon className="size-5" /> {premio.oro}
            </span>
          </div>
          <p className="mt-2 text-[11px] opacity-70">
            Sin castigos: fallar una misión nunca resta XP ni oro.
          </p>
        </section>

        <button
          type="submit"
          disabled={!titulo.trim()}
          className="bevel-gold w-full rounded-md py-3 font-display text-sm tracking-wide disabled:opacity-50"
        >
          Inscribir en el tablón
        </button>
      </form>
    </AppShell>
  );
}
