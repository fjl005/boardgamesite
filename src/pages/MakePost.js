import Header from '../components/allpages/Header'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

const MakePost = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('for submitted');
    }

    return (
        <>
            <Header />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between'>
                            <h1>Make a Post on Bored Games Galore</h1>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container className='homepage-section'>
                <Row>
                    <Col>
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
                                    style={{marginTop: '10px'}}>
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
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MakePost