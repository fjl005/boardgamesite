import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SearchBar from './SearchBar';
import boredGamesGaloreDice from '../../img/boredGamesGaloreDice.png';

const Header = () => {
    return (
        <>
            <Navbar className='header-navbar' light expand="md">
                <div className='d-flex align-items-center'>
                    <NavbarBrand href="/" className="mr-auto" style={{color: 'white'}}>
                        <img src={boredGamesGaloreDice} alt='Board Games Galore' width='50px' height='50px'/>
                        Bored Games Galore
                    </NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/browse" className="nav-link">Browse</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/forums" className="nav-link">Forums</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/tophits" className="nav-link">Top Hits</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/new" className="nav-link">New</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/help" className="nav-link">Help</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <SearchBar />
            </Navbar>
        </>
    )
}

export default Header;