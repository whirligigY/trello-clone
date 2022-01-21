import NavBar from './components/navBar';
import { Route, Switch } from 'react-router-dom';
import Boards from './pages/boards';
import Main from './pages/main';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route
          path="/:boardId/:listId?/:cardId?"
          render={(props) => {
            return <Boards {...props} />;
          }}
        />
        <Route path="/" component={Main} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
