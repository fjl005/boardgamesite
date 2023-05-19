import Header from "../components/allpages/Header";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
import { useState, useEffect } from "react";
import PagesTracker from "../components/browsepage/PagesTracker";
import { useParams } from "react-router-dom";
import GameSearch from "../components/browsepage/GameSearch";
import Filters from "../components/browsepage/Filters";
import LoadingIcon from "../components/allpages/LoadingIcon";

const Browse = () => {
    // Define basic variables. 
    const clientId = 'f24B6m6kXF';
    const pageSize = 50;
    const { boardGameName } = useParams();
    const { currentPage } = useParams();


    // Define States
    const [data, setData] = useState([]);
    const [fullLengthData, setFullLengthData] = useState(10000);
    const [page, setPage] = useState(currentPage);
    const [inputValue, setInputValue] = useState(boardGameName);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPageNums, setIsLoadingPageNums] = useState(true);
    const [lookingUpResults, setLookingUpResults] = useState(false);
    const [prevInputValue, setPrevInputValue] = useState('');
    const [prevCategory, setPrevCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [categoryReset, setCategoryReset] = useState(false);


    // Controller used for abort when clear search is used.
    const controller = new AbortController();

    // SIDE EFFECT: WHEN SEARCH IS PERFORMED, CATEGORY IS CHANGED, OR WHEN PAGE IS CHANGED. THIS SIDE EFFECT WILL GUIDE THE FETCH CALLS TO BE PERFORMED AND SETLOOKINGUPRESULTS.
    useEffect(() => {
        // If we have a selected category, only search based on the selected category.
        if (selectedCategory) {
            // If the selected category is new (different than what was previously selected), then we need to set setLookingUpResults as true (since we're looking up).
            if (selectedCategory !== prevCategory) {
                setLookingUpResults(true);
                setPrevCategory(selectedCategory);
            }
            // If there is already a selected category, but the input value changed, then we also need to look up results. 
            if (inputValue !== prevInputValue) {
                setLookingUpResults(true);
                setPrevInputValue(inputValue);
            }
            // Whether it's a new search or not, we will always be fetching the category data via fetchCategoryData.
            fetchCategoryData();
        }

        // Otherwise, there is NO SELECTED CATEGORY. 
        // In this case, check if there is an input value or not; and if so, check if the input value is different from the previous input value. If it is, then we need to start a new search. Just as mentioned above, we setLookingUpResults as we search and find the total data length. 
        else if (inputValue) {
            if (inputValue !== prevInputValue) {
                setLookingUpResults(true);
                // fetchInputData();
                findTotalDataLength(controller);
                setPrevInputValue(inputValue);
            } else {
                setLookingUpResults(false);
                // fetchInputData();
            }
            fetchInputData();
        }

        // If we reach here, then there is no input or category. We should also cancel all other API calls in case you're waiting for a long search and decide to clear. 
        else {
            setLookingUpResults(false);
            controller.abort();
            fetchDefaultData();
            // fetchPageChangeData();
        }

        // The return in the useEffect is used for cleanup or for cancelling any side effects.
        return () => controller.abort();
    }, [page, inputValue, selectedCategoryId]);



    // ------------ RUN WHEN THE SEARCH OR THE SELECTED CATEGORY ARE REMOVED --------------- //
    useEffect(() => {
        // This will only fetch default data when both input value and selected category are both null. Otherwise, if it's just the input value empty but the selected category still exists, then continue to show results for the selected category.
        if (!inputValue && !selectedCategory) {
            setPage(1);
            // The setFullLengthData(10000) is needed to search for all the games again when the input and category are removed.
            setFullLengthData(10000);
            fetchDefaultData();
        } else if (!inputValue && selectedCategory) {
            // But, if the category is still selected, then let's still search for the total length of the data.
            setLookingUpResults(true);
            findTotalDataLength(controller);
            // console.log('total data length after input reset is: ', fullLengthData);
        }
    }, [inputValue]);


    useEffect(() => {
        if (categoryReset && !selectedCategory) {
            // If category has been reset, then let's check if there is an input value still. otherwise, it's a complete reset and we will fetch default data. 
            if (inputValue) {
                fetchInputData();
                setCategoryReset(false);
                findTotalDataLength(controller);
            } else {
                setFullLengthData(10000);
                setCategoryReset(false);
                fetchDefaultData();
            }
        } 
        // else {
        //     // Otherwise, if there was no category reset, we will fetch category data. I don't think we would ever run into this code though because 
        //     fetchCategoryData();
        // }
    }, [selectedCategory]);




    //  ---------------- ASYNC FUNCTIONS FOR FETCH DEFINED HERE --------------------- //
    const fetchDefaultData = async () => {
        try {
            // isLoading is to show the loading icons in the JSX code
            setIsLoading(true);
            setLookingUpResults(true);

            const url = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
            const response = await fetch(url);
            const data = await response.json();

            setData(data.games);
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setIsLoading(false);
            setLookingUpResults(false);
            setIsLoadingPageNums(false);
        }

        if (!page) {
            setPage(1);
        }
    };

    const fetchCategoryData = async () => {
        try {
            setIsLoading(true);
            const url = `https://api.boardgameatlas.com/api/search?categories=${selectedCategoryId}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
            const response = await fetch(url);
            const data = await response.json();

            if (inputValue) {
                setLookingUpResults(true);
                // The remaining code in here will run only when lookingUpResults is set to true. This will be placed in a useEffect because it seems to take some time for the state to update. 
                // Need to use lowercase to standardize the search.
                const filteredData = data.games.filter((game) => game.name.toLowerCase().includes(inputValue.toLowerCase()));
                setData(filteredData);
                setFullLengthData(filteredData.length);
                setLookingUpResults(false);
            } else {
                setData(data.games);
                findTotalDataLength(controller);
                // setLookingUpResults(false);
                console.log('fetch category data. no input value :( ');
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setIsLoading(false);
            setIsLoadingPageNums(false);
        }

        if (!page) {
            setPage(1);
        }
    }

    const fetchInputData = async () => {
        try {
            setIsLoading(true);
            const inputSearchUrl = `https://api.boardgameatlas.com/api/search?name=${inputValue}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
            const response = await fetch(inputSearchUrl);
            const jsonData = await response.json();
            setData(jsonData.games);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log("Error:", error);
            }
        } finally {
            setIsLoading(false);
            setIsLoadingPageNums(false);
        }

        if (!page) {
            setPage(1);
        }
    };


    // Declare a variable to hold the AbortController instance. This will help determine if the input changed while we're still loading the results.
    const findTotalDataLength = async (controller) => {
        setIsLoadingPageNums(true);

        let allDataLength = 0;
        let offset = 0;
        const limit = 100;
        const upperLimit = 1000;

        try {
            while (!controller.signal.aborted) {
                let url = '';
                if (selectedCategory) {
                    // If there is a selected category, and the selected category has an input value, then the url has to reflect both the input and the category. 
                    url = `https://api.boardgameatlas.com/api/search?categories=${selectedCategoryId}&order_by=popularity&ascending=false&client_id=${clientId}&limit=${limit}&skip=${offset}`;
                    // console.log('selected category id is: ', selectedCategoryId);
                    // console.log(url);
                } else if (inputValue) {
                    url = `https://api.boardgameatlas.com/api/search?name=${inputValue}&order_by=popularity&ascending=false&client_id=${clientId}&limit=${limit}&skip=${offset}`;
                } else {
                    url = `https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=${clientId}&limit=${limit}&skip=${offset}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                const checkDataLength = () => {
                    return new Promise((resolve) => {

                        if (offset >= upperLimit) {
                            allDataLength = upperLimit;
                            // console.log(`welp, this is too much for me. the data length should be ${upperLimit}. lets see: `, allDataLength);
                            resolve(true);
                        } else {
                            if (data.games.length < 100) {
                                allDataLength += data.games.length;
                                // console.log('data length is: ', allDataLength);
                                resolve(true);
                            } else {
                                offset += limit;
                                allDataLength += data.games.length;
                                console.log('still lookin it up. current length is: ', allDataLength);
                                resolve(false);
                            }
                        }
                    })
                }

                // We will wait for the checkDataLength with 'await'. If the resolve is true then that means we found the entire data length.
                if (await checkDataLength()) {
                    setFullLengthData(allDataLength);
                    console.log('full length data is: ', allDataLength);
                    break;
                }
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log("Error:", error);
            }
        } finally {
            setLookingUpResults(false);
        }
    };

    return (
        <>
            <Header />
            <GameSearch
                inputValue={inputValue}
                setInputValue={setInputValue}
                page={page}
                setPage={setPage}
                fullLengthData={fullLengthData}
                lookingUpResults={lookingUpResults}
                setLookingUpResults={setLookingUpResults}
                setPrevInputValue={setPrevInputValue}

            />

            <Container className='homepage-section'>
                <Row>
                    <Col>
                        {lookingUpResults ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', color: 'teal' }}>
                                    <LoadingIcon style={{ color: 'teal' }} />
                                    <h3 style={{ marginLeft: '0.5rem' }}>Searching Pages
                                        {selectedCategory ? ` for "${selectedCategory}"` : null}, this may take a moment...</h3>
                                </div>
                            </>


                        ) : (
                            <>
                                <PagesTracker
                                    currentPage={page}
                                    setPage={setPage}
                                    inputValue={inputValue}
                                    isLoadingPageNums={isLoadingPageNums}
                                    fullLengthData={fullLengthData}
                                />
                                <Filters
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    setSelectedCategoryId={setSelectedCategoryId}
                                    setCategoryReset={setCategoryReset}
                                    setPage={setPage}
                                    lookingUpResults={lookingUpResults}
                                />
                            </>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col className='mx-auto'>
                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            <Table className='search-table'>
                                <thead>
                                    <tr>
                                        <th
                                            style={{ width: '5%', color: 'rgb(97, 38, 144)' }}
                                            className='table-header-toggle'
                                        >#</th>

                                        <th style={{ width: '10%' }}
                                        >Rank</th>

                                        <th style={{ width: '10%' }}
                                        ></th>

                                        <th style={{ width: '30%' }}
                                        >Title</th>

                                        <th style={{ width: '10%' }}
                                        >Player Count</th>

                                        <th style={{ width: '10%' }}
                                        >Learning Complexity</th>

                                        <th style={{ width: '10%' }}
                                        >Average Rating</th>

                                        <th style={{ width: '10%' }}
                                        >Num of Ratings</th>

                                        <th style={{ width: '5%' }}
                                        >Price</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {isLoading ? (
                                        <>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                            <td> <LoadingIcon /> </td>
                                        </>
                                    ) : (
                                        data && data.map((game, idx) => (
                                            <tr key={idx}>
                                                <td style={{ fontSize: '20px', color: 'rgb(97, 38, 144)' }}>
                                                    {(page - 1) * 50 + (idx + 1)}
                                                </td>
                                                <td>
                                                    <h3>{game.rank > 1000000 ? 'N/A' : game.rank}</h3>
                                                </td>
                                                <td>
                                                    <img src={game.image_url} alt={`Name of ${game.name}`} width='75px' height='75px' />
                                                </td>
                                                <td>
                                                    <a href={game.url} target="_blank" style={{ fontSize: '22px' }}>{game.name}</a>
                                                </td>
                                                <td>{game.players}</td>
                                                <td>{(game.average_learning_complexity).toFixed(2)}</td>
                                                <td>{(game.average_user_rating).toFixed(2)}</td>
                                                <td>{game.num_user_ratings}</td>
                                                <td>{game.price}</td>

                                            </tr>
                                        ))
                                    )}

                                </tbody>

                            </Table>
                        </div>

                        {isLoading ? (
                            <h1 className='text-center'>Loading...</h1>
                        ) : data.length > 0 ? (
                            null
                        ) : (
                            <h1 className='text-center'>Error: Game Not Found.</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Browse