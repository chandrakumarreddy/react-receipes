import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { sign_in } from "../../Queries/mutation";

const initialErrors = {
  email: "",
  password: ""
};

export default function Signin(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState(initialErrors);
  const [signIn, { data }] = useMutation(sign_in);
  const handleSubmit = async e => {
    e.preventDefault();
    const errors = {};
    if (!email) errors.email = "Email cannot be empty";
    if (Object.keys(errors).length > 0) setErrors(errors);
    const { data } = await signIn({ variables: { email, password } });
    localStorage.setItem("token", data.signInUser.token);
    props.refetch();
    props.history.push("/");
  };
  return (
    <section className="section">
      <div className="columns">
        <div className="column is-full-mobile is-6-tablet is-offset-3-tablet is-one-third-desktop is-offset-one-third-desktop">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                {/* <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span> */}
              </div>
              {/* <p className="help is-danger">This email is invalid</p> */}
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Password input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-key"></i>
                </span>
                {/* <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span> */}
              </div>
              {/* <p className="help is-danger">This email is invalid</p> */}
            </div>
            <div className="field center">
              <button className="button is-info is-fullwidth">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
