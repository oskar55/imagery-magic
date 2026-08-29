import { createFileRoute } from "@tanstack/react-router";
import { NuevaMision } from "@/ui/MedievalTaskRpg";

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
