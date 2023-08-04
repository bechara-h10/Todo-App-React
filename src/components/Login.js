import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserName, setSignIn } from "../features/user/userSlice";
import db from "../firebase";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      dispatch(
        setSignIn({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      const userRef = collection(db, "userData");
      const queryByEmail = query(userRef, where("userEmail", "==", user.email));
      const userSnapshot = await getDoc(queryByEmail);
      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          userEmail: user.email,
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
