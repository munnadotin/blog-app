import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import '../src/App.css';
import BlogDetails from './components/BlogDetails';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './app/store';
import Dashboard from './pages/Dashboard';
import { refreshToken } from './features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth);
  console.log(user)

  useEffect(() => {
    const init = async () => {
      await dispatch(refreshToken()).unwrap();
    };
    init();
  }, []);

  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/blog/:slug' element={<BlogDetails />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}
