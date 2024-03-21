export const err_msg = {
    'network-error': 'Please check your network connection!',
    'required-username': 'Username is empty or invalid! Username should be less than 20 characters in length! Please enter your username again!',
    'auth-insufficient': 'Invalid username! Username cannot be "dog"!',
    'auth-missing': 'User is not logged in!',
    'required-word': 'New word is empty! Please enter again!',
}

const state = {
    username: '',
    messages: [],
    sessions: {},
    error: '',
    isLoadingLogin: false,
    isLoggedIn: false,
    isLoadingMsg: false,
};

export default state;