import './App.css';
import Navbar from './Components/Navbar';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import ShoeCard from './Components/shoeCard';

const CONTRACT_ADDRESS = '0x17f2701F5FBe2493057d5F6c530199a4FFe79e1b';//'0x6a39aB76F7e919077a46f8034C3fB67Da079E853';
const BACKEND_API_ENDPOINT = 'http://localhost:4000/contracts/ABI'; 

function App() {
  const [contractABI, setContractABI] = useState([]);
  const [NFTS, setNFTS] = useState([]);
  useEffect(()=>{
    fetchABI()
    
  },[])
  const fetchABI = async () => {
    try {
        const response = await axios.get(BACKEND_API_ENDPOINT);
        setContractABI(response.data.abi);  // Assuming the backend returns ABI directly
        const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')//'https://data-seed-prebsc-1-s1.binance.org:8545'); // BSC testnet node
        
        const contract = new web3.eth.Contract(response.data.abi, CONTRACT_ADDRESS);
        const NFTid = await contract.methods.getAllTokens().call();
        console.log(NFTid)
        setNFTS(NFTid)
    } catch (error) {
        console.error("Error fetching ABI:", error);
    }
  };


  return (
   <>
    <Navbar />
    <h3>All NFTs</h3>
    <div className='card-container' style={{display:'flex'}}>
      {NFTS.map(id =>(
            <ShoeCard id={id}/>
            
      ))}
    </div>
   </>  
  );
}

export default App;
