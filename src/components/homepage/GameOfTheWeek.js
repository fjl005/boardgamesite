import { Container, Row, Col } from "reactstrap";
import concordia from '../../img/concordia.jpg';

const GameOfTheWeek = () => {
    return (
        <Container className='homepage-section' style={{backgroundColor: 'rgb(97, 38, 144)', color: 'white'}}>
            <Row>
                <Col>
                    <h3 className='text-center' style={{color: 'white'}}>Game of the Week: Concordia</h3>
                    <img src={concordia} alt='a game of concordia' width='100%' style={{height: '700px', objectFit: 'cover', objectPosition: 'center'}}/>
                    <p style={{fontSize: '20px'}}>Step into the grandeur of ancient Rome with Concordia, the thrilling strategy board game that will challenge your wit and cunning! Build your empire through colonization, settlement, and recruitment of characters with unique abilities. Outsmart your opponents and amass the most victory points to emerge as the undisputed ruler of Rome! For more info, check it out here.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default GameOfTheWeek