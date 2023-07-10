import Header from "../components/allpages/Header";
import { aboutData } from "../components/about/aboutData";
import { Container, Row, Col, Button } from "reactstrap";
import LoadingIconPost from "../components/mypostspage/LoadingIconPost";
import { useState } from "react";

const About = () => {
    const [showIcon, setShowIcon] = useState(true);

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
                            Frank created this full stack website with React (Create-React-App) and Node.JS. In the backend, the following technologies were also utilized: Express, MongoDB, and Mongoose. For image storage, Cloudinary was used. In the front end, http requests were made either with fetch calls, sometimes with the aid of Axios. Each section with their respective concepts/technologies are explained below.
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
                                        <pre
                                            className='App'
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                fontFamily: 'inherit',
                                                fontSize: '16px'
                                            }}
                                        >
                                            <p style={{ marginBottom: '2px' }}>{section.explanation[idx]}</p>
                                        </pre>
                                        {section.section === 'General'
                                            && concept === 'API Fetch Calls'
                                            && showIcon && (
                                                <div
                                                    className='d-flex align-items-center'
                                                    style={{ marginBottom: '10px' }}
                                                >
                                                    <LoadingIconPost
                                                        color={'teal'}
                                                        marginLeft={0}
                                                    />
                                                    <span style={{ marginLeft: '15px' }}>Okay, the loading icon is a joke. Nothing is actually loading...but if it bugs you, though, then you can disable it here. </span>
                                                    <Button
                                                        style={{
                                                            marginLeft: '5px',
                                                            padding: '4px 8px',
                                                            backgroundColor: 'teal',
                                                            border: 'teal'
                                                        }}
                                                        onClick={() => setShowIcon(false)}
                                                    >Stop</Button>
                                                </div>
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
