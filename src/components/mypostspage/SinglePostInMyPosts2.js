import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { axiosConfig } from '../allpages/axiosConfig';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import MakePostForm from '../makepost/MakePostForm';
import cardsAndTrinkets from '../../img/makePostImg/cardsAndTrinkets.jpg';
import diceOnMap from '../../img/makePostImg/diceOnMap.jpg';
import foozballGame from '../../img/makePostImg/foozballGame.jpg'
import LoadingIconPost from './LoadingIconPost';
import { Tooltip } from 'react-tooltip';

const SinglePostInMyPosts2 = ({
    post,
    postId,
    userPosts,
    setUserPosts,
}) => {


    const {
        title: prevTitle,
        subTitle: prevSubTitle,
        author: prevAuthor,
        paragraph: prevParagraph,
        img: prevImage,
        publicId,
    } = post;

    const [formDataState, setFormDataState] = useState({
        author: post.author,
        title: post.title,
        subTitle: post.subTitle,
        paragraph: post.paragraph,
    });

    const [currImage, setCurrImage] = useState(post.img);

    const [editing, setEditing] = useState(false);
    const togglePost = (imageURL) => {
        setUserPosts(userPosts.map(post => {
            if (post._id === postId) {
                return {
                    ...post,
                    title: formDataState.title,
                    subTitle: formDataState.subTitle,
                    author: formDataState.author,
                    paragraph: formDataState.paragraph,
                }
            }
            return post;
        }));
        setCurrImage(imageURL);
        setEditing(!editing);
    };

    const cancelClick = () => {
        togglePost();
        setFormDataState({
            author: post.author,
            title: post.title,
            subTitle: post.subTitle,
            paragraph: post.paragraph,
        });
    };

    const deleteSinglePost = async (postId) => {
        try {
            await axiosConfig.delete(`/cloudinary/${postId}`);
            await axiosConfig.delete(`/api/${postId}`);
            setUserPosts(userPosts.filter(post => post._id !== postId));
            alert('Single Post Deleted');
        } catch (error) {
            console.log('Error: ', error);
            alert('Sorry, there was an error when deleting your post. Please try again. If the problem persists, then please contact Frank.');
        }
    };



    return (
        <>
            {editing ? (
                <MakePostForm
                    formDataState={formDataState}
                    setFormDataState={setFormDataState}
                    editing={editing}
                    postId={postId}
                    prevImage={prevImage}
                    publicId={publicId}
                    cancelClick={cancelClick}
                    togglePost={togglePost}
                />
            ) : (
                <Container className='homepage-section'>
                    <Row>
                        <Col>
                            <h1>{prevTitle}</h1>
                            <h5>{prevSubTitle}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>By {prevAuthor}</p>
                        </Col>
                    </Row>

                    {(currImage !== 'null' && currImage !== undefined) && (
                        <Row>
                            <Col>
                                <img
                                    src={currImage}
                                    alt={currImage}
                                    className='galore-post-img'
                                />
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col>
                            <p>
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '16px' }}>
                                    {prevParagraph}
                                </pre>
                            </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button onClick={togglePost} className='bg-success'>Edit</Button>
                            <Button style={{ marginLeft: '1rem' }} onClick={() => deleteSinglePost(postId)}>Delete</Button>
                            <Link style={{ marginLeft: '1rem' }} to={`/myposts/${postId}`}>
                                <Button className='bg-primary'>View Article</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default SinglePostInMyPosts2;