import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  todos: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.todos = action.payload.todos;
    },
  },
});

export const { setProject } = projectSlice.actions;
export function selectProjectName(state) {
  return state.project.name;
}

export function selectProjectTodos(state) {
  return state.project.todos;
}

export function selectProjectId(state) {
  return state.project.id;
}

export default projectSlice.reducer;
