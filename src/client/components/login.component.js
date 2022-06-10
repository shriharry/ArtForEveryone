import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../stores/sagas/actions/auth.action";
import {
  loginErrorResponse,
  loginSuccessResponse,
} from "../stores/selectors/auth.selector";
import {
  clearErrorResponse,
  clearSuccessResponse,
} from "../stores/reducers/auth.reducer";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const checkBtn = useRef(null);
  const loginForm = useRef(null);

  const navigate = useNavigate();
  const successResponse = useSelector(loginSuccessResponse);
  const errorResponse = useSelector(loginErrorResponse);

  useEffect(() => {
    if (errorResponse) {
      const resMessage =
        errorResponse?.response?.data?.message || errorResponse?.toString();
      setMessage(resMessage);
      setLoading(false);
      dispatch(clearErrorResponse());
    }
  }, [errorResponse]);

  useEffect(() => {
    if (successResponse) {
      navigate("/list", { replace: true });
      dispatch(clearSuccessResponse());
    }
  }, [navigate, successResponse]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    loginForm.current.validateAll();
    setLoading(true);
    setMessage("");
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login({ username, password }));
    } else {
      setLoading(false);
    }
  };
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2 align="center">Login</h2>
        <Form onSubmit={handleLogin} ref={loginForm}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => onChangeUsername(e)}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => onChangePassword(e)}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary margin-top-10"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div>
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}
