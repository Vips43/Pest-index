import { create } from "zustand";

export const useMiscStore = create((set, get) => ({
  count: 0,
  data: {},
  setNext: (val) =>
    set((state) => ({ count: val !== undefined ? val : state.count + 1 })),
  resetCount: () => set({ count: 0 }),
  setFormData: (data) => set({ data: data }),
}));
