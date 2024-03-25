
import { createSlice } from '@reduxjs/toolkit';
import { SubjectInteface } from '../interfaces/subject.interface';

const initialState: {
  subjectsSelected: SubjectInteface[],
  barcharSelected: SubjectInteface
} = {
  subjectsSelected: [],
  barcharSelected: {
    uuid: '',
    uuidTeacher: '',
    name: '',
    numCredits: 0,
    days: [],
    hour: ''
  }
}

export const subjectListSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    addSubject: (state, action) => {
      const { subject } = action.payload;
      state.subjectsSelected.push(subject)
    },
    addBarChartItem: (state, action) => {
      const { subject } = action.payload;
      state.barcharSelected = subject
    },

  }
});

export const {
  addSubject, addBarChartItem
} = subjectListSlice.actions;

export default subjectListSlice.reducer;