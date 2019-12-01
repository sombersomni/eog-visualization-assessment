import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metric = {
  selectedMetric: [string];
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  selectedMetrics: []
};

const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    weatherDataRecevied: (state, action: PayloadAction<Metric>) => {
      const { selectedMetric } = action.payload;
      state.selectedMetric = selectedMetric
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
