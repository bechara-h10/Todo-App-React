import React from "react";
import styled from "styled-components";
import { selectProjectId, setProject } from "../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { selectUserId } from "../features/user/userSlice";
import db from "../firebase";
import { doc, collection, deleteDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

function Project(props) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const projectId = props.id;
  const selectedProjectId = useSelector(selectProjectId);
  const handleClick = (e) => {
    dispatch(setProject({ id: props.id, name: props.name }));
  };
  const deleteProject = async () => {
    try {
      const userRef = doc(db, "userData", userId);
      const projectRef = doc(collection(userRef, "projects"), projectId);
      await deleteDoc(projectRef);
      toast("Project deleted successfully");
      if (selectedProjectId === projectId) {
        dispatch(
          setProject({
            id: "",
            name: "",
          })
        );
      }
    } catch (error) {
      console.log("Error in deleting project", error);
    }
  };
  return (
    <Container onClick={handleClick}>
      <ProjectTitle href="#" key={props.id}>
        {props.name}
      </ProjectTitle>
      <CustomRemoveIcon onClick={deleteProject} />
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 16px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #777;
  }
`;

const ProjectTitle = styled.a`
  flex: 3;
`;

const CustomRemoveIcon = styled(RemoveCircleIcon)`
  flex: 1;
  cursor: pointer;
  &:hover {
    color: #d11a2a;
    animation: jump 250ms ease-in-out;
  }
`;

export default Project;
