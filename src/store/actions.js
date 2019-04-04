export const GET_PEERS = 'GET_PEERS';
export const GET_COMP_INFO = 'GET_COMP_INFO';
export const GET_STOCK_PRICE = 'GET_STOCK_PRICE';
export const API_CALL_ERROR = 'API_CALL_ERROR';

export const getPeers = inputQuote => {
    return dispatch => {
        apiCall(`https://api.iextrading.com/1.0/stock/${inputQuote}/peers`)
            .then(res => {
                dispatch({
                    type: GET_PEERS, payload: res
                })
            })
            .catch(err => {
                dispatch({
                    type: API_CALL_ERROR, payload: { error: true, errorMessage: err.message }
                })
            })
    }
};

export const getCompInfo = stockQuote => {
    return dispatch => {
        apiCall(`https://api.iextrading.com/1.0/stock/${stockQuote}/company`)
            .then(res => {
                dispatch({
                    type: GET_COMP_INFO, payload: { [stockQuote]: res.description }
                })
            })
            .catch(err => {
                dispatch({
                    type: API_CALL_ERROR, payload: { error: true, errorMessage: err.message }
                })
            })
    }
};

export const getStockPrice = (stockQuote, period) => {
    return dispatch => {
        apiCall(`https://api.iextrading.com/1.0/stock/${stockQuote}/chart/${period}`)
            .then(res => {
                dispatch({
                    type: GET_STOCK_PRICE, payload: res
                })
            })
            .catch(err => {
                dispatch({
                    type: API_CALL_ERROR, payload: { error: true, errorMessage: err.message }
                })
            })
    }
};

const handleErrors = response => {
    if(!response.ok) {
        throw new Error("No Data found.")
    }
    return response.json();
}
const apiCall = (url) => {
    return fetch(url).then(handleErrors);
}