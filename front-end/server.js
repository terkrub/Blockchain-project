const express = require('express');
const fetch = require('node-fetch');
const Web3 = require('web3');
const bodyParser = require('body-parser');
const cors = require('cors');
const ShoeNFT = require('../build/contracts/ShoeNFT.json');
const fs = require('fs');


const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Connect to BSC Testnet
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545/');


const CONTRACT_ABI = ShoeNFT.abi;  // Use your ShoeNFT contract ABI
const CONTRACT_ADDRESS = '0x52a38dBd7EF2F04C995F57c7E221008b5CA117B9';
const PRIVATE_KEY = '8ead3bb7c48cf42fc0bf73daa3b207c34e11c225aa0dbbe07d7a54ef16238d51';
const MY_ADDRESS = '0x3872E72Ad10bCEA619021efcce1c232da7413618';

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


app.post('/mint', async (req, res) => {
    try {
        // 1. Save metadata to a JSON file
        const metadataFilename = Date.now() + '.json';
        fs.writeFileSync('./metadata/' + metadataFilename, JSON.stringify(req.body));

        // 2. Mint the NFT using the metadata's file path as the URI
        const token_uri = 'http://localhost:4000/metadata/' + metadataFilename;

        const tx = {
            chainId: 97,
            gas: 2000000,
            gasPrice: web3.utils.toWei('10', 'gwei'),
            nonce: await web3.eth.getTransactionCount(MY_ADDRESS),
        };

        const mintTx = contract.methods.mint(MY_ADDRESS, token_uri).encodeABI();

        const signedTx = await web3.eth.accounts.signTransaction({ ...tx, to: CONTRACT_ADDRESS, data: mintTx }, PRIVATE_KEY);
        const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        res.json({ success: true, transactionHash: result.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/contracts/ABI', (req,res) =>{
    res.json(ShoeNFT)
})

app.get('/shoe-info/:tokenId', async (req, res) => {
    try {
        const tokenId = req.params.tokenId;
        const tokenUri = await contract.methods.tokenURI(tokenId).call();

        // Fetch the metadata from the URI
        const response = await fetch(tokenUri);
        const metadata = await response.json();
        console.log(metadata)
        res.json({ success: true, metadata });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Serve the metadata files
app.use('/metadata', express.static('metadata'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});