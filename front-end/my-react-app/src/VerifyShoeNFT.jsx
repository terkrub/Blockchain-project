import React, { useState } from 'react';

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
        <div>
            <h1>Verify Shoe Authenticity</h1>

            <label>Token ID:</label>
            <input type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="Enter token ID" />
            <button onClick={checkShoe}>Verify</button>

            {shoeDetails && (
                <>
                    <h2>Shoe Details:</h2>
                    <div>
                        <p><strong>Name:</strong> {shoeDetails.name}</p>
                        <p><strong>Description:</strong> {shoeDetails.description}</p>
                        <img src={shoeDetails.image} alt="Shoe Image" width="200" />
                        <p><strong>Size:</strong> {shoeDetails.attributes[0].value}</p>
                        <p><strong>Color:</strong> {shoeDetails.attributes[1].value}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default VerifyShoeNFT;
