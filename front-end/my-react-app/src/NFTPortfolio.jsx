import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const CONTRACT_ADDRESS = '0x52a38dBd7EF2F04C995F57c7E221008b5CA117B9';
const BACKEND_API_ENDPOINT = 'http://localhost:4000/contracts/ABI'; 

function NFTPortfolio() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [nfts, setNfts] = useState([]);
    const [recipient, setRecipient] = useState('');
    const [contractABI, setContractABI] = useState([]);

    useEffect(() => {
        if (window.BinanceChain) {
            const web3Instance = new Web3(window.BinanceChain);
            setWeb3(web3Instance);
            fetchABI();  // Fetch the ABI when the component is mounted
        } else {
            alert('Binance Wallet is not installed. Please install it and try again.');
        }
    }, []);

    const connectWallet = async () => {
        if (window.BinanceChain) {
            try {
                const accountData = await window.BinanceChain.requestAccounts();
                if (accountData && accountData[0] && accountData[0].addresses) {
                    const ethAddress = accountData[0].addresses.find(addr => addr.type === 'eth').address;
                    setAccount(ethAddress);
                    fetchNFTs(ethAddress);
                } else {
                    console.error("Account data structure is invalid.");
                }
            } catch (error) {
                console.error("Error connecting to Binance Wallet:", error);
            }
        } else {
            alert('Binance Wallet is not installed. Please install it and try again.');
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

    const fetchNFTs = async (connectedAccount) => {
        const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
        const balance = await contract.methods.balanceOf(connectedAccount).call();

        const tokens = [];
        for (let i = 0; i < balance; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(connectedAccount, i).call();
            tokens.push(tokenId.toString());
        }

        setNfts(tokens);
    };

    const handleTransfer = async (tokenId) => {
        console.log("Web3 instance:", web3);
        const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
        console.log(tokenId)
        try {
            await contract.methods
            .transferToken(recipient, tokenId)
            .send({ from: account })
            .on('transactionHash', (hash) => {
              // Transaction sent successfully, you can handle the result here
              console.log('Transaction Hash:', hash);
            })
            .on('receipt', (receipt) => {
              // Transaction receipt received, you can handle the result here
              console.log('Transaction Receipt:', receipt);
            })
            .on('error', (error) => {
              // Handle errors here
              console.error('Transaction Error:', error);
            });
            alert('Transfer successful!');
            fetchNFTs(account);
        } catch (error) {
            console.error("Error transferring NFT:", error);
        }
    };

    return (
        <div>
            {account ? (
                <>
                    <ul>
                        {nfts.map(tokenId => (
                            <li key={tokenId}>
                                {tokenId} <button onClick={() => handleTransfer(tokenId)}>Transfer</button>
                            </li>
                        ))}
                    </ul>
                    <input 
                        type="text" 
                        placeholder="Recipient Address" 
                        value={recipient} 
                        onChange={e => setRecipient(e.target.value)} 
                    />
                </>
            ) : (
                <button onClick={connectWallet}>Connect Binance Wallet</button>
            )}
        </div>
    );
}

export default NFTPortfolio;
