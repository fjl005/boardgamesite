import { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import boredGamesGaloreDice from '../../img/boredGamesGaloreDice.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar className="header-navbar" expand="lg">
                <NavbarBrand href="/" style={{ color: 'white' }} >
                    <div className='d-flex'>
                        <img
                            src={boredGamesGaloreDice}
                            alt='Board Games Galore'
                            width='50px'
                            height='50px' />
                        <span
                            style={{
                                fontSize: '30px',
                                fontFamily: 'Arial, sans-serif',
                                marginLeft: '5px'
                            }}
                        >Bored Games Galore</span>
                    </div>

                </NavbarBrand>
                <NavbarToggler onClick={toggle} style={{ backgroundColor: 'white' }} />

                <Collapse isOpen={isOpen} navbar>
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
                            <NavLink href="/makeapost" className="nav-link">Make a Post</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/myposts" className="nav-link">My Posts</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/help" className="nav-link">Help</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about" className="nav-link">About</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    )
}

export default Header;
