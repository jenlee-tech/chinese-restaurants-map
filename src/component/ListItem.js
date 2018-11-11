import React, { Component } from "react";
export default class ListItem extends Component {
  render() {
    return (
      <li
        className="listItem"
        aria-label={this.props.name}
        tabIndex="3"
        onClick={() => this.props.handleListItemClick(this.props)}
      >
        {/*little icons show next to the venue in list*/}
        <img
          src={
            this.props.categories[0].icon.prefix +
            "32" +
            this.props.categories[0].icon.suffix
          }
          alt={this.props.categories[0].name}
        />
        {this.props.name}
      </li>
    );
  }
}
