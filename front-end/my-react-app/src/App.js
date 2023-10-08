import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Verification from './Components/Verification';
import Mynfts from './Components/Mynfts';
import Connecttowallet from './Components/Wallet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/mynft" element={<Mynfts />} />
          <Route path="/connecttowallet" element={<Connecttowallet />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
