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

    // **--------------------------------------------------------------** //
    //  ---------------------- STATES DEFINED HERE --------------------- //
    // **------------------------------------------------------------** //

    // States regarding the data
    const [data, setData] = useState([]);
    const [fullLengthData, setFullLengthData] = useState(10000);
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


    // Controller used for abort when clear search is used.
    const controller = new AbortController();

    // Initial render: signal abort is set to true at initial render. So, I will create a state to specifically allow us to successfully run findTotalDataLength (as this depends on the abort controller being false). InitialRenderState will NEVER be set to true in any other instance.
    const [initialRenderState, setInitialRenderState] = useState(true);



    // **-------------------------------------------------------------** //
    //  ---------------- USE EFFECTS DEFINED HERE --------------------- //
    // **-----------------------------------------------------------** //

    // SIDE EFFECT: WHEN SEARCH IS PERFORMED, CATEGORY IS CHANGED, OR WHEN PAGE IS CHANGED
    // THIS SIDE EFFECT WILL GUIDE THE FETCH CALLS TO BE PERFORMED AND SETLOOKINGUPRESULTS.
    useEffect(() => {
        let fetchCriteria = '';

        // If we have a selected category, only search based on the selected category.
        if (selectedCategory || inputValue) {
            // If the selected category is new (different than what was previously selected), then we need to set setLookingUpResults as true (since we're looking up).
            if (selectedCategory !== prevCategory) {
                setLookingUpResults(true);
                setIsLoadingPageNums(true);
                setPrevCategory(selectedCategory);
                fetchCriteria = 'categoryChange';
            } else if (inputValue !== prevInputValue) {
                setLookingUpResults(true);
                setIsLoadingPageNums(true);
                setPrevInputValue(inputValue);
                fetchCriteria = 'inputChange';
            } else {
                // Otherwise, the input or category didn't change (but one of them is still selected, hence the reason why we're in this loop). No need to look up results or load page numbers.
                fetchCriteria = 'propExistsNoChange';
            }

            // Otherwise, it seems like we have an input but it didn't change. We should still fetch the fetchParamChangedData; I just wrote 'category' arbitrarily. 

        } else {
            // Otherwise, there is nothing changed. No input, no category, nothing!
            setLookingUpResults(false);
            controller.abort();
            fetchCriteria = 'default';
        }

        switch (fetchCriteria) {
            case 'categoryChange':
            case 'inputChange':
                fetchParamChangedData();
                break;
            case 'propExistsNoChange':
                fetchPageChangeData();
                break;
            case 'default':
                fetchDefaultData();
                console.log('fetchDefaultData');
        }

        // The return in the useEffect is used for cleanup or for cancelling any side effects.
        return () => controller.abort();
    }, [page, inputValue, selectedCategoryId]);



    // **------------------------------------------------------------------------------------------** //
    // ------------ RUN WHEN THE SEARCH OR THE SELECTED CATEGORY ARE REMOVED/CLEARED --------------- //
    // **----------------------------------------------------------------------------------------** //

    useEffect(() => {
        // This will only fetch default data when both input value and selected category are both cleared. 
        if (!inputValue) {
            if (!selectedCategory) {
                clearedAndSetDefault();
            } else {
                // Otherwise, there is no input but there is still a category.
                setIsLoadingPageNums(true);
                fetchParamChangedData();
            }
        }
    }, [inputValue]);

    useEffect(() => {
        // We will run this code once the category is reset (aka, !selectedCategory).
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
    }, [selectedCategory]);

    const clearedAndSetDefault = () => {
        setPage(1);
        setFullLengthData(10000);
        fetchDefaultData();
    }


    // **---------------------------------------------------------------------------** //
    //  ---------------- ASYNC FUNCTIONS FOR FETCH DEFINED HERE --------------------- //
    // **-------------------------------------------------------------------------** //

    const fetchDefaultData = async () => {
        setIsLoading(true);

        const url = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        try {
            // isLoading is to show the loading icons in the JSX code (for the table)
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

    const fetchParamChangedData = async () => {
        setIsLoading(true);
        setLookingUpResults(true);
        setIsLoadingPageNums(true);

        // let inputUrl = '';
        // let categoryUrl = '';
        // let url = '';
        // let bothInputAndCategory = false;

        // if (inputValue) {
        //     inputUrl = `name=${inputValue}`;
        //     url = `https://api.boardgameatlas.com/api/search?${inputUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        // }
        // if (selectedCategory) {
        //     categoryUrl = `categories=${selectedCategoryId}`;
        //     url = `https://api.boardgameatlas.com/api/search?${categoryUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        // }

        // if (inputValue && selectedCategory) {
        //     // If there is both an inputValue and a selectedCategory, we will search by category then search the category by name once we retrieve the data.
        //     inputUrl = '';
        //     url = `https://api.boardgameatlas.com/api/search?${categoryUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        //     bothInputAndCategory = true;
        // }

        const {url, bothInputAndCategory} = determineUrl();

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('url is: ', url);

            if (bothInputAndCategory) {
                const filteredData = data.games.filter((game) => game.name.toLowerCase().includes(inputValue.toLowerCase()));
                setData(filteredData);
                setFullLengthData(filteredData.length);
                setIsLoadingPageNums(false);
                setLookingUpResults(false);
            } else {
                setData(data.games);
                setLookingUpResults(true);
                findTotalDataLength(controller);
                // I won't include setLookingUpResults(false) or setIsLoadingPageNums(false) because these will be determined once findTotalDataLength is completed. This does take some time as the return is a promise. 
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

    const fetchPageChangeData = async () => {
        setIsLoading(true);

        // let inputUrl = '';
        // let categoryUrl = '';
        // let url = '';
        // let bothInputAndCategory = false;

        // if (inputValue) {
        //     inputUrl = `name=${inputValue}`;
        //     url = `https://api.boardgameatlas.com/api/search?${inputUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        // }
        // if (selectedCategory) {
        //     categoryUrl = `categories=${selectedCategoryId}`;
        //     url = `https://api.boardgameatlas.com/api/search?${categoryUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        // }

        // if (inputValue && selectedCategory) {
        //     // If there is both an inputValue and a selectedCategory, we will search by category then search the category by name once we retrieve the data.
        //     inputUrl = '';
        //     url = `https://api.boardgameatlas.com/api/search?${categoryUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        //     bothInputAndCategory = true;
        // }

        const {url, bothInputAndCategory} = determineUrl();


        try {
            const response = await fetch(url);
            const data = await response.json();

            if (bothInputAndCategory) {
                const filteredData = data.games.filter((game) => game.name.toLowerCase().includes(inputValue.toLowerCase()));
                setData(filteredData);
            } else {
                setData(data.games);
            }
        } catch (error) {
            console.log('Error: ', error)
        } finally {
            setIsLoading(false);
            if (!page) {
                setPage(1);
            }
        }
    };

    const determineUrl = () => {
        let inputUrl = '';
        let categoryUrl = '';
        let url = '';
        let bothInputAndCategory = false;

        if (inputValue) {
            inputUrl = `name=${inputValue}`;
            url = `https://api.boardgameatlas.com/api/search?${inputUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        }
        if (selectedCategory) {
            categoryUrl = `categories=${selectedCategoryId}`;
            url = `https://api.boardgameatlas.com/api/search?${categoryUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
        }

        if (inputValue && selectedCategory) {
            // If there is both an inputValue and a selectedCategory, we will search by category then search the category by name once we retrieve the data.
            inputUrl = '';
            url = `https://api.boardgameatlas.com/api/search?${categoryUrl}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
            bothInputAndCategory = true;
        }

        return {url, bothInputAndCategory};
    }


    // **---------------------------------------------------------------------------------** //
    //  ---------------- TOTAL DATA LENGTH TO FIND TOTAL NUM OF PAGES --------------------- //
    // **-------------------------------------------------------------------------------** //

    // Declare a variable to hold the AbortController instance. This will help determine if the input changed while we're still loading the results.
    const findTotalDataLength = async (controller) => {

        let allDataLength = 0;
        let offset = 0;
        const limit = 100;
        const upperLimit = 1000;


        try {
            while (!controller.signal.aborted || initialRenderState) {
                let url = '';
                if (selectedCategory) {
                    // If there is a selected category, and the selected category has an input value, then the url has to reflect both the input and the category. 
                    url = `https://api.boardgameatlas.com/api/search?categories=${selectedCategoryId}&order_by=popularity&ascending=false&client_id=${clientId}&limit=${limit}&skip=${offset}`;
                } else if (inputValue) {
                    url = `https://api.boardgameatlas.com/api/search?name=${inputValue}&order_by=popularity&ascending=false&client_id=${clientId}&limit=${limit}&skip=${offset}`;
                } else {
                    url = `https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=${clientId}&limit=${limit}&skip=${offset}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                const checkDataLength = () => {
                    return new Promise((resolve, reject) => {
                        setIsLoadingPageNums(true);
                        setLookingUpResults(true);

                        if (offset >= upperLimit) {
                            allDataLength = upperLimit;
                            console.log(`welp, this is too much for me. the data length should be ${upperLimit}. lets see: `, allDataLength);
                            resolve(true);
                        } else {
                            if (data.games.length < 100) {
                                allDataLength += data.games.length;
                                console.log('data length is: ', allDataLength);
                                console.log('data.games.length is: ', data.games.length);
                                resolve(true);
                            } else {
                                offset += limit;
                                allDataLength += data.games.length;
                                console.log('still lookin it up. current length is: ', allDataLength);
                                console.log('data.games.length is: ', data.games.length);
                                resolve(false);
                            }
                        }
                    })
                }

                // We will wait for the checkDataLength with 'await'. If the resolve is true then that means we found the entire data length.
                if (await checkDataLength()) {
                    setFullLengthData(allDataLength);
                    console.log('full length data is: ', allDataLength);
                    console.log('input value is: ', inputValue);
                    console.log('category is: ', selectedCategory);
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