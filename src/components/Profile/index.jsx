import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, Typography, Button } from '@supabase/ui';

import { supabase } from '../../client';
import Main from '../Main';
import { useAuth } from '../../contexts/Auth';

import './profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [navigate, user]);

  return (
    <Main>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <div className="profile">
          <div className="profile__info">
            <Typography.Text>Signed in as: {user.email}</Typography.Text>
            <Typography.Text>ID: {user.id}</Typography.Text>
          </div>
          <Button block onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </Auth.UserContextProvider>
    </Main>
  );
};

export { Profile };
