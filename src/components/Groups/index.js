import React, { Component } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { Link } from "react-router-dom";
import Chatbox from "../Chatbox";
import "./index.css";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.limit = 30;

    this.groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(this.limit)
      .build();

    this.state = {
      groupList: [],
      activeGroup: ""
    };
  }

  componentDidMount() {
    // console.log(this.props);
    this.groupsRequest.fetchNext().then(
      groupList => {
        /* groupList will be the list of Group class */
        console.log("Groups list fetched successfully", groupList);
        this.setState({ groupList });
        /* you can display the list of groups available using groupList */
      },
      error => {
        console.log("Groups list fetching failed with error", error);
      }
    );
  }

  selectGroup(e) {
    this.GUID = e;
    this.password = "";
    this.groupType = CometChat.GROUP_TYPE.PUBLIC;

    CometChat.joinGroup(this.GUID, this.groupType, this.password).then(
      group => {
        console.log("Group joined successfully:", group);
        localStorage.setItem("guid", this.GUID);
      },
      error => {
        console.log("Group joining failed with exception:", error.code);
        if (error.code === "ERR_ALREADY_JOINED") {
          localStorage.setItem("guid", this.GUID);
        }
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="group">
          <div className="groupList">
            <ul>
              {this.state.groupList.map(a => (
                <li key={a.guid} onClick={this.selectGroup.bind(this, a.guid)}>
                  <div> #{a.name}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="createGroup">
            <button className="createGroupBtn button">
              <Link className="a" to="/creategroup">
                Create Group
              </Link>
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
