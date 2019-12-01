import { PayloadAction } from 'redux-starter-kit';

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

export const actions = {
  'metricReceived': (payload: string) => ({
    type: 'UPDATE_METRIC',
    payload
  }),
  'measurementReceived': (payload: Measurement) => ({
    type: 'UPDATE_MEASURMENT',
    payload
  })
};


export const reducer = (state = initialState, action: PayloadAction<Measurement>) => {
  switch(action.type) {
    case 'UPDATE_MEASUREMENT':
      return {...state};
    default: 
      return state;
  }
}