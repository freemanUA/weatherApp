import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    weatherData: {},
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_DATA:
            return { ...state, loading: true };
        case LOAD_DATA_SUCCESS:
            return { ...state, loading: false, weatherData: action.payload };
        case LOAD_DATA_FAILED:
            return { ...state, loading: false };
        default:
            return state;
    }
};
