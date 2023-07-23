import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from '@page/Main';
import Login from '@page/Login';
import Register from '@page/Register';
import Layout from '@component/Layout';
import Protected from '@component/Protected';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
