import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserName, setSignIn } from "../features/user/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        let user = result.user;
        dispatch(
          setSignIn({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setSignIn({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <Container>
      <WelcomeMessage>
        <h1>Welcome to our Todo App</h1>
      </WelcomeMessage>
      <SignInButton onClick={signIn}>Sign In</SignInButton>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

const WelcomeMessage = styled.div``;

const SignInButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 24px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #42a5f5;
  }
`;

export default Login;
