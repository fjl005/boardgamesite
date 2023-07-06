import { Container, Row, Col, Label, Input, Button, Form } from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';

const ForumSearch = ({ inputValue, setInputValue, setPrevInputValue, setPage, lookingUpResults, fullLengthData, setFullLengthData, lengthError }) => {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const entry = event.target.elements.searchGames.value;

        if (entry.trim().length === 0) {
            setInputValue(undefined);
            navigate(`/forums`)
        } else {
            setInputValue(entry);
            navigate(`/forums/search/${entry}`);
        }

        setPage(1);
    }

    return (
        <>
            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <h1>Board Game Atlas Forums</h1>
                        <p style={{ fontSize: '18px' }}>
                            Search for user posts and forums from the Board Game Atlas API.
                            <span style={{ fontWeight: 'bold' }}>
                                This is different from the Galore Posts Section
                            </span>
                            , as Galore Posts is where users from Bored Games Galore can write posts. Posts are currently sorted by recency first. To make a post on Board Game Atlas, please check out their site
                            <a href='https://www.boardgameatlas.com' target='_blank'>here</a>.
                            For more information on this API, check out the docs
                            <a href='https://www.boardgameatlas.com/api/docs' target='_blank'> here</a>.</p>
                        <Form onSubmit={handleSubmit} className='d-flex'>
                            <Label
                                htmlFor='searchGames'
                                style={{ fontSize: '20px', textAlign: 'center' }}
                            >Search Forums</Label>
                            <Input
                                id='searchGames'
                                placeholder='e.g. Catan, Monopoly, Ark Nova, etc.'
                            />
                            <Button
                                type='submit'
                                style={{ margin: '10px 10px 10px 20px' }}
                            >Search</Button>
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
                                        <i>At least 1000 forums found.</i>
                                    ) : (
                                        <i>{fullLengthData} results found. </i>
                                    )}
                                </p>

                                <Link to={`/forums/page/1`}
                                    onClick={() => {
                                        setInputValue(undefined);
                                        setPrevInputValue(undefined);
                                        setPage(1);
                                        setFullLengthData(10000);
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