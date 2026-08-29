import { createFileRoute } from "@tanstack/react-router";
import { Personaje } from "@/ui/MedievalTaskRpg";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Personaje,
});
