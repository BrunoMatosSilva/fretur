import { WHATSAPP_DEFAULT_MSG, WHATSAPP_NUMBER } from "./config";

export function waLink(message: string = WHATSAPP_DEFAULT_MSG): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
