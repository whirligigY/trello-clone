import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../client";

//TODO: password restore
/**
 * fix password restore
 * when password is restared user is singed in directly without asking to reset the assword
 *
 **/

const AuthContext = React.createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
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
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === "SIGNED_IN") {
          setAuthState("authenticated");
          history.push("/");
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
