import React from 'react';
import './workspace.css';

//TODO: workspace remove this component?
/**
 * remove or rewrite this component
 * move boards here from Components/Boards
 **/

const WorkspaceBoards = ({ children }) => {
  return (
    <div className="workspace__boards">
      <h2 className="heading-h3">
        <i className="fa fa-user-o"></i> Workspace Boards
      </h2>
      <div className="container">{children}</div>
    </div>
  );
};

export default WorkspaceBoards;
