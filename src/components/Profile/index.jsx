import "./profile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../../client";
import Main from "../Main";
import { Auth, Typography, Button } from "@supabase/ui";
import { useAuth } from "../../contexts/Auth";

export default function Profile() {
  let history = useHistory();
  const [profile, setProfile] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const profileData = await supabase.auth.user();
    //TODO
    /**
     * write proper redirect route
     **/
    if (!profileData) {
      history.push("/sign-in");
    } else {
      setProfile(profileData);
    }
  }

  if (!profile) return null;

  const Container = (props) => {
    //TODO: user
    /**
     * change to impirted user from use auth
     **/

    if (user)
      return (
        <div className="profile">
          <div className="profile__info">
            <Typography.Text>Signed in as: {user.email}</Typography.Text>
          </div>
          <Button block onClick={() => props.supabaseClient.auth.signOut()}>
            Sign out
          </Button>
        </div>
      );
    return props.children;
  };

  return (
    <Main>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase}>
          <Auth supabaseClient={supabase} providers={["google", "github"]} />
        </Container>
      </Auth.UserContextProvider>
    </Main>
  );
}
