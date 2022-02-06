import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import "./boards.css";
>>>>>>> origin/main

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
<<<<<<< HEAD
          <Link
            className="board__list__board card"
            aria-current="page"
            to="/dashboard"
          >
            <div>
              <p>{item.title}</p>
            </div>
          </Link>
=======
          <div key={item.id} className="board__list__board card">
            <p>{item.title}</p>
          </div>
>>>>>>> origin/main
        ))}
      </Row>
    </div>
  );
};

export default Boards;
