export const SELECT_DEALER_EVENT = "nucleo:select-dealer";

export type SelectDealerDetail = {
  stateId: string;
  /** Exact `name` in dealersByState when known. */
  dealerName?: string;
  /** Display label from the partner logo. */
  label: string;
};

export function selectDealerOnMap(detail: SelectDealerDetail) {
  document.getElementById("onde-comprar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.dispatchEvent(new CustomEvent(SELECT_DEALER_EVENT, { detail }));
}
