import {
    LOGIN_STATUS,
    CLIENT,
    ACTIONS,
} from './constants';

export const initialState = {
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.PENDING,
    isTransactionPending: false,
    transactions: {},
    lastAddedTransactionId: '',
}

function reducer(state, action ) {
    switch(action.type) {

        case ACTIONS.LOG_IN:
            return {
                ...state,
                error: '',
                loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
                username: action.username,
            };

        case ACTIONS.START_LOADING_TRANSACTIONS:
            return {
                ...state,
                error: '',
                isTransactionPending: true,
            };

        case ACTIONS.REPLACE_TRANSACTIONS:
            return {
                ...state,
                error: '',
                isTransactionPending: false,
                lastAddedTransactionId: '',
                transactions: action.transactions,
            };  

        case ACTIONS.LOG_OUT:
                return { 
                    ...state,
                    error: '',
                    isTransactionPending: false,
                    transactions: {},
                    loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
                    lastAddedTransactionId: '',
                    username: '',
                };

        case ACTIONS.REPORT_ERROR:
            return {
                ...state,
                error: action.error || 'ERROR',
            };

        case ACTIONS.DELETE_TRANSCTION:
            const transactionsCopy = {...state.transactions};
            delete transactionsCopy[action.id];
            return{
                ...state,
                transactions: transactionsCopy,
            };

        case ACTIONS.ADD_TRANSACTION:
            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    [action.transaction.id]: action.transaction,
                }
            };

        default:
            throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action});
    }
}

export default reducer;