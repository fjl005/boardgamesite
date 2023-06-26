import Header from '../components/allpages/Header';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MyPostFormat from '../components/mypostspage/MyPostFormat';
import LoadingIcon from '../components/allpages/LoadingIcon';

const MyPosts = () => {

    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [userId, setUserId] = useState('');
    // const [author, setAuthor] = useState('');
    // const [title, setTitle] = useState('');
    // const [subTitle, setSubTitle] = useState('');
    // const [submissionTime, setSubmissionTime] = useState('');
    // const [date, setDate] = useState('');
    // const [img, setImg] = useState('');
    // const [paragraph, setParagraph] = useState('');

    const fetchApiData = async () => {
        try {
            // const response = await axios.get('https://boardgames-api-attempt2.onrender.com/api');
            const response = await axios.get('http://localhost:5000/api');

            setUserPosts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error: ', error);
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

            <Container className='homepage-section'>
                <Row>
                    <Col>
                        {isLoading ? (
                            <>
                                <LoadingIcon style={{ color: 'teal' }} />
                                <h4>Loading...</h4>
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
                                <h2>No posts have been made by you. Go make some!</h2>
                            )
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {userPosts.length > 0 && <Button
                            onClick={deleteAllPosts}
                            className='bg-danger'
                        >Delete All Articles</Button>}

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyPosts