import React from 'react'
import { CiBellOn } from "react-icons/ci";
import People from "../assets/img/PEOPLE.CO.png"
import Profile from "../assets/img/Ellipse 211.png"
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="navbar-left">
            <img src={People} alt="brand_name" style={{height:'25px'}} />
        </div>

        <div className="navbar-right">
            <CiBellOn size={20} />
            <div className="profile">
                <img src={Profile} alt="profile_img" />
                <p>Jane Doe</p>
            </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
