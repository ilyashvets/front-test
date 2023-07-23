/// <reference types="react-scripts" />

interface Pagination {
  limit: number;
  offset: number;
}
interface Credentials {
  username: string;
  password: string;
}

interface Email {
  id: number;
  sender: number;
  recipient: string;
  subject: string;
  message: string;
}

interface GetEmails {
  count: number;
  next: null;
  previous: null;
  results: Email[];
}

namespace SendEmail {
  interface Request {
    sender: number;
    recipient: string;
    subject: string;
    message: string;
  }

  interface Response extends Email {}
}

namespace EmailStore {
  interface State {
    emails: Email[];
    totalCount: number;
    page: number;
    limit: number;
    offset: number;
    loading: boolean;
  }

  interface Actions {
    resetStore: () => void;
    setPage: (page: number) => void;
    fetchEmails: () => Promise<GetEmails>;
    fetchSendEmail: (data: SendEmail.Request) => Promise<SendEmail.Response>;
  }
}

namespace AuthStore {
  interface State {
    isAuth: boolean;
    credentials: Credentials;
    user: LoginData.Response;
  }
  interface Actions {
    fetchLogin: (data: LoginData.Request) => Promise<LoginData.Response>;
    fetchRegister: (
      data: RegisterData.Request,
    ) => Promise<RegisterData.Response>;
    logout: () => void;
  }
}

namespace LoginData {
  interface Request {
    username: string;
    password: string;
  }
  interface Response {
    id: number;
    username: string;
    email: string;
  }
}

namespace RegisterData {
  interface Request {
    username: string;
    email: string;
    password: string;
  }
  interface Response {
    id: number;
    username: string;
    email: string;
  }
}
