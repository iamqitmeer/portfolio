const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Month index since year 0, e.g. "Aug 2026" -> 2026*12+7. "Present" -> current month. */
export function parseMonth(s: string, now = new Date()): number {
  const t = s.trim();
  if (/present/i.test(t)) return now.getFullYear() * 12 + now.getMonth();
  const [m, y] = t.split(" ");
  return Number(y) * 12 + MONTHS.indexOf(m);
}

/** "Aug 2026 – Present" -> [start, end] month indexes, end inclusive. */
export function parseRange(range: string, now = new Date()): [number, number] {
  const [a, b] = range.split(/\s+[–-]\s+/);
  return [parseMonth(a, now), parseMonth(b ?? a, now)];
}

/** LinkedIn-style duration: "1 yr 2 mos" (inclusive of both months). */
export function duration(start: number, end: number): string {
  const total = end - start + 1;
  const y = Math.floor(total / 12);
  const m = total % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

export function formatMonth(idx: number): string {
  return `${MONTHS[idx % 12]} ${Math.floor(idx / 12)}`;
}
