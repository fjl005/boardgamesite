import Header from "../components/allpages/Header";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
import { useState, useEffect } from "react";
import PagesTracker from "../components/browsepage/PagesTracker";

const Browse = () => {
  const clientId = 'f24B6m6kXF';
  const pageSize = 50;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const topGamesUrl = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&limit=${pageSize}&skip=${(page-1)*pageSize}&client_id=${clientId}`;
    // For the Url, we add skip in case we move on to the next page.
    // Page 2: (2-1) * 50 = 50, so skip 50 then start the next one at 51.

    const response = await fetch(topGamesUrl);
    const jsonData = await response.json();


    setData(jsonData.games);
  };


  return (
    <>
      <Header />
      <Container className='homepage-section'>
        <Row>
          <Col>
            <div className='d-flex'>
              <Label htmlFor='searchGames'>Search for Games</Label>
              <Input id='searchGames'></Input>
              <Button>Search</Button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className='homepage-section'>
        <Row>
          <Col>
            <PagesTracker 
            currentPage={page} 
            setPage = {setPage} 
            pageSize={pageSize}
              setData = {setData}
            />
          </Col>
        </Row>
        <Row>
          <Col className='mx-auto'>
            <Table style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <thead style={{ fontSize: '28px' }}>
                <tr>
                  <th style={{width: '5%', color: 'rgb(97, 38, 144)'}}>#</th>
                  <th style={{width: '10%'}}>Rank</th>
                  <th style={{width: '10%'}}></th>
                  <th style={{width: '30%'}}>Title</th>
                  <th style={{width: '10%'}}>Player Count</th>
                  <th style={{width: '10%'}}>Learning Complexity</th>
                  <th style={{width: '10%'}}>Average User Rating</th>
                  <th style={{width: '10%'}}>Number of Ratings</th>
                  <th style={{width: '5%'}}>Price</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '24px' }}>
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
              </tbody>
            </Table>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default Browse