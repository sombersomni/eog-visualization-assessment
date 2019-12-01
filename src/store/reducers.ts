import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as measurementReducer } from '../Features/Measurement/reducer';
import { reducer as metricReducer } from '../Features/Metric/reducer';

export default {
  weather: weatherReducer,
  measurement: measurementReducer,
  metric: metricReducer
};
