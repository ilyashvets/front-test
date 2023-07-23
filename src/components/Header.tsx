import { AppBar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@store/useAuthStore';

function Header() {
  const navigate = useNavigate();

  const { logout } = useAuthStore((state) => state);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="fixed">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </AppBar>
  );
}

export default Header;
