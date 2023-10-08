import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeComponent({ data }) {
    return (
        <div>
            <QRCode value={data} />
        </div>
    );
}

export default QRCodeComponent;