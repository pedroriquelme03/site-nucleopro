export const PARTNER_FORM_EVENT = "nucleo:open-partner-form";

export function openPartnerForm() {
  window.dispatchEvent(new Event(PARTNER_FORM_EVENT));
}

export function shouldOpenPartnerFormFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("tipo") === "parceiro" || window.location.hash === "#contato";
}
