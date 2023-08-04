import React, { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectUserId } from "../features/user/userSlice";
import { selectProjectId } from "../features/project/projectSlice";
import { doc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import toast, { Toaster } from "react-hot-toast";

function Todo(props) {
  const [textIsUpdated, setTextIsUpdated] = useState(false);
  const [dateIsUpdated, setDateIsUpdated] = useState(false);
  const [input, setInput] = useState(props.text);
  const [dateInput, setDateInput] = useState(props.dueDate);
  const [done, setDone] = useState(props.done === "true");
  const userId = useSelector(selectUserId);
  const projectId = useSelector(selectProjectId);
  const todoId = props.id;
  const deleteTodo = async () => {
    try {
      const userRef = doc(db, "userData", userId);
      const projectRef = doc(collection(userRef, "projects"), projectId);
      const todoRef = doc(collection(projectRef, "todos"), todoId);
      await deleteDoc(todoRef);
      toast("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const updateTodo = async (e) => {
    try {
      const userRef = doc(db, "userData", userId);
      const projectRef = doc(collection(userRef, "projects"), projectId);
      const todoRef = doc(collection(projectRef, "todos"), todoId);
      await updateDoc(todoRef, {
        text: input,
        dueDate: dateInput,
        done: e.target.checked,
      });
      setDone(e.target.checked);
      setDateInput(dateInput);
      setInput(input);
      toast("Todo updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ListItem done={done.toString()}>
        {textIsUpdated ? (
          <input
            type="text"
            value={input}
            onBlur={() => {
              updateTodo();
              setTextIsUpdated(false);
            }}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          <span onClick={setTextIsUpdated}>{props.text}</span>
        )}
        <span>
          {dateIsUpdated ? (
            <input
              type="date"
              value={dateInput}
              onBlur={() => {
                updateTodo();
                setDateIsUpdated(false);
              }}
              onChange={(e) => setDateInput(e.target.value)}
            />
          ) : (
            <span onClick={setDateIsUpdated}>{props.dueDate}</span>
          )}
        </span>
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => {
            setDone(e.target.checked);
            updateTodo(e);
          }}
        />

        <CustomDeleteIcon onClick={deleteTodo} />
      </ListItem>
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
    </>
  );
}

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  font-size: 18px;
  span {
    cursor: pointer;
  }
  span:not(:last-child) {
    text-decoration: ${(props) =>
      props.done === "true" ? "line-through" : "none"};
    color: ${(props) => (props.done === "true" ? "#32CD32	" : "")};
  }
  input {
    font-size: 18px;
    padding: 4px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    &:focus {
      border: solid 1px rgba(0, 0, 0, 0.75);
      outline: none;
    }
  }
`;

const CustomDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
  &:hover {
    animation: jump 250ms ease-in-out;
    color: #d11a2a;
  }
`;

export default Todo;
