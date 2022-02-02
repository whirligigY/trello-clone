import { useState } from "react";
import { supabase } from "../../client";
import Main from "../Main";
import styled from "@emotion/styled";

const LoginBtn = styled.button`
  padding-left: 2.5rem;
  padding-right: 2.5rem;
`;

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submitEmail(email) {
    //TODO
    /**
     * add a proper email validation here
     *
     **/

    if (!email) return;
    console.log(`email`, email);
    try {
      const { error, data } = await supabase.auth.signIn({ email });
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
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <div className="mb-md-2 mt-md-2 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your email</p>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      name=""
                      id=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control form-control-lg"
                      placeholder="Email"
                    />
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      submitEmail(email);
                    }}
                  >
                    Sign In
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="bi bi-google mx-2 px-1"></i>
                    </a>

                    <a href="#!" className="text-white">
                      <i className="bi bi-github mx-2 px-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}
