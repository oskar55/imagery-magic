import {
  ForgeHammerIcon,
  GrimoireIcon,
  HearthIcon,
  BannerIcon,
  PotionIcon,
  QuillIcon,
  type GameIcon,
} from "@/components/icons/GameIcons";

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
