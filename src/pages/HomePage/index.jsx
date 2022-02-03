import React, { useEffect, useState } from "react";
import Boards from "../../components/Boards";
import Main from "../../components/Main";
import WorkspaceBoards from "../../components/Workspace";

const HomePage = () => {
  return (
    <Main>
      <Boards />
    </Main>
  );
};

export { HomePage };
