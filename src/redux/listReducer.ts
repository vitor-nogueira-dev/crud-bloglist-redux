import { IActionReducer } from "@/interfaces/IActionReducer";
import { IListState } from "@/interfaces/IListState";

const initialState: IListState = {
    items: [],
};

const listReducer = (state = initialState, action: IActionReducer) => {
    switch (action.type) {
        case '':
        case '':
        default:
            return state;
    }
};

export default listReducer;
