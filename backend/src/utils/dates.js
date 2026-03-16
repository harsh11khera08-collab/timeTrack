export function getMondayOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getMondayOfCurrentWeek() {
  return getMondayOfWeek(new Date());
}

export function getMondayOfPreviousWeek() {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  return getMondayOfWeek(lastWeek);
}

export function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
