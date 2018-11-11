import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  componentDidCatch(error, info) {
    window.alert("Hmmm...something doesn't seem right.");
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1> Sorry, please check your connection</h1>;
    }
    return this.props.children;
  }
}
