import React, { useState } from 'react';
import './Components/style/VerifyShoeNFT.css';
import Navbar from './Components/Navbar';

const VerifyShoeNFT = () => {
    const [tokenId, setTokenId] = useState(null);
    const [shoeDetails, setShoeDetails] = useState(null);

    const checkShoe = async () => {
        try {
            const response = await fetch(`http://localhost:4000/shoe-info/${tokenId}`);
            const data = await response.json();
            if (data.success) {
                console.log(data)
                setShoeDetails(data.metadata);
            } else {
                console.log(data)
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
                type="number" 
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
            <p><strong>Name:</strong> {shoeDetails.shoeName}</p>
            <p><strong>Size:</strong> {shoeDetails.shoeSize}</p>
            <p><strong>Color:</strong> {shoeDetails.shoeColor}</p>
            <p><strong>Country Origin:</strong> {shoeDetails.countryOrigin}</p>
            <p><strong>Year:</strong> {shoeDetails.year}</p>
            <p><strong>Shoe Material:</strong> {shoeDetails.shoeMaterial}</p>


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
