import { Row } from "react-bootstrap";
import "./boards.css";
import { useState, useEffect } from "react";
import WorkspaceBoards from "../Workspace";

const Boards = () => {
  const [boards, setBoards] = useState([]);

  const fetchBoards = async () => {
    try {
      const response = await fetch("mocks/boardList.json");
      const data = await response.json();
      setBoards(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  //TODO
  /**
   *  show boards only for logged in user
   *
   *  justify content left how to pass modifier styles to Main?
   *
   **/

  return (
    <WorkspaceBoards>
      <Row className="workspace__boards board__list">
        {boards.map((item) => (
          <div className="board__list__board card">
            <p>{item.title}</p>
          </div>
        ))}
      </Row>
    </WorkspaceBoards>
  );
};

export default Boards;
