import NavbarApp from "../components/allpages/NavbarApp";
import { helpData } from "../components/help/helpData";
import { Container, Row, Col } from "reactstrap";
import { NAVBAR_HEADERS } from "../components/allpages/navbarHeaders";
import React from "react";

const Help = () => {
    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.help} />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Help & Frequently Asked Questions</h1>
                    </Col>
                </Row>
            </Container>

            {helpData.map((data, index) => (
                <Container key={index} className='homepage-section'>
                    <Row>
                        <Col>
                            <h2>{data.question}</h2>
                            {data.links ? data.answer.map((ansObj, idx) => (
                                <React.Fragment key={idx}>
                                    {ansObj.link ? (
                                        <a href={ansObj.link} target="_blank" rel="noreferrer">
                                            <span>{ansObj.text}</span>
                                        </a>
                                    ) : (
                                        <span>{ansObj.text}</span>
                                    )}
                                </React.Fragment>
                            ))
                                : data.answer.map((ans, idx) => (
                                    <p key={idx}>{ans}</p>
                                ))}
                        </Col>
                    </Row>
                </Container>
            ))}
        </>
    )
}

export default Help
