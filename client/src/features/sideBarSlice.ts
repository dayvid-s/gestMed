import { createSlice } from "@reduxjs/toolkit"

interface SideBarProps {
    value: boolean;
}

const initialState: SideBarProps = {
    value: false
}

export const sideBar = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
        closeSideBar: (state) => {
                state.value= false
        },
        openSideBar: (state) => {
            state.value = true
        },

    }
})


export const { openSideBar,closeSideBar } = sideBar.actions
export const sideBarReducer = sideBar.reducer