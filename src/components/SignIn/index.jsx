import React from 'react';
import './signIn.css';
import { Auth } from '@supabase/ui';
import Main from '../Main';
import { supabase } from '../../client';

const SignIn = () => {
  const signinClass = 'main_center';

  return (
    <Main {...[signinClass]}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Auth supabaseClient={supabase} providers={['google', 'github']} />
      </Auth.UserContextProvider>
    </Main>
  );
};

export { SignIn };
