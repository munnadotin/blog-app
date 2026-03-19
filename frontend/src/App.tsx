import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import '../src/App.css';
import Loader from './components/Loader';

export default function App() {
  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loader' element={<Loader />} />
      </Routes>
    </>
  )
}
