import "./main.css";

const Main = ({ children }) => (
  <main className="main">
    <div id="main" className="main__container">
      {children}
    </div>
  </main>
);

export default Main;
