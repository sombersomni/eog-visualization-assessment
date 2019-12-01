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
    addMetric: (state, action: PayloadAction<string>) => {
        state.selectedMetric.push(action.payload);
    },
    removeMetric: (state, action: PayloadAction<string>) => {
        state.selectedMetric = state.selectedMetric.filter((metric: string) => metric === action.payload);
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
