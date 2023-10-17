import { useEffect, useState } from "react"

const ShoeCard = ({ id,  transferNFT}) => {
    const [shoeData, setShoeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/shoe-info/${id}`);
                const data = await response.json();
                if (data.success) {
                    setShoeData(data.metadata);
                } else {
                    alert('Error fetching details: ' + data.message);
                }
            } catch (error) {
                alert('Error: ' + error);
            }
        };
        fetchData();
    }, [id]);  // Added dependency

    return (
        <>
            {shoeData ? (
                <div className="card" style={{ width: "18rem", margin:'2%' }}>
                    <img 
                        src={shoeData.image || "..."}  // Using data for image src
                        className="card-img-top" 
                        alt={shoeData.name || "..."}   // Using data for alt text
                    />
                    <div className="card-body">
                        <h5 className="card-title">{id}</h5>
                        <p className="card-text">Shoe name: {shoeData.shoeName}</p>
                        <p className="card-text">Shoe size: {shoeData.shoeSize}</p>
                        <p className="card-text">Year: {shoeData.year}</p>
                        <button className="btn btn-primary" onClick={()=>{transferNFT(id)}}>Transfer</button>
                    </div>
                </div>
            ) : (
                <></>  // Placeholder for loading or empty state
            )}
        </>
    );
};

export default ShoeCard;
