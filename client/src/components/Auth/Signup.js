import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { sign_up } from "../../Queries/mutation";

const initialErrors = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  error: ""
};

export default function Signup(props) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [errors, setErrors] = React.useState(initialErrors);
  const [signup] = useMutation(sign_up);
  const handleSubmit = async e => {
    e.preventDefault();
    const errors = {};
    if (!username) errors.username = "Username cannot be empty";
    if (Object.keys(errors).length > 0)
      setErrors(prev => ({ ...prev, errors }));
    try {
      const { data } = await signup({
        variables: { email, password, username }
      });
      localStorage.setItem("token", data.signUpUser.token);
      props.refetch();
      props.history.push("/");
    } catch (error) {
      setErrors(prev => ({ ...prev, error: error.message }));
    }
  };
  return (
    <section className="section">
      <div className="columns">
        <div className="column is-full-mobile is-6-tablet is-offset-3-tablet is-one-third-desktop is-offset-one-third-desktop">
          <form onSubmit={handleSubmit}>
            {errors.error && (
              <div className="notification is-danger is-light">
                {errors.error}
              </div>
            )}
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${errors.username ? "is-danger" : ""}`}
                  type="text"
                  placeholder="Username input"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                {/* <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span> */}
              </div>
              {errors.username && (
                <p className="help is-danger">{errors.username}</p>
              )}
            </div>
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
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  placeholder="Confirm Password input"
                  value={passwordConfirmation}
                  onChange={e => setPasswordConfirmation(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
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
