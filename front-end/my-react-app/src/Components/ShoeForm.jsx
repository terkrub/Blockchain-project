import React, { useState } from 'react';

function ShoeForm({ onGenerateQR }) {
    const [shoeName, setShoeName] = useState('');
    const [shoeSize, setShoeSize] = useState('');
    const [shoeColor, setShoeColor] = useState('');
    const [countryOrigin, setCountryOrigin] = useState('');
    const [shoeMaterial, setShoeMaterial] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerateQR({ shoeName, shoeSize, shoeColor, countryOrigin, shoeMaterial, year });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="shoe-name">Product:</label>
            <input
                type="text"
                id="shoe-name"
                value={shoeName}
                onChange={(e) => setShoeName(e.target.value)}
                required
            />
            <br />
            <label htmlFor="shoe-color">Color:</label>
            <input
                type="text"
                id="shoe-color"
                value={shoeColor}
                onChange={(e) => setShoeColor(e.target.value)}
                required
            />
            <br />
            <label htmlFor="shoe-size">Size:</label>
            <input
                type="text"
                id="shoe-size"
                value={shoeSize}
                onChange={(e) => setShoeSize(e.target.value)}
                required
            />
             <br />
            <label htmlFor="country-origin">Country/Region of Origin:</label>
            <input
                type="text"
                id="country-origin"
                value={countryOrigin}
                onChange={(e) => setCountryOrigin(e.target.value)}
                required
            />
            <br />
            <label htmlFor="shoe-material">Materials:</label>
            <input
                type="text"
                id="shoe-material"
                value={shoeMaterial}
                onChange={(e) => setShoeMaterial(e.target.value)}
                required
            />
            <br />
            <label htmlFor="year">Year:</label>
            <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
            />
            <br />
            <button type="submit">Generate QR Code</button>
            <br />
        </form>
    );
}

export default ShoeForm;