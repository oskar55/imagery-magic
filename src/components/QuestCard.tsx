import { Check, Repeat, Scroll } from "lucide-react";
import { CATEGORIAS, DIFICULTADES, type Quest } from "@/lib/game-data";
import { GoldCoinIcon, XpCrystalIcon } from "@/components/icons/GameIcons";

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
