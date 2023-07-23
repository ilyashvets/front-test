import { Container, Typography, Button, Alert } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import UsernameInput from '@component/UI/UsernameInput';
import PasswordInput from '@component/UI/PasswordInput';
import { FormEvent, useState } from 'react';
import useAuthStore from '@store/useAuthStore';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, fetchLogin } = useAuthStore((state) => state);

  const [loginData, setLoginData] = useState<LoginData.Request>({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<boolean>(false);

  const handleSetInput = (key: string) => (value: string) =>
    setLoginData({
      ...loginData,
      [key]: value,
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchLogin(loginData)
      .then(() => navigate('/', { replace: true }))
      .catch(() => {
        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 3000);
      });
  };

  if (isAuth) return <Navigate to="/" state={{ from: location }} replace />;

  return (
    <>
      {loginError && (
        <Alert
          sx={{ position: 'fixed', right: '8px' }}
          variant="outlined"
          severity="error">
          Incorrect credentials
        </Alert>
      )}
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" sx={{ margin: '10px' }}>
            Sign In
          </Typography>
          <UsernameInput set={handleSetInput('username')} />
          <PasswordInput set={handleSetInput('password')} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ margin: '8px 0' }}>
            Continue
          </Button>
          <Typography sx={{ marginTop: '8px' }}>
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </Typography>
        </form>
      </Container>
    </>
  );
}

export default Login;
