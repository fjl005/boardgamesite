import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import cardsAndTrinkets from '../../img/makePostImg/cardsAndTrinkets.jpg';
import diceOnMap from '../../img/makePostImg/diceOnMap.jpg';
import foozballGame from '../../img/makePostImg/foozballGame.jpg'


const MyPostFormat = ({ uniqueId, title, subTitle, author, paragraph, userPosts, setUserPosts, img }) => {

    const [newTitle, setNewTitle] = useState(title);
    const [newSubTitle, setNewSubTitle] = useState(subTitle);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newParagraph, setNewParagraph] = useState(paragraph);
    const [imageFile, setImageFile] = useState(null);
    const [selectedImageIdx, setSelectedImageIdx] = useState(-1);
    const [savingPost, setSavingPost] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const netlifyUrl = 'https://649642c1b48fbc0c7d5849ba--inspiring-profiterole-51c43d.netlify.app/';

    const deleteSinglePost = async (uniqueId) => {
        try {
            // await axios.delete(`https://boardgames-api-attempt2.onrender.com/api/${uniqueId}`);
            await axios.delete(`http://localhost:5000/cloudinary/${uniqueId}`);
            await axios.delete(`http://localhost:5000/api/${uniqueId}`);
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
        setSavingPost(true);

        try {
            const formData = new FormData();
            const formDataImg = new FormData();

            // This will be used later, when we try to display the new image on the browser after edit is saved.
            let newImg;

            // If an image was selected from the selection, set the new image to that image.
            if (selectedImageIdx !== -1) {
                newImg = imagesSelection[selectedImageIdx];
                formData.append('img', newImg);
            }
            // Otherwise, check if there is an image file. That will be the new image, and we will also post this to Cloudinary. 
            else if (imageFile) {
                formDataImg.append('file', imageFile);
                formDataImg.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
                // Just wanted to try fetching without axios, so that I know what axios is doing and the code it's saving me to write!
                const imgData = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formDataImg
                }).then(response => response.json())
                    .then(data => {
                        formData.append('publicId', data.public_id);
                        newImg = data.url;
                        formData.append('img', newImg);
                    })
                    .catch(error => console.log('error when posting: ', error));
            }
            // Lastly, check if nothing was changed and if an image was there from the start. If so, then the new image will remain as the current image
            else if (img) {
                newImg = img;
                formData.append('img', newImg);
            }

            formData.append('title', newTitle);
            formData.append('subTitle', newSubTitle);
            formData.append('author', newAuthor);
            formData.append('paragraph', newParagraph);


            const response = await axios.put(`http://localhost:5000/api/${uniqueId}`, formData);

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
                            paragraph: response.data.paragraph,
                            img: newImg
                        }
                    }
                    return post;
                }));

                togglePost();
                alert('Post has been updated!!');
            }
            setSavingPost(false);

        } catch (error) {
            console.log('Error: ', error);
            setSavingPost(false);

        }
    }

    const imagesSelection = [
        cardsAndTrinkets,
        foozballGame,
        diceOnMap
    ];

    const handleImageChange = (event) => {
        if (selectedImageIdx > -1) {
            alert('You must unselect an image above if you want to upload your own image.');
            setImageFile(null);
        } else {
            const file = event.target.files[0];
            setImageFile(file);
        }
    };

    const handleImageClick = (idx) => {
        // Only allow the image click to be successful if there is no image file already uploaded. If an image is already uploaded, then don't allow the user to select an image on the browser.
        if (!imageFile) {
            // Image Key represents the image URL. 
            if (selectedImageIdx === idx) {
                // If the index of the selected image already matches, then it's already selected. That means that this click is to unselect the image.
                setSelectedImageIdx(-1);
            } else {
                // Otherwise, the selected image should be a legitimate selection. Store the index of this image.
                setSelectedImageIdx(idx);
            }
        } else {
            setSelectedImageIdx(-1);
            alert('You already have an image uploaded. Please remove that file if you want to use one of the default images here.');
        }
    };

    // Image preview
    useEffect(() => {
        if (!imageFile) {
            setImagePreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(imageFile);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const removeFile = () => {
        setImageFile(null);
        const fileInput = document.getElementById('img');
        if (fileInput) {
            fileInput.value = ''; // Clear the file input value to remove the selected file
        }
    };


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
                                    {img && (
                                        <div className='text-center'>
                                            <h3>Current Image Shown Below</h3>
                                            <img
                                                src={img}
                                                alt='Uploaded Image'
                                                style={{
                                                    width: '40%',
                                                    height: 'auto',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </div>
                                    )}
                                    <h3 style={{ marginTop: '15px' }}>Change Image (this currently doesn't work. Am still working on it!)</h3>
                                    <h5>Either select an image below, or upload your own image!</h5>
                                    <div className='d-flex'
                                        style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        {imagesSelection.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt='selection image'
                                                style={{
                                                    width: '30%',
                                                    border: (selectedImageIdx === idx && !imageFile) ? '5px solid red' : 'none',
                                                    height: '250px',
                                                    objectFit: 'cover'
                                                }}
                                                onClick={() => handleImageClick(idx)}
                                            />
                                        ))}

                                    </div>

                                    <Input
                                        name='img'
                                        id='img'
                                        type='file'
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        disabled={selectedImageIdx > -1} // Disable the file input if a selected image exists
                                    />

                                    <div className='d-flex flex-column'>
                                        {imageFile && (
                                            <span
                                                style={{
                                                    color: 'blue',
                                                    display: 'inline-block',
                                                    textDecoration: 'underline',
                                                    marginTop: '10px',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={removeFile}
                                            >Remove File</span>
                                        )}

                                        {imageFile && <img
                                            src={imagePreview}
                                            alt='Uploaded Image'
                                            style={{
                                                width: '40%',
                                                height: 'auto',
                                                objectFit: 'cover'
                                            }}
                                        />}
                                    </div>
                                </FormGroup>

                                <Button onClick={cancelClick}>Cancel</Button>
                                <Button type='submit' color='primary' style={{ margin: '10px' }}>Save</Button>
                                {savingPost && (<span>Saving, this will take a few seconds...</span>)}
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

                    {img &&
                        <Row>
                            <Col>
                                <img
                                    src={`${img}`}
                                    alt={`image for ${title}`}
                                    className='galore-post-img'
                                />
                                {console.log('imgUrl is: ', img)}
                            </Col>
                        </Row>
                    }

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
                            <Link to={`/myposts/${uniqueId}`}>
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