import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS } from './actions/types';
import { toastr } from './helpers/toastHelper';

//get weather data
const fetchData = ({ lat, lon }) => {
    const API_KEY = '4235b2705a1d015278b70fbd3ddd7543';
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`;
    return axios.get(url);
};

function* getWeatherData(action) {
    try {
        const { payload } = action;
        const response = yield call(fetchData, payload);
        const { data, error } = response;
        if (error) {
            yield put({ type: LOAD_DATA_FAILED });
            toastr.showToast(JSON.stringify(error));
        } else {
            //set timestamp
            data.main.timestamp = new Date();
            yield put({ type: LOAD_DATA_SUCCESS, payload: data });
        }
    } catch (e) {
        console.log(e);
        yield put({ type: LOAD_DATA_FAILED });
        toastr.showToast(JSON.stringify(e));
    }
}

export default function* rootSaga() {
    yield takeEvery(LOAD_DATA, getWeatherData);
}
