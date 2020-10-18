import React, { Fragment } from "react";
import Hero from "./Hero";
import authConfig from "../auth_config.json";
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import { Alert, Container, Row, Col } from "reactstrap";

async function GetFlightData<T>(request: RequestInfo, auth0: Auth0ContextInterface): Promise<T> {
  const getAccessTokenSilently = await auth0.getAccessTokenSilently();

  const response = await fetch(request, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAccessTokenSilently}`
    }
  });

  const body = await response.json() as Promise<T>;

  return body;
}

var createUniqieId = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

interface HomeProps {
  auth0: Auth0ContextInterface;
}

interface ColumnData {
  id: string,
  colType: String,
  numRows: Number,
  numUniqueValues: Number,
  sample: String[],
  sampleHeader: String
}

interface AggregateData {
  columns: ColumnData[],
  numColumns: Number,
  numRows: Number,
}

interface FlightData {
  data: AggregateData
  status: String
}

interface HomeState {
  flightData: FlightData[],
  error: string,
  loading: boolean
}

class Home extends React.Component<HomeProps, HomeState>
{
  constructor(props: HomeProps) {
    super(props);
  }

  public readonly state: Readonly<HomeState> = {
    flightData: new Array<FlightData>(),
    error: '',
    loading: true
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {
      this.getCurrentUserData();
    }
  }

  async getCurrentUserData() {
    this.setState({ loading: true, error: '' });
    const url = `${authConfig.apiBase}/synopsis`;
    const data2: FlightData[] = await GetFlightData<FlightData[]>(url, this.props.auth0);
    this.setState({ flightData: data2, loading: false })    
  }

  render() {
    const { error, loading } = this.state;
    const aaaaa = this.state.flightData as unknown as FlightData;
    if (!loading) {
      aaaaa.data.columns.forEach(element => {
        element.id = createUniqieId()
      });
    }

    return (
      <Fragment>
        <Hero />
        {loading &&
          <p className="text-center">Loading...</p>
        }
        {error &&
          <Alert color="danger">
            {error}
          </Alert>
        }
        {(!loading && !error) &&
          <Container>
          Filters
          </Container>
        }
        {(!loading && !error) &&
          <Container>
            
          {aaaaa.data.columns.map(a =>
          <Row key={a.id}>
            <Col>
                Column Type:{a.colType}
            </Col>
            <Col>
              Number of Rows: {a.numRows}
            </Col>
            <Col>
              Number of unique values: {a.numUniqueValues}
            </Col>
            <Col>
              Sample Header: {a.sampleHeader}
            </Col>
            <Col>
              Sample: {a.sample}
              </Col>
            </Row>
          )}
          </Container>
        }
      </Fragment>
    );
  }
}

export default withAuth0(Home);
