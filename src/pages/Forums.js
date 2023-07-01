import Header from "../components/allpages/Header";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
import { useState, useEffect } from "react";
import PagesTracker from "../components/browsepage/PagesTracker";
import { useParams } from "react-router-dom";
import ForumSearch from "../components/forumpage/ForumSearch";
import { convertDate } from "../utils/dateConvert";
import LoadingIcon from "../components/allpages/LoadingIcon";
import { useNavigate } from 'react-router-dom';


const Forums = () => {
    const clientId = 'f24B6m6kXF';
    const pageSize = 50;
    const { forum } = useParams();
    const { currentPage } = useParams();
    const navigate = useNavigate();

    // States
    const [data, setData] = useState([]);
    const [page, setPage] = useState(currentPage);
    const [inputValue, setInputValue] = useState(forum);
    const [prevInputValue, setPrevInputValue] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPageNums, setIsLoadingPageNums] = useState(true);
    const [fullLengthData, setFullLengthData] = useState(10000);
    const [lookingUpResults, setLookingUpResults] = useState(false);

    // Controller used for abort when clear search is used.
    const controller = new AbortController();
    const [initialRenderState, setInitialRenderState] = useState(true);

    // Side Effect, when search is done or when page is changed. Basically, whenever we need to access the api.
    useEffect(() => {
        if (inputValue) {
            if (inputValue.trim().length === 0) {
                setInputValue(null);
                fetchDataDefault();
                navigate('/forums'); // Change the link to "/forums"
            } else {
                fetchInputData();

                if (prevInputValue !== inputValue) {
                    setIsLoadingPageNums(true);
                    findTotalDataLength(controller);
                    setPrevInputValue(inputValue);
                }
            }
        } else {
            fetchDataDefault();
        }

    }, [page, inputValue]);

    const fetchInputData = async () => {
        if (!page) { setPage(1); }
        try {
            setIsLoading(true);
            const inputSearchUrl = `https://api.boardgameatlas.com/api/forum?search=${inputValue}&limit=${pageSize}&skip=${(page - 1) * pageSize}&order_by=new&fuzzy_match=true&client_id=${clientId}`;
            console.log('forums search: ', inputSearchUrl);
            const response = await fetch(inputSearchUrl);
            const jsonData = await response.json();
            setData(jsonData.posts);
            setIsLoading(false);
            setIsLoadingPageNums(false);
        } catch (error) {
            console.log('error', error);
        }
    };

    const fetchDataDefault = async () => {
        if (!page) { setPage(1); }
        try {
            setIsLoading(true);
            const recentForums = `https://api.boardgameatlas.com/api/forum?limit=${pageSize}&skip=${(page - 1) * pageSize}&order_by=new&client_id=${clientId}`;
            // For the Url, we add skip in case we move on to the next page.
            // Page 2: (2-1) * 50 = 50, so skip 50 then start the next one at 51.
            const response = await fetch(recentForums);
            const jsonData = await response.json();
            setData(jsonData.posts);
            setIsLoading(false);
            setIsLoadingPageNums(false);
        }
        catch (error) {
            console.log('error', error);
        }
    };

    const findTotalDataLength = async (controller) => {
        let allDataLength = 0;
        let offset = 0;
        const limit = 100;
        const upperLimit = 1000;

        try {
            while (!controller.signal.aborted || initialRenderState) {
                setLookingUpResults(true);
                let url = '';
                if (inputValue) {
                    // If there is a selected category, and the selected category has an input value, then the url has to reflect both the input and the category. 
                    url = `https://api.boardgameatlas.com/api/forum?search=${inputValue}&client_id=${clientId}&limit=${limit}&skip=${offset}`;
                } else {
                    url = `https://api.boardgameatlas.com/api/forum?client_id=${clientId}&limit=${limit}&skip=${offset}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                const checkDataLength = () => {
                    return new Promise((resolve, reject) => {

                        if (offset >= upperLimit) {
                            allDataLength = upperLimit;
                            resolve(true);
                        } else {
                            if (data.posts.length < 100) {
                                allDataLength += data.posts.length;
                                console.log('done, current length is: ', allDataLength);
                                resolve(true);
                            } else {
                                offset += limit;
                                allDataLength += data.posts.length;
                                console.log('checking... current length is: ', allDataLength);
                                console.log('input value: ', inputValue);
                                resolve(false);
                            }
                        }
                    })
                }

                // We will wait for the checkDataLength with 'await'. If the resolve is true then that means we found the entire data length.
                if (await checkDataLength()) {
                    setFullLengthData(allDataLength);
                    console.log('all data length: ', allDataLength);
                    break;
                }
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log("Error:", error);
            }
        } finally {
            setInitialRenderState(false);
            setIsLoadingPageNums(false);
            setLookingUpResults(false);
        }
    };

    return (
        <>
            <Header />
            <ForumSearch
                inputValue={inputValue}
                setInputValue={setInputValue}
                setPage={setPage}
                lookingUpResults={lookingUpResults}
                fullLengthData={fullLengthData}
                setFullLengthData={setFullLengthData}
            />

            <Container className='homepage-section'>
                <Row>
                    <Col>
                        <PagesTracker
                            page={page}
                            setPage={setPage}
                            inputValue={inputValue}
                            isLoadingPageNums={isLoadingPageNums}
                            fullLengthData={fullLengthData}
                            dataType='forum'
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
                                            <tr>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                                <td> <LoadingIcon /> </td>
                                            </tr>
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

                        {isLoading ? (
                            <h1 className='text-center'>Loading...</h1>
                        ) : (data.length === 0 && (
                            <h1 className='text-center'>Error: Forum Not Found.</h1>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Forums;