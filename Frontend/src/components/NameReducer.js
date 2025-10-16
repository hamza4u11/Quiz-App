import Result from "./result";

const initialState = {

    name: '',
    result: 0
};

function nameReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
            ` case 'SET_RESULT':
            return {
                ...state,
                result: action.payload,
            };`
        case 'SET_RESULT':
            return { ...state, result: action.payload };
            ` case 'SET_RESULT':
            return {
                 ...state,
                result: action.payload,
            };`
        default:
            return state;
    }
}

export default nameReducer;
