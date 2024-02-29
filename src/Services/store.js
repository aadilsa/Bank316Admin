import { configureStore, createSlice } from '@reduxjs/toolkit';

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
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setHeaderState, setToken } = appSlice.actions;

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
});

export default store;