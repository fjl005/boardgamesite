import Header from '../components/allpages/Header'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useState, useEffect } from 'react';
import axios from 'axios';
import cardsAndTrinkets from '../img/makePostImg/cardsAndTrinkets.jpg';
import diceOnMap from '../img/makePostImg/diceOnMap.jpg';
import foozballGame from '../img/makePostImg/foozballGame.jpg'
import { Tooltip } from 'react-tooltip';
import { Cloudinary } from 'cloudinary-core';
import LoadingIconPost from '../components/mypostspage/LoadingIconPost';

const MakePost = () => {

    const cloudinary = Cloudinary.new({ cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME });


    cloudinary.config({
        api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
        api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
    });

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImageIdx, setSelectedImageIdx] = useState(-1); // For storing the index of the selected image
    const [paragraph, setParagraph] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        }
    };

    const removeFile = () => {
        setImageFile(null);
        const fileInput = document.getElementById('img');
        if (fileInput) {
            fileInput.value = ''; // Clear the file input value to remove the selected file
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        // Create a formData object to append the text-based form fields and the image file together.
        const formData = new FormData();
        const formDataImg = new FormData();

        try {
            formData.append('title', title);
            formData.append('subTitle', subTitle);
            formData.append('author', author);
            formData.append('paragraph', paragraph);

            // This would mean that the image is one of the selected. If it wasn't, the index would be -1 and it'd instead possibly be an image upload, tested in the next else if.
            if (selectedImageIdx !== -1) {
                formData.append('img', imagesSelection[selectedImageIdx]);
            } else if (imageFile) {
                formDataImg.append('file', imageFile);
                formDataImg.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

                const imgData = await axios.post('http://localhost:5000/cloudinary')
                    .then(() => axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formDataImg))
                    .then(response => response.data)
                    .then(data => {
                        formData.append('publicId', data.public_id);
                        formData.append('img', data.url);
                    })
                    .catch(error => console.log('Error when posting to Cloudinary: ', error));
            }

            const response = await axios.post('http://localhost:5000/api', formData);

            if (response.data.error === 'title already exists') {
                alert('Sorry, you must make a post with a different title name. That title name already exists in a previous post you made.');
            } else if (response.data.error === 'incomplete form') {
                alert('You must complete all entries on the form.');
                console.log(response.data);
            } else {
                console.log('form submitted');
                alert('Post submitted!');
            }

        } catch (error) {
            alert(`Sorry, there was a problem submitting your form. Please refresh and try again. If the problem still persists, then it may be due to our server. If that's the case, then please contact Frank!`);
            console.log('Error: ', error);
            const deleteImgCloudinary = await axios.delete(`http:/localhost:5000/cloudinary/${formData.get('publicId')}`);

            // console.log('formData public Id: ', formData.get('publicId'));

            // // Delete image posted on cloudinary.
            // cloudinary.uploader
            //     .destroy(formData.get('publicId'))
            //     .then(result => console.log(result))
            //     .catch(err => console.log(err));
        } finally {
            setIsSubmitting(false);
        }
    }


    const autofillCorrect = () => {
        setTitle('AdventureQuest: Unleash Your Imagination and Conquer Epic Quests');
        setSubTitle('An Immersive Board Game Experience');
        setAuthor('John Deer');
        setParagraph(
            `AdventureQuest is a cooperative storytelling board game that takes players on thrilling quests through fantastical realms. With immersive storytelling, strategic gameplay, and stunning components, AdventureQuest has become a favorite among board game enthusiasts.

In AdventureQuest, players assume the roles of brave adventurers and embark on perilous quests for treasure, fame, and glory. The game's modular board and rich narratives create endless possibilities, while cooperative gameplay fosters teamwork and communication.
        
The game's exceptional components, including beautifully designed cards and intricate miniatures, bring the world of AdventureQuest to life. With extensive replayability and expansions available, AdventureQuest offers endless adventure and excitement.
        
Step into the world of AdventureQuest, unleash your imagination, and conquer epic quests with friends. Get ready for an immersive board game experience like no other.`);
    };

    // I'm debating whether this test should be the exact same as autofill, or if only the setTitle will be needed. 
    const autofillSameTitle = () => {
        setTitle('AdventureQuest: Unleash Your Imagination and Conquer Epic Quests');
        setSubTitle('subTitle');
        setAuthor('some author');
        setParagraph(`some text nice`);
    };

    const autofillDiffTitleOthersSame = () => {
        setTitle('This title is different from the first one');
        setSubTitle('An Immersive Board Game Experience');
        setAuthor('John Deer');
        setParagraph(
            `AdventureQuest is a cooperative storytelling board game that takes players on thrilling quests through fantastical realms. With immersive storytelling, strategic gameplay, and stunning components, AdventureQuest has become a favorite among board game enthusiasts.

In AdventureQuest, players assume the roles of brave adventurers and embark on perilous quests for treasure, fame, and glory. The game's modular board and rich narratives create endless possibilities, while cooperative gameplay fosters teamwork and communication.
        
The game's exceptional components, including beautifully designed cards and intricate miniatures, bring the world of AdventureQuest to life. With extensive replayability and expansions available, AdventureQuest offers endless adventure and excitement.
        
Step into the world of AdventureQuest, unleash your imagination, and conquer epic quests with friends. Get ready for an immersive board game experience like no other.`);
    };

    const autofillPartial = () => {
        setTitle('This is a partially filled out form');
        setSubTitle('I got lazy, woops!');
        setAuthor('');
        setParagraph('');
    }

    return (
        <>
            <Header />
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Make a Post on Bored Games Galore</h1>
                    </Col>
                </Row>
            </Container>

            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h2> Autofill Options (for testing and debugging).</h2>
                        <p>Please follow the steps in order. Click the first button, hit submit, then the second button, then submit, etc.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>New Post with all criteria completed should work -- image is optional.</h4>
                        <Button onClick={autofillCorrect}>1</Button>
                        <p>Autofill a correct article. After clicking the '1' button, hit submit down below the page. The form should be submitted successfully and can be accessed in the 'My Posts' section. </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4>Duplicate title should NOT work.</h4>
                        <Button onClick={autofillSameTitle}>2</Button>
                        <p>Autofill a duplicate title. After clicking the '2' button, hit submit down below the page. The form should NOT work because the title is the same as the first post. </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4>Post with different title should work, even if all other fields are duplicates.</h4>
                        <Button onClick={autofillDiffTitleOthersSame}>3</Button>
                        <p>Autofill a different title but all other entries are the same as the first article. After clicking the '3' button, hit submit down below the page. The form should still work because the title is different (although all other entries are the same). </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4>A partially completed form should NOT work.</h4>
                        <Button onClick={autofillPartial}>4</Button>
                        <p>Autofills partially. After clicking the '4' button, hit submit down below the page. The form should NOT work because all written entries are required.. </p>
                    </Col>
                </Row>
            </Container>

            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <h3>Title Info</h3>
                                <Label
                                    htmlFor='title'
                                    style={{ marginTop: '10px' }}>
                                    Title
                                </Label>
                                <Input
                                    name='title'
                                    id='title'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
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
                                    value={subTitle}
                                    onChange={e => setSubTitle(e.target.value)}
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
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    placeholder='e.g. Alex Johnson'
                                />
                            </FormGroup>

                            <FormGroup>
                                <h3>Article</h3>
                                <Label
                                    htmlFor='paragraph'
                                    style={{ marginTop: '10px' }}>
                                    Write Your Article Here!
                                </Label>
                                <Input
                                    name='paragraph'
                                    id='paragraph'
                                    value={paragraph}
                                    onChange={e => setParagraph(e.target.value)}
                                    type='textarea'
                                    placeholder='e.g. Board games are a great way to connect with others, but finding time for game nights can be tough. Luckily, two-player board games offer a fun and convenient way to spend quality time with a partner, friend, or family member. ...'
                                    rows={20}
                                />
                            </FormGroup>

                            <FormGroup>
                                <h3>Image</h3>
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
                                                position: 'relative',
                                                display: 'inline-block',
                                                width: '30%',
                                                height: '250px'
                                            }}
                                        >
                                            <img
                                                src={img}
                                                alt='selection image'
                                                style={{
                                                    position: 'asbolute',
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
                                                data-tooltip-content='You already have an image uploaded. Please remove it if you want to select a default image above.'
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

                            <div className='d-flex'>
                                <Button type='submit' color='primary'>Submit</Button>
                                {isSubmitting && (
                                    <div>
                                        <LoadingIconPost
                                            color='teal'
                                            marginLeft='10px'
                                        />
                                        <span style={{ marginLeft: '10px' }}>
                                            Submitting, this may take a few seconds...
                                        </span>

                                    </div>
                                )}
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MakePost;