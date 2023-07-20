import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { initialState } from "../redux/listReducer";
import { SET_LIST, SET_NAME, SET_PAGINATION } from "./constants";
import { IActionReducer } from "@/interfaces/IActionReducer";

export const ACTION_SET_NAME = (name: string) => ({
    type: SET_NAME,
    payload: name,
});

export const ACTION_SET_LIST = (list: any) => ({
    type: SET_LIST,
    payload: list,
})

export const ACTION_SET_PAGINATION = (pagination: any) => ({
    type: SET_PAGINATION,
    payload: pagination,
  });

export const ACTION_GET_LIST = (
    limit: number,
    offset: number
): ThunkAction<void, typeof initialState, null, IActionReducer> => {
    return async (dispatch: Dispatch<IActionReducer>) => {
        const response = await fetch(
            `https://dev.codeleap.co.uk/careers/?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();
        dispatch(ACTION_SET_LIST(data.results));
        dispatch(ACTION_SET_PAGINATION({
            results: data.results,
            count: data.count,
            next: data.next,
            previous: data.previous,
        }));
    };
};
