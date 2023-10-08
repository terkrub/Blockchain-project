import React, { useState } from 'react';
import './Components/style/VerifyShoeNFT.css';
import Navbar from './Components/Navbar';

const VerifyShoeNFT = () => {
    const [tokenId, setTokenId] = useState('');
    const [shoeDetails, setShoeDetails] = useState(null);

    const checkShoe = async () => {
        try {
            const response = await fetch(`http://localhost:4000/shoe-info/${tokenId}`);
            const data = await response.json();
            if (data.success) {
                setShoeDetails(data.metadata);
            } else {
                alert('Error fetching details: ' + data.message);
            }
        } catch (error) {
            alert('Error: ' + error);
        }
    };

    return (
        <><Navbar />
        <div className="frame">
            <h1 className="verify-shoe-authenticity">Verify Shoe Authenticity</h1>

            <div className="Search">
            <i className="search-icon fas fa-search"></i>
            <input 
                className="search-input"
                type="text" 
                value={tokenId} 
                onChange={(e) => setTokenId(e.target.value)} 
                placeholder="Enter token ID" 
            />
    <button className="search-button" onClick={checkShoe}>Verify</button>
</div>


            <label>Token ID: {tokenId}</label>
            {shoeDetails && (
    <div className="shoe-details">
    <h2>Shoe Details:</h2>
    <div className="details-container">
        <div className="Name">
            <p><strong>Name:</strong> {shoeDetails.name}</p>
            <p><strong>Description:</strong> {shoeDetails.description}</p>
            <p><strong>Size:</strong> {shoeDetails.attributes[0].value}</p>
            <p><strong>Color:</strong> {shoeDetails.attributes[1].value}</p>
        </div>
        <div className="image">
            <img src="/shoe.png" alt="Shoe" />
        </div>
    </div>
</div>

)}

        </div>
        </>
    );
};

export default VerifyShoeNFT;
