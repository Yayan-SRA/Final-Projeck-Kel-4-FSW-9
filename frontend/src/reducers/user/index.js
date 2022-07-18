import { LOGIN, GET_USER } from "../../actions/userAction";
const initialState = {
    loginResult: false,
    loginLoading: false,
    loginError: false,

    getUSerResult: false,
    getUSerLoading: false,
    getUSerError: false,
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                loginResult: action.payload.data,
                loginLoading: action.payload.loading,
                loginError: action.payload.errorMessage,
            };
        case GET_USER:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                getUserResult: action.payload.data,
                getUserLoading: action.payload.loading,
                getUserError: action.payload.errorMessage,
            };
    
        default:
            return state;
    }
}

export default user