import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({conenctwallet, account}) => {
    const shortenAddress = (address) => {
      if (!address) return "";
      return address.slice(0, 4) + "..." + address.slice(-4);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light shadow">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <NavLink className="navbar-brand fw-bolder fs-4" to="/">FWnft</NavLink>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/identify_shoe">Verification</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/mynfts">My NFTs</NavLink>
                  </li>
                </ul>
                {account? <p style={{marginTop:'0.5%',marginLeft:'70%', background:'Green', padding:'1px', borderRadius:'10px',padding:'10px'}}>Connected with: {shortenAddress(account)}</p>:<button className="btn btn-success" style={{marginLeft:'80%'}} onClick={conenctwallet}>conenct wallet</button>}
                  
              </div>
            </div>
          </nav>
        </div>
    );
}

export default Navbar;
