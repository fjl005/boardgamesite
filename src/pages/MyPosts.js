import Header from '../components/allpages/Header';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MyPostFormat from '../components/mypostspage/MyPostFormat';
import LoadingIcon from '../components/allpages/LoadingIcon';

const MyPosts = () => {

    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            // await axios.delete('https://boardgames-api-attempt2.onrender.com/api');
            await axios.delete('http://localhost:5000/api');
            alert('All of your posts have been deleted!')
            fetchApiData();
        } catch (error) {
            console.log(error)
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
                            <Button
                                onClick={deleteAllPosts}
                                className='bg-danger'
                            >Delete All Articles</Button>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default MyPosts