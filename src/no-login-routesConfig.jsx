import React from 'react';

import { SignIn } from './components/SignIn';

const noLoginRoutesConfig = [
  {
    path: '*',
    element: <SignIn />,
  },
];

export { noLoginRoutesConfig };
