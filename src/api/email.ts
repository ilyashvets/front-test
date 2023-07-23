import axios from './axios';

export const fetchEmails = async (
  { limit, offset }: Pagination,
  credentials: Credentials,
): Promise<{ data: GetEmails }> =>
  axios.get(`/emails/?limit=${limit}&offset=${offset}`, {
    auth: credentials,
  });
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const fetchSendEmail = async (
  data: SendEmail.Request,
  credentials: Credentials,
) =>
  axios.post('/emails/', data, {
    auth: credentials,
  });
export const fetchEmailById = (id: number, credentials: Credentials) =>
  axios.get(`/emails/${id}`, {
    auth: credentials,
  });
export const fetchDeleteEmail = (id: number, credentials: Credentials) =>
  axios.delete(`/emails/${id}`, {
    auth: credentials,
  });
