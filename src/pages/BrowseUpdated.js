import { Col, Container, Row } from "reactstrap";
import NavbarApp from "../components/allpages/NavbarApp";
import { NAVBAR_HEADERS } from "../components/allpages/navbarHeaders";
import BGAShutdown from "../components/allpages/BGAShutdown";

const BrowseUpdated = () => {
    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.browseGames} />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Browse - permanently closed.</h1>
                        <BGAShutdown />
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default BrowseUpdated