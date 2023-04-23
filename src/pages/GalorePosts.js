import Header from "../components/allpages/Header";
import { Container, Row, Col } from "reactstrap";
import concordia from '../img/concordia.jpg';
import { Link } from "react-router-dom";
import GalorePostExample from "../components/galorepostspage/GalorePostExample";

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
              <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/example`}>
                <div className="galore-posts-highlight-container">
                  <img src={concordia} alt="Concordia" />
                  <div class="galore-posts-img-overlay"></div>
                  <div className="image-text">
                    <h2>Concordia</h2>
                    <p style={{ fontSize: '20px' }}>Why do people put this as their top game of 2023?</p>
                  </div>
                </div>
          </Link>

          </Col>

          <Col sm='3'>
            <div className="galore-posts-highlight-container">
              <img src={concordia} alt="Concordia" />
              <div class="galore-posts-img-overlay"></div>
              <div className="image-text">
                <h2>Concordia</h2>
                <p style={{ fontSize: '20px' }}>Why do people put this as their top game of 2023?</p>
              </div>
            </div>
          </Col>

          <Col sm='3'>
            <div className="galore-posts-highlight-container">
              <img src={concordia} alt="Concordia" />
              <div class="galore-posts-img-overlay"></div>
              <div className="image-text">
                <h2>Concordia</h2>
                <p style={{ fontSize: '20px' }}>Why do people put this as their top game of 2023?</p>
              </div>
            </div>
          </Col>

          <Col sm='3'>
            <div className="galore-posts-highlight-container">
              <img src={concordia} alt="Concordia" />
              <div class="galore-posts-img-overlay"></div>
              <div className="image-text">
                <h2>Concordia</h2>
                <p style={{ fontSize: '20px' }}>Why do people put this as their top game of 2023?</p>
              </div>
            </div>
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