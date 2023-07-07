import Header from "../components/allpages/Header";
import { helpData } from "../components/help/helpData";

import { Container, Row, Col } from "reactstrap";

const Help = () => {
    return (
        <>
            <Header />
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
                            <p style={{ whiteSpace: 'pre-wrap' }}>{qAndA.answer}</p>
                        </Col>
                    </Row>
                </Container>
            ))}
        </>
    )
}

export default Help
