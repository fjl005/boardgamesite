import Header from "../components/allpages/Header";
import { Container, Row, Col } from "reactstrap";
import concordia from '../img/concordia.jpg';

const GalorePosts = () => {
  return (
    <>
      <Header />
      <Container className='homepage-section'>
        <Row>
          <Col>
            <h1>Posts from Bored Games Galore</h1>
          </Col>
        </Row>
      </Container>

      <Container className='homepage-section-no-border'>
        <Row>
          <Col>
            <h4>Trending Today</h4>
          </Col>
        </Row>
        <Row>
          <Col sm='3'>
            <div className="image-container">
              <img src={concordia} alt="Concordia" />
              <div className="image-text">
                <h1>Text on top of image</h1>
                <p>Some more text here</p>
              </div>
            </div>
            {/* Outer div has a relative position, meaning its child elements can be positioned relative to it. */}

            {/* BackgroundSize and backgroundPosition are used to ensure that the image covers the entire container and is centered within it. */}

            {/* The inner div has an absolute position, which means it's positioned relative to the nearest ancestor with a position other than static (which would be the outer div) */}

            {/* The top and left 50% moves it to the center of the parent element horizontally and vertically. Trnansform is used to apply a translate() to effectively center it perfectly */}


          </Col>
          <Col sm='3'>
            <img src={concordia} alt='concordia' style={{ width: '300px', height: '300px' }} />
          </Col>
          <Col sm='3'>
            <img src={concordia} alt='concordia' style={{ width: '300px', height: '300px' }} />
          </Col>
          <Col sm='3'>
            <img src={concordia} alt='concordia' style={{ width: '300px', height: '300px' }} />
          </Col>
        </Row>

        <Row>
          <Col>
            <h4 style={{ marginTop: '30px' }}>Popular</h4>
          </Col>
        </Row>
      </Container>

      <Container className='homepage-section'>
        <Row>
          <Col>
            hello
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GalorePosts;