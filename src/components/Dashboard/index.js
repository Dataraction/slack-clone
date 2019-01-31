import React, { Component } from "react";
import Chatbox from "../Chatbox";
import Groups from "../Groups";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: ""
    };

    this.updateState = this.updateState.bind(this);
    this.self = this;
  }

  updateState(group) {
    this.self.setState({ group: group });
    console.log(group);
  }

  render() {
    return (
      <React.Fragment>
        <Groups updateState={this.updateState} />
        <Chatbox state={this.state} />
      </React.Fragment>
    );
  }
}
