import { create } from "zustand";
import { calculatePestIndex } from "../javas";
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

  getCurrWeather: async (city) => {
    if (!city) return;
    try {
      const res = await axios.get(`${url}/v1/weather/${city}`);
      const data = await res.data;

      get().setWeather(data);
      set({ weather: data, err: null });
    } catch (error) {
      console.log(error);
      set({ err: error });
    }
  },
  setWeather: (data) => {
    const pestData = calculatePestIndex({
      temp: data.temp,
      humidity: data.humidity,
      rain: data.rain || 0,
      rain7d: data.rain7d || 0,
      wind: data.wind || 0,
    });
    console.log(data, pestData);

    set({
      weather: data,
      pestData,
    });
  },

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
