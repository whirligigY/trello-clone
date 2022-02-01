import { useState } from "react";
import { supabase } from "../../../client";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submitEmail() {
    //TODO
    /**
     * add a proper email validation here
     **/

    if (!email) return;

    const { error, data } = await supabase.auth.signIn({
      email,
    });

    if (error) console.error(error);
    else setSubmitted(true);
  }
  if (submitted) {
    return (
      <div>
        <h2>Please check your email to get your Magic Link.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        name=""
        id=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => submitEmail()}>Sign In</button>
    </div>
  );
}
