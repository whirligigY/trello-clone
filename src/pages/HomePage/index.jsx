import React, { useEffect, useState } from "react";
import Boards from "../../components/Boards/Boards";
import Main from "../../components/Main";

const HomePage = () => {
  return (
    <Main>
      <div className="workspace__boards">
        <h2 className="heading-h3">
          <i className="fa fa-user-o"></i> Workspace Boards
        </h2>
        <Boards />
      </div>
    </Main>
  );
};

export { HomePage };
