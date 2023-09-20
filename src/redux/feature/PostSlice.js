import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk("post/getPost", async ({ id }) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return data;
});

export const deletePost = createAsyncThunk("post/deletePost", async ({ id }) => {
    const { data } = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return data;
});

export const createPost = createAsyncThunk("post/createPost", async ({ values }) => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts/', {
            title: values.title,
            body: values.body
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updatePost = createAsyncThunk("post/updatePost", async ({ id, title, body }) => {
    const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title, body
    }, {
        headers: {
            Accept: "application/json",
            'content-type': "application/json"
        }
    })
    return res.data;
});



const PostSlice = createSlice({
    name: "post",
    initialState: {
        post: [],
        loading: false,
        error: null,
        body: '',
        edit: false
    },
    reducers: {
        setEdit: (state, action) => {
            state.body = action.payload.body;
            state.edit = action.payload.edit
        }
    },
    extraReducers: {
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload];
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
export const { setEdit } = PostSlice.actions
export default PostSlice.reducer;
