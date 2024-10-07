import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AffirmationState {
  affirmation: string;
  readCount: number;
}

const initialState: AffirmationState = {
  affirmation: 'You are capable of amazing things!',
  readCount: 0,
};

const affirmationSlice = createSlice({
  name: 'affirmation',
  initialState,
  reducers: {
    incrementReadCount(state) {
      state.readCount += 1;
    },
    setAffirmation(state, action: PayloadAction<string>) {
      state.affirmation = action.payload;
    },
  },
});

export const { incrementReadCount, setAffirmation } = affirmationSlice.actions;
export default affirmationSlice.reducer;
