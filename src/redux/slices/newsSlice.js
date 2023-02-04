import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsItem } from "types/item";


const initialState = {
    newsIds: [],
    newsItems: [],
    newsItemLoaded: false
}


const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
      updateNewsIds: (state, action) => {
        state.newsIds = action.payload    
        state.newsItemLoaded = true;        
      },
      updateNewsItems: (state, action) => {
        state.newsItems = action.payload
      }
    },
    extraReducers: (builder) => {
    //   builder.addCase()
    },
})

export const {updateNewsIds} = fileSlice.actions;