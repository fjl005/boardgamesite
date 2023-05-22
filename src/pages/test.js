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
                            // console.log('still lookin it up. current length is: ', allDataLength);
                            // console.log('looking up status: ', lookingUpResults);
                            resolve(false);
                        }
                    }
                })
            }

            // We will wait for the checkDataLength with 'await'. If the resolve is true then that means the data length is less than 100. 
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
        setLookingUpResults(false);
    }
};