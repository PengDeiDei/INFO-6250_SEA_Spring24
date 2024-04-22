export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_CATEGORY: 'required-category',
  REQUIRED_AMOUNT: 'required-amount',
  TRANSACTION_MISSING: 'noSuchId',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  // Here we use 'dog' to simulate a bad password
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_CATEGORY]: 'Please choose the category of the transaction',
  [SERVER.REQUIRED_AMOUNT]: 'Please enter the amount of the transaction',
  default: 'Something went wrong.  Please try again',
};

export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  REPORT_ERROR: 'reportError',
  START_LOADING_TRANSACTIONS: 'startLoadingTransactions',
  ADD_TRANSACTION: 'addTransaction',
  DELETE_TRANSCTION: 'deleteTransaction',
  REPLACE_TRANSACTIONS: 'replaceTransactions',
}

