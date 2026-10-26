import { Logos3, type Logo } from "@/components/ui/logos3";
import { selectDealerOnMap, type SelectDealerDetail } from "@/lib/select-dealer";

const base = "/lojas-parceiras";

type PartnerLogo = Logo & SelectDealerDetail;

/** Logos with white artwork — black card + white ring so they don't vanish */
const darkCardLogos = new Set([
  "a-musical",
  "alberto-teclados",
  "arte-som",
  "beaver-music",
  "musica-center",
  "musical-center-som",
  "musitech-instrumentos",
  "rck-audio",
]);

const logos: PartnerLogo[] = [
  {
    id: "a-musical",
    description: "A Musical",
    image: `${base}/a-musical.webp`,
    stateId: "BRSC",
    dealerName: "A MUSICAL DE ORLEANS EIRELI",
    label: "A Musical",
  },
  {
    id: "alberto-teclados",
    description: "Alberto Teclados",
    image: `${base}/alberto-teclados.webp`,
    stateId: "BRDF",
    label: "Alberto Teclados",
  },
  {
    id: "amaral-musical",
    description: "Amaral Musical",
    image: `${base}/amaral-musical.webp`,
    stateId: "BRMG",
    dealerName: "IMPORMUSICA INSTRUMENTOS MUSICAIS LTDA",
    label: "Amaral Musical",
  },
  {
    id: "armazem-do-musico",
    description: "Armazém do Músico",
    image: `${base}/armazem-do-musico.webp`,
    stateId: "BRPR",
    label: "Armazém do Músico",
  },
  {
    id: "beaver-music",
    description: "Beaver Music",
    image: `${base}/beaver-music.webp`,
    stateId: "BRMG",
    label: "Beaver Music",
  },
  {
    id: "carneiro-music",
    description: "Carneiro Music",
    image: `${base}/carneiro-music.webp`,
    stateId: "BRES",
    dealerName: "CARNEIRO INSTRUMENTOS MUSICAIS LTDA",
    label: "Carneiro Music",
  },
  {
    id: "daqui-express",
    description: "Daqui Express",
    image: `${base}/daqui-express.webp`,
    stateId: "BRBA",
    dealerName: "DAQUIEXPRESS COMÉRCIO E IMPORTAÇÃO LTDA",
    label: "Daqui Express",
  },
  {
    id: "harmonia-musical",
    description: "Harmonia Musical",
    image: `${base}/harmonia-musical.webp`,
    stateId: "BRGO",
    dealerName: "Harmonia Musical Ltda",
    label: "Harmonia Musical",
  },
  {
    id: "hudson-music",
    description: "Hudson Music House",
    image: `${base}/hudson-music.webp`,
    stateId: "BRRJ",
    label: "Hudson Music House",
  },
  {
    id: "kpro-audio",
    description: "KPro Áudio",
    image: `${base}/kpro-audio.webp`,
    stateId: "BRSP",
    dealerName: "KINGDOM SOUND IMAGEM E SOM LTDA",
    label: "KPro Áudio",
  },
  {
    id: "mensageiro-musical",
    description: "Mensageiro Musical",
    image: `${base}/mensageiro-musical.webp`,
    stateId: "BRSC",
    label: "Mensageiro Musical",
  },
  {
    id: "mega-som",
    description: "Mega Som",
    image: `${base}/348248476_616081540235052_6367647891984485262_n.jpg`,
    stateId: "BRSP",
    label: "Mega Som",
  },
  {
    id: "musica-center",
    description: "Musica Center",
    image: `${base}/musica-center.webp`,
    stateId: "BRPR",
    label: "Musica Center",
  },
  {
    id: "musical-center-som",
    description: "Musical Center Som",
    image: `${base}/musical-center-som.webp`,
    stateId: "BRPR",
    dealerName: "AUDIO PRO INSTRUMENTOS MUSICAIS LTDA",
    label: "Musical Center Som",
  },
  {
    id: "arte-som",
    description: "Arte Som",
    image: `${base}/topo_logo_artesomPb.webp`,
    stateId: "BRSP",
    label: "Arte Som",
  },
  {
    id: "musitech-instrumentos",
    description: "Musitech Instrumentos",
    image: `${base}/musitech-instrumentos.webp`,
    stateId: "BRPR",
    dealerName: "MUSITECH INSTRUMENTOS MUSICAIS LTDA",
    label: "Musitech Instrumentos",
  },
  {
    id: "proaudio-system",
    description: "Pro Audio System",
    image: `${base}/proaudio-system.webp`,
    stateId: "BRRS",
    dealerName: "Prisma Pro Audio Ltda  (RS)",
    label: "Pro Audio System",
  },
  {
    id: "rck-audio",
    description: "RCK Audio",
    image: `${base}/rck-audio.webp`,
    stateId: "BRSP",
    label: "RCK Audio",
  },
  {
    id: "tango-music",
    description: "Tango Music",
    image: `${base}/tango-music.webp`,
    stateId: "BRSC",
    dealerName: "TANGO MUSICA E INSTRUMENTOS LTDA",
    label: "Tango Music",
  },
  {
    id: "top-som-musical",
    description: "Top Som Musical",
    image: `${base}/top-som-musical.webp`,
    stateId: "BRES",
    dealerName: "FORTUNA MUSIC",
    label: "Top Som Musical",
  },
  {
    id: "x5-music",
    description: "X5 Music",
    image: `${base}/x5-music.webp`,
    stateId: "BRMG",
    dealerName: "X5 - INSTRUMENTOS MUSICAIS LTDA",
    label: "X5 Music",
  },
].map((logo) => (darkCardLogos.has(logo.id) ? { ...logo, darkCard: true } : logo));

export function WhoUses() {
  return (
    <Logos3
      id="quem-usa"
      heading="Lojas parceiras"
      description="Revendedores oficiais Mackie em todo o Brasil. Clique na logo para ver no mapa."
      logos={logos}
      className="scroll-mt-20 border-t border-line bg-ink-950"
      onLogoClick={(logo) => {
        const partner = logo as PartnerLogo;
        if (!partner.stateId) return;
        selectDealerOnMap({
          stateId: partner.stateId,
          dealerName: partner.dealerName,
          label: partner.label || partner.description,
        });
      }}
    />
  );
}
