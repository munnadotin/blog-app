import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import '../src/App.css';
import BlogDetails from './components/BlogDetails';
import Home from './pages/Home';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './app/store';
import Dashboard from './pages/Dashboard';
import { refreshToken } from './features/auth/authSlice';
import ProtectedRoute from './routes/Protected.route';
import EditBlog from './components/EditBlog';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

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
        <Route path='/' element={<Layout />}>

          <Route index element={<Home />} />
          <Route path='blog/:slug' element={<BlogDetails />} />

          <Route path='auth'>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
          </Route>
          <Route path='/edit/:slug' element={<EditBlog />} />

        </Route>
      </Routes>
    </>
  )
}
