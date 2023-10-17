import React, { useState } from 'react';
import ShoeForm from './ShoeForm'; 
import QRCodeComponent from './QRCode'; 
import Navbar from './Navbar';
import axios from 'axios';

const Home = () => {
  const [shoeData, setShoeData] = useState(null);
  const [serialNumber,setSerialNumber] = useState(null);
  const [hash,setHash] = useState('')

  const handleGenerateQR = (data) => {
    setShoeData(data);
    mint(data);  // pass data directly to mint
  };
  
  const mint = async (shoeDataToMint) => {
    try {
      const res = await axios.post(`http://localhost:4000/mint`, {shoeData: shoeDataToMint});
      console.log(res)
      setSerialNumber(res.data.serialNumber)
      setHash(res.data.transactionHash)
    } catch (err) {
      console.log(err);
    }
  }
  

  return (
    <div>
        <Navbar />
      <h1>Mint a New Shoe</h1>
      <ShoeForm onGenerateQR={handleGenerateQR} />
      {serialNumber && (
        <div>
          <p>Mint Successful!</p>
          <p>SerialNumber: {serialNumber}</p>
          <p>TransactionHash: {hash}</p>
          <QRCodeComponent data={serialNumber} />
        </div>
      )}
    </div>
  );
}

export default Home;
