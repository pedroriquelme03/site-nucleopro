import { Logos3, type Logo } from "@/components/ui/logos3";

const base = "/lojas-parceiras";

const logos: Logo[] = [
  { id: "a-musical", description: "A Musical", image: `${base}/a-musical.webp` },
  { id: "alberto-teclados", description: "Alberto Teclados", image: `${base}/alberto-teclados.webp` },
  { id: "amaral-musical", description: "Amaral Musical", image: `${base}/amaral-musical.webp` },
  { id: "armazem-do-musico", description: "Armazém do Músico", image: `${base}/armazem-do-musico.webp` },
  { id: "beaver-music", description: "Beaver Music", image: `${base}/beaver-music.webp` },
  { id: "carneiro-music", description: "Carneiro Music", image: `${base}/carneiro-music.webp` },
  { id: "daqui-express", description: "Daqui Express", image: `${base}/daqui-express.webp` },
  { id: "harmonia-musical", description: "Harmonia Musical", image: `${base}/harmonia-musical.webp` },
  { id: "hudson-music", description: "Hudson Music House", image: `${base}/hudson-music.webp` },
  { id: "kpro-audio", description: "KPro Áudio", image: `${base}/kpro-audio.webp` },
  { id: "mensageiro-musical", description: "Mensageiro Musical", image: `${base}/mensageiro-musical.webp` },
  { id: "mesval", description: "Mesval", image: `${base}/mesval.webp` },
  { id: "musica-center", description: "Musica Center", image: `${base}/musica-center.webp` },
  { id: "musical-center-som", description: "Musical Center Som", image: `${base}/musical-center-som.webp` },
  { id: "musitech", description: "Musitech", image: `${base}/musitech.webp` },
  { id: "musitech-instrumentos", description: "Musitech Instrumentos", image: `${base}/musitech-instrumentos.webp` },
  { id: "proaudio-system", description: "Pro Audio System", image: `${base}/proaudio-system.webp` },
  { id: "rck-audio", description: "RCK Audio", image: `${base}/rck-audio.webp` },
  { id: "tango-music", description: "Tango Music", image: `${base}/tango-music.webp` },
  { id: "top-som-musical", description: "Top Som Musical", image: `${base}/top-som-musical.webp` },
  { id: "x5-music", description: "X5 Music", image: `${base}/x5-music.webp` },
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
