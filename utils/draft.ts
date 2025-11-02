export const CAC_DRAFT_KEY = "verification:cac:draft";

export type CACDraft = {
  registrationType?: "RC" | "BN";
  businessName?: string;
  rcNumber?: string;
  // do NOT store files here (localStorage can't store File safely)
};

export function saveCACDraft(draft: CACDraft) {
  try {
    localStorage.setItem(CAC_DRAFT_KEY, JSON.stringify(draft));
  } catch (err) {
    console.warn("saveCACDraft failed", err);
  }
}

export function loadCACDraft(): CACDraft | null {
  try {
    const raw = localStorage.getItem(CAC_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as CACDraft) : null;
  } catch (err) {
    console.warn("loadCACDraft failed", err);
    return null;
  }
}

export function clearCACDraft() {
  try {
    localStorage.removeItem(CAC_DRAFT_KEY);
  } catch (err) {
    console.warn("clearCACDraft failed", err);
  }
}
