import React, { MouseEvent, useEffect, useState } from 'react';
import INetworkRequest from './service/INetworkRequest'
import NetworkService from './service/NetworkService'
import { FootballAPI } from './api/FootballAPI'
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import FootballMatchResponse from './model/FootballMatchResponse';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const BASE_URL = "https://jsonmock.hackerrank.com/api/"
  const YEARS = ["2017", "2016", "2015", "2014", "2013", "2012", "2011"]
  const [year, setYear] = useState<String>(YEARS[0])
  const [footballMatch, setFootballMatch] = useState<FootballMatchResponse>()
  const [visibility, setVisibility] = useState<boolean>(false)
  const [totalData, setTotalData] = useState<number>(0)

  const getFootballYear = async (year: String) => {
    const footballYearParams: INetworkRequest = {
      httpMethod: 'get',
      params: {}
    }
    const url = `${BASE_URL}${FootballAPI.getCompetitionYear}${year}`
    const response = await NetworkService.instance.request(url, footballYearParams)
    const footballMatchResponse = response.data as FootballMatchResponse
    setFootballMatch(footballMatchResponse)

    if (footballMatchResponse.data.length > 0) {
      setVisibility(true)
    } else {
      setVisibility(false)
    }
    setTotalData(footballMatchResponse.data.length)
  }

  const onYearClick = (event: MouseEvent, year: String) => {
    setYear(year)
    event.preventDefault();
  }

  useEffect(() => {
    getFootballYear(year)
  }, [year])

  return (
    <Container fluid>
      <Row>
        <div style={{ backgroundColor: 'black', height: 48, padding: 0, margin: 0 }}>
          <h4 style={{ color: 'green', textAlign: 'center' }}>Football Matches</h4>
        </div>
        <Col xs={6} md={4} style={{ padding: "0px", margin: "0px" }}>
          <Row>
            <h5>Select Year</h5>
          </Row>
          <ListGroup as="ul" defaultActiveKey={`#0`}>
            {YEARS.map((year, index) => {
              return (
                <ListGroup.Item as="li" value={year} action onClick={(event) => onYearClick(event, year)} key={index} href={`#${index}`}>
                  {year}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
        <Col xs={12} md={8} style={{ padding: "0px", margin: "0px" }}>
          <Row>
            <div style={{ visibility: visibility ? 'visible' : 'hidden' }}>
              <Row>
                <h5>Total Match: {totalData}</h5>
              </Row>
              <ListGroup as="ul">
                <>
                  {footballMatch?.data.map((footballMatch, index) => {
                    return (
                      <ListGroup.Item as="li">
                        {`Match ${footballMatch.name} Won by ${footballMatch.winner}`}
                      </ListGroup.Item>
                    )
                  })}
                </>
              </ListGroup>
            </div>
            <Row>
              <h5 style={{ visibility: visibility ? 'hidden' : 'visible' }}> No Result Found </h5>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
