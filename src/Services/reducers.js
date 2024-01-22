import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    header: {
        isOpen: true,  // Set the initial value to true
    },
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHeaderState: (state, action) => {
            state.header = action.payload;
        },
    },
});

export const { setHeaderState } = appSlice.actions;
export default appSlice.reducer;