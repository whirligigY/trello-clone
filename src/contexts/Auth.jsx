import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../client';

// TODO: password restore
/**
 * fix password restore
 * when password is restared user is singed in directly without asking to reset the assword
 *  see here: https://dev.to/misha_wtf/user-authentication-in-nextjs-with-supabase-4l12
 * */

// TODO: refactor checkUser() not sure if checkUser() is required check

const AuthContext = React.createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
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
        console.log(`event`, event);
        console.log(`session`, _session);
        console.log(`authState`, authState);
        if (
          event === 'SIGNED_IN' &&
          _session?.user.aud === 'authenticated' &&
          authState !== 'non-authenticated'
        ) {
          supabase
            .from('profiles')
            .upsert({
              id: supabase.auth.user().id,
              username: supabase.auth.user().email,
            })
            .then((_data, error) => {
              if (!error) {
                setAuthState('authenticated');
                navigate('/');
              }
            });
        } else if (event === 'SIGNED_OUT') {
          setAuthState('non-authenticated');
          navigate('/');
        } else if (event === 'PASSWORD_RECOVERY') {
          navigate('/set-new-password');
          setAuthState('password-recovery');
        } else if (event === 'USER_UPDATED') {
          navigate('/');
          setAuthState('authenticated');
        }
      }
    );
    return () => {
      listener?.unsubscribe();
    };
  }, [navigate, user, authState]);

  const value = useMemo(
    () => ({
      signIn: (data) => supabase.auth.signIn(data),
      signOut: () => supabase.auth.signOut(),
      userProfile: () => supabase.auth.user(),
      client: supabase,
      user,
      authState: () => authState,
    }),
    [authState, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
