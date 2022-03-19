import React, { FC } from 'react';
import './workspace.css';

import { IWorkspace } from './types';

const WorkspaceBoards: FC<IWorkspace> = ({ children }) => {
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
