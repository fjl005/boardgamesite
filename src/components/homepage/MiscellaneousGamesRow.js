import { Container, Row, Col } from "reactstrap";
import penguins from '../../img/penguins.jpg';
import genericMeeples from '../../img/genericMeeples.jpg';
import alone from '../../img/alone.jpg';

const MiscellaneousGamesRow = () => {
    return (
        <>
            <Container style={{maxWidth: '60%'}}>
                <Row className='d-flex justify-content-between'>
                    <Col sm='3' className='homepage-card'>
                        <h3>Coming Soon: Wingspan Antarctica Edition</h3>
                        <img src={penguins} width='100%' alt='cute penguins!' />
                        <p>"Well waddle you know, we're famous!"</p>
                    </Col>

                    <Col sm='3' className='homepage-card'>
                        <h3>Honest Review: The Best Game... Ever?</h3>
                        <img src={genericMeeples} width='100%' alt='generic board game image' />
                        <p>Hint: it's not Monopoly.</p>
                    </Col>

                    <Col sm='5' className='homepage-card'>
                        <h3>Solo Games vs. with Friends?</h3>
                        <img src={alone} alt='alone' width='100%' style={{height: '330px'}}/>
                        <p>Take the poll here.</p>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default MiscellaneousGamesRow