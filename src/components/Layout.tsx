import Header from '@component/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '28px' }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
