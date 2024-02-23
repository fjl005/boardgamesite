import { Container, Row, Col, Button } from "reactstrap";
import { autofillHeadersText } from "../mypostspage/autofillOptions";

const AutofillList = ({ setFormDataState }) => {
    return (
        <Container className='homepage-section'>
            <Row>
                <Col>
                    <h2> Autofill Options (for testing and debugging).</h2>
                    <p>Please follow the steps in order. Click the first button, hit submit, then the second button, then submit, etc.</p>
                </Col>
            </Row>

            {autofillHeadersText.map((info, idx) => (
                <Row key={idx}>
                    <Col className='mt-3'>
                        <div className='make-post-div-outer'>
                            <Button onClick={() => info.method(setFormDataState)}>{idx + 1}</Button>
                            <h4 className='make-post-h4'>{info.h4}</h4>
                        </div>
                        <p>{info.p}</p>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default AutofillList