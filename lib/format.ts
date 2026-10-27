const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

const parts = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

/** "22 OUT 2026" */
export function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = parts.formatToParts(d);
  const get = (t: string) => p.find((x) => x.type === t)?.value ?? "";
  const month = MONTHS[Number(get("month")) - 1] ?? "";
  return `${get("day")} ${month} ${get("year")}`;
}
