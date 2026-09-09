import { WHATSAPP_URL } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 active:scale-95"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
