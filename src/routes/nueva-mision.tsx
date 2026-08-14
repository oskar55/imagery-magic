import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Repeat, Scroll } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GoldCoinIcon, XpCrystalIcon } from "@/components/icons/GameIcons";
import {
  CATEGORIAS,
  DIFICULTADES,
  type Categoria,
  type Dificultad,
  type TipoMision,
} from "@/lib/game-data";

export const Route = createFileRoute("/nueva-mision")({
  head: () => ({
    meta: [
      { title: "Forjar nueva misión — Medieval Task RPG" },
      {
        name: "description",
        content:
          "Inscribe una nueva misión en el tablón: elige tipo, categoría y dificultad para fijar tus recompensas de XP y oro.",
      },
      { property: "og:title", content: "Forjar nueva misión — Medieval Task RPG" },
      {
        property: "og:description",
        content: "Crea misiones diarias o únicas y define sus recompensas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NuevaMision,
});

const RECOMPENSAS: Record<Dificultad, { xp: number; oro: number }> = {
  facil: { xp: 25, oro: 10 },
  media: { xp: 60, oro: 25 },
  dificil: { xp: 120, oro: 50 },
};

function NuevaMision() {
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
