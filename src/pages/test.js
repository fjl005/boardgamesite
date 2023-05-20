// SIDE EFFECT: WHEN SEARCH IS PERFORMED, CATEGORY IS CHANGED, OR WHEN PAGE IS CHANGED. THIS SIDE EFFECT WILL GUIDE THE FETCH CALLS TO BE PERFORMED AND SETLOOKINGUPRESULTS.
useEffect(() => {
    // If we have a selected category, only search based on the selected category.
    if (selectedCategory) {
        // If the selected category is new (different than what was previously selected), then we need to set setLookingUpResults as true (since we're looking up).
        if (selectedCategory !== prevCategory) {
            setLookingUpResults(true);
            setIsLoadingPageNums(true);
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
            setIsLoadingPageNums(true);
            setPrevInputValue(inputValue);
        } else {
            setLookingUpResults(false);
        }
        fetchInputData();
    }

    // If we reach here, then there is no input or category. We should also cancel all other API calls in case you're waiting for a long search and decided to clear results. 
    else {
        setLookingUpResults(false);
        controller.abort();
        fetchDefaultData();
    }

    // The return in the useEffect is used for cleanup or for cancelling any side effects.
    return () => controller.abort();
}, [page, inputValue, selectedCategoryId]);





    // ------------ RUN WHEN THE SEARCH OR THE SELECTED CATEGORY ARE REMOVED --------------- //
    useEffect(() => {
        // This will only fetch default data when both input value and selected category are both cleared. 
        if (!inputValue && !selectedCategory) {
            clearedAndSetDefault();
        }
        // Otherwise, if it's just the input value empty but the selected category still exists, then continue to show results for the selected category.
        else if (!inputValue && selectedCategory) {
            setLookingUpResults(true);
            fetchCategoryData();
        }
    }, [inputValue]);


    useEffect(() => {
        // We will run this code once the category is reset. I included !selectedCategory to ensure that there is no selected category when categoryReset occurs.
        if (categoryReset) {
            if (!inputValue) {
                clearedAndSetDefault();
                setCategoryReset(false);
            }
            // If category has been reset, then let's check if there is an input value still. otherwise, it's a complete reset and we will fetch default data. 
            else {
                setLookingUpResults(true);
                fetchInputData();
                setCategoryReset(false);
            }
        }

    }, [selectedCategory]);

    const clearedAndSetDefault = () => {
        setPage(1);
        // The setFullLengthData(10000) is needed to search for all the games again when the input and category are removed.
        setFullLengthData(10000);
        fetchDefaultData();
    }




    //  ---------------- ASYNC FUNCTIONS FOR FETCH DEFINED HERE --------------------- //
    const fetchDefaultData = async () => {
        try {
            // isLoading is to show the loading icons in the JSX code (for the table)
            setIsLoading(true);

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
            } else {
                setData(data.games);
                findTotalDataLength(controller);
                console.log('fetch category data. no input value :( ');
            }
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
    }

    const fetchInputData = async () => {
        try {
            setIsLoading(true);

            if ((inputValue !== prevInputValue) || (selectedCategory !== prevCategory)) {
                findTotalDataLength(controller);
                console.log('am i here?');
                console.log('setlookingupresults: ', lookingUpResults);
            }

            if (inputValue !== prevInputValue) {
                setLookingUpResults(true);
                // findTotalDataLength(controller);
                // console.log('am i here?');
                // console.log('setlookingupresults: ', lookingUpResults);
            }

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
            setLookingUpResults(false);
            setIsLoadingPageNums(false);
        }

        if (!page) {
            setPage(1);
        }
    };


    // Declare a variable to hold the AbortController instance. This will help determine if the input changed while we're still loading the results.
    const findTotalDataLength = async (controller) => {

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
                        setIsLoadingPageNums(true);
                        setLookingUpResults(true);
                        // setIsLoadingPageNums(true);
                        // setLookingUpResults(true);

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
            setIsLoadingPageNums(false);
        }
    };