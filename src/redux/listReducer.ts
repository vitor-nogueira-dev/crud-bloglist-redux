import { SET_CLEAR_STATE, SET_LIST, SET_NAME, SET_PAGINATION } from "@/actions/constants";
import { IActionReducer } from "@/interfaces/IActionReducer";
import { IListState } from "@/interfaces/IListState";

export const initialState: IListState = {
    list: [],
    name: '',
    pagination: {},
};

const listReducer = (state = initialState, action: IActionReducer) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case SET_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case SET_PAGINATION:
            return {
                ...state,
                pagination: action.payload,
            };
        case SET_CLEAR_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export default listReducer;
