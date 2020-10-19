import React, { Fragment } from "react";
import Hero from "./Hero";
import authConfig from "../auth_config.json";
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import { Alert, Container, Row, Col, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown } from "reactstrap";

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
  filterDropdownOpen: boolean
  showFilterOptions: boolean,
  filterTypes: ['Default', 'Date', 'Search', 'Score'],
  selectedFilter: string
}

class Home extends React.Component<HomeProps, HomeState>
{
  constructor(props: HomeProps) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleFilterDropdown = this.toggleFilterDropdown.bind(this);
  }

  public readonly state: Readonly<HomeState> = {
    flightData: new Array<FlightData>(),
    error: '',
    loading: true,
    activeFilters: new Array<ColumnData>(),
    inactiveFilters: new Array<ColumnData>(),
    dropdownOpen: false,
    filterDropdownOpen: false,
    showFilterOptions: false,
    filterTypes: ['Default', 'Date', 'Search', 'Score'],
    selectedFilter: 'Default'
  }

  toggleDropdown() {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  }

  toggleFilterDropdown() {
    this.setState(prevState => ({ filterDropdownOpen: !prevState.filterDropdownOpen }));
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

  changeFilterType = (newFilterType: string) => {
    this.setState({ selectedFilter: newFilterType })
  }

  render() {
    const { error, loading, activeFilters, inactiveFilters, filterTypes, selectedFilter } = this.state;
    const flightData = this.state.flightData as unknown as FlightData;
    if (!loading) {
      flightData.data.columns.forEach(element => {
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
          <Row>Active Filters</Row>
          {activeFilters.map(element =>
            <Row key={element.id}>
              <Col>{element.sampleHeader}</Col>
              <Col>
                <UncontrolledButtonDropdown
                className="d-inline-block"
                > Filter Type: 
                  <DropdownToggle caret> {selectedFilter}</DropdownToggle>
                <DropdownMenu>
                  {
                    filterTypes.map(filter =>
                      <DropdownItem key={filter} onClick={() => this.changeFilterType(filter)}>{filter}</DropdownItem>
                    )
                  }
                </DropdownMenu>
                </UncontrolledButtonDropdown></Col>
              <Col>
                <Button onClick={() => this.removeFilter(element.id)}>
                  Delete</Button></Col>
            </Row>
          )}

          <Dropdown
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
        </Dropdown>
          </Container>
        }

      </Fragment>
    );
  }
}

export default withAuth0(Home);
