import { Container, Row, Col, Button } from 'reactstrap';
import { axiosConfig } from '../allpages/axiosConfig';
import { useState, } from 'react';
import { Link } from "react-router-dom";
import MakePostForm from '../makepost/MakePostForm';
import ArticleInfo from './ArticleInfo';

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
        img: post.img
    });

    const [currImage, setCurrImage] = useState(post.img);
    const [editing, setEditing] = useState(false);

    const togglePost = () => {
        fetchApiData();
        setCurrImage(post.img);
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
                    <ArticleInfo
                        title={prevTitle}
                        subTitle={prevSubTitle}
                        author={prevAuthor}
                        image={prevImage}
                        paragraph={prevParagraph}
                    />

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