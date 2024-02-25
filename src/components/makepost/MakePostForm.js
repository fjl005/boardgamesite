import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Tooltip
} from "reactstrap";
import cardsAndTrinkets from '../../img/makePostImg/cardsAndTrinkets.jpg';
import diceOnMap from '../../img/makePostImg/diceOnMap.jpg';
import foozballGame from '../../img/makePostImg/foozballGame.jpg';
import LoadingIconPost from "../mypostspage/LoadingIconPost";
import axios from "axios";
import { axiosConfig } from "../allpages/axiosConfig";

const imagesSelection = [cardsAndTrinkets, foozballGame, diceOnMap];

const SinglePostInMyPosts = ({
    formDataState,
    setFormDataState,
    publicId,
    editing,
    prevImage,
    postId,
    cancelClick,
    togglePost,
}) => {
    // FORM
    const [isSubmitting, setIsSubmitting] = useState(false);

    // IMAGES
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImageIdx, setSelectedImageIdx] = useState(-1);
    const [removePrevImage, setRemovePrevImage] = useState(false);
    const [imageFileKey, setImageFileKey] = useState(Date.now());

    // TOOL TIPS
    const [imgSelectedTooltip, setImgSelectedTooltip] = useState(false);
    const [imgUploadedTooltips, setImgUploadedTooltips] = useState(imagesSelection.map(() => false));
    const toggleImageSelection = () => setImgSelectedTooltip(prev => !prev);
    const toggleUploadedImage = (idx) => {
        const newTooltips = [...imgUploadedTooltips];
        newTooltips[idx] = !newTooltips[idx];
        setImgUploadedTooltips(newTooltips);
    };

    // Image uploaded from computer. Can only do so if image is not selected already. 
    const handleImageUpload = (event) => {
        if (selectedImageIdx > -1) {
            alert('You must unselect an image above if you want to upload your own image.');
            setImageFile(null);
        } else {
            const file = event.target.files[0];
            setImageFile(file);
        }
    };

    // Image selected (or unselected if clicked twice) from default selection. Can only do so if image is not already uploaded.
    const handleImageClick = (idx) => {
        if (!imageFile) {
            if (selectedImageIdx === idx) {
                setSelectedImageIdx(-1);
            } else {
                setSelectedImageIdx(idx);
            }
        }
    };

    // Remove uploaded file, generate new key to render a NEW image input (thus deleting the file).
    const removeFile = () => {
        setImageFile(null);
        setSelectedImageIdx(-1);
        setImageFileKey(Date.now());
    };

    // Short function to delete image from cloudinary website.
    const deleteCurrentImgCloudinary = async () => {
        if (publicId) {
            await axiosConfig.delete(`/cloudinary/${postId}`);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formDataImg = new FormData();

        try {
            let cloudinaryData;
            let selectedImage;

            if (selectedImageIdx !== -1) {
                await deleteCurrentImgCloudinary();
                selectedImage = imagesSelection[selectedImageIdx];
            } else if (imageFile) {
                await deleteCurrentImgCloudinary();
                formDataImg.append('file', imageFile);
                formDataImg.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
                try {
                    await axiosConfig.get('/cloudinary');
                    const imgData = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formDataImg);
                    cloudinaryData = imgData.data;
                } catch (err) {
                    console.log('Error when posting to Cloudinary: ', err);
                    alert(`Sorry, there was an error posting the image to our server. Please try again. If the error persists, then please contact Frank. Let's see if we can still proceed to post your article though since the image is technically optional.`);
                }
            }

            const reqBody = {
                ...formDataState,
                img: imageFile ? cloudinaryData.url : (selectedImage ? selectedImage : null),
                publicId: cloudinaryData ? cloudinaryData.publicId : null,
            };

            const response = editing ? await axiosConfig.put(`/api/${postId}`, { reqBody }) : await axiosConfig.post('/api', { reqBody });

            if (response.data.error === 'title already exists') {
                alert('Sorry, you must make a post with a different title name. That title name already exists in a previous post you made.');
            } else if (response.data.error === 'incomplete form') {
                alert('You must complete all entries on the form.');
            } else {
                alert(`${editing ? 'Post updated!' : 'Post submitted!'}`);
                if (editing) {
                    togglePost(reqBody.img);
                }
            }

        } catch (error) {
            alert(`Sorry, there was a problem submitting your form. Please refresh and try again. If the problem still persists, then it may be due to our server. If that's the case, then please contact Frank!`);
            console.log('Error: ', error);
            await axiosConfig.delete(`/cloudinary/${formDataState.publicId}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    const makePostInputs = [
        {
            label: 'Title',
            category: 'title',
            value: formDataState.title,
            placeholder: 'e.g. The Best Two-Player Board Games For Couples or Friends',
        },
        {
            label: 'Short Hook Sentence (Sub-Title)',
            category: 'subTitle',
            value: formDataState.subTitle,
            placeholder: 'e.g. Discover the top-rated two-player board games for a fun and convenient way to connect with a partner, friend, or family member.',
        },
        {
            label: 'Author (aka you!)',
            category: 'author',
            value: formDataState.author,
            placeholder: 'e.g. Alex Johnson',
        }
    ];

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
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <h3>Title Info</h3>
                            {makePostInputs.map((fieldInfo, idx) => (
                                <React.Fragment key={idx}>
                                    <Label key={idx} htmlFor={fieldInfo.category} className='mt-3'>{fieldInfo.label}</Label>
                                    <Input
                                        className={fieldInfo.category}
                                        id={fieldInfo.category}
                                        value={fieldInfo.value}
                                        onChange={(event) => setFormDataState(prev => ({
                                            ...prev,
                                            [fieldInfo.category]: event.target.value
                                        }))}
                                        placeholder={fieldInfo.placeholder}
                                    />
                                </React.Fragment>
                            ))}
                        </FormGroup>

                        <FormGroup className='mt-5'>
                            <h3>Article</h3>
                            <Label htmlFor='paragraph'>Write Your Article Here!</Label>
                            <Input
                                name='paragraph'
                                id='paragraph'
                                value={formDataState.paragraph}
                                onChange={event => setFormDataState(prev => ({
                                    ...prev,
                                    paragraph: event.target.value
                                }))}
                                type='textarea'
                                placeholder='e.g. Board games are a great way to connect with others, but finding time for game nights can be tough. Luckily, two-player board games offer a fun and convenient way to spend quality time with a partner, friend, or family member. ...'
                                rows={20}
                            />
                        </FormGroup>

                        <FormGroup>
                            <h3>Image (Only 1 Image Allowed)</h3>

                            {editing && prevImage && (
                                <div className='text-center'>
                                    {removePrevImage ? (
                                        <h4 className='mb-3'>
                                            Original Image Removed&nbsp;- &nbsp;
                                            <span className='blue-text-remove-file' onClick={() => setRemovePrevImage(false)}>
                                                Click to undo
                                            </span>
                                        </h4>
                                    ) : (
                                        <div className='d-flex flex-column justify-content-center'>
                                            <h4>Original Image</h4>
                                            <img
                                                src={prevImage}
                                                alt='Previous Upload'
                                                className='image-upload-preview mx-auto'
                                            />
                                            <p className='blue-text-remove-file' onClick={() => setRemovePrevImage(true)}>Remove Current Image</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {removePrevImage && (
                                <>
                                    <h5>Either select an image below, or upload your own image!</h5>
                                    <div className='d-flex justify-content-between mb-3'>
                                        {imagesSelection.map((img, idx) => (
                                            <div key={idx} className='image-selection-div-outer'>
                                                <img
                                                    src={img}
                                                    alt={`selection at index ${idx}`}
                                                    className='image-selection-img'
                                                    style={{ border: (selectedImageIdx === idx && !imageFile) ? '5px solid red' : 'none' }}
                                                    onClick={() => handleImageClick(idx)}
                                                />

                                                {imageFile && (
                                                    <>
                                                        <div
                                                            className="galore-posts-img-overlay"
                                                            id={`selected-image-overlay-${idx}`}
                                                        ></div>
                                                        <Tooltip
                                                            isOpen={imgUploadedTooltips[idx]}
                                                            target={`selected-image-overlay-${idx}`}
                                                            toggle={() => toggleUploadedImage(idx)}
                                                            placement='top'
                                                            trigger='hover'
                                                        >
                                                            You already have an image uploaded. Please remove it if you want to select a default image here.
                                                        </Tooltip>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <Input
                                        name='img'
                                        key={imageFileKey}
                                        id='imageUpload'
                                        type='file'
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={selectedImageIdx > -1}
                                    />

                                    {selectedImageIdx > -1 && (
                                        <Tooltip
                                            isOpen={imgSelectedTooltip}
                                            target='imageUpload'
                                            toggle={toggleImageSelection}
                                            placement='bottom'
                                            trigger='hover'
                                        >
                                            You already have an image selected. Please unselect it if you want to upload your own image.
                                        </Tooltip>
                                    )}

                                    <div className='d-flex flex-column'>
                                        {imageFile && (
                                            <span className='blue-text-remove-file' onClick={removeFile}>Remove File</span>
                                        )}

                                        {imageFile && (
                                            <img
                                                src={imagePreview}
                                                alt='Uploaded File'
                                                className='image-upload-preview'
                                            />
                                        )}
                                    </div>
                                </>
                            )}
                        </FormGroup>

                        <div className='d-flex'>
                            {editing && (
                                <Button style={{ marginRight: '1rem' }} onClick={cancelClick}>Cancel</Button>
                            )}
                            <Button type='submit' color='primary'>Submit</Button>
                            {isSubmitting && (
                                <div>
                                    <LoadingIconPost color='teal' marginLeft='1rem' />
                                    <span style={{ marginLeft: '1rem' }}>
                                        Submitting, this may take a few seconds...
                                    </span>
                                </div>
                            )}
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SinglePostInMyPosts;