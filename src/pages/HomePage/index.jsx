import React, { useEffect, useState } from 'react';
import Boards from '../../components/Boards';
import Main from '../../components/Main';
import Aside from '../../components/Aside';

const HomePage = () => {
  return (
    <>
      <Aside />
      <Main>
        <Boards />
      </Main>
    </>
  );
};

export { HomePage };
