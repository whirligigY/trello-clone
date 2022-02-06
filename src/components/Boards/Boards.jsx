import { Row } from "react-bootstrap";
import "./boards.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
          <Link
            className="board__list__board card"
            aria-current="page"
            to="/dashboard"
          >
            <div>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </Row>
    </div>
  );
};

export default Boards;
