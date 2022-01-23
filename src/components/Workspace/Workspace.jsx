const WorkspaceBoards = () => (
  <div class="workspace__boards">
    <h3 class="heading-h3">Workspace Boards</h3>
    <div class="workspace__boards board__list">
      <Card className="board__list__board">
        <Card.Body>Project Management</Card.Body>
      </Card>
      <div class="board__list__board board__list__board_new-board card">
        Create new board
      </div>
    </div>
  </div>
);

export { WorkspaceBoards };
