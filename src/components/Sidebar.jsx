import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMiniSquares2X2 } from "react-icons/hi2";
import './Sidebar.css'

const Sidebar = () => {
    const location = useLocation();

  return (
    <>
      <aside>
        <ul>
            <li>
                <Link to={'/overview'} className={`sidebar-link ${location.pathname === '/overview' ? "active-link" : "inherit"}`}>
                    <HiMiniSquares2X2 className='sidebar-icon' /> Overview
                </Link>
            </li>

            <li>
                <Link to={'/directory'} className={`sidebar-link ${location.pathname === '/directory' ? "active-link" : "inherit"}`}>
                    <HiMiniSquares2X2 className='sidebar-icon' /> People Directory
                </Link>
            </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
