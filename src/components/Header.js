import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <HeaderTitle>
        <h1>Todo App</h1>
      </HeaderTitle>
      <UserImg src="./images/logo512.png" />
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
