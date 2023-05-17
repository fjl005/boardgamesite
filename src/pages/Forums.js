import Header from "../components/allpages/Header";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
import { useState, useEffect } from "react";
import PagesTrackerForum from "../components/forumpage/PagesTrackerForum";
import { useParams } from "react-router-dom";
import ForumSearch from "../components/forumpage/ForumSearch";
import { convertDate } from "../utils/dateConvert";

const Forums = () => {
    const clientId = 'f24B6m6kXF';
    const pageSize = 50;
    const { forum } = useParams();
    const { currentPage } = useParams();

    // States
    const [data, setData] = useState([]);
    const [page, setPage] = useState(currentPage);
    const [inputValue, setInputValue] = useState(forum);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPageNums, setIsLoadingPageNums] = useState(true);


    // Side Effect, when search is done or when page is changed. Basically, whenever we need to access the api.
    useEffect(() => {
        if (inputValue) {
            fetchInputData();
        } else {
            fetchPageChangeData();
        }
    }, [page, inputValue]);

    const fetchInputData = async () => {
        try {
            setIsLoading(true);

            const inputSearchUrl = `https://api.boardgameatlas.com/api/forum?name=${inputValue}&sort_by=num_likes&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
            const response = await fetch(inputSearchUrl);
            const jsonData = await response.json();
            setData(jsonData.posts);
        } catch (error) {
            console.log('error', error);
        } finally {
            setIsLoading(false);
            setIsLoadingPageNums(false);
        }

        // So again, the pattern is: (1) set up a use effect since all api calls are side effects. Then we will fetch the data by creating an async function. In the async function, we fetch the url and await the promise (which would be the response). Once we receive the response, we need to convert it to JSON. 
        if (!page) {
            setPage(1);
        }
    };

    const fetchPageChangeData = async () => {

        setIsLoading(true);

        const topGamesUrl = `https://api.boardgameatlas.com/api/forum?name=${inputValue}&sort_by=num_likes&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        // For the Url, we add skip in case we move on to the next page.
        // Page 2: (2-1) * 50 = 50, so skip 50 then start the next one at 51.

        const response = await fetch(topGamesUrl);
        const jsonData = await response.json();

        setData(jsonData.posts);
        if (!page) {
            setPage(1);
        }
        setIsLoading(false);
        setIsLoadingPageNums(false);
    };

    return (
        <>
            <Header />
            <ForumSearch inputValue={inputValue} setInputValue={setInputValue} setPage={setPage} />

            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <PagesTrackerForum
                            currentPage={page}
                            setPage={setPage}
                            inputValue={inputValue}
                            isLoadingPageNums={isLoadingPageNums}
                        />

                    </Col>
                </Row>
                <Row>
                    <Col className='mx-auto'>
                        <div style={{ width: '100%', overflowX: 'auto' }}>

                            <Table style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <thead>
                                    <tr>
                                        <th
                                            style={{ width: '5%', color: 'rgb(97, 38, 144)' }}
                                            className='table-header-toggle'
                                        >#</th>

                                        <th style={{ width: '5%' }}
                                        >Likes</th>

                                        <th style={{ width: '10%' }}
                                        ></th>

                                        <th style={{ width: '40%' }}
                                        >Title</th>

                                        <th style={{ width: '10%' }}
                                        >Comments</th>

                                        <th style={{ width: '15%' }}
                                        >Published</th>

                                        <th style={{ width: '15%' }}
                                        >Posted By</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: '20px' }}>

                                    {isLoading ? (
                                        <>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                            <td>Loading...</td>
                                        </>
                                    ) : (
                                        data && data.map((forum, idx) => (
                                            <tr key={idx}>
                                                <td style={{ fontSize: '20px', color: 'rgb(97, 38, 144)' }}>
                                                    {(page - 1) * 50 + (idx + 1)}
                                                </td>
                                                <td>
                                                    <h3>{forum.num_likes > 1000000 ? 'N/A' : forum.num_likes}</h3>
                                                </td>
                                                <td>
                                                    <img src={forum.image_url} alt={`Name of ${forum.name}`} width='100px' height='100px' />
                                                </td>
                                                <td>
                                                    <a href={forum.post_url} target="_blank">{forum.title}</a>
                                                </td>
                                                <td>{forum.num_comments}</td>
                                                <td>{convertDate(forum.created_at)} <br />
                                                    <span style={{ fontSize: '18px' }}><i>{forum.created_at_ago}</i></span>
                                                </td>
                                                <td>{forum.user.username}</td>
                                            </tr>
                                        ))
                                    )}

                                </tbody>

                            </Table>
                        </div>

                        {(data.length > 0) ? (
                            null
                        )
                            : (
                                !isLoading && (
                                    <h1 className='text-center'>Error: Forum Not Found.</h1>
                                )
                            )
                        }
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Forums;