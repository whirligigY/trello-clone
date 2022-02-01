import { useState, useEffect } from "react";
import { Router, Redirect } from "react-router-dom";
import { supabase } from "../../../client";

export default function Profile() {
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
      return <Redirect to="/sign-in" />;
    } else {
      setProfile(profileData);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    return <Redirect to="/sign-in" />;
  }

  if (!profile) return null;
  return (
    <div>
      <h2>Hello, {profile.email}</h2>
      <p>user ID: {profile.id}</p>
      <button onClick={signOut}> Sign Out </button>
    </div>
  );
}
