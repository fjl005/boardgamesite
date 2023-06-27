import { Label, Input, Button, Form } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const GameSearch = ({ inputValue, setInputValue, setPage, fullLengthData, lookingUpResults, setPrevInputValue }) => {


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
                        <p style={{ fontSize: '18px' }}>Search for games via the Board Game Atlas API. The games will show useful information down below such as player count, average rating, and current price based on the BGA API. There is also the option to search by game category; only one game category can be selected at a time. Games displayed in the table will automatically be sorted by rank as determined by BGA. If interested in a game, you can click on it down below and it will take you to its page from the BGA site. For more information on this API, check out the docs <a href='https://www.boardgameatlas.com/api/docs' target='_blank'> here</a>.</p>
                        <Form onSubmit={handleSubmit} className='d-flex justify-content-center'>
                            <Label htmlFor='searchGames' style={{ fontSize: '20px', textAlign: 'center' }}>Search Games</Label>
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
                                <p>
                                    {lookingUpResults ? (
                                        <i>Looking up total search, one second...</i>
                                    ) : fullLengthData >= 1000 ? (
                                        <i>At least 1000 games found.</i>
                                    ) : (
                                        <i>{fullLengthData} results found. </i>
                                    )}
                                </p>

                                <Link to={`/browse/page/1`}
                                    onClick={() => {
                                        setInputValue('');
                                        // setPrevInputValue is used because if we search up the same game twice between clearing, it will not process the change that had occurred when the input was cleared. The effect of this will be that the total results found will continue to reflect that of the general home page (which will be 'at least 1000 games found').
                                        setPrevInputValue('');
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

export default GameSearch