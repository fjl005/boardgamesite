import { Label, Input, Button, Form } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const GameSearch = ({ inputValue, setInputValue, setPage, fullLengthData, lookingUpResults, setPrevInputValue, setInputReset, lengthError }) => {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const entry = event.target.elements.searchGames.value;

        if (entry.trim().length === 0) {
            setInputValue(undefined);
            navigate(`/browse`)
        } else {
            setInputValue(entry);
            navigate(`/browse/search/${entry}`);
        }

        setPage(1);
    }

    return (
        <>
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Browse</h1>
                        <p>Search for games via the Board Game Atlas API. The games will show useful information down below such as player count, average rating, and current price based on the BGA API. There is also the option to search by game category; only one game category can be selected at a time. Games displayed in the table will automatically be sorted by rank as determined by BGA. If interested in a game, you can click on it down below and it will take you to its page from the BGA site. For more information on this API, check out the docs <a href='https://www.boardgameatlas.com/api/docs' target='_blank'> here</a>.</p>
                        <Form onSubmit={handleSubmit} className='d-flex'>
                            <Input id='searchGames' placeholder='e.g. Catan, Monopoly, Ark Nova, etc.' style={{ width: '90%' }} />
                            <Button type='submit' style={{ marginLeft: '3rem' }}>Search</Button>
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
                                    ) : lengthError ? (
                                        <h3>Sorry, there was an error finding the length of search. </h3>
                                    ) : fullLengthData >= 1000 ? (
                                        <i>At least 1000 games found.</i>
                                    ) : (
                                        <i>{fullLengthData} results found. </i>
                                    )}
                                </p>

                                <Link to={`/browse/page/1`}
                                    onClick={() => {
                                        setInputReset(true);
                                        setInputValue(undefined);
                                        // setPrevInputValue is used because if we search up the same game twice between clearing, it will not process the change that had occurred when the input was cleared. The effect of this will be that the total results found will continue to reflect that of the general home page (which will be 'at least 1000 games found').
                                        setPrevInputValue(undefined);
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