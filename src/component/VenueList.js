import React, { Component } from "react";
import ListItem from "./ListItem";

//ListItem component is rendered
export default class VenueList extends Component {
  render() {
    return (
      <ol className="venueList" aria-label="Venue List" tabIndex="2">
        {this.props.venues &&
          this.props.venues.map((venue, idx) => (
            <ListItem
              key={idx}
              {...venue}
              handleListItemClick={this.props.handleListItemClick}
            />
          ))}
      </ol>
    );
  }
}
