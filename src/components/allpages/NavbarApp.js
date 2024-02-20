import { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { NAVBAR_HEADERS } from './navbarHeaders';

const NavbarApp = ({ currentPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const navtitles = [
        {
            title: 'Home',
            link: '/',
            ref: NAVBAR_HEADERS.homepage,
        },
        {
            title: 'Browse Games',
            link: '/browse',
            ref: NAVBAR_HEADERS.browseGames,
        },
        {
            title: 'Atlas Forums',
            link: '/forums',
            ref: NAVBAR_HEADERS.atlasForums,
        },
        {
            title: 'Galore Posts',
            link: '/galoreposts',
            ref: NAVBAR_HEADERS.galorePosts,
        },
        {
            title: 'Make a Post',
            link: '/makeapost',
            ref: NAVBAR_HEADERS.makePost,
        },
        {
            title: 'My Posts',
            link: '/myposts',
            ref: NAVBAR_HEADERS.myPosts,
        },
        {
            title: 'Helps & FAQs',
            link: '/help',
            ref: NAVBAR_HEADERS.help,
        },
        {
            title: 'About',
            link: '/about',
            ref: NAVBAR_HEADERS.about,
        },
    ];

    return (
        <>
            <Navbar className="galore-purple-bg" expand="md">
                <NavbarBrand tag={Link} to="/">
                    <img
                        src='https://res.cloudinary.com/da7edv0cg/image/upload/v1708451907/samples/boredGamesGaloreDice_gacez3.png'
                        alt='Board Games Galore'
                        className='navbar-brand-img'
                    />

                </NavbarBrand>
                <NavbarToggler onClick={toggle} className='navbar-toggler-background' />

                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        {navtitles.map((nav, idx) => (
                            <NavItem key={idx} className={currentPage === nav.ref ? 'nav-item-selected' : 'nav-item-outer'}>
                                <NavLink tag={Link} to={nav.link} className={currentPage === nav.ref ? 'nav-link-text-selected' : 'nav-link-text'}>
                                    {nav.title}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    )
}

export default NavbarApp;
