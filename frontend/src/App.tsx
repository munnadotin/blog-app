import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import '../src/App.css';
import BlogDetails from './components/BlogDetails';
import Home from './pages/Home';
import Layout from './components/Layout';

export default function App() {
  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />  
          <Route path='/blog/:slug' element={<BlogDetails />} />
        </Route>
      </Routes>
    </>
  )
}
