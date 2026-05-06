// existing code
export function calculatePestIndexx(temp_C, humidity) {
  if (!temp_C && !humidity) return null;

  let indices = {
    mosquitoes: 0,
    rodents: 0,
    termites: 0,
  };
  // --- Mosquito Logic ---
  if (temp_C > 15 && temp_C < 35) {
    let tempScore = (temp_C - 15) * 4;
    let humidityMultiplier = humidity / 100;
    indices.mosquitoes = Math.min(
      100,
      Math.round(tempScore * humidityMultiplier * 2),
    );
  } else {
    indices.mosquitoes = 0;
  }
  // --- Rodent Logic ---
  if (temp_C < 10) {
    indices.rodents = 90;
  } else if (temp_C >= 10 && temp_C < 20) {
    indices.rodents = 60;
  } else {
    indices.rodents = 30;
  }
  // ---- Termites logic ----
  if (temp_C > 25 && temp_C < 40 && humidity > 70) {
    indices.termites = 90;
  } else if (temp_C > 25 && temp_C < 35) {
    indices.termites = 80;
  } else {
    indices.termites = 30;
  }
  return indices;
}
export function calculatePestIndex({
  temp,
  humidity,
  rain = 0,
  rain7d = 0,
  wind = 0
}) {

  // --- Basic scoring (0–100) ---

  const tempScore =
    temp < 20 ? 30 :
    temp < 25 ? 60 :
    temp <= 32 ? 100 :
    temp <= 36 ? 70 : 40;

  const humidityScore =
    humidity < 40 ? 20 :
    humidity < 60 ? 60 : 100;

  const rainScore = (() => {
    const combined = 0.3 * rain + 0.7 * (rain7d / 7);
    if (combined === 0) return 20;
    if (combined < 2) return 40;
    if (combined < 5) return 70;
    return 100;
  })();

  const windScore =
    wind < 5 ? 100 :
    wind < 15 ? 70 :
    wind < 25 ? 40 : 20;

  // --- Pest calculations ---

  const mosquito =
    0.35 * tempScore +
    0.30 * humidityScore +
    0.25 * rainScore +
    0.10 * windScore;

  const cockroach =
    0.60 * tempScore +
    0.40 * humidityScore;

  const termite =
    0.50 * tempScore +
    0.50 * ((humidityScore + rainScore) / 2);

  const fly =
    0.50 * tempScore +
    0.30 * humidityScore +
    0.20 * rainScore;

  const rodent =
    0.50 * tempScore +
    0.20 * humidityScore +
    0.30 * rainScore;

  const ant =
    0.40 * tempScore +
    0.40 * humidityScore +
    0.20 * rainScore;

  const bedbug =
    0.70 * 50 + // constant base
    0.30 * tempScore;

  // --- helper to round + level ---
  const normalize = (val) => {
    const score = Math.round(Math.max(0, Math.min(100, val)));

    const level =
      score < 30 ? "Low" :
      score < 50 ? "Moderate" :
      score < 70 ? "High" :
      "Very High";

    return { score, level };
  };

  const pests = {
    mosquito: normalize(mosquito),
    cockroach: normalize(cockroach),
    termite: normalize(termite),
    fly: normalize(fly),
    rodent: normalize(rodent),
    ant: normalize(ant),
    bedbug: normalize(bedbug)
  };

  // --- PPI (overall index) ---
  const ppiValue =
    0.25 * pests.mosquito.score +
    0.20 * pests.cockroach.score +
    0.20 * pests.termite.score +
    0.15 * pests.rodent.score +
    0.10 * pests.fly.score +
    0.10 * pests.ant.score;

  const ppi = normalize(ppiValue);

  return {
    pests,
    ppi,
    environment: {
      tempScore,
      humidityScore,
      rainScore,
      windScore
    }
  };
}