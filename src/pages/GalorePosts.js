import Header from "../components/allpages/Header";
import { Container, Row, Col, Button } from "reactstrap";
import concordia from '../img/concordia.jpg';
import penguins from '../img/penguins.jpg';
import { Link } from "react-router-dom";

const GalorePosts = () => {
  return (
    <>
      <Header />
      <Container className='homepage-section'>
        <Row>
          <Col>
            <div className='d-flex justify-content-between'>
              <h1>Posts from Bored Games Galore</h1>
              <Button className='bg-primary'>Add Post</Button>
            </div>
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
          <Col sm='12' lg='6' xl='4'>
            <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/concordiaconquers`}>
              <div
                className="galore-posts-highlight-container">
                <img src={concordia} alt="Concordia" />
                <div class="galore-posts-img-overlay"></div>
                <div className="image-text">
                  <h2>Concordia</h2>
                  <p style={{ fontSize: '20px' }}>Why do people put this as their top game of 2023?</p>
                </div>
              </div>
            </Link>

          </Col>

          <Col sm='12' lg='6' xl='4'>
            <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/comingsoon:wingspanantarcticaedition`}>
              <div className="galore-posts-highlight-container">
                <img src={penguins} alt="penguins" />
                <div class="galore-posts-img-overlay"></div>
                <div className="image-text">
                  <h2>Wingspan, Antartica</h2>
                  <p style={{ fontSize: '20px' }}>Learn more about the new, icy cool Antarctica edition.</p>
                </div>
              </div>
            </Link>
          </Col>

          <Col sm='12' lg='6' xl='4'>
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