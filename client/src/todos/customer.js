import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    customer: [],
    loading: false,
    error: '',
    search: '',
};

export const todosSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        fetchPending(state) {
            state.loading = true;
            state.customer = [];
            state.error = '';
        },
        fetchSuccess(state, action) {
            state.loading = false;
            state.customer = action.payload;
            state.error = '';
        },
        fetchReject(state, action) {
            state.loading = false;
            state.customer = [];
            state.error = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        },
    },
});

export const { fetchPending, fetchSuccess, fetchReject, setSearch } = todosSlice.actions;

export const fetchAsync = () => async (dispatch, getState) => {
    try {
        dispatch(fetchPending());
        const { search } = getState().customer;
        const { data } = await axios.get(`http://localhost:3000?search=${search}`);
        dispatch(fetchSuccess(data));
    } catch (error) {
        dispatch(fetchReject(error.message));
    }
};

export default todosSlice.reducer;
