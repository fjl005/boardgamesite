import NavbarApp from '../components/allpages/NavbarApp';
import { Container, Row, Col, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { axiosConfig } from '../components/allpages/axiosConfig';
import SinglePostInMyPosts from '../components/mypostspage/SinglePostInMyPosts';
import LoadingIcon from "../components/allpages/LoadingIcon";
import LoadingIconPost from '../components/mypostspage/LoadingIconPost';
import { NAVBAR_HEADERS } from '../components/allpages/navbarHeaders';
import SinglePostInMyPosts2 from '../components/mypostspage/SinglePostInMyPosts2';

const MyPosts = () => {

    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [serverDown, setServerDown] = useState(false);

    const fetchApiData = async () => {
        try {
            const response = await axiosConfig.get('/api');
            setUserPosts(response.data);
            setServerDown(false);
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
            await axiosConfig.delete('/api');
            alert('All of your posts have been deleted!')
            fetchApiData();
        } catch (error) {
            console.log(error)
            alert('Sorry, there was an error in deleting your files. Please try again. If the problem persists, then please contact Frank!');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <NavbarApp currentPage={NAVBAR_HEADERS.myPosts} />
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
                                <LoadingIcon />
                                <h1>Loading...</h1>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <SinglePostInMyPosts2
                            post={post}
                            postId={post._id}
                            userPosts={userPosts}
                            setUserPosts={setUserPosts}
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
                                <Button onClick={deleteAllPosts} className='bg-danger btn-border-none'>Delete All Articles</Button>
                                {isDeleting && (
                                    <div>
                                        <LoadingIconPost color='red' marginLeft='1rem' />
                                        <span style={{ marginLeft: '1rem' }}>
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

export default MyPosts;