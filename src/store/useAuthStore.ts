import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { fetchLogin, fetchRegister } from '@api/auth';
import useEmailStore from '@store/useEmailStore';

const initialState: AuthStore.State = {
  isAuth: false,
  credentials: {
    username: '',
    password: '',
  },
  user: {
    id: 0,
    username: '',
    email: '',
  },
};

const useAuthStore = create<AuthStore.State & AuthStore.Actions>()(
  persist(
    (set) => ({
      ...initialState,
      fetchLogin: async (data) => {
        const res = await fetchLogin(data);
        set({
          isAuth: true,
          credentials: data,
          user: res.data as LoginData.Response,
        });
        return res.data;
      },
      fetchRegister: async (data) => {
        const res = await fetchRegister(data);
        set({
          isAuth: true,
          credentials: {
            username: data.username,
            password: data.password,
          },
          user: res.data as RegisterData.Response,
        });
        return res.data;
      },
      logout: () => {
        const { resetStore } = useEmailStore.getState();
        resetStore();
        set(initialState);
      },
    }),
    { name: 'auth', storage: createJSONStorage(() => localStorage) },
  ),
);

export default useAuthStore;
