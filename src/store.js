import { create } from "zustand";
import axios from "axios";

const url =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : import.meta.env.VITE_BACKEND_URL;

export const useMyStore = create((set, get) => ({
  weather: {},
  mosqIndex: [],
  pestIndices: {},

  err: null,

  getWeather: async (city) => {
    const localStore = JSON.parse(localStorage.getItem("weather")) || {};
    const cityData = localStore[city];
    if (cityData) {
      console.log("served fom cache", city);
      const { main } = cityData;
      const tempC = Number((main.temp - 273.15).toFixed(2));

      const pestIndices = get().calculatePestIndex(tempC, main.humidity);

      set({ weather: cityData, pestIndices: pestIndices, err: null });
      return;
    }
    try {
      console.log("served from api");
      const res = await axios.get(`${url}/v1/weather/${city}`);
      const data = res.data;

      const updatedStore = { ...localStore, [city]: data };
      localStorage.setItem("weather", JSON.stringify(updatedStore));

      const { main } = data;
      const tempC = Number((main.temp - 273.15).toFixed(2));
      const pestIndices = get().calculatePestIndex(tempC, main.humidity);

      set({ weather: data, pestIndices: pestIndices, err: null });
    } catch (error) {
      console.error("Fetch failed:----", error.response.data.msg);
      set({ err: error.response.data.msg });
    }
  },
  calculatePestIndex: (temp_C, humidity) => {
    if (temp_C === undefined && humidity === undefined) return null;

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
  },

  jsonData: [],
  setJsonData: async () => {
    const res = await axios.get(`/data/pestData.json`);
    const data = res.data;
    set({ jsonData: data });
  },

  debounce: (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  },
}));
