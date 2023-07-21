import { ThunkActionDispatch } from "redux-thunk";

import { SET_LIST, SET_NAME, SET_PAGINATION } from "./constants";
import requestAPI from "@/helpers/requestAPI";

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
) => {
    return async (dispatch: ThunkActionDispatch<any>) => {
        const data = await requestAPI(`?limit=${limit}&offset=${offset}`);
        dispatch(ACTION_SET_LIST(data.results));
        dispatch(ACTION_SET_PAGINATION({
            results: data.results,
            count: data.count,
            next: data.next,
            previous: data.previous,
        }));
    };
};


export const ACTION_CREATE_POST = (title: string, content: string, username: string) => {
    return async (dispatch: ThunkActionDispatch<any>) => {
        try {
            const body = {
                title: title,
                content: content,
                username: username,
            };
            await requestAPI('', 'POST', body);
            dispatch(ACTION_GET_LIST(10, 0))
        } catch (error) {
            console.error('Erro ao criar o post:', error);
        }
    };
};

