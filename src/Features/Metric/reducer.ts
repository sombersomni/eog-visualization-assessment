import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metric = {
  selectedMetric: string;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  selectedMetric: 'injValveOpen'
};

const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    setMetric: (state, action: PayloadAction<string>): void => {
        state.selectedMetric = action.payload;
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
