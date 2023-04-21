import Header from "../components/allpages/Header";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
import { useState, useEffect } from "react";
import PagesTracker from "../components/browsepage/PagesTracker";
import { useParams } from "react-router-dom";
import GameSearch from "../components/browsepage/GameSearch";

const Browse = () => {
  const clientId = 'f24B6m6kXF';
  const pageSize = 50;
  const { boardGameName } = useParams();
  const { currentPage } = useParams();

  // States
  const [data, setData] = useState([]);
  const [page, setPage] = useState(currentPage);
  const [inputValue, setInputValue] = useState(boardGameName);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPageChangeData = async () => {
    setIsLoading(true);
    const topGamesUrl = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&client_id=${clientId}`;
    // For the Url, we add skip in case we move on to the next page.
    // Page 2: (2-1) * 50 = 50, so skip 50 then start the next one at 51.

    const response = await fetch(topGamesUrl);
    const jsonData = await response.json();

    setData(jsonData.games);
    setIsLoading(false);
  };

  const fetchInputData = async () => {
    setIsLoading(true);
    const inputSearchUrl = `https://api.boardgameatlas.com/api/search?name=${inputValue}&order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&fuzzy_match=true&client_id=${clientId}`;
    const response = await fetch(inputSearchUrl);
    const jsonData = await response.json();
    // So again, the pattern is: (1) set up a use effect since all api calls are side effects. Then we will fetch the data by creating an async function. In the async function, we fetch the url and await the promise (which would be the response). Once we receive the response, we need to convert it to JSON. 
    console.log('the input value is: ', inputValue);
    setData(jsonData.games);
    setIsLoading(false);
  };

  useEffect(() => {
    if (inputValue) {
      fetchInputData();
    } else {
      fetchPageChangeData();
    }
  }, [page, inputValue]);


  return (
    <>
      <Header />
      <GameSearch setInputValue={setInputValue} setPage={setPage} />

      <Container className='homepage-section'>
        <Row>
          <Col>
            <PagesTracker
              currentPage={page}
              setPage={setPage}
              inputValue={inputValue}
            />

          </Col>
        </Row>
        <Row>
          <Col className='mx-auto'>
            <Table style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <thead style={{ fontSize: '28px' }}>
                <tr>
                  <th style={{ width: '5%', color: 'rgb(97, 38, 144)' }}>#</th>
                  <th style={{ width: '10%' }}>Rank</th>
                  <th style={{ width: '10%' }}></th>
                  <th style={{ width: '30%' }}>Title</th>
                  <th style={{ width: '10%' }}>Player Count</th>
                  <th style={{ width: '10%' }}>Learning Complexity</th>
                  <th style={{ width: '10%' }}>Average Rating</th>
                  <th style={{ width: '10%' }}>Num of Ratings</th>
                  <th style={{ width: '5%' }}>Price</th>
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
                      <td style={{ fontSize: '20px', color: 'rgb(97, 38, 144)' }}>{(page - 1) * 50 + (idx + 1)}</td>
                      <td>
                        <h3>{game.rank>1000000 ? 'N/A' : game.rank}</h3>
                      </td>
                      <td>
                        <img src={game.image_url} alt={`Name of ${game.name}`} width='100px' height='100px' />
                      </td>
                      <td>{game.name}</td>
                      <td>{game.players}</td>
                      <td>{(game.average_learning_complexity).toFixed(2)}</td>
                      <td>{(game.average_user_rating).toFixed(2)}</td>
                      <td>{game.num_user_ratings}</td>
                      <td>{game.price}</td>
                    </tr>
                  ))
                )}

              </tbody>


              {/* <tbody style={{ fontSize: '24px' }}>
                {data && data.map((game, idx) => (
                  <tr key={idx}>
                  <td style={{fontSize: '20px', color: 'rgb(97, 38, 144)'}}>{(page-1)*50+(idx+1)}</td>
                    <td><h3>{game.rank}</h3></td>
                    <td>
                      <img src={game.image_url} alt={`Name of ${game.name}`} width='100px' height='100px' />
                    </td>
                    <td>{game.name}</td>
                    <td>{game.players}</td>
                    <td>{(game.average_learning_complexity).toFixed(2)}</td>
                    <td>{(game.average_user_rating).toFixed(2)}</td>
                    <td>{game.num_user_ratings}</td>
                    <td>{game.price}</td>
                  </tr>
                ))}
              </tbody> */}
            </Table>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default Browse