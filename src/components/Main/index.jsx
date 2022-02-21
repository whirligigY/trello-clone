import React from 'react';

import './main.css';

const Main = ({ 0: extraClass, children }) => {
  return (
    <main className={extraClass ? `main ${extraClass}` : 'main'}>
      <div id="main" className={'main__container'}>
        {children}
      </div>
    </main>
  );
};

export default Main;
