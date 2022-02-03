import "./profile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../../client";
import Main from "../Main";
import { Auth, Typography, Button } from "@supabase/ui";
import { useAuth } from "../../contexts/Auth";

export default function Profile() {
  let history = useHistory();

  const { user, signOut } = useAuth();

  if (user) {
    return (
      <Main>
        <Auth.UserContextProvider supabaseClient={supabase}>
          <div className="profile">
            <div className="profile__info">
              <Typography.Text>Signed in as: {user.email}</Typography.Text>
            </div>
            <Button block onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        </Auth.UserContextProvider>
      </Main>
    );
  } else {
    history.push("/sign-in");
    return null;
  }
}
