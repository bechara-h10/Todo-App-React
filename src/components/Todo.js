import React from "react";
import styled from "styled-components";

function Todo(props) {
  return (
    <>
      <ListItem>
        <span>{props.text}</span>
        <span>{props.dueDate}</span>
      </ListItem>
    </>
  );
}

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`;

export default Todo;
