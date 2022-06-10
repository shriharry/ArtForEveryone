import React, { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser, signOut } from "./utils/auth.util";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Drawings from "./components/drawings.component";
import List from "./components/list.component";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInSelector } from "./stores/selectors/auth.selector";
import { logout, setLoginSuccess } from "./stores/reducers/auth.reducer";
import AuthGuard from "./utils/AuthGuard";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const user = getCurrentUser();
  const isUserLoggedIn = useSelector(isLoggedInSelector);
  const isLoggedIn = user | isUserLoggedIn;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setLoginSuccess(user));
    }
  }, [user]);

  const logOut = () => {
    signOut();
    dispatch(logout());
  };

  return (
    <div>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="login">
            <span className="multi-color">
              <i className="bi bi-palette-fill"></i> Art for Everyone
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isLoggedIn ? (
              <Nav className="me-auto" style={{ fontSize: 18 }}>
                <Nav.Link href="list">All Drawings</Nav.Link>
                <Nav.Link href="create">Create Drawing</Nav.Link>
                <Nav.Link onClick={logOut}>
                  Sign Out <i className="bi bi-box-arrow-right"></i>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="signup">Sign Up</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            path="/list"
            element={
              <AuthGuard isLoggedIn={isLoggedIn}>
                <List />
              </AuthGuard>
            }
          />
          <Route
            path="/create"
            element={
              <AuthGuard isLoggedIn={isLoggedIn}>
                <Drawings />
              </AuthGuard>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}
