import "./signIn.css";
import { useState, useRef } from "react";
import Main from "../Main";
import styled from "@emotion/styled";
import { Auth, Typography, Button } from "@supabase/ui";
import { useAuth } from "../../contexts/Auth";
import { supabase } from "../../client";

const LoginBtn = styled.button`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
`;

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { signIn } = useAuth();

  async function submitEmail(e) {
    e.preventDefault();
    //TODO
    /**
     * add a proper email validation here
     *
     **/

    if (!email) return;
    console.log(`email`, email);

    try {
      const { error } = await signIn({ email });
      console.log(`submit email`);
      if (error) throw new Error(error);
      else setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("submitted state", submitted);
    }
  }

  if (submitted) {
    console.log(`submitted!`);
    return (
      <Main>
        <div>
          <h2>Please check your email to get your Magic Link.</h2>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Auth supabaseClient={supabase} providers={["google", "github"]} />
      </Auth.UserContextProvider>
    </Main>
  );
}
