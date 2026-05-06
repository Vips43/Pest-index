export function scoreTemp(t) {
  if (t < 15) return 10;
  if (t < 20) return 30;
  if (t < 24) return 60;
  if (t <= 32) return 100;   // optimal band
  if (t <= 36) return 70;
  return 30;
}

export function scoreHumidity(h) {
  if (h < 40) return 20;
  if (h < 60) return 60;
  return 100;
}

export function scoreRain(rToday, r7d) {
  // cap influence so it doesn’t blow up
  const rt = Math.min(rToday, 20);   // today
  const r7 = Math.min(r7d, 100);     // last 7 days

  // weighted: recent history matters more
  const combined = 0.3 * rt + 0.7 * (r7 / 7); // avg daily over 7d

  if (combined === 0) return 20;
  if (combined < 2) return 40;
  if (combined < 5) return 70;
  return 100;
}

export function scoreWind(w) {
  if (w == null) return 70; // if not available, assume moderate
  if (w < 5) return 100;
  if (w < 15) return 70;
  if (w < 25) return 40;
  return 20;
}