import React, { useState, useEffect, useId } from "react";
import Todo from "./Todo";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectProjectName,
  selectProjectTodos,
} from "../features/project/projectSlice";
import { addDoc, doc, setDoc, collection } from "firebase/firestore";
import db from "../firebase";
import { selectUserId } from "../features/user/userSlice";

function Home() {
  const [project, setCurrentProject] = useState({ name: "", todos: [] });
  const projectName = useSelector(selectProjectName);
  const projectTodos = useSelector(selectProjectTodos);
  const userId = useSelector(selectUserId);
  useEffect(() => {
    setCurrentProject({
      name: projectName,
      todos: projectTodos,
    });
  }, [projectName, projectTodos]);
  const [input, setInput] = useState("");
  const [dateInput, setDateInput] = useState(new Date());
  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      text: input,
      dueDate: dateInput,
      done: false,
    };
    const userRef = doc(db, "userData", userId);
    const projectRef = collection(userRef, "projects").doc();
  };
  return (
    <Container>
      <Content>
        <ProjectTitle>
          <h1>{project.name}</h1>
        </ProjectTitle>
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Take out the dogs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {project &&
            project.todos.map((todo, index) => {
              return (
                <Todo
                  text={todo.text}
                  dueDate={todo.dueDate.toDateString()}
                  done={todo.done}
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
    gap: 4px;
    input {
      flex: 3;
      font-size: 18px;
      padding: 4px 0;
      border: solid 1px rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      &:focus {
        border: solid 1px rgba(0, 0, 0, 0.75);
        outline: none;
      }
    }
    input[type="date"] {
      flex: 1;
    }
    button {
      padding: 8px 16px;
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

const ProjectTitle = styled.div`
  margin-bottom: 24px;
`;

export default Home;
