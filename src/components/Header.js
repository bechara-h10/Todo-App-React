import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  selectUserName,
  selectUserEmail,
  selectUserPhoto,
  setSignIn,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPhoto = useSelector(selectUserPhoto);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
      setIsLoading(false); // Set loading state to false once authentication is completed
    });

    // Clean up the subscription to avoid memory leaks
    return () => unsubscribe();
  }, []);

  // Render the loading state while waiting for authentication to complete
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the header once authentication is completed
  return (
    <Container>
      <HeaderTitle>
        <h1>Todo App</h1>
      </HeaderTitle>
      {userPhoto ? <UserImg src={userPhoto} /> : null}
    </Container>
  );
}

const Container = styled.header`
  min-height: 70px;
  background-color: #252525;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
`;

const HeaderTitle = styled.div`
  margin-left: 100px;
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export default Header;
