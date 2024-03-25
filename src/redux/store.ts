import { configureStore } from '@reduxjs/toolkit';

import subjectListReducer from  './subjectListSlice';

export const store = configureStore({
  reducer: {
    subjectsList: subjectListReducer,
  }
});
