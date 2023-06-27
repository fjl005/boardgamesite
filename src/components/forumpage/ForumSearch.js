import { Label, Input, Button, Form } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const ForumSearch = ({ inputValue, setInputValue, setPage }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const entry = event.target.elements.searchGames.value;
        setInputValue(entry);
        const searchUrl = `/forums/search/${entry}`;
        window.history.pushState({ path: searchUrl }, '', searchUrl);
        setPage(1);

        // To clarify what's happening above...
        // Window: global object in JS representing the current browser. Importantly, it gives us access to the history object.
        // History: an interface to the browser's history, containing the URL's visited by the user. It provides methods for navigating through the history, as well as changing the URL without triggering a page reload.
        // pushState: used to add a new entry to the browser's history.
        // It takes three arguments: (1) State, (2) Title, (3) URL. 
    }

    return (
        <>
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Board Game Atlas Forums</h1>
                        <p style={{ fontSize: '18px' }}>Search for user posts and forums from the Board Game Atlas API. <span style={{ fontWeight: 'bold' }}>This is different from the Galore Posts Section</span>, as Galore Posts is where users from Bored Games Galore can write posts. To make a post on Board Game Atlas, please check out their site <a href='https://www.boardgameatlas.com' target='_blank'>here</a>. For more information on this API, check out the docs <a href='https://www.boardgameatlas.com/api/docs' target='_blank'> here</a>.</p>
                        <Form onSubmit={handleSubmit} className='d-flex'>
                            <Label htmlFor='searchGames' style={{ fontSize: '20px', textAlign: 'center' }}>Search Forums</Label>
                            <Input id='searchGames' placeholder='e.g. Catan, Monopoly, Ark Nova, etc.'></Input>
                            <Button type='submit' style={{ margin: '10px 10px 10px 20px' }}>Search</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: 'center', padding: '10px', fontSize: '20px' }}>
                        {inputValue && (
                            <>
                                <h5>Showing Results for: {inputValue}</h5>
                                <Link to={`/forums/page/1`}
                                    onClick={() => {
                                        setInputValue('');
                                        setPage(1);
                                    }}
                                >
                                    Clear Results
                                </Link>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ForumSearch