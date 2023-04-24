import Header from "../components/allpages/Header";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
import { useState, useEffect } from "react";
import PagesTracker from "../components/browsepage/PagesTracker";
import { useParams } from "react-router-dom";
import GameSearch from "../components/browsepage/GameSearch";

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


  const controller = new AbortController();

  // Side Effect, when search is performed or when page is changed. Basically, whenever we need to access the api.
  useEffect(() => {

    if (inputValue && (inputValue !== prevInputValue)) {
      setLookingUpResults(true);
      fetchInputData();
      findTotalDataLength(controller);
      setPrevInputValue(inputValue);
    } else if (inputValue) {
      setLookingUpResults(false);
      fetchInputData();
    } else {
      setLookingUpResults(false);
      controller.abort();
      fetchPageChangeData();
    }
  
    return () => controller.abort();
    // The return in the useEffect is used for cleanup or for cancelling any side effects.
  }, [page, inputValue]);


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

    // So again, the pattern is: (1) set up a use effect since all api calls are side effects. Then we will fetch the data by creating an async function. In the async function, we fetch the url and await the promise (which would be the response). Once we receive the response, we need to convert it to JSON. 
    if (!page) {
      setPage(1);
    }
  };


  const fetchPageChangeData = async () => {
    setIsLoading(true);
    const topGamesUrl = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&client_id=${clientId}`;
    // For the Url, we add skip in case we move on to the next page.
    // Page 2: (2-1) * 50 = 50, so skip 50 then start the next one at 51.

    const response = await fetch(topGamesUrl);
    const jsonData = await response.json();

    setData(jsonData.games);
    if (!page) {
      setPage(1);
    }
    setIsLoading(false);
    setIsLoadingPageNums(false);
  };


  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Declare a variable to hold the AbortController instance. This will help determine if the input changed while we're still loading the results.
  const findTotalDataLength = async (controller) => {

    let allDataLength = 0;
    let offset = 0;
    const limit = 100;
    const upperLimit = 1000;

    try {
      while (!controller.signal.aborted) {
        const url = `https://api.boardgameatlas.com/api/search?name=${inputValue}&order_by=popularity&ascending=false&client_id=${clientId}&limit=${limit}&skip=${offset}`;
        const data = await fetchData(url);

        const checkDataLength = () => {
          return new Promise((resolve) => {

            if (offset >= upperLimit) {
              allDataLength = upperLimit;
              console.log(`welp, this is too much for me. the data length should be ${upperLimit}. lets see: `, allDataLength);
              resolve(true);
            } else {
              if (data.games.length < 100) {
                allDataLength += data.games.length;
                console.log('yay done');
                resolve(true);
              } else {
                offset += limit;
                allDataLength += data.games.length;
                console.log('still lookin it up. current length is: ', allDataLength);
                console.log('looking up status: ', lookingUpResults);
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

  return (
    <>
      <Header />
      <GameSearch
        inputValue={inputValue}
        setInputValue={setInputValue}
        page={page}
        setPage={setPage}
        fullLengthData={fullLengthData}
        setFullLengthData={setFullLengthData}
        lookingUpResults={lookingUpResults}
        setLookingUpResults={setLookingUpResults}

      />

      <Container className='homepage-section'>
        <Row>
          <Col>
          {lookingUpResults ? (
            <h3> Loading Pages, one second... </h3>
            
          ) : (
            <PagesTracker
              currentPage={page}
              setPage={setPage}
              inputValue={inputValue}
              isLoadingPageNums={isLoadingPageNums}
              fullLengthData={fullLengthData}
            />
          )}
          </Col>
        </Row>
        <Row>
          <Col className='mx-auto'>
            <Table style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <thead style={{ fontSize: '28px' }}>
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
              <tbody style={{ fontSize: '24px' }}>

                {isLoading ? (
                  <>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
                    <td>Loading...</td>
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
                        <img src={game.image_url} alt={`Name of ${game.name}`} width='100px' height='100px' />
                      </td>
                      <td>
                        <a href={game.url} target="_blank">{game.name}</a>
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

            {(data.length > 0) ? (
              null
            )
              : (
                !isLoading && (
                  <h1 className='text-center'>Error: Game Not Found.</h1>
                )
              )
            }
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default Browse