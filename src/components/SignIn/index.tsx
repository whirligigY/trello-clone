import React from 'react';
import { Auth } from '@supabase/ui';
import { Main } from '../Main';
import { useAuth } from '../../contexts/Auth';

import './signIn.css';

const SignIn = () => {
  const signinClass = 'main_center';

  const { client } = useAuth();

  //TODO: remove supabaseclient prop since it exists on App.js context wrapper (experiment)

  return (
    <Main modClass={signinClass}>
      {/* supabase client not needed? see TODO*/}
      <Auth.UserContextProvider supabaseClient={client}>
        {/* supabase client not needed? see TODO*/}
        <Auth supabaseClient={client} providers={['google', 'github']} />
      </Auth.UserContextProvider>
    </Main>
  );
};

export { SignIn };
