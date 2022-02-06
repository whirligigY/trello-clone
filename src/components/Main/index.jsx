import "./main.css";
import Aside from "../Aside";

const Main = ({ children }) => (
  <>
    <Aside />
    <main className="main">
      <div id="main" className="main__container">
        {children}
      </div>
    </main>
  </>
);

export default Main;
