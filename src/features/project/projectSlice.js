import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setProject } = projectSlice.actions;
export function selectProjectName(state) {
  return state.project.name;
}

export function selectProjectId(state) {
  return state.project.id;
}

export default projectSlice.reducer;
