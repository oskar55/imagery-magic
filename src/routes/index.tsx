import { createFileRoute } from "@tanstack/react-router";
import { Misiones } from "@/ui/MedievalTaskRpg";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Misiones,
});
