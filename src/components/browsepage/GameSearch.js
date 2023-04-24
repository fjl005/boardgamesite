import { Label, Input, Button, Form } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const GameSearch = ({ inputValue, setInputValue, page, setPage, fullLengthData, lookingUpResults, setlookingUpResults, setFullLengthData }) => {

    useEffect(() => {
        setFullLengthData(10000);
    }, [page, inputValue]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const entry = event.target.elements.searchGames.value;
        setInputValue(entry);
        const searchUrl = `/browse/search/${entry}`;
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
                        <h1>Browse</h1>
                        <Form onSubmit={handleSubmit} className='d-flex'>
                            <Label htmlFor='searchGames' style={{ fontSize: '20px', textAlign: 'center' }}>Search Games</Label>
                            <Input id='searchGames' placeholder='e.g. Catan, Monopoly, Ark Nova, etc.'></Input>
                            <Button type='submit'>Search</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: 'center', padding: '10px', fontSize: '20px' }}>
                        {inputValue ? (
                            <>
                                <h5>Showing Results for: {inputValue}</h5>
                                <p>
                                    {lookingUpResults ? (
                                        <i>Looking up total search, one second...</i>
                                    ) : fullLengthData >= 1000 ? (
                                        <i>At least 1000 games found.</i>
                                    ) : (
                                        <i>{fullLengthData} results found. </i>
                                    )}
                                </p>

                                <Link to={`${window.location.protocol}//${window.location.hostname}:3000/browse/page/1`}
                                    onClick={() => {
                                        setInputValue(null);
                                        setPage(1);
                                    }}
                                >
                                    Clear Results
                                </Link>
                            </>
                        ) : (
                            null
                        )
                        }
                    </Col>
                </Row>
            </Container>



        </>
    )
}

export default GameSearch