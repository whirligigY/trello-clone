import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const HomePage = () => {
  // const [boards, setBoards] = useState([]);
  //
  // const fetchBoards = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/boardList.json');
  //     const data = await response.json();
  //     setBoards(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
  //
  // useEffect(() => {
  //   fetchBoards();
  // }, []);

  return (
    <h1>
      <Row>
        <h2>Твои доски</h2>
        <div>{/*{boards.map((item) => <div></div>)}*/}</div>
      </Row>
    </h1>
  );
};

export { HomePage };
