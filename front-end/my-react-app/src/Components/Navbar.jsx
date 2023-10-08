import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light shadow">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/verification">Verification</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/mynfts">My NFTs</NavLink>
                  </li>
                </ul>
                <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">FWnft</NavLink>
                <NavLink to="/connecttowallet" className="btn btn-outline-success ms-auto px-4 rounded-pill"><i className="fa fa-sign-in me-2"></i>Connect to Wallet</NavLink>
              </div>
            </div>
          </nav>
        </div>
    );
}

export default Navbar;
