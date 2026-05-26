export function prefillContact(msg: string) {
  window.dispatchEvent(new CustomEvent("prefill-contact", { detail: msg }));
  document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
}
