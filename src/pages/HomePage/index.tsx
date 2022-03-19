import React from 'react';
import { Boards } from '../../components/Boards';
import { Main } from '../../components/Main';

const HomePage = () => {
  return (
    <>
      <Main modClass={''}>
        <Boards />
      </Main>
    </>
  );
};

export { HomePage };
