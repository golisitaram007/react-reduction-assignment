import { GET_PEERS, GET_COMP_INFO, GET_STOCK_PRICE, API_CALL_ERROR } from './actions';

const initState = {
    peers: [],
    companies: {},
    periods: ['1m', '3m', '6m'],
    stockPrice: [],
    error: false,
    errorMessage: ''
};

const searchReducer = (state = initState, { type, payload }) => {
    switch(type) {
        case GET_PEERS:
            return {
                ...state, peers: payload
            }
        case GET_COMP_INFO:
            return {
                ...state,
                companies: {...state.companies,...payload}
            }
        case GET_STOCK_PRICE:
            return {
                ...state,
                stockPrice: payload
            }
        case API_CALL_ERROR:
            return {
                ...state,
                ...initState,
                ...payload
            }
        default:
            return state
    }
};

export default searchReducer;