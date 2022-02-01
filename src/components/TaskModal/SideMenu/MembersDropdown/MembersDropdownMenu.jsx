import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import "../../TaskModalWindow.css";

function MembersDropdownMenu () {

  return (
    <Dropdown.Menu>
      <input className="search-input" type="text" placeholder="Member search" />
      <Dropdown.Divider />
      <div className="members-list">
        <Dropdown.Item className="member" id="1">
          <div className="member-avatar">
            <span>IL</span>
          </div>
          <span className="member-name">Igor Laptev</span>
        </Dropdown.Item>
        <Dropdown.Item className="member" id="1">
          <div className="member-avatar">TK</div>
          <span className="member-name">Taner Ktaf</span>
        </Dropdown.Item>
      </div>
      <Dropdown.Divider />
      <Button
        className="dropdown-item"
        variant="outline-secondary"
        id="add-label"
      >
        See all members of this workspace
      </Button>
    </Dropdown.Menu>
  );
}

export { MembersDropdownMenu };
