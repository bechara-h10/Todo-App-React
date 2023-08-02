import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
    setUserId: (state, action) => {
      state.id = action.payload.id;
    },
    setLogout: (state) => {
      state.name = "";
      state.email = "";
      state.photo = "";
    },
  },
});

export const { setSignIn, setLogout, setUserId } = userSlice.actions;
export function selectUserName(state) {
  console.log(state);
  return state.user.name;
}

export function selectUserEmail(state) {
  return state.user.email;
}

export function selectUserPhoto(state) {
  return state.user.photo;
}

export function selectUserId(state) {
  return state.user.id;
}

export default userSlice.reducer;
