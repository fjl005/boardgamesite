import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <>
            <Navbar className='header-navbar' light expand="md">
                <div className='d-flex justify-content-start'>
                    <NavbarBrand href="/" className="mr-auto" style={{color: 'white'}}>Bored Games Galore</NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/browse" className="nav-link">Browse</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about" className="nav-link">Forums</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/contact" className="nav-link">Top Hits</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/contact" className="nav-link">New</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/contact" className="nav-link">Help</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            <SearchBar />
            </Navbar>
        </>
    )
}

export default Header;