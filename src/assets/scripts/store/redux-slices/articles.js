import { createSlice } from '@reduxjs/toolkit';

const isPagePresent = (array, searchedData)=>{
  array.forEach(element => {
    if(element===searchedData){
      return true;
    }
    return false;
  });
}

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    visitedPages: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.articles.push(action.payload.articles);
      state.visitedPages.push(action.payload.page);
      if(!isPagePresent(state.visitedPages, action.payload.page)){
      }
    },
  },
});

export const {
  setPage,
} = articlesSlice.actions;

export default articlesSlice.reducer;
