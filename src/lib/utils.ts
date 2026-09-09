import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "55119752510688"; // +55 11 975251-0688
export const WHATSAPP_DISPLAY = "+55 11 975251-0688";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Núcleo ProAudio e gostaria de falar com um especialista."
)}`;
export const INSTAGRAM_URL = "https://www.instagram.com/nucleoproaudio";
