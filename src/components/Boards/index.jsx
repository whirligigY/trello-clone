import { Row } from "react-bootstrap";
import "./boards.css";
import { useState, useEffect } from "react";
import WorkspaceBoards from "../Workspace";
import { useAuth } from "../../contexts/Auth";
import { supabase } from "../../client";

const Boards = () => {
  const [boards, setBoards] = useState([]);

  const { user } = useAuth();

  // const fetchBoards = async () => {
  //   try {
  //     const response = await fetch("mocks/boardList.json");
  //     const data = await response.json();
  //     setBoards(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  useEffect(() => {
    if (user) {
      supabase
        .from("boards")
        .select("*")
        .eq("user_id", user?.id)
        .order("id", { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            console.log(`boards`, boards);
            setBoards(data);
          }
        });
    }
  }, [user, boards]);

  useEffect(() => {
    // fetchBoards();
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
        {boards ? (
          boards.map((item) => (
            <div className="board__list__board card" key={boards.id}>
              <p>{item.title}</p>
            </div>
          ))
        ) : (
          <div>
            <p>You need to sign in to view your boards.</p>
          </div>
        )}
      </Row>
    </WorkspaceBoards>
  );
};

export default Boards;
