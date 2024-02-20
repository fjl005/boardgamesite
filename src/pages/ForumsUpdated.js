import { Col, Container, Row } from "reactstrap";
import NavbarApp from "../components/allpages/NavbarApp";
import { NAVBAR_HEADERS } from "../components/allpages/navbarHeaders";
import BGAShutdown from "../components/allpages/BGAShutdown";

const ForumsUpdated = () => {
    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.atlasForums} />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Forums - permanently closed.</h1>
                        <BGAShutdown />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ForumsUpdated