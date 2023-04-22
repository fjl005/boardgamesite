import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SearchBar from './SearchBar';
import boredGamesGaloreDice from '../../img/boredGamesGaloreDice.png';

const Header = () => {
    return (
        <>
            <Navbar className='header-navbar' light expand="md">
                <div className='d-flex align-items-center justify-content-between w-100'>
                    <NavbarBrand href="/" className="mr-auto" style={{ color: 'white' }} >
                        <img src={boredGamesGaloreDice} alt='Board Games Galore' width='50px' height='50px' />
                        Bored Games Galore
                    </NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/" className="nav-link">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/browse/page/1" className="nav-link">Browse Games</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/forums" className="nav-link">Atlas Forums</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/galoreposts" className="nav-link">Galore Posts</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/help" className="nav-link">Help</NavLink>
                        </NavItem>
                    </Nav>

                    <SearchBar />
                </div>
            </Navbar>
        </>
    )
}

export default Header;
