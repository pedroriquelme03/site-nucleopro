import { Logos3 } from "@/components/ui/logos3";

const logos = [
  { id: "logo-1", description: "Palco Norte" },
  { id: "logo-2", description: "Circuito Live" },
  { id: "logo-3", description: "Comunidade Vida" },
  { id: "logo-4", description: "Atlas Studio" },
  { id: "logo-5", description: "House Audio" },
  { id: "logo-6", description: "Arena 12" },
  { id: "logo-7", description: "Luz & Som" },
  { id: "logo-8", description: "Catedral" },
];

export function WhoUses() {
  return (
    <Logos3
      id="quem-usa"
      heading="Lojas parceiras"
      description="Revendedores oficiais Mackie em todo o Brasil."
      logos={logos}
      className="scroll-mt-20 border-t border-line bg-ink-950"
    />
  );
}
