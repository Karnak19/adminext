import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Store {
  accountKey: string | null;
  selectAccount: (accountKey: string) => void;
}

export const useStore = create<Store>()(
  devtools(
    persist((set) => ({
      accountKey: null,
      selectAccount: (accountKey: string) => set((state) => ({ ...state, accountKey })),
    })),
  ),
);
