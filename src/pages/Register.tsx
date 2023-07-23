import { FormEvent, useState } from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import UsernameInput from '@UI/UsernameInput';
import EmailInput from '@UI/EmailInput';
import PasswordInput from '@component/UI/PasswordInput';
import useAuthStore from '@store/useAuthStore';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, fetchRegister } = useAuthStore((state) => state);

  const [registerData, setRegisterData] = useState<RegisterData.Request>({
    username: '',
    email: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState<boolean>(false);

  const handleSetInput = (key: string) => (value: string) =>
    setRegisterData({
      ...registerData,
      [key]: value,
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchRegister(registerData)
      .then(() => navigate('/', { replace: true }))
      .catch(() => {
        setRegisterError(true);
        setTimeout(() => {
          setRegisterError(false);
        }, 3000);
      });
  };

  if (isAuth) return <Navigate to="/" state={{ from: location }} replace />;

  return (
    <>
      {registerError && (
        <Alert
          sx={{ position: 'fixed', right: '8px' }}
          variant="outlined"
          severity="error">
          This username already taken.
        </Alert>
      )}
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" sx={{ margin: '10px' }}>
            Sign Up
          </Typography>
          <UsernameInput withError set={handleSetInput('username')} />
          <EmailInput set={handleSetInput('email')} />
          <PasswordInput confirm set={handleSetInput('password')} />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ margin: '8px 0' }}>
            Get Started!
          </Button>
          <Typography sx={{ marginTop: '8px' }}>
            Already registered? <Link to="/login">Sign in</Link>
          </Typography>
        </form>
      </Container>
    </>
  );
}

export default Register;
