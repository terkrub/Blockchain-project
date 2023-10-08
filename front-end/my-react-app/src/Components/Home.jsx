import React, { useState } from 'react';
import ShoeForm from './ShoeForm'; 
import QRCodeComponent from './QRCode'; 
import Navbar from './Navbar';

const Home = () => {
  const [shoeData, setShoeData] = useState(null);

  const handleGenerateQR = (data) => {
    setShoeData(data);
  };

  return (
    <div>
        <Navbar />
      <h1>Mint a New Shoe</h1>
      <ShoeForm onGenerateQR={handleGenerateQR} />
      {shoeData && (
        <div>
          <p>Mint Successful!</p>
          <QRCodeComponent data={JSON.stringify(shoeData)} />
        </div>
      )}
    </div>
  );
}

export default Home;
