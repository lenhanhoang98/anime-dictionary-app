import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkTheme: !!JSON.parse(localStorage.getItem("theme")),
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

export const asyncToggleTheme = () => (dispatch) => {
    const isDarkMode = !!JSON.parse(localStorage.getItem("theme"));
    localStorage.setItem("theme", !isDarkMode);
    dispatch(toggleTheme());
};

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;