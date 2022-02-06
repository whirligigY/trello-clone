const WorkspaceBoards = () => (
  <div className="workspace__boards">
    <h3 className="heading-h3">Workspace Boards</h3>
    <div className="workspace__boards board__list">
      <Card className="board__list__board">
        <Card.Body>Project Management</Card.Body>
      </Card>
      <div className="board__list__board board__list__board_new-board card">
        Create new board
      </div>
    </div>
  </div>
);

export { WorkspaceBoards };
