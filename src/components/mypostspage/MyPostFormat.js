import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";


const MyPostFormat = ({ uniqueId, title, subTitle, author, paragraph, userPosts, setUserPosts, imgUrl }) => {

    const [newTitle, setNewTitle] = useState(title);
    const [newSubTitle, setNewSubTitle] = useState(subTitle);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newParagraph, setNewParagraph] = useState(paragraph);

    const netlifyUrl = 'https://649642c1b48fbc0c7d5849ba--inspiring-profiterole-51c43d.netlify.app/';

    // const location = useLocation();
    // const { pathname } = location;

    const deleteSinglePost = async (uniqueId) => {
        try {
            await axios.delete(`https://boardgames-api-attempt2.onrender.com/api/${uniqueId}`);
            console.log('post deleted');
            setUserPosts(userPosts.filter(post => post._id !== uniqueId));
            alert('Single Post Deleted');
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    const [edit, setEdit] = useState(false);

    const togglePost = () => {
        setEdit(!edit);
    }

    const cancelClick = () => {
        togglePost();
        setNewTitle(title);
        setNewSubTitle(subTitle);
        setNewAuthor(author);
        setNewParagraph(paragraph);
    }

    const viewArticle = () => {
        console.log('this does nothing right now');
    }

    const updatePost = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`https://boardgames-api-attempt2.onrender.com/api/${uniqueId}`, {
                title: newTitle,
                subTitle: newSubTitle,
                author: newAuthor,
                paragraph: newParagraph
            });
            if (response.data.error === 'no changes') {
                alert("Doesn't seem like anything changed!");
            }
            else if (response.data.error === 'incomplete form') {
                alert('You must complete all entries on the form.');
            } else {
                // We must update the original userPosts state that came from the parent component, since this will ultimately reflect the change on the page after form submission.
                setUserPosts(userPosts.map(post => {
                    if (post._id === uniqueId) {
                        return {
                            ...post,
                            title: response.data.title,
                            subTitle: response.data.subTitle,
                            author: response.data.author,
                            paragraph: response.data.paragraph
                        };
                    }
                    return post;
                }));

                togglePost();
                console.log('Post has been updated!');
                alert('Post has been updated!!');
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }


    return (
        <Container className='homepage-section'>
            {edit ? (
                <>
                    <Row>
                        <Col>
                            <Form onSubmit={updatePost}>
                                <FormGroup>
                                    <Label
                                        htmlFor='title'
                                        style={{ marginTop: '10px' }}>
                                        Title
                                    </Label>
                                    <Input
                                        name='title'
                                        id='title'
                                        value={newTitle}
                                        onChange={e => setNewTitle(e.target.value)}
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
                                        value={newSubTitle}
                                        onChange={e => setNewSubTitle(e.target.value)}
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
                                        value={newAuthor}
                                        onChange={e => setNewAuthor(e.target.value)}
                                        placeholder='e.g. Alex Johnson'
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label
                                        htmlFor='paragraph'
                                        style={{ marginTop: '10px' }}>
                                        Write Your Article Here!
                                    </Label>
                                    <Input
                                        name='paragraph'
                                        id='paragraph'
                                        value={newParagraph}
                                        onChange={e => setNewParagraph(e.target.value)}
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

                                <Button onClick={cancelClick}>Cancel</Button>
                                <Button type='submit' color='primary' style={{ margin: '10px' }}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </>
            ) : (
                <>
                    <Row>
                        <Col>
                            <h1>{title}</h1>
                            <h5>{subTitle}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>By {author}</p>
                            {/* <p>Posted {articleJson.submissionTime}, {articleJson.date}</p> */}
                        </Col>
                    </Row>

                    {imgUrl ? (
                        <Row>
                            <Col>
                                <img
                                    src={imgUrl}
                                    alt={`image for ${title}`}
                                    className='galore-post-img'
                                />
                                {console.log('imgUrl is: ', imgUrl)}
                            </Col>
                        </Row>
                    ) : null}

                    <Row>
                        <Col>
                            <p>
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '16px' }}>
                                    {paragraph}
                                </pre>
                            </p>
                            {/* {paragraph && paragraph.map((paragraph, idx) => {
                        return paragraph.length < 50 ? (
                            <h4 key={idx}>{paragraph}</h4>
                        ) : (
                            <p key={idx}>{paragraph}</p>
                        )
                    })} */}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button
                                onClick={togglePost}
                                className='bg-success'
                            >Edit</Button>
                            <Button
                                style={{ margin: '10px' }}
                                onClick={() => { deleteSinglePost(uniqueId) }}
                            // className='bg-danger'
                            >Delete</Button>
                            {/* <Link to={`${window.location.protocol}//${window.location.hostname}:3000/myposts/${uniqueId}`}> */}
                            {/* <Link to={`${pathname}/${uniqueId}`}> */}
                            <Link to={`${netlifyUrl}/${uniqueId}`}>
                                <Button
                                    onClick={() => { viewArticle(uniqueId) }}
                                    className='bg-primary'
                                >View Article</Button>
                            </Link>
                        </Col>
                    </Row>
                </>
            )}



        </Container>
    )
}

export default MyPostFormat