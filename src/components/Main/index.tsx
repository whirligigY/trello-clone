import React, { FC } from 'react';

import { IMainProps } from './types';

import './main.css';

const Main: FC<IMainProps> = ({ modClass, children }) => {
  return (
    <main className={modClass ? `main ${modClass}` : 'main'}>
      <div id="main" className={'main__container'}>
        {children}
      </div>
    </main>
  );
};

export { Main };
