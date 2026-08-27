import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Check, Plus, X } from "lucide-react";
import mapBg from "@/assets/map-bg.jpg.asset.json";
import {
  CATEGORIAS,
  DIFICULTADES,
  HEROE,
  type Categoria,
  type Quest,
} from "@/lib/game-data";
import { GoldCoinIcon, XpCrystalIcon, PotionIcon } from "@/components/icons/GameIcons";

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
