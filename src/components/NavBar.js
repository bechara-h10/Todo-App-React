import React from "react";
import styled from "styled-components";

function NavBar() {
  return (
    <Container>
      <a href="#">Project 1</a>
      <a href="#">Project 2</a>
    </Container>
  );
}

const Container = styled.nav`
  position: absolute;
  height: 100vh;
  width: 100px;
  background-color: #252525;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  overflow: auto;
  a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
  }
`;

export default NavBar;
