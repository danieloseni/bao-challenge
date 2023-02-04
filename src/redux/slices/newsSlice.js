import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  newsIds: [],
  newsItems: null,
  apiNewsItemsLoaded: false,
  csvNewsItemsLoaded: false
}

const sortNews = (news) => {
  if(!Array.isArray(news)) return news;
  return news.sort((a, b) => {
    return b.score - a.score;
  })
}

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
      updateNewsIds: (state, action) => {
        state.newsIds = action.payload;
      },
      updateNewsItems: (state, action) => {
        const newState = Array.isArray(state.newsItems) ? state.newsItems : [];
        state.newsItems = sortNews([...newState, ...action.payload]);
      },
      checkAPINewsFetchStatus: (state, action) => {
        state.apiNewsItemsLoaded = true
      },
      checkCSVNewsFetchStatus: (state, action) => {
        state.csvNewsItemsLoaded = true
      }

    },
})

export const {updateNewsIds, updateNewsItems, checkAPINewsFetchStatus, checkCSVNewsFetchStatus} = newsSlice.actions;
export default newsSlice.reducer;