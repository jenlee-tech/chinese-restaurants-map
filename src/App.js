import React, { Component } from "react";
import "./App.css";
import Map from "./component/map";
import SquareAPI from "./API";
import SideBar from "./component/SideBar";
import ErrorBoundary from "./component/ErrorBoundary";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  //closes markers to exhibit default close behavior
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({
      markers: Object.assign(this.state.markers, markers)
    });
  };

  //this shows the venue details - call closeAllMarkers first
  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({
      markers: Object.assign(this.state.markers, marker)
    });
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    console.log(venue, "SINGLE_VENUE");

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      console.log(res);
      this.setState({
        venues: Object.assign(this.state.venues, newVenue)
      });
      console.log(newVenue);
    });
  };

  //function for when a venue on the list is click - marker shows
  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    console.log(marker);
    console.log(venue);
    this.handleMarkerClick(marker);
  };
  //information from FourSquare is pulled in
  componentDidMount() {
    SquareAPI.search({
      near: "Hartford, CT",
      query: "Chinese Restaurant",
      limit: 10
    })
      .then(results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        });
        this.setState({
          venues,
          center,
          markers
        });
        console.log(results);
      })
      .catch(error => {
        alert(
          "Somthing weird happened with FourSquare API - test your connection"
        );
        console.log(error);
      });
  }
  //SideBar and Map components are rendered and an ErrorBoundary is in place
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <SideBar
            {...this.state}
            handleListItemClick={this.handleListItemClick}
          />
          <Map
            {...this.state}
            handleMarkerClick={this.handleMarkerClick}
            aria-label="map"
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
