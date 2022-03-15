import React from 'react';
import { Auth } from '@supabase/ui';
import { Main } from '../Main';
import { supabase } from '../../client';

import './newPassword.css';

export const NewPass = () => {
  const signinClass = 'main_center';

  //TODO: remove supabaseClient prop? there is context already...

  return (
    <Main modClass={signinClass}>
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
