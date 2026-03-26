import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkTheme: localStorage.getItem("theme") !== null ? JSON.parse(localStorage.getItem("theme")) : true,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkTheme = !state.darkTheme;
        },
    },
});

export const asyncToggleTheme = () => (dispatch, getState) => {
    const nextTheme = !getState().theme.darkTheme;
    localStorage.setItem("theme", JSON.stringify(nextTheme));
    dispatch(toggleTheme());
};

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;