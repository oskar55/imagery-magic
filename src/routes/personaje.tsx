import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { CATEGORIAS, HEROE } from "@/lib/game-data";
import emblem from "@/assets/emblem.png.asset.json";
import chest from "@/assets/chest.png.asset.json";
import { Lock } from "lucide-react";
import { GoldCoinIcon, StreakFlameIcon } from "@/components/icons/GameIcons";

export const Route = createFileRoute("/personaje")({
  head: () => ({
    meta: [
      { title: "Personaje — Medieval Task RPG" },
      {
        name: "description",
        content:
          "Panel del héroe: nivel, atributos, oro y títulos ganados al completar misiones.",
      },
      { property: "og:title", content: "Personaje — Medieval Task RPG" },
      {
        property: "og:description",
        content: "Atributos, progresión y títulos de tu héroe.",
      },
    ],
  }),
  component: Personaje,
});

function Personaje() {
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
