import React from 'react';
import './newPassword.css';
import { Auth } from '@supabase/ui';
import Main from '../Main';
import { supabase } from '../../client';

export const NewPass = () => {
  const signinClass = 'main_center';

  return (
    <Main {...[signinClass]}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <div className="sbui-auth">
          <div className="sbui-space-col sbui-space-y-8">
            <Auth.UpdatePassword supabaseClient={supabase} />
          </div>
        </div>
      </Auth.UserContextProvider>
    </Main>
  );
};
