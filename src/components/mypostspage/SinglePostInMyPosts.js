import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { axiosConfig } from '../allpages/axiosConfig';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import cardsAndTrinkets from '../../img/makePostImg/cardsAndTrinkets.jpg';
import diceOnMap from '../../img/makePostImg/diceOnMap.jpg';
import foozballGame from '../../img/makePostImg/foozballGame.jpg'
import LoadingIconPost from './LoadingIconPost';
import { Tooltip } from 'react-tooltip';

const SinglePostInMyPosts = ({
    post,
    uniqueId,
    userPosts,
    setUserPosts,
}) => {

    const {
        title,
        subTitle,
        author,
        paragraph,
        img,
        publicId,
    } = post;

    const [newTitle, setNewTitle] = useState(title);
    const [newSubTitle, setNewSubTitle] = useState(subTitle);
    const [newAuthor, setNewAuthor] = useState(author);
    const [newParagraph, setNewParagraph] = useState(paragraph);
    const [imageFile, setImageFile] = useState(null);
    const [selectedImageIdx, setSelectedImageIdx] = useState(-1);
    const [savingPost, setSavingPost] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [removedCurrentImg, setRemovedCurrentImg] = useState(false);
    const [edit, setEdit] = useState(false);

    const imagesSelection = [cardsAndTrinkets, foozballGame, diceOnMap];

    const togglePost = () => setEdit(!edit);

    const cancelClick = () => {
        togglePost();
        setNewTitle(title);
        setNewSubTitle(subTitle);
        setNewAuthor(author);
        setNewParagraph(paragraph);
        setRemovedCurrentImg(false);
        imageReset();
    };

    const imageReset = () => {
        setRemovedCurrentImg(false);
        setImageFile(null);
        setSelectedImageIdx(-1);
    };

    const removeFile = () => {
        setImageFile(null);
        const fileInput = document.getElementById('img');
        if (fileInput) {
            fileInput.value = ''; // Clear the file input value to remove the selected file
        }
    };

    const deleteSinglePost = async (uniqueId) => {
        try {
            // Need to delete the image from Cloudinary first to grab the public Id, before deleting it from our database.
            await axiosConfig.delete(`/cloudinary/${uniqueId}`);
            await axiosConfig.delete(`/api/${uniqueId}`);
            setUserPosts(userPosts.filter(post => post._id !== uniqueId));
            alert('Single Post Deleted');
        } catch (error) {
            console.log('Error: ', error);
            alert('Sorry, there was an error when deleting your post. Please try again. If the problem persists, then please contact Frank.');
        }
    };

    const updatePost = async (event) => {
        event.preventDefault();
        setSavingPost(true);

        const dataObj = {
            title: newTitle,
            subTitle: newSubTitle,
            author: newAuthor,
            paragraph: newParagraph
        }

        try {
            // This will be used later, when we try to display the new image on the browser after edit is saved. I have to use null as a string because of how the Schema was designed (as it can only take string inputs).
            let newImg = 'null';

            // If an image was selected from the selection, set the new image to that image.
            if (selectedImageIdx !== -1) {
                // Delete the original image on file, if it was an uploaded image to Cloudinary. This will need to be done because we don't want to hold a million files on Cloudinary if it's not the updated image anymore.
                deleteCurrentImgCloudinary();
                newImg = imagesSelection[selectedImageIdx];
                dataObj.img = newImg;
            }
            // Otherwise, check if there is an image file. That will be the new image, and we will also post this to Cloudinary. 
            else if (imageFile) {
                deleteCurrentImgCloudinary();

                // Formdata is used here to handle image file posts to the Cloudinary API.
                const formDataImg = new FormData();
                formDataImg.append('file', imageFile);
                formDataImg.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

                const imgData = await axiosConfig.post('/cloudinary')
                    .then(() => axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formDataImg))
                    .then(response => response.data)
                    .then(data => {
                        newImg = data.url;
                        dataObj.img = newImg;
                        dataObj.publicId = data.public_id;
                    })
                    .catch(error => {
                        console.log('Error when posting to Cloudinary: ', error);
                        alert('Sorry, there was an error posting the image to our server. Please try again. If the error persists, then please contact Frank.');
                    });
            }
            // We also need to check if there was already an image, and the current image was not removed. Aka, we did nothing to our image. 
            else if (img && !removedCurrentImg) {
                newImg = img;
            }
            // Otherwise, the image was removed, or there was no image from the start. 
            else {
                deleteCurrentImgCloudinary();
            }

            const response = await axiosConfig.put(`/api/${uniqueId}`, dataObj);
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
            imageReset();
            setSavingPost(false);
        } catch (error) {
            console.log('Error: ', error);
            alert('Sorry, there was an error in saving your post. Please try again. If the problem persists, then please contact Frank.');
            setSavingPost(false);
        }
    };

    const deleteCurrentImgCloudinary = async () => {
        if (publicId) {
            await axiosConfig.delete(`/cloudinary/${uniqueId}`);
        }
    };

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
                                    {(img !== 'null' && img !== undefined) && (
                                        <div className='text-center'>
                                            <h2>Original Image Shown Below</h2>
                                            {removedCurrentImg ? (
                                                <h4>Current Image Absent or Deleted</h4>
                                            ) : (
                                                <>
                                                    <img
                                                        src={img}
                                                        alt='Current Image'
                                                        style={{
                                                            width: '40%',
                                                            height: 'auto',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                    <p className='text-center'
                                                        style={{
                                                            color: 'blue',
                                                            textDecoration: 'underline',
                                                            marginTop: '10px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => setRemovedCurrentImg(true)}
                                                    >Remove Current Image</p>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    <h3>Change Image</h3>
                                    <h5>Either select an image below, or upload your own image!</h5>
                                    <div className='d-flex'
                                        style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            marginBottom: '10px'
                                        }}
                                    >
                                        {imagesSelection.map((img, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    width: '30%',
                                                    display: 'inline-block',
                                                    position: 'relative'
                                                }}
                                            >
                                                <img
                                                    src={img}
                                                    alt='selection image'
                                                    position='absolute'
                                                    style={{
                                                        width: '100%',
                                                        border: (selectedImageIdx === idx && !imageFile) ? '5px solid red' : 'none',
                                                        height: '250px',
                                                        objectFit: 'cover',
                                                    }}
                                                    onClick={() => handleImageClick(idx)}
                                                />

                                                {imageFile && (<div
                                                    className="galore-posts-img-overlay"
                                                    data-tooltip-id='image-upload-exists'
                                                    data-tooltip-content='You already have an image uploaded. Please remove it if you want to select a default image here.'
                                                >
                                                </div>)}

                                                <Tooltip id='image-upload-exists' />
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        {selectedImageIdx > -1 ? (
                                            <>
                                                {/* Show tooltip of image upload being disabled if an image is selected */}
                                                <div
                                                    data-tooltip-id='image-selection-exists'
                                                    data-tooltip-content='You already have an image selected. Please unselect it if you want to upload your own image.'
                                                >
                                                    <Input
                                                        name='img'
                                                        id='img'
                                                        type='file'
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        disabled={selectedImageIdx > -1} // Disable the file input if a selected image exists
                                                    />
                                                </div>
                                                <Tooltip id='image-selection-exists' place='bottom' />
                                            </>
                                        ) : (
                                            <Input
                                                name='img'
                                                id='img'
                                                type='file'
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                disabled={selectedImageIdx > -1} // Disable the file input if a selected image exists
                                            />
                                        )}
                                    </div>

                                    <div className='d-flex flex-column'>
                                        {imageFile && (
                                            <span
                                                style={{
                                                    color: 'blue',
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
                                                width: '25%',
                                                height: 'auto',
                                                objectFit: 'cover'
                                            }}
                                        />}
                                    </div>
                                </FormGroup>

                                <Button onClick={cancelClick}>Cancel</Button>
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <Button type='submit' color='primary' style={{ margin: '10px' }}>Save</Button>
                                    {savingPost && (
                                        <>
                                            <LoadingIconPost color='teal' marginLeft='0' />
                                            <span style={{ marginLeft: '10px' }}>Saving, this will take a few seconds...</span>
                                        </>
                                    )}
                                </div>
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
                        </Col>
                    </Row>

                    {(img !== 'null' && img !== undefined) && (
                        <Row>
                            <Col>
                                <img
                                    src={`${img}`}
                                    alt={`image for ${title}`}
                                    className='galore-post-img'
                                />
                            </Col>
                        </Row>
                    )}

                    <Row>
                        <Col>
                            <p>
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '16px' }}>
                                    {paragraph}
                                </pre>
                            </p>
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
                                onClick={() => deleteSinglePost(uniqueId)}
                            >Delete</Button>
                            <Link to={`/myposts/${uniqueId}`}>
                                <Button
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

export default SinglePostInMyPosts;