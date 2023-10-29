import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle = {
    background: 'lightgray',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    fontSize: '18px',
    marginLeft: '10px', // Add some spacing between links
  };

  return (
    <div style={navbarStyle}>
      <div>
     
      </div>
      <div>
        <Link to="/list" style={linkStyle}>
          List Page
        </Link>
      </div>
     
    </div>
  );
};

export default Navbar;
