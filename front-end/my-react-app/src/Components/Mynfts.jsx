import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import axios from 'axios';
import ShoeCard from './shoeCard';

const CONTRACT_ADDRESS = '0x17f2701F5FBe2493057d5F6c530199a4FFe79e1b';//'0x6a39aB76F7e919077a46f8034C3fB67Da079E853';
const BACKEND_API_ENDPOINT = 'http://localhost:4000/contracts/ABI'; 

const Mynfts = () => {

    const [account, setAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);
    const [contractABI, setContractABI] = useState([]);
    const [nfts, setNfts] = useState([]);
    
    useEffect(() => {
        if(account && networkId !== 97){//97){
            alert('Please connect to BSC Testnet')
        }
    },[networkId, account])
    

    const fetchNFTs = async () => {
        // Initialize web3
        const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545')//'https://data-seed-prebsc-1-s1.binance.org:8545'); // BSC testnet node
        
        // Set up contract
        const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
        const balance = await contract.methods.balanceOf(account).call();
        const tokens = [];
        for (let i = 0; i < balance; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call();
            tokens.push(tokenId.toString());
        }
        setNfts(tokens)
        console.log(tokens)
    };

    useEffect(() => {
        if(account)
            fetchNFTs()
      }, [account]);

      useEffect(() => {
        // Listener to handle account changes
        window.ethereum.on('accountsChanged', (accounts) => setAccount(accounts[0]));
        // Listener to handle network changes
        window.ethereum.on('chainChanged', (chainId) => setNetworkId(parseInt(chainId, 16)));
        fetchABI()
    }, []);
    
    
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                const Id = parseInt(window.ethereum.chainId, 16);
                setNetworkId(Id);
                console.log(typeof(Id))
    
                if (Id != 97) {
                    alert('Please switch to the BSC Testnet');
                } else {
                    const web3Instance = new Web3(window.ethereum);
                }
            } catch (error) {
                console.error('User rejected connection:', error);
            }
        } else {
            alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    };
    


    const fetchABI = async () => {
        try {
            const response = await axios.get(BACKEND_API_ENDPOINT);
            setContractABI(response.data.abi);  // Assuming the backend returns ABI directly
        } catch (error) {
            console.error("Error fetching ABI:", error);
        }
    };


    const transferNFT = async (tokenId) => {
        try {
            if (!window.ethereum || !account) {
                throw new Error('MetaMask or account is not available');
            }
    
            const web3 = new Web3(window.ethereum);
            const nftContract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
              // This will print the decoded logs
            const toAddress = prompt('Please enter destination address');
    
            if (!web3.utils.isAddress(toAddress)) {
                throw new Error('Please enter a valid address');
            }
    
            const nftOwner = await nftContract.methods.ownerOf(tokenId).call();
            console.log(`Owner of tokenId ${tokenId}:`, nftOwner);
            console.log(`Account that being used: ${account}`);
            console.log(`Token ID: ${tokenId}`);
            console.log(`Transfer to: ${toAddress}`);
    
            const gasAmount = await nftContract.methods.transferFrom(account, toAddress, tokenId).estimateGas({ from: account });
            
        

            try {
                const txReceipt = await nftContract.methods.transferFrom(account, toAddress, tokenId).send({ from: account, gas: parseInt(gasAmount) + 1000000 })
                
    
                alert('NFT Transferred Successfully!');
            } catch (error) {
                if (error.code === 4001) {
                    // User rejected transaction
                    console.error('Transaction Rejected by User');
                } else {
                    console.error('Error transferring NFT:', error);
                }
                alert('Error transferring NFT');
            }
    
        } catch (error) {
            alert('Error transferring NFT');
        }
    };
    
    
      


    return (
        <div>
            <Navbar conenctwallet={connectWallet} account={account}/>
            <div className='card-container' style={{display:'flex'}}>
            {nfts.map(id =>(
                    <ShoeCard id={id} transferNFT={transferNFT}/>
           
            ))}
            </div>
            

        </div>
    )
}

export default Mynfts;