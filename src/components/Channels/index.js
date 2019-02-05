import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";
import "./index.css";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.channelsLimit = 30;

    this.state = {
      channels: [],
      isChannelActive: ""
    };
  }

  componentDidMount() {
    this.groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(this.channelsLimit)
      .build();

    this.groupsRequest.fetchNext().then(
      channels => {
        /* groupList will be the list of Group class */
        console.log("Channels list fetched successfully", channels);
        this.setState({ channels });
        /* you can display the list of groups available using groupList */
      },
      error => {
        console.log("channels list fetching failed with error", error);
      }
    );
  }

  selectGroup(channelsID) {
    this.password = "";
    this.groupType = CometChat.GROUP_TYPE.PUBLIC;
    this.props.updateState(channelsID);
    CometChat.joinGroup(channelsID, this.groupType, this.password).then(
      channel => {
        console.log(" Joined channels successfully:", channel);
      },
      error => {
        console.log("Failed joining a channel with exception:", error.code);
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="group">
          <div className="groupList">
            <ul>
              {this.state.channels.map(channels => (
                <li
                  key={channels.guid}
                  onClick={this.selectGroup.bind(this, channels.guid)}
                >
                  <div className="groupName"> # {channels.name}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="createGroup">
            <button className="createGroupBtn button">
              <Link className="a" to="/createchannel">
                Create A Channel
              </Link>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
