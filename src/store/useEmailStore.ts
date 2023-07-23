import { create } from 'zustand';
import { fetchEmails, fetchSendEmail } from '@api/email';
import useAuthStore from '@store/useAuthStore';

const initialState: EmailStore.State = {
  emails: [],
  totalCount: 0,
  page: 0,
  limit: 15,
  offset: 0,
  loading: false,
};

const useEmailStore = create<EmailStore.State & EmailStore.Actions>(
  (set, get) => ({
    ...initialState,
    resetStore: () => {
      set(initialState);
    },
    setPage: (page) => {
      const {
        loading,
        fetchEmails: fetchMoreEmails,
        totalCount,
        emails,
      } = get();

      if (!loading && totalCount > emails.length) {
        fetchMoreEmails().finally(() => set({ loading: false }));
      }

      set({
        loading: true,
        page,
      });
    },
    fetchEmails: async (): Promise<GetEmails> => {
      const { credentials } = useAuthStore.getState();
      const { limit, offset } = get();

      const res = await fetchEmails({ limit, offset }, credentials);

      set((state) => ({
        emails: [...state.emails, ...res.data.results],
        totalCount: res.data.count,
        limit: 10,
        offset: offset + limit,
      }));

      return res.data;
    },
    fetchSendEmail: async (
      data: SendEmail.Request,
    ): Promise<SendEmail.Response> => {
      const { credentials } = useAuthStore.getState();
      const res = await fetchSendEmail(data, credentials);
      return res.data;
    },
  }),
);

export default useEmailStore;
