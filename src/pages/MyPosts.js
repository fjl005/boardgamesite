import Header from '../components/allpages/Header';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MyPostFormat from '../components/mypostspage/MyPostFormat';
import LoadingIcon from "../components/allpages/LoadingIcon";
import LoadingIconPost from '../components/mypostspage/LoadingIconPost';


const MyPosts = () => {

    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [serverDown, setServerDown] = useState(false);

    const fetchApiData = async () => {
        try {
            // const response = await axios.get('https://boardgames-api-attempt2.onrender.com/api');
            const response = await axios.get('http://localhost:5000/api');
            setUserPosts(response.data);
            // In case server was down, this shouldn't be the case anymore. But honestly, I'm not even sure if this code is really necessary. 
            // setServerDown(false);
        } catch (error) {
            console.error('Error: ', error);
            setServerDown(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchApiData();
    }, []);

    const deleteAllPosts = async () => {
        try {
            setIsDeleting(true);
            // await axios.delete('https://boardgames-api-attempt2.onrender.com/api');
            // I need to do a get request instead of a delete in order to retrieve all the user posts data.
            // await axios.delete('http://localhost:5000/cloudinary');
            await axios.delete('http://localhost:5000/api');
            alert('All of your posts have been deleted!')
            fetchApiData();
        } catch (error) {
            console.log(error)
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <Header />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between'>
                            <h1>See the Great Posts that You've Made!</h1>
                        </div>
                    </Col>
                </Row>
            </Container>

            {isLoading ? (
                <>
                    <Container className='homepage-section'>
                        <Row>
                            <Col>
                                <LoadingIcon style={{ color: 'teal' }} />
                                <h4>Loading...</h4>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <MyPostFormat
                            key={post._id}
                            uniqueId={post._id}
                            title={post.title}
                            subTitle={post.subTitle}
                            author={post.author}
                            paragraph={post.paragraph}
                            userPosts={userPosts}
                            setUserPosts={setUserPosts}
                            img={post.img}
                            publicId={post.publicId}
                        />
                    ))
                ) : (
                    <Container className='homepage-section'>
                        <Row>
                            <Col>
                                {serverDown ? (
                                    <h2>Sorry for the technical difficulties...please refresh and try again. <br />If the problem still persists, then it may be due to our server. If that's the case, then please contact Frank! We promise we are working as quickly as we can to fix it.</h2>
                                ) : (
                                    <h2>No posts have been made by you. Go make some!</h2>

                                )}
                            </Col>
                        </Row>
                    </Container>

                )
            )}

            {userPosts.length > 0 && (
                <Container className='homepage-section'>
                    <Row>
                        <Col>
                            <div className='d-flex'>
                                <Button
                                    onClick={deleteAllPosts}
                                    className='bg-danger'
                                >Delete All Articles</Button>

                                {isDeleting && (
                                    <div>
                                        <LoadingIconPost color='red' marginLeft='10px' />
                                        <span style={{ marginLeft: '10px' }}>
                                            Deleting all posts, this may take a few seconds...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default MyPosts