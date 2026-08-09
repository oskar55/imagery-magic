import { Check, Coins, Sparkles, Repeat, Scroll } from "lucide-react";
import { CATEGORIAS, DIFICULTADES, type Quest } from "@/lib/game-data";

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
      className="panel-stone relative overflow-hidden p-3"
      style={{
        borderColor: quest.isCompleted
          ? "color-mix(in oklab, var(--leaf) 55%, var(--border))"
          : undefined,
      }}
    >
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ background: dif.color, opacity: 0.85 }}
        aria-hidden
      />

      <div className="flex items-start gap-3 pl-2">
        {/* Ranura de ícono estilo ítem */}
        <div
          className="grid size-12 shrink-0 place-items-center rounded-md border-2"
          style={{
            borderColor: "color-mix(in oklab, var(--gold) 60%, black)",
            backgroundImage:
              "radial-gradient(circle at 30% 25%, oklch(0.42 0.05 62), oklch(0.2 0.03 60))",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,.6), 0 2px 6px rgba(0,0,0,.4)",
          }}
        >
          <Icon className="size-6 text-gold-bright" strokeWidth={1.75} />
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
                  className="size-1.5 rotate-45"
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
            <span className="inline-flex items-center gap-1 rounded-sm border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground">
              {quest.type === "diaria" ? (
                <Repeat className="size-3" />
              ) : (
                <Scroll className="size-3" />
              )}
              {quest.type === "diaria" ? "Diaria" : "Única"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-sm border border-border bg-secondary px-1.5 py-0.5 text-muted-foreground">
              {cat.label} · {cat.atributo}
            </span>
            <span className="inline-flex items-center gap-1 text-leaf">
              <Sparkles className="size-3" /> {quest.xpReward} XP
            </span>
            <span className="inline-flex items-center gap-1 text-gold">
              <Coins className="size-3" /> {quest.goldReward}
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
                  borderColor: "color-mix(in oklab, var(--leaf) 70%, black)",
                  background:
                    "radial-gradient(circle at 35% 25%, oklch(0.55 0.14 145), oklch(0.32 0.08 145))",
                  boxShadow: "0 0 14px color-mix(in oklab, var(--leaf) 45%, transparent)",
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
