import NavbarApp from "../components/allpages/NavbarApp";
import { helpData } from "../components/help/helpData";
import { Container, Row, Col } from "reactstrap";
import { NAVBAR_HEADERS } from "../components/allpages/navbarHeaders";

const Help = () => {
    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.help} />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Help!! What am I even doing here?</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 style={{ color: 'black' }}>
                            You might be a little lost or confused. The FAQs below should answer your questions. If you have any further questions, then please reach out to Frank at j.franklee22@gmail.com.
                        </h4>
                    </Col>
                </Row>
            </Container>

            {helpData.map((qAndA, idx) => (
                <Container className='homepage-section' key={idx}>
                    <Row>
                        <Col>
                            <h2>{qAndA.question}</h2>
                            {idx === 3 ? (
                                <>
                                    {qAndA.answer.split('here').map((entry, index) => (
                                        index === 0 ? (
                                            <>
                                                <span style={{ whiteSpace: 'pre-wrap' }}>{entry}</span>
                                                <a
                                                    href='https://github.com/fjl005/boardgamesite/tree/master'
                                                    target='_blank'
                                                    style={{ color: 'teal' }}>here</a>
                                            </>
                                        ) : index === 1 ? (
                                            <>
                                                <span style={{ whiteSpace: 'pre-wrap' }}>{entry}</span>
                                                <a
                                                    href='https://github.com/fjl005/boardgamesite-backend/tree/master'
                                                    target='_blank'
                                                    style={{ color: 'teal' }}>here</a>
                                            </>
                                        ) : (
                                            <span style={{ whiteSpace: 'pre-wrap' }}>{entry}</span>
                                        )
                                    ))}
                                </>
                            ) : (
                                <p style={{ whiteSpace: 'pre-wrap' }}>{qAndA.answer}</p>
                            )}
                        </Col>
                    </Row>
                </Container>
            ))}
        </>
    )
}

export default Help
