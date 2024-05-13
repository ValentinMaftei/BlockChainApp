import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: JSON.parse(localStorage.getItem('id')) || null,
        balance: JSON.parse(localStorage.getItem('balance')) || null,
        changes: false, 
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload;
            localStorage.setItem('id', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.balance = null;
            localStorage.removeItem('id');
            localStorage.removeItem('balance');
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
            localStorage.setItem('balance', JSON.stringify(action.payload));
        },
        setChanges: (state) => {
            state.changes = !state.changes;
        }
    },
});

export const { login, logout, setBalance, setChanges } = userSlice.actions;
export default userSlice.reducer;