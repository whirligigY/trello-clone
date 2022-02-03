import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../client";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  let history = useHistory();
  const [user, setUser] = useState();
  const [authState, setAuthState] = useState("non-authenticated");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`session`, session);
        handleAuthChange(event, session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === "SIGNED_IN") {
          setAuthState("authenticated");
          history.push("/profile");
        } else if (event === "SIGNED_OUT") {
          setAuthState("non-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      listener?.unsubscribe();
    };
  }, [history]);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthState("authenticated");
    }
  }

  async function handleAuthChange(event, session) {
    await fetch("../api/index.js", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  const value = {
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    userProfile: () => supabase.auth.user(),
    user,
    authState,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
