import React, {useContext} from 'react'
import { ThemeContext } from '../../ContextManager/ThemeContext';
import {Link} from 'react-router-dom';
import './Sidebar.css';
export default function Sidebar({isOpen, openHandler}) {
    const {isDarkMode, toggleDarkMode} = useContext(ThemeContext);
    const LOGOLINK = require('../../assets/logo512.png');
    const HEADERNAME = 'Codinglab';
    const PROFESSIONNAME = 'Web developer';
    const MODE = isDarkMode ? 'Dark Mode' : 'Light Mode';
    const menuItems = [
        {
            'itemName' : 'Dashboard',
            'itemIcon' : 'bx bx-home-alt icon',
            'itemLink' : '/dashboard'
        }, 
        {
            'itemName' : 'Revenue',
            'itemIcon' : 'bx bx-bar-chart-alt-2 icon',
            'itemLink' : ''
        },
        {
            'itemName' : 'Notifications',
            'itemIcon' : 'bx bx-bell icon',
            'itemLink' : ''
        },
        {
            'itemName' : 'Analytics',
            'itemIcon' : 'bx bx-pie-chart-alt icon',
            'itemLink' : '/analytics'
        },
        {
            'itemName' : 'Likes',
            'itemIcon' : 'bx bx-heart icon',
            'itemLink' : ''
        },
        {
            'itemName' : 'Wallets',
            'itemIcon' : 'bx bx-wallet icon',
            'itemLink' : ''
        }
    ]

  return (
      <div className={isDarkMode ? 'theme dark' : ''}>
        <nav className={ isOpen ? 'sidebar' : 'sidebar close'}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={LOGOLINK} alt=""/>
                        </span>

                        <div className="text logo-text">
                            <span className="name">{HEADERNAME}</span>
                            <span className="profession">{PROFESSIONNAME}</span>
                        </div>
                    </div>

                    <i className={'bx bx-chevron-right toggle' + (isOpen ? '' : ' close')} 
                        onClick={openHandler}></i>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <li className="search-box">
                                <i className='bx bx-search icon'></i>
                                <input type="text" placeholder="Search..."/>
                        </li>

                        <ul class="menu-links">
                            {
                                menuItems.map(menuItem => {
                                    return (
                                        <li className="nav-link">
                                            <Link to={menuItem.itemLink}>
                                                <i className={menuItem.itemIcon}></i>
                                                <span className="text nav-text">{menuItem.itemName}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        
                        </ul>
                    </div>

                    <div class="bottom-content">
                        <li class="">
                            <a href="#">
                                <i class='bx bx-log-out icon' ></i>
                                <span class="text nav-text">Logout</span>
                            </a>
                        </li>

                        <li class="mode">
                            <div class="sun-moon">
                                {
                                    isDarkMode ? 
                                    <i class='bx bx-moon icon moon'></i> :
                                    <i class='bx bx-sun icon sun'></i>
                                }
                            </div>
                            <span class="mode-text text">{MODE}</span>

                            <div className="toggle-switch">
                                <span className="switch" onClick={toggleDarkMode}></span>
                            </div>
                        </li>
                        
                    </div>
                </div>
            </nav>
      </div>
     
  )
}
