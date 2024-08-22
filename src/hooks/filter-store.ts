import { create } from "zustand";

export type FilterStore = {
  search: string;
  onSearchChange: (search: string) => void;
  active: "all" | "active" | "inactive";
  onActiveChange: (active: "all" | "active" | "inactive") => void;
};

export const useFilterStore = create<FilterStore>((set) => {
  return {
    search: "",
    onSearchChange: (search: string) => {
      set({ search });
    },
    active: "all",
    onActiveChange: (active: "all" | "active" | "inactive") => {
      set({ active });
    },
  };
});
