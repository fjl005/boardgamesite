import Header from "../components/allpages/Header";
import { Container, Row, Col } from "reactstrap";

const About = () => {
    return (
        <>
            <Header />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>About This Site</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 style={{color: 'black'}}>
                            Frank created this full stack website with React (Create-React-App) and Node-JS. In the backend, the following technologies were also utilized: Express, MongoDB, Mongoose, Multer. For image storage, Cloudinary was used. In the front end, http requests were made either with fetch calls or Axios. 
                        </h4>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default About
