import { Link, useRouterState } from "@tanstack/react-router";
import emblem from "@/assets/emblem.png.asset.json";
import { GoldCoinIcon, StreakFlameIcon } from "@/components/icons/GameIcons";
import { HEROE } from "@/lib/game-data";

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
