import React from "react";
import { Dropdown } from "react-bootstrap";
import { MembersDropdownMenu } from '../SideMenu/MembersDropdown/MembersDropdownMenu'
import "../TaskModalWindow.css";

function CurrentMembers () {

  return (
    <div>
      <p className="service-title">Members</p>
      <div className="current-members-list">
        <div className="member" id="1">
          <div className="member-avatar">
            <span>IL</span>
          </div>
        </div>
        <div className="member" id="1">
          <div className="member-avatar">TK</div>
        </div>
        <Dropdown>
          <Dropdown.Toggle
          className="add-current-members"
          variant="secondary"
          >
            <span>+</span>
          </Dropdown.Toggle>
          <MembersDropdownMenu/>
        </Dropdown>
      </div>
    </div>
  );
}

export { CurrentMembers };