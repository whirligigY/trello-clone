import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./boards.css";

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

  return (
    <div className="container">
      <Row className="workspace__boards board__list">
        {boards.map((item) => (
          <div key={item.id} className="board__list__board card">
            <p>{item.title}</p>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Boards;
