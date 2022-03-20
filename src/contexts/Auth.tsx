/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApiError, User, UserCredentials } from '@supabase/gotrue-js';
import { SupabaseClient } from '@supabase/supabase-js';
import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { supabase } from '../client';

//@ts-ignore
const AuthContext = React.createContext(any);

export function useAuth(): {
  client: SupabaseClient;
  user: User;
  userProfile: () => User;
  signOut: () => Promise<{
    error: ApiError;
  }>;
} {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
            id: supabase.auth.user()?.id,
            username: supabase.auth.user()?.email,
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

  const value = useMemo(
    () => ({
      signIn: (data: UserCredentials) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      userProfile: () => supabase.auth.user(),
      client: supabase,
      user,
      authState,
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
