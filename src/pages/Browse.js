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

    // Controller used for abort when clear search is used.
    const controller = new AbortController();

    /*
        -------------------
        -------------------

        STATES DEFINED HERE

        -------------------
        -------------------
    */

    // States regarding the data
    const [data, setData] = useState([]);
    const [fullLengthData, setFullLengthData] = useState(10000);

    // States regarding the page and loading the page
    const [page, setPage] = useState(currentPage);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPageNums, setIsLoadingPageNums] = useState(true);
    const [lookingUpResults, setLookingUpResults] = useState(false);

    // States regarding the input value
    const [inputValue, setInputValue] = useState(boardGameName);
    const [prevInputValue, setPrevInputValue] = useState('');

    // States regarding the category
    const [prevCategory, setPrevCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [categoryReset, setCategoryReset] = useState(false);


    /* Initial render: "signal abort" is set to TRUE at initial render. 
    
    Briefly, signal abort is set to true when you end a fetch call while it's still loading. This is used later on in the code so that we can handle these situations (for example, if you're searching for Monopoly and you're frustrated that it's taking so long, you may just clear the search, which is where signal abort comes in).

    So, it's interesting that signal abort is true at initial render. This can cause issues such as the findTotalDataLength not working properly since this function depends on the abort controller being false. 
    
    InitialRenderState will NEVER be set to true in any other instance.
    */
    const [initialRenderState, setInitialRenderState] = useState(true);


    /*
        ------------------------
        ------------------------

        USE-EFFECTS DEFINED HERE

        ------------------------
        ------------------------
    */

    // SIDE EFFECT: WHEN SEARCH IS PERFORMED, CATEGORY IS CHANGED, OR WHEN PAGE IS CHANGED
    // THIS SIDE EFFECT WILL GUIDE THE FETCH CALLS TO BE PERFORMED AND SETLOOKINGUPRESULTS.
    useEffect(() => {
        let fetchCriteria = '';

        if (selectedCategory || inputValue) {
            // If the selected category is new (different than what was previously selected), then we need to set setLookingUpResults as true (since we're looking up).
            if (selectedCategory !== prevCategory) {
                setLookingUpResults(true);
                setIsLoadingPageNums(true);
                setPrevCategory(selectedCategory);
                fetchCriteria = 'categoryChange';
            }
            // If the category didn't change, then let's see if the input value changed.
            else if (inputValue !== prevInputValue) {
                setLookingUpResults(true);
                setIsLoadingPageNums(true);
                setPrevInputValue(inputValue);
                fetchCriteria = 'inputChange';
            } else {
                // Otherwise, the input or category didn't change (but one of them is still truthy, hence the reason why we're in this loop). No need to look up results or load page numbers.
                fetchCriteria = 'propExistsNoChange';
            }
        } else {
            // Otherwise, there is nothing changed. No input, no category, nothing!
            setLookingUpResults(false);
            // controller.abort();
            fetchCriteria = 'default';
        }

        switch (fetchCriteria) {
            case 'categoryChange':
            case 'inputChange':
                fetchParamChangedData();
                break;
            case 'propExistsNoChange':
            case 'default':
                fetchDefaultData();
                break;
        }

        // The return in the useEffect is used for cleanup or for cancelling any side effects before unmounting or before re-running this useEffect again.
        return () => controller.abort();
    }, [page, inputValue, selectedCategoryId]);


    // Run when INPUT is reset.
    useEffect(() => {
        // This doesn't apply at initial render. 
        if (!initialRenderState) {
            if (!inputValue) {
                if (!selectedCategory) {
                    clearedAndSetDefault();
                } else {
                    // Otherwise, there is no input but there is still a category.
                    setIsLoadingPageNums(true);
                    fetchParamChangedData();
                }
            }
        }
    }, [inputValue]);

    // Run when the CATEGORY is reset.
    useEffect(() => {
        if (!initialRenderState) {
            if (categoryReset) {
                if (!inputValue) {
                    clearedAndSetDefault();
                    setCategoryReset(false);
                } else {
                    // Otherwise, there is no category but there is still an input.
                    setIsLoadingPageNums(true);
                    fetchParamChangedData();
                }
            }
        }
    }, [selectedCategory]);

    const clearedAndSetDefault = () => {
        setPage(1);
        setFullLengthData(10000);
        fetchDefaultData();
    }


    /*
        ---------------------
        ---------------------

        ASYNC FETCH FUNCTIONS

        ---------------------
        ---------------------
    */

    // Run this fetch call when there is an input and/or a category, and whether it changed.
    const fetchParamChangedData = async () => {
        setIsLoading(true);
        setLookingUpResults(true);
        setIsLoadingPageNums(true);

        let url;
        if (selectedCategoryId) {
            url = `https://api.boardgameatlas.com/api/search?categories=${selectedCategoryId}&order_by=rank&ascending=false&imit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        } else {
            // See function defined down below, determineUrl.
            url = determineUrl(pageSize, false);
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            // For some reason, there is no way to perform a fetch API call with both the category and an input value. So, my way around this is to use an array filter to search by the category first, and select titles in this category that contain the name for your search. 
            if (selectedCategoryId && inputValue) {
                const filteredData = data.games.filter((game) => game.name.toLowerCase().includes(inputValue.toLowerCase()));
                console.log('url is: ', url);
                console.log('filtered data is: ', filteredData);
                setData(filteredData);
                // Usually when the category and name are both used, the search volume is small. This is my current working solution for the full length data, but this is something I need to figure out in the future.
                setFullLengthData(filteredData.length);
                setLookingUpResults(false);
                setIsLoadingPageNums(false);
            } else {
                setData(data.games);
                findTotalDataLength(controller);
            }
        } catch (error) {
            console.log('Error: ', error)
        } finally {
            setIsLoading(false);
            if (!page) {
                setPage(1);
            }
        }
    }

    // This will be run as default.
    const fetchDefaultData = async () => {
        setIsLoading(true);

        const url = determineUrl(pageSize, false);

        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data.games);
        } catch (error) {
            console.log('Error: ', error)
        } finally {
            setIsLoading(false);
            setLookingUpResults(false);
            setIsLoadingPageNums(false);
        }
        if (!page) {
            setPage(1);
        }
    };

    const determineUrl = (pageLimit, lengthSearchTrue) => {

        let updatedUrl = '';

        // First, create an object of parameters for all search related fields, such as input value and selected category id (basically things we would include in the URL during a given fetch call). The keys have to reflect the same convention as in the API calls.
        // I created this with the hopes of the process becoming more scalable when more parameters come into play. However, given that the fetch calls don't incorporate multiple parameters at once anyway, I don't know how scalable this API will be.
        const fetchParameters = {
            name: inputValue,
            categories: selectedCategoryId
        };

        // Next, create an empty params array that will eventually store all the related fields for fetching.
        const paramsForSearch = [];

        for (const key in fetchParameters) {
            if (fetchParameters.hasOwnProperty(key) && fetchParameters[key]) {
                paramsForSearch.push(`${key}=${fetchParameters[key]}`);
            }
        }

        if (paramsForSearch.length > 0) {
            updatedUrl = paramsForSearch.join('&') + '&';
        }

        if (lengthSearchTrue) {
            // This URL will be used when using findTotalLengthData, which has its own skip level upgraded to 100 to allow faster searches for the total length.
            return `https://api.boardgameatlas.com/api/search?${updatedUrl}order_by=rank&ascending=false&limit=${pageLimit}&fuzzy_match=true&client_id=${clientId}`;
        } else {
            return `https://api.boardgameatlas.com/api/search?${updatedUrl}order_by=rank&ascending=false&limit=${pageLimit}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        }
    }


    /*
        -----------------
        -----------------

        TOTAL DATA LENGTH

        -----------------
        -----------------
    */

    // Declare a variable to hold the AbortController instance. This will help determine if the input changed while we're still loading the results.
    const findTotalDataLength = async (controller) => {
        let allDataLength = 0;
        let offset = 0;
        const limit = 100;
        const upperLimit = 1000;

        try {
            while (!controller.signal.aborted || initialRenderState) {
                let url;
                if (selectedCategoryId) {
                    url = `https://api.boardgameatlas.com/api/search?categories=${selectedCategoryId}&order_by=rank&ascending=false&limit=${100}&fuzzy_match=true&client_id=${clientId}`;
                } else {
                    url = determineUrl(100, true);
                }
                url += `&skip=${offset}`;

                const response = await fetch(url);
                const data = await response.json();

                const checkDataLength = () => {
                    return new Promise((resolve, reject) => {
                        setIsLoadingPageNums(true);
                        setLookingUpResults(true);

                        if (offset >= upperLimit) {
                            allDataLength = upperLimit;
                            resolve(true);
                        } else {
                            if (data.games.length < 100) {
                                allDataLength += data.games.length;
                                console.log('finished! total length is: ', allDataLength);
                                console.log('url is: ', url);
                                resolve(true);
                            } else {
                                console.log('still working, the current length is: ', allDataLength);
                                console.log('url is: ', url);
                                offset += limit;
                                allDataLength += data.games.length;
                                resolve(false);
                            }
                        }
                    })
                }

                // We will wait for the checkDataLength with 'await'. If the resolve is true then that means we found the entire data length.
                if (await checkDataLength()) {
                    setFullLengthData(allDataLength);
                    break;
                }
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log("Error:", error);
            }
        } finally {
            setInitialRenderState(false);
            setLookingUpResults(false);
            setIsLoadingPageNums(false);
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
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'teal'
                                }}
                                >
                                    <LoadingIcon />
                                    <h3 style={{ marginLeft: '0.5rem' }}>Searching Pages
                                        {selectedCategory ? ` for "${selectedCategory}"` : null}, this may take a moment...</h3>
                                </div>
                            </>

                        ) : (
                            <>
                                <PagesTracker
                                    page={page}
                                    setPage={setPage}
                                    inputValue={inputValue}
                                    isLoadingPageNums={isLoadingPageNums}
                                    fullLengthData={fullLengthData}
                                    dataType='games'
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

                        {/* If the page is still loading, show that it's still loading. But if it's done loading, check the data length. If it's 0 (meaning there's nothing) then show the error that no game was found */}
                        {isLoading ? (
                            <h1 className='text-center'>Loading...</h1>
                        ) : (data.length === 0 && (
                            <h1 className='text-center'>Error: Game Not Found.</h1>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Browse;