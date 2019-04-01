import { LOAD_DATA } from './types';

export const getWeatherData = (lat, lon) => {
    console.log(lat, lon);
    return ({ type: LOAD_DATA, payload: { lat, lon } });
};
