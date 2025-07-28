import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useTokenStore = create(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (newToken) => set({ token: newToken }),
        clearToken: () => set({ token: "" }),
      }),
      { name: "token-store" }
    )
  )
);

export default useTokenStore;
