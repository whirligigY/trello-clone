import { useState, useEffect } from "react";
import { Router, Redirect, useHistory } from "react-router-dom";
import { supabase } from "../../client";
import Main from "../Main";

export default function Profile() {
  let history = useHistory();
  const [profile, setProfile] = useState(null);

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

  async function signOut() {
    await supabase.auth.signOut();
    history.push("/sign-in");
  }

  if (!profile) return null;
  return (
    <Main>
      <div>
        <h2>Hello, {profile.email}</h2>
        <p>user ID: {profile.id}</p>
        <button onClick={() => signOut()}> Sign Out </button>
      </div>
    </Main>
  );
}
