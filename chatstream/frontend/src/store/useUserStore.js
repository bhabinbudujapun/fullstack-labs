import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (newUser) => set({ user: newUser }),
        clearUser: () => set({ user: null }),
      }),
      { name: "user-store" }
    )
  )
);

export default useUserStore;
