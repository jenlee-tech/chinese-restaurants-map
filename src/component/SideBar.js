import React, { Component } from "react";
import VenueList from "./VenueList";

export default class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }
  //function that handles the filtering for the venuelist
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      console.log(venues);
      return venues;
    }
    return this.props.venues;
  };
  handleChange = e => {
    this.setState({
      query: e.target.value
    });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({
      markers
    });
  };
  //Venuelist component is rendered
  render() {
    return (
      <div
        className="sideBar"
        aria-label="Search feature for Chinese Restaurants"
        tabIndex="1"
      >
        <input
          type={"search"}
          id={"search"}
          placeholder={"Find a Chinese Restaurant"}
          onChange={this.handleChange}
        />
        <VenueList
          {...this.props}
          venues={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    );
  }
}
