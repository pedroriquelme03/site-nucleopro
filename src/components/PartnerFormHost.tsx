import { useCallback, useEffect, useState } from "react";
import { PartnerFormModal } from "@/components/PartnerFormModal";
import { PARTNER_FORM_EVENT, shouldOpenPartnerFormFromUrl } from "@/lib/partner-form";

export function PartnerFormHost() {
  const [open, setOpen] = useState(false);

  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => openForm();
    window.addEventListener(PARTNER_FORM_EVENT, onOpen);
    if (shouldOpenPartnerFormFromUrl()) openForm();
    return () => window.removeEventListener(PARTNER_FORM_EVENT, onOpen);
  }, [openForm]);

  return <PartnerFormModal open={open} onClose={closeForm} />;
}
