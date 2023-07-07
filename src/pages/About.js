import Header from "../components/allpages/Header";
import { aboutData } from "../components/about/aboutData";
import { Container, Row, Col } from "reactstrap";
import LoadingIconPost from "../components/mypostspage/LoadingIconPost";

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
                        <h4 style={{ color: 'black' }}>
                            Frank created this full stack website with React (Create-React-App) and Node-JS. In the backend, the following technologies were also utilized: Express, MongoDB, Mongoose, Multer. For image storage, Cloudinary was used. In the front end, http requests were made either with fetch calls or Axios. Each section with their specific technologies are explained below.
                        </h4>
                    </Col>
                </Row>
            </Container>

            {aboutData.map((section, idx) => (
                <Container className='homepage-section' key={idx}>
                    <Row>
                        <Col>
                            <h2 className='text-center'>{section.section}</h2>
                            {
                                section.concepts.map((concept, idx) => (
                                    <div key={idx}>
                                        <h4>{concept}</h4>
                                        <p>{section.explanation[idx]}</p>
                                        {section.section === 'General'
                                            && concept === 'API Fetch Calls'
                                            && (
                                                <>
                                                    <LoadingIconPost
                                                        color={'teal'}
                                                        marginLeft={0}
                                                    />
                                                    <p>Okay, the icon above is a joke. </p>
                                                </>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            ))}
        </>
    )
}

export default About
