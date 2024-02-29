import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    header: {
        isOpen: true,  // Set the initial value to true
    }, token: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHeaderState: (state, action) => {
            state.header = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setHeaderState, setToken } = appSlice.actions;
export default appSlice.reducer;