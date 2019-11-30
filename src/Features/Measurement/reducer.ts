import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
    metric: string;
    at: number;
    value: number;
    unit: string;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metric: 'oilTemp',
  at: 0,
  value: 0,
  unit: ''
};

const slice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    measurmentReceived: (state, action: PayloadAction<Measurement>) => {
      const { metric, at, value, unit }  = action.payload;
      state.metric = metric;
      state.at = at;
      state.value = value;
      state.unit = unit;
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
