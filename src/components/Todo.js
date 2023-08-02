import React from "react";
import styled from "styled-components";

function Todo(props) {
  return (
    <>
      <ListItem done={props.done}>
        <span>{props.text}</span>
        <span>{props.dueDate}</span>
        <span>{props.done ? "Done" : "Not done yet"}</span>
      </ListItem>
    </>
  );
}

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  span:not(:last-child) {
    text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  }
`;

export default Todo;
