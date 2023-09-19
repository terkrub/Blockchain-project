import React, { useState } from 'react';

const MintShoeNFT = () => {
  const [shoeDetails, setShoeDetails] = useState({
    name: '',
    description: '',
    image: '',
    attributes: [{ trait_type: 'Size', value: '' }, { trait_type: 'Color', value: '' }]
  });
  const [status, setStatus] = useState('');

  const handleChange = (field, value) => {
    if (field === 'size' || field === 'color') {
      setShoeDetails(prev => ({
        ...prev,
        attributes: prev.attributes.map(attr => {
          if (attr.trait_type.toLowerCase() === field) {
            return { ...attr, value };
          }
          return attr;
        })
      }));
    } else {
      setShoeDetails(prev => ({ ...prev, [field]: value }));
    }
  };

  const mintNFT = async () => {
    try {
      const response = await fetch('http://localhost:4000/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shoeDetails)
      });

      const data = await response.json();
      if (data.success) {
        setStatus('Successfully minted! Transaction hash: ' + data.transactionHash);
      } else {
        setStatus('Error minting: ' + data.message);
      }
    } catch (error) {
      setStatus('Error: ' + error);
    }
  };

  return (
    <div>
      <h1>Mint a New Shoe NFT</h1>

      <label>Shoe Name:</label>
      <input type="text" placeholder="Enter shoe name" onChange={e => handleChange('name', e.target.value)} />

      <label>Description:</label>
      <input type="text" placeholder="Enter shoe description" onChange={e => handleChange('description', e.target.value)} />

      <label>Image URL:</label>
      <input type="text" placeholder="Enter image URL" onChange={e => handleChange('image', e.target.value)} />

      <label>Size:</label>
      <input type="text" placeholder="Enter shoe size" onChange={e => handleChange('size', e.target.value)} />

      <label>Color:</label>
      <input type="text" placeholder="Enter shoe color" onChange={e => handleChange('color', e.target.value)} />

      <button onClick={mintNFT}>Mint</button>
      <p>{status}</p>
    </div>
  );
};

export default MintShoeNFT;
