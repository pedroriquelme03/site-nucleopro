import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "5511919225775"; // +55 11 91922-5775
export const WHATSAPP_DISPLAY = "+55 11 91922-5775";
export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Núcleo ProAudio e gostaria de falar com um especialista.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
export const INSTAGRAM_URL = "https://www.instagram.com/nucleoproaudio";
export const CONTACT_EMAIL = "contato@nucleoproaudio.com.br";
