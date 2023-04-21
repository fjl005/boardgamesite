import { Label, Input, Button, Form } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const GameSearch = ({ inputValue, setInputValue }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const entry = event.target.elements.searchGames.value;
        setInputValue(entry);
        const searchUrl = `/browse/search/${entry}`;
        window.history.pushState({ path: searchUrl }, '', searchUrl);

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
                        <Form onSubmit={handleSubmit} className='d-flex'>
                            <Label htmlFor='searchGames' style={{fontSize: '20px', textAlign: 'center'}}>Search for Games</Label>
                            <Input id='searchGames'></Input>
                            {/* <Link to={`/browse/search/${searchUrl}`}> */}
                            <Button type='submit'>Search</Button>
                            {/* </Link> */}
                        </Form>
                    </Col>
                </Row>
            </Container>



        </>
    )
}

export default GameSearch