import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Check, Plus, X } from "lucide-react";
import {
  CATEGORIAS,
  DIFICULTADES,
  HEROE,
  type Categoria,
  type Quest,
} from "@/lib/game-data";
import { GoldCoinIcon, XpCrystalIcon, PotionIcon } from "@/components/icons/GameIcons";

const CAT_COLOR: Record<Categoria, string> = {
  entrenamiento: "var(--ember)",
  estudio: "var(--arcane)",
  hogar: "var(--gold)",
  social: "var(--accent)",
  salud: "var(--leaf)",
  creatividad: "var(--gold-bright)",
};

const ROW = 138;

export function QuestMap({
  quests,
  onToggle,
}: {
  quests: Quest[];
  onToggle: (id: string) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const nodos = useMemo(() => {
    let pendientesPrevias = 0;
    return quests
      .filter((q) => !q.archived)
      .sort((a, b) => a.order - b.order)
      .map((q, i) => {
        const bloqueado = !q.isCompleted && pendientesPrevias >= 3;
        if (!q.isCompleted) pendientesPrevias += 1;
        return { q, i, bloqueado, lado: i % 2 === 0 ? -1 : 1 };
      });
  }, [quests]);

  const alto = Math.max(ROW, nodos.length * ROW);
  const abierta = nodos.find((n) => n.q.id === openId);

  const x = (lado: number) => 50 + lado * 26;
  const path = nodos
    .map((n, i) => {
      const cy = i * ROW + ROW / 2;
      const px = x(n.lado);
      if (i === 0) return `M ${px} ${cy}`;
      const prev = nodos[i - 1]!;
      const pcy = (i - 1) * ROW + ROW / 2;
      return `C ${x(prev.lado)} ${pcy + ROW * 0.55}, ${px} ${cy - ROW * 0.55}, ${px} ${cy}`;
    })
    .join(" ");

  return (
    <div className="relative animate-in fade-in duration-300">
      <div className="panel-parchment relative mb-5 px-5 py-3 text-center">
        <h2 className="font-display text-base tracking-wide">Mapa de Misiones</h2>
        <p className="mt-0.5 text-xs opacity-75">Tu camino, tus logros</p>
      </div>

      <div className="panel-carved mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-3 py-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border-2 border-[oklch(0.16_0.02_50)] bg-leaf" />
          Completado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full border-2 border-border" />
          Pendiente
        </span>
        <span className="flex items-center gap-1.5">
          <PotionIcon className="size-4" /> Misión única
        </span>
      </div>

      {nodos.length === 0 ? (
        <div className="panel-carved carved-rivets px-4 py-8 text-center">
          <p className="font-display text-sm text-gilded">El camino aún no comienza</p>
          <p className="mx-auto mt-1 max-w-[16rem] text-xs text-muted-foreground">
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
              stroke="oklch(0.14 0.02 50)"
              strokeWidth={13}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={path}
              fill="none"
              stroke="color-mix(in oklab, var(--gold) 55%, oklch(0.3 0.03 60))"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray="1 14"
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
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left: `${x(lado)}%`, top: i * ROW + ROW / 2 }}
              >
                <button
                  onClick={() => setOpenId(q.id)}
                  disabled={bloqueado}
                  aria-label={q.title}
                  className={
                    q.type === "unica"
                      ? "slot-forged grid size-[68px] place-items-center rounded-[18px] transition-transform active:scale-95"
                      : "slot-forged grid size-[68px] place-items-center rounded-full transition-transform active:scale-95"
                  }
                  style={{
                    boxShadow: q.isCompleted
                      ? "0 0 0 3px color-mix(in oklab, var(--leaf) 70%, black) inset, 0 0 18px color-mix(in oklab, var(--leaf) 45%, transparent)"
                      : bloqueado
                        ? "0 0 0 3px oklch(0.22 0.01 60) inset"
                        : `0 0 0 3px ${dif.color} inset`,
                    opacity: bloqueado ? 0.55 : 1,
                  }}
                >
                  {bloqueado ? (
                    <Lock className="size-7 text-muted-foreground" />
                  ) : q.type === "unica" ? (
                    <PotionIcon className="size-10" />
                  ) : (
                    <Icon className="size-9" />
                  )}
                  {q.isCompleted && !bloqueado && (
                    <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full border-2 border-[oklch(0.14_0.02_50)] bg-leaf">
                      <Check className="size-3.5 text-[oklch(0.16_0.02_50)]" strokeWidth={4} />
                    </span>
                  )}
                </button>

                <p className="mx-auto mt-1 w-[8.5rem] truncate font-display text-[11px] text-parchment">
                  {q.title}
                </p>

                {bloqueado ? (
                  <p className="text-[10px] text-muted-foreground">Bloqueado</p>
                ) : q.type === "diaria" ? (
                  <div className="mt-0.5 flex items-center justify-center gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        title={`Día ${d + 1}`}
                        className="size-1.5 rounded-full"
                        style={{
                          background: d < dias ? CAT_COLOR[q.category] : "oklch(0.3 0.02 58)",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span className="mt-0.5 inline-block rounded-[3px] border border-[oklch(0.16_0.02_52)] bg-secondary px-2 py-0.5 text-[10px] text-gold">
                    Abrir
                  </span>
                )}

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  +{q.xpReward} XP · +{q.goldReward} oro
                </p>
              </div>
            );
          })}
        </div>
      )}

      <Link
        to="/nueva-mision"
        className="bevel-gold mt-6 flex w-full items-center justify-center gap-2 rounded-md py-3 font-display text-sm tracking-wide"
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
              <div className="slot-forged grid size-12 shrink-0 place-items-center">
                {(() => {
                  const Icon = CATEGORIAS[abierta.q.category].icon;
                  return abierta.q.type === "unica" ? (
                    <PotionIcon className="size-8" />
                  ) : (
                    <Icon className="size-8" />
                  );
                })()}
              </div>
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
