import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { QuestCard } from "@/components/QuestCard";
import { QuestMap } from "@/components/QuestMap";
import { QUESTS, type Quest } from "@/lib/game-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Misiones — Medieval Task RPG" },
      {
        name: "description",
        content:
          "Convierte tus tareas diarias en misiones de un RPG medieval: gana XP, oro y sube de nivel sin castigos.",
      },
      { property: "og:title", content: "Misiones — Medieval Task RPG" },
      {
        property: "og:description",
        content:
          "Tablón de misiones diarias y únicas con recompensas de XP y oro.",
      },
    ],
  }),
  component: Misiones,
});

function Misiones() {
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
