import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../features/project/projectSlice";
import db from "../firebase";
import AddIcon from "@mui/icons-material/Add";
import BackspaceIcon from "@mui/icons-material/Backspace";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import toast, { Toaster } from "react-hot-toast";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { selectUserEmail, setUserId } from "../features/user/userSlice";
import Project from "./Project";

function NavBar() {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const [allProjects, setAllProjects] = useState([]);
  const [projectAdd, setProjectAdd] = useState(false);
  const [input, setInput] = useState("");
  const getUserId = async () => {
    try {
      const usersRef = collection(db, "userData");
      const queryByEmail = query(usersRef, where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(queryByEmail);
      if (!querySnapshot.empty) {
        const userId = querySnapshot.docs[0].id;
        return userId;
      } else {
        console.log("User not found");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    try {
      const userId = await getUserId();
      dispatch(setUserId({ id: userId }));
      const userRef = doc(db, "userData", userId);

      // Use onSnapshot to listen for real-time updates for user data
      onSnapshot(userRef, (userSnapshot) => {
        if (userSnapshot.exists()) {
          const projectsRef = collection(userRef, "projects");

          // Use onSnapshot to listen for real-time updates for projects
          onSnapshot(projectsRef, (snapshot) => {
            const projectsData = [];
            snapshot.forEach((projectDoc) => {
              const projectData = { ...projectDoc.data(), id: projectDoc.id };
              projectsData.push(projectData);
            });

            setAllProjects(projectsData);
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addProject = async () => {
    if (!input) {
      alert("Please enter a project name");
      return;
    }
    try {
      const userId = await getUserId();
      dispatch(setUserId({ id: userId }));
      const userRef = doc(db, "userData", userId);
      const projectsRef = collection(userRef, "projects");
      const newProjectRef = doc(projectsRef);
      await setDoc(newProjectRef, { name: input });
      toast("Project added successully");
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userEmail) {
      getData();
    }
  }, [userEmail]);

  return (
    <Container>
      {allProjects &&
        allProjects.map((project, index) => {
          return (
            <Project name={project.name} key={project.id} id={project.id} />
          );
        })}
      {projectAdd ? (
        <>
          <input
            type="text"
            value={input}
            placeholder="Add a project"
            onChange={(e) => setInput(e.target.value)}
          />
          <Icons>
            <CustomBackSpaceIcon
              sx={{ fontSize: 20 }}
              onClick={() => {
                setProjectAdd(false);
                setInput("");
              }}
            />
            <CustomCheckMarkIcon
              sx={{ fontSize: 20 }}
              onClick={() => {
                addProject();
                setProjectAdd(false);
              }}
            />
          </Icons>
        </>
      ) : (
        <CustomAddIcon onClick={() => setProjectAdd(true)} />
      )}
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

const Container = styled.nav`
  position: absolute;
  height: 100vh;
  width: 150px;
  background-color: #252525;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
  }
  input {
    width: 100%;
    padding: 4px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    &:focus {
      border: solid 1px rgba(0, 0, 0, 0.75);
      outline: none;
    }
  }
`;

const ProjectTitle = styled.a``;

const CustomAddIcon = styled(AddIcon)`
  cursor: pointer;
  &:hover {
    animation: shake 250ms ease-in-out;
    color: #00ff55;
  }
`;

const CustomBackSpaceIcon = styled(BackspaceIcon)`
  cursor: pointer;
  color: #d11a2a;
  &:hover {
    animation: back 500ms ease-in-out;
  }
`;

const CustomCheckMarkIcon = styled(BeenhereIcon)`
  cursor: pointer;
  color: #00ff55;
  &:hover {
    animation: shake 250ms ease-in-out;
  }
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25%;
  margin-top: 4px;
`;

export default NavBar;
