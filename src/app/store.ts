import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Account = {
  id: string;
  name: string;
  key: string;
};
interface State {
  account: Account | null;
  role: 'admin' | 'user' | null;
}

interface Actions {
  selectAccount: (account: Account) => void;
  setRole: (role: 'admin' | 'user', account?: Account) => void;
  reset: () => void;
}

type Store = State & Actions;

// type StoreWithoutFunc = {
//   [K in keyof Store as Store[K] extends (...args: never) => void ? never : K]: Store[K];
// };

const initialState: State = {
  account: null,
  role: null,
};

export const useStore = create<Store>()(
  devtools(
    persist((set, store) => ({
      ...initialState,
      selectAccount: (account: Account) => set((state) => ({ ...state, account })),
      setRole: (role: 'admin' | 'user', account?: Account) => {
        set((state) => ({
          ...state,
          role,
          account: store().account ? store().account : account,
        }));
      },
      reset: () => set(initialState),
    })),
  ),
);
