import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../features/project/projectSlice";
import db from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { selectUserEmail, setUserId } from "../features/user/userSlice";

function NavBar() {
  const userEmail = useSelector(selectUserEmail);
  const dispatch = useDispatch();
  const [allProjects, setAllProjects] = useState([]);
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
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const projectsRef = collection(userRef, "projects");
        const projectsSnapshot = await getDocs(projectsRef);
        const projectsData = [];
        for (const projectDoc of projectsSnapshot.docs) {
          const projectData = projectDoc.data();
          const todosRef = collection(projectDoc.ref, "todos");
          const todosSnapshot = await getDocs(todosRef);
          const todosData = todosSnapshot.docs.map((todoDoc) => todoDoc.data());
          console.log(todosData);
          todosData.forEach((todo) => (todo.dueDate = new Date(todo.dueDate)));
          projectsData.push({
            ...projectData,
            id: projectDoc.id,
            todos: todosData,
          });
        }
        setAllProjects(projectsData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (userEmail) {
      getData();
    }
  }, [userEmail]);
  const getProjectByName = (name) => {
    return allProjects.filter((project) => project.name === name)[0];
  };
  const handleClick = (e) => {
    const currentProject = getProjectByName(e.target.innerText);
    dispatch(setProject({ ...currentProject }));
  };
  return (
    <Container>
      {allProjects &&
        allProjects.map((project, index) => {
          return (
            <ProjectTitle href="#" key={index} onClick={handleClick}>
              {project.name}
            </ProjectTitle>
          );
        })}
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

const ProjectTitle = styled.a``;

export default NavBar;
