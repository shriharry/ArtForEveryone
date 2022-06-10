import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../stores/sagas/actions/auth.action";
import { registrationSelector } from "../stores/selectors/registration.selector";
import { isLoggedInSelector } from "../stores/selectors/auth.selector";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState("");
  const [message, setMessage] = useState("");
  const checkBtn = useRef(null);
  const form = useRef(null);

  const registrationResponse = useSelector(registrationSelector);
  const isUserLoggedIn = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/list", { replace: true });
    }
  }, [navigate, isUserLoggedIn]);

  useEffect(() => {
    if (registrationResponse && registrationResponse?.success) {
      setMessage(registrationResponse.response.message);
      setSuccessful(true);
    } else if (
      registrationResponse &&
      registrationResponse?.success === false
    ) {
      const resMessage =
        registrationResponse?.message?.response?.data?.message ||
        registrationResponse?.toString();
      setMessage(resMessage);
      setSuccessful(false);
    }
  }, [registrationResponse]);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const validateEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  const validateUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  const validatePassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(signup({ firstName, lastName, username, email, password }));
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2 align="center">Sign Up</h2>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  validations={[required, validateUsername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  validations={[required, validateUsername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[required, validateUsername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, validateEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required, validatePassword]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary margin-top-10 ">
                  Sign Up
                </button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful
                    ? "alert alert-success"
                    : "alert alert-danger margin-top-10"
                }
                role="alert"
              >
                {successful ? (
                  <>
                    {message}
                    <br />
                    <Link to={"/login"} className="nav-link">
                      Click Here to Login
                    </Link>{" "}
                  </>
                ) : (
                  message
                )}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}
