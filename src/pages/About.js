import NavbarApp from "../components/allpages/NavbarApp";
import { aboutData } from "../components/about/aboutData";
import { Container, Row, Col } from "reactstrap";
import { NAVBAR_HEADERS } from "../components/allpages/navbarHeaders";

const About = () => {

    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.about} />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>About This Site</h1>
                        <p>
                            Frank created this full stack website with React (Create-React-App) and Node.JS. In the backend, the following technologies were also utilized: Express, MongoDB, and Mongoose. For image storage, Cloudinary was used. In the front end, http requests were made either with fetch calls, sometimes with the aid of Axios. Each section with their respective concepts/technologies are explained below.
                        </p>
                    </Col>
                </Row>
            </Container>

            {aboutData.map((section, index) => (
                <Container className='homepage-section' key={index}>
                    <Row>
                        <Col>
                            <h2 className='text-center'>{section.section}</h2>
                            {section.concepts.map((concept) => (
                                <div key={concept.title}>
                                    <h3>{concept.title}</h3>
                                    {concept.explanation.map((text, idx) => (
                                        <p key={idx}>{text}</p>
                                    ))}
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Container>
            ))}
        </>
    )
}

export default About
