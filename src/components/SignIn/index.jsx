import './signIn.css';
import Main from '../Main';
import { Auth } from '@supabase/ui';
import { supabase } from '../../client';

export default function SignIn() {
  const signinClass = 'main_center';

  return (
    <Main {...[signinClass]}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Auth supabaseClient={supabase} providers={['google', 'github']} />
      </Auth.UserContextProvider>
    </Main>
  );
}
