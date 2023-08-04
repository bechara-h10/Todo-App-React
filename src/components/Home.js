import React, { useState, useEffect, useId } from "react";
import Todo from "./Todo";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectProjectId,
  selectProjectName,
} from "../features/project/projectSlice";
import {
  getDoc,
  addDoc,
  doc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";
import { selectUserId } from "../features/user/userSlice";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [todos, setTodos] = useState([]);
  const projectName = useSelector(selectProjectName);
  const userId = useSelector(selectUserId);
  const projectId = useSelector(selectProjectId);
  useEffect(() => {
    getProjectData(userId, projectId);
  }, [projectId]);
  const [input, setInput] = useState("");
  const [dateInput, setDateInput] = useState(new Date());

  const getProjectData = async (userId, projectId) => {
    try {
      const userRef = doc(db, "userData", userId);
      const projectRef = doc(collection(userRef, "projects"), projectId);

      // Get the initial todos data
      const todosRef = collection(projectRef, "todos");
      const todosSnapshot = await getDocs(todosRef);
      const todosData = todosSnapshot.docs.map((todoDoc) => {
        return { id: todoDoc.id, ...todoDoc.data() };
      });
      todosData.forEach((todo) => (todo.dueDate = new Date(todo.dueDate)));

      // Set the initial todos data to the state
      setTodos(todosData);

      // Use onSnapshot to listen for real-time updates for todos
      onSnapshot(todosRef, (snapshot) => {
        const updatedTodosData = snapshot.docs.map((todoDoc) => {
          return { id: todoDoc.id, ...todoDoc.data() };
        });
        updatedTodosData.forEach(
          (todo) => (todo.dueDate = new Date(todo.dueDate))
        );
        console.log(updatedTodosData);
        setTodos(updatedTodosData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addTodoToProject = async (e, userId, projectId) => {
    e.preventDefault();
    if (!input) {
      alert("Inputs cannot be empty!");
      return;
    }
    if (!projectId) {
      alert("You need to select a project!");
      return;
    }
    const todoData = {
      text: input,
      dueDate: new Date(dateInput),
      done: false,
    };
    try {
      const userRef = doc(db, "userData", userId);
      const projectRef = doc(collection(userRef, "projects"), projectId);
      const addedTodo = await addDoc(collection(projectRef, "todos"), {
        text: todoData.text,
        dueDate: todoData.dueDate.toDateString(),
        done: todoData.done,
      });
      toast("Todo added to project successfully");
      setInput("");
      setDateInput(new Date());
    } catch (error) {
      console.error("Error adding todo to project", error);
    }
  };
  return (
    <Container>
      <Content>
        <ProjectTitle>
          <h1>{projectName}</h1>
        </ProjectTitle>
        <form onSubmit={(e) => addTodoToProject(e, userId, projectId)}>
          <input
            type="text"
            placeholder="Add a todo"
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
          {todos &&
            todos.map((todo) => {
              return (
                <Todo
                  text={todo.text}
                  dueDate={todo.dueDate.toDateString()}
                  done={todo.done.toString()}
                  key={todo.id}
                  id={todo.id}
                />
              );
            })}
        </ul>
      </Content>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#00ff55",
            color: "#fff",
          },
        }}
      />
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
      padding: 4px;
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
