import React from 'react';
import { TaskModalWindow } from './components/TaskModal/TaskModal';
import NavBar from './components/navBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Board from './pages/board';
import Main from './pages/main';
import Footer from './components/footer';

function App() {
  const boardList = [
    {
      id: 0,
      title: 'Board1',
      board: [
        {
          id: 0,
          title: 'New tasks board1',
          cards: [
            { id: 0, text: 'Task01' },
            { id: 1, text: 'Task02' },
          ],
        },
        {
          id: 1,
          title: 'In progress',
          cards: [
            { id: 0, text: 'Task11' },
            { id: 1, text: 'Task12' },
          ],
        },
      ],
    },
    {
      id: 1,
      title: 'Board2',
      board: [
        {
          id: 0,
          title: 'New tasks board2',
          cards: [
            { id: 0, text: 'Task01' },
            { id: 1, text: 'Task02' },
          ],
        },
        {
          id: 1,
          title: 'In progress board2',
          cards: [
            { id: 0, text: 'Task11' },
            { id: 1, text: 'Task12' },
          ],
        },
      ],
    },
  ];
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/:board/:boardId?" component={Board} />
          <Route path="/" component={Main} />
        </Switch>
        <TaskModalWindow/>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
