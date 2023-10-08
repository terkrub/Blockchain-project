import React, { useState } from 'react';
import './component/style/VerifyShoeNFT.css';

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
        <div className="frame">
            <h1 className="verify-shoe-authenticity">Verify Shoe Authenticity</h1>

            <label>Token ID:</label>
            <input 
                type="text" 
                value={tokenId} 
                onChange={(e) => setTokenId(e.target.value)} 
                placeholder="Enter token ID" 
            />
            <button onClick={checkShoe}>Verify</button>

            {shoeDetails && (
                <div className="shoe-details">
                    <h2>Shoe Details:</h2>
                    <div className="product-photos">
                        <p><strong>Name:</strong> {shoeDetails.name}</p>
                        <p><strong>Description:</strong> {shoeDetails.description}</p>
                        <div className="product-thumbs">
                            <p className="product-thumb-item"><strong>Size:</strong> {shoeDetails.attributes[0].value}</p>
                            <p className="product-thumb-item2"><strong>Color:</strong> {shoeDetails.attributes[1].value}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyShoeNFT;
