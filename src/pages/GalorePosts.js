import Header from "../components/allpages/Header";
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { concatTitle } from "../utils/concatTitle";
import { useState } from "react";
import { galorePostsData } from "../components/galorepostspage/galorePostsData";
import GalorePostPopular from "../components/galorepostspage/GalorePostPopular";

const GalorePosts = () => {
  const [concordiaPost, wingspanPost, strategyPost] = galorePostsData;
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('for submitted');
  }

  const handleOpenModal = () => {
    setShowModal(true);
    console.log('handle open modal');
  }


  return (
    <>
      <Header />
      <Container className='homepage-section'>
        <Row>
          <Col>
            <div className='d-flex justify-content-between'>
              <h1>Posts from Bored Games Galore</h1>
              <Button className='bg-primary'
                onClick={handleOpenModal}>Add Post</Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={showModal} toggle={() => setShowModal(false)} size='lg'>
        <ModalHeader closeButton>
          Create a Post for Board Games Galore
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <h3>Title Info</h3>
              <Label
                htmlFor='title'
                style={{ marginTop: '10px' }}>
                Title
              </Label>
              <Input
                name='title'
                id='title'
                placeholder='e.g. The Best Two-Player Board Games For Couples or Friends'
              />

              <Label
                htmlFor='subTitle'
                style={{ marginTop: '10px' }}
              >
                Short Hook Sentence
              </Label>
              <Input
                name='subTitle'
                id='subTitle'
                placeholder='e.g. Discover the top-rated two-player board games for a fun and convenient way to connect with a partner, friend, or family member.'
              />

              <Label
                htmlFor='author'
                style={{ marginTop: '10px' }}
              >
                Author (aka you!)
              </Label>
              <Input
                name='author'
                id='author'
                placeholder='e.g. Alex Johnson'
              />
            </FormGroup>

            <FormGroup>
              <h3>Article</h3>
              <Label
                htmlFor='paragraph'
                style={{ marginTop: '10px' }}>
                Write Your Article Here!
              </Label>
              <Input
                name='paragraph'
                id='paragraph'
                type='textarea'
                placeholder='e.g. Board games are a great way to connect with others, but finding time for game nights can be tough. Luckily, two-player board games offer a fun and convenient way to spend quality time with a partner, friend, or family member. ...'
                rows={20}
              />
            </FormGroup>

            <FormGroup>
              <h3>Image</h3>
              <Input
                name='img'
                id='img'
                type='file'
                accept="image/*"
              />
            </FormGroup>
            
            <Button type='submit' color='primary'>Submit</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Container className='homepage-section-no-border'>
        <Row>
          <Col>
            <h4>Trending Today</h4>
          </Col>
        </Row>
        <Row>
          <Col sm='12' lg='6' xl='4'>
            <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/${concatTitle(concordiaPost.title)}`}>
              <div
                className="galore-posts-highlight-container">
                <img src={concordiaPost.img} alt="Concordia" />
                <div class="galore-posts-img-overlay"></div>
                <div className="image-text">
                  <h2>Concordia</h2>
                  <p style={{ fontSize: '20px' }}>Why do people put this as their top game of 2023?</p>
                </div>
              </div>
            </Link>

          </Col>

          <Col sm='12' lg='6' xl='4'>
            <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/${concatTitle(wingspanPost.title)}`}>
              <div className="galore-posts-highlight-container">
                <img src={wingspanPost.img} alt="penguins" />
                <div class="galore-posts-img-overlay"></div>
                <div className="image-text">
                  <h2>Wingspan, Antartica</h2>
                  <p style={{ fontSize: '20px' }}>Learn more about the new, icy cool Antarctica edition.</p>
                </div>
              </div>
            </Link>
          </Col>

          <Col sm='12' lg='6' xl='4'>
            <Link to={`${window.location.protocol}//${window.location.hostname}:3000/galoreposts/${concatTitle(strategyPost.title)}`}>
              <div className="galore-posts-highlight-container">
                <img src={strategyPost.img} alt="board game collection" />
                <div class="galore-posts-img-overlay"></div>
                <div className="image-text">
                  <h2>Secret Strategies</h2>
                  <p style={{ fontSize: '20px' }}>Beat your friends and never lose with these nuanced strategies for any classic game!</p>
                </div>
              </div>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <h4 style={{ marginTop: '30px' }}>Popular</h4>
          </Col>
        </Row>
      </Container>

      {galorePostsData.map((post, idx) => (
        <GalorePostPopular post={post} key={idx} />
      ))}

      {/* <GalorePostPopular post={concordiaPost} />
      <GalorePostPopular post={wingspanPost} />
      <GalorePostPopular post={strategyPost} /> */}

    </>
  )
}

export default GalorePosts;