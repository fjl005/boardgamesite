import NavbarApp from '../components/allpages/NavbarApp';
import { Container, Row, Col, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { axiosConfig } from '../components/allpages/axiosConfig';
import SinglePostInMyPosts from '../components/mypostspage/SinglePostInMyPosts';
import LoadingIcon from "../components/allpages/LoadingIcon";
import LoadingIconPost from '../components/mypostspage/LoadingIconPost';
import { NAVBAR_HEADERS } from '../components/allpages/navbarHeaders';

const MyPosts = () => {

    const [userPosts, setUserPosts] = useState([]);
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
            alert('Sorry, there was an error in deleting your files.');
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

            {serverDown ? (
                <Container className='homepage-section'>
                    <Row>
                        <Col>
                            <LoadingIcon />
                            <h2 className='mt-3'>Waiting server connection: this may take 30-60 seconds, apologies for the delay.</h2>
                            <p>Feel free to check out other parts of the site while you wait!</p>
                            <p>If it takes longer to load, then it's possible our server is down.</p>
                        </Col>
                    </Row>
                </Container>
            ) : (
                userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <SinglePostInMyPosts
                            key={post._id}
                            post={post}
                            postId={post._id}
                            fetchApiData={fetchApiData}
                        />
                    ))
                ) : (
                    <Container className='homepage-section'>
                        <Row>
                            <Col>
                                <h2>
                                    {serverDown
                                        ? `Sorry for the technical difficulties...please refresh and try again. If the problem still persists, then it may be due to our server. If that's the case, then please contact Frank! We promise we are working as quickly as we can to fix it.`
                                        : `No posts have been made by you. Go make some!`
                                    }
                                </h2>
                            </Col>
                        </Row>
                    </Container>
                )
            )}

            {
                userPosts.length > 0 && (
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
                )
            }
        </>
    )
}

export default MyPosts;