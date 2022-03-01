import {
  SupabaseClientOptions,
  UserCredentials,
  User,
  SupabaseClient,
} from '@supabase/supabase-js';

import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  Context,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { supabase } from '../client';

// TODO: password restore
/**
 * fix password restore
 * when password is restared user is singed in directly without asking to reset the assword
 *  see here: https://dev.to/misha_wtf/user-authentication-in-nextjs-with-supabase-4l12
 * */

// TODO: refactor checkUser() not sure if checkUser() is required check

const AuthContext = React.createContext(undefined);

export type Props = {
  children: ReactNode;
};

export function useAuth(): {
  client: SupabaseClient;
  user: User;
  userProfile: () => User;
} {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = (props: { children: Props }) => {
  const { children } = props;

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  const [authState, setAuthState] = useState('non-authenticated');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, _session) => {
        setUser(_session?.user ?? null);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          navigate('/');
          const { error } = await supabase.from('profiles').upsert({
            id: user?.id,
            username: user?.email,
          });

          if (!error) {
            setAuthState('authenticated');
          } else {
            // navigate to 404
            setAuthState('non-authenticated');
          }
        }
        if (event === 'SIGNED_OUT') {
          setAuthState('non-authenticated');
          navigate('/');
        }
        if (event === 'PASSWORD_RECOVERY') {
          setAuthState('password-recovery');
          navigate('/set-new-password');
        }
        if (event === 'USER_UPDATED') {
          navigate('/');
          setAuthState('authenticated');
        }
      }
    );
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // type clientT = {
  //   supabaseUrl: string;
  //   supabaseKey: string;
  //   options?: SupabaseClientOptions | undefined;
  // };

  const value = useMemo(
    () => ({
      signIn: (data: UserCredentials) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      userProfile: () => supabase.auth.user(),
      client: supabase,
      user,
      authState,
    }),
    [authState, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
