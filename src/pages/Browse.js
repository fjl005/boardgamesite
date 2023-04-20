import Header from "../components/allpages/Header";
import { Container, Row, Col, Label, Input, Button, Table } from "reactstrap";
import { useState, useEffect } from "react";

const Browse = () => {
  const clientId = 'f24B6m6kXF';
  const pageSize = 50;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    const topGamesUrl = `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&limit=${pageSize}&skip=${(page - 1) * pageSize}&client_id=${clientId}`;
    // For the Url, we add skip in case we move on to the next page.
    // Page 2: (2-1) * 50 = 50, so skip 50 then start the next one at 51.
    // const topGamesUrl = `https://api.boardgameatlas.com/api/search?order_by=discount&ascending=false&limit=25&client_id=${clientId}`;

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
          <Col sm='10' className='mx-auto'>
            <Table>
              <thead>
                <tr>
                  <th style={{width: '15%'}}>Rank</th>
                  <th style={{width: '25%'}}></th>
                  <th style={{width: '40%'}}>Title</th>
                  <th style={{width: '20%'}}>Price</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((game, idx) => (
                  <tr key={idx}>
                    <td>{game.rank}</td>
                    <td>
                      <img src={game.image_url} alt={`Name of ${game.name}`} width='100px' height='100px' />
                    </td>
                    <td>{game.name}</td>
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