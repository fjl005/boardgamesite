import { Container, Row, Col, Button } from 'reactstrap';
import { axiosConfig } from '../allpages/axiosConfig';
import { useState, } from 'react';
import { Link } from "react-router-dom";
import MakePostForm from '../makepost/MakePostForm';

const SinglePostInMyPosts = ({
    post,
    postId,
    fetchApiData,
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
        fetchApiData();
        setCurrImage(imageURL);
        setEditing(prev => !prev);
    };

    const cancelClick = () => {
        togglePost(post.img);
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
            fetchApiData();
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
                            <div>
                                <pre className='pre-inherit-format'>
                                    {prevParagraph}
                                </pre>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button onClick={togglePost} className='bg-success btn-border-none'>Edit</Button>
                            <Button className='bg-danger btn-border-none' style={{ marginLeft: '1rem' }} onClick={() => deleteSinglePost(postId)}>Delete</Button>
                            <Link style={{ marginLeft: '1rem' }} to={`/myposts/${postId}`}>
                                <Button className='bg-primary btn-border-none'>View Article</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default SinglePostInMyPosts;