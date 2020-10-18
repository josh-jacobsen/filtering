import React, { Fragment } from "react";
import Hero from "./Hero";
import AddFilter from "./AddFilter";
import authConfig from "../auth_config.json";
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import { Alert, Container, Row, Col, Button } from "reactstrap";
import Loading from './Loading';

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

export interface ColumnData {
  id: string,
  colType: String,
  numRows: Number,
  numUniqueValues: Number,
  sample: String[],
  sampleHeader: String
}

export interface AggregateData {
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
  loading: boolean,
  activeFilters: ColumnData[],
  inactiveFilters: ColumnData[],
  dropdownOpen: boolean,
  showFilterOptions: boolean
}

class Home extends React.Component<HomeProps, HomeState>
{
  constructor(props: HomeProps) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);


  }

  public readonly state: Readonly<HomeState> = {
    flightData: new Array<FlightData>(),
    error: '',
    loading: true,
    activeFilters: new Array<ColumnData>(),
    inactiveFilters: new Array<ColumnData>(),
    dropdownOpen: false,
    showFilterOptions: false
  }

  toggleDropdown() {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  }

  onMouseEnter() {
    this.setState({ showFilterOptions: true });
  }

  onMouseLeave() {
    this.setState({ showFilterOptions: false });
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
    const data2: FlightData[] = await GetFlightData<FlightData[]>(url, this.props.auth0)
    this.setState({ flightData: data2, loading: false })
    const inactiveFilters = this.state.flightData as unknown as FlightData;
    this.setState({inactiveFilters: inactiveFilters.data.columns})
  }

  removeFilter = (elementId: string) => {
    var existingFilters = this.state.activeFilters;
    var newFilters = existingFilters.filter(c => c.id != elementId)
    const inactiveFilters = this.state.inactiveFilters;
    const newInactive = existingFilters.filter(z => z.id == elementId);
    const newInactives = inactiveFilters.concat(newInactive)
    this.setState({activeFilters: newFilters, inactiveFilters: newInactives})
  }

  addFilter = (elementId: string) => {
    const currentFilters = this.state.activeFilters;
    const newFilter = this.state.inactiveFilters.filter(a => a.id == elementId);
    const newFilters = currentFilters.concat(newFilter);
    const inactive = this.state.inactiveFilters.filter(b => b.id != elementId);
    this.setState({ activeFilters: newFilters, inactiveFilters: inactive })
  }

  render() {
    const { error, loading, activeFilters, inactiveFilters } = this.state;
    const aaaaa = this.state.flightData as unknown as FlightData;
    if (!loading) {
      aaaaa.data.columns.forEach(element => {
        element.id = createUniqieId()
      });
    }

    const tuple = <T extends Array<unknown>>(...args: T): T => args;

    // `Object.keys` does not return the keys as string literals, only strings. Use this helper as a
    // workaround. https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
    const keys = <O extends object>(obj: O) => Object.keys(obj) as Array<keyof O>;

    // `Object.entries` is ES2017, so we must define our own version.
    const entries = <K extends string, V>(obj: Record<K, V>) =>
      keys(obj).map(key => tuple(key, obj[key]));
    const fromEntries = <K extends string, V>(arr: Array<[K, V]>) =>
      // `Object.assign` is poorly typed: it returns `any` when spreading. Use cast to workaround.
      Object.assign({}, ...arr.map(([k, v]) => ({ [k]: v }))) as Record<K, V>;

    // Inspired by https://stackoverflow.com/a/37616104/5932012
    const filter = <K extends string, V, Result extends V>(
      obj: Record<K, V>,
      predicate: (key: K, value: V) => value is Result,
    ) =>
      fromEntries(
        entries(obj).filter(
          (entry): entry is [K, Result] => {
            const [key, value] = entry;
            return predicate(key, value);
          },
        ),
      );
    
    if (!loading) {
      var lookingFor = 'Southwest Airlines';
      var a = aaaaa.data.columns[0].sample;
      var c = (a.map(b => b == lookingFor))
      if (c) {
        console.log('hrllo world, we found', lookingFor)
      }
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
          <Row>Active Filters</Row>
          {activeFilters.map(element =>
            <Row key={element.id}>
              <Col>{element.sampleHeader}</Col>
              <Col>{element.colType}</Col>
              <Col>
                <Button onClick={() => this.removeFilter(element.id)}>
                  Delete</Button></Col>
            </Row>
          )}

          <AddFilter columns={inactiveFilters} loading={loading}></AddFilter>
l
          {/* <Dropdown
            className="d-inline-block"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropdown}
          >
          <DropdownToggle caret>Add filter</DropdownToggle>
            <DropdownMenu>
              {
                inactiveFilters.map(filter => 
                  <DropdownItem key={filter.id} onClick={() => this.addFilter(filter.id)}>{filter.sampleHeader}</DropdownItem>
                )
              }
          </DropdownMenu>
        </Dropdown> */}
          </Container>
        }

      </Fragment>
    );
  }
}

export default withAuth0(Home);
