import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import '../src/App.css'; 

export default function App() {
  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}
