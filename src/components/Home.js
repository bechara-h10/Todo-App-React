import React, { useState } from "react";
import Todo from "./Todo";
import styled from "styled-components";

function Home() {
  const [allTodos, setTodos] = useState({
    userEmail: "bechara.hosri1@gmail.com",
    todos: [
      { text: "Go grocery shopping", dueDate: new Date() },
      { text: "Take out the trash", dueDate: new Date() },
    ],
  });
  const [input, setInput] = useState("");
  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      text: input,
      dueDate: new Date(),
    };
    allTodos.todos.push(newTodo);
    setTodos(allTodos);
    console.log(allTodos.todos);
    setInput("");
  };
  return (
    <Container>
      <Content>
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Take out the dogs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {allTodos.todos.map((todo, index) => {
            return (
              <Todo
                text={todo.text}
                dueDate={todo.dueDate.toDateString()}
                key={index}
              />
            );
          })}
        </ul>
      </Content>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: min(50%, 700px);
  padding: 16px 24px;
  z-index: 10;
  form {
    display: flex;
    justify-content: space-between;
    input {
      flex: 1;
      font-size: 18px;
      padding: 4px 0;
      border: solid 1px rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      &:focus {
        border: solid 1px rgba(0, 0, 0, 0.75);
        outline: none;
      }
    }
    button {
      padding: 8px 16px;
      margin-left: 8px;
      border-radius: 4px;
      border: none;
      background-color: #24a0ed;
      color: #fff;
      transition: opacity 250ms ease;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  ul {
    list-style: none;
  }
`;

export default Home;
