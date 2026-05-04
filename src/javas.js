export function calculatePestIndex(temp_C, humidity) {
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
