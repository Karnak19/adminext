import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Account = {
  id: string;
  name: string;
  key: string;
};
interface Store {
  account: Account | null;
  selectAccount: (account: Account) => void;
}

export const useStore = create<Store>()(
  devtools(
    persist((set) => ({
      account: null,
      selectAccount: (account: Account) => set((state) => ({ ...state, account })),
    })),
  ),
);
