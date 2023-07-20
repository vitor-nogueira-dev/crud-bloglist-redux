import { SET_NAME } from "@/actions/constants";
import { IActionReducer } from "@/interfaces/IActionReducer";
import { IListState } from "@/interfaces/IListState";

const initialState: IListState = {
    items: [],
    name: '',
};

const listReducer = (state = initialState, action: IActionReducer) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case '':
        default:
            return state;
    }
};

export default listReducer;
