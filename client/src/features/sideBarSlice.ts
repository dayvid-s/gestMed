import { createSlice } from "@reduxjs/toolkit";

interface SideBarProps {
    open: boolean;
}

const initialState: SideBarProps = {
  open: false
};

export const sideBar = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    closeSideBar: (state) => {
      state.open= false;
    },
    openSideBar: (state) => {
      state.open = true;
    },

  }
});


export const { openSideBar,closeSideBar } = sideBar.actions;
export const sideBarReducer = sideBar.reducer;