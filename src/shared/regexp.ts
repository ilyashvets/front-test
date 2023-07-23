const passwordRegexp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;"'<>,.?/~`])(.{8,})$/;
const loginRegexp = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export { passwordRegexp, loginRegexp, emailRegexp };
