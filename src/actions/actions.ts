import { ThunkActionDispatch } from "redux-thunk";

import { SET_CLEAR_STATE, SET_LIST, SET_NAME, SET_PAGINATION, SET_LOADING } from "./constants";
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

export const ACTION_SET_CLEAR_STATE = () => ({
    type: SET_CLEAR_STATE,
});

export const ACTION_SET_LOADING = (loading: boolean) => ({
    type: SET_LOADING,
    payload: loading,
});

export const ACTION_GET_LIST = (limit: number, offset: number) => {
    return async (dispatch: ThunkActionDispatch<any>) => {
        try {
            const data = await requestAPI(`?limit=${limit}&offset=${offset}`);
            dispatch(ACTION_SET_LIST(data.results));
            dispatch(
                ACTION_SET_PAGINATION({
                    results: data.results,
                    count: data.count,
                    next: data.next,
                    previous: data.previous,
                })
            );
        } catch (error) {
            console.error('Error getting list:', error);
        }
    };
};

export const ACTION_MANAGE_POST = (
    type: 'create' | 'edit' | 'delete',
    id?: number,
    title?: string,
    content?: string,
    username?: string
) => {
    return async (dispatch: ThunkActionDispatch<any>) => {
        try {
            let requestPromises: Promise<any>[] = [];
            switch (type) {
                case 'create':
                    const createBody = {
                        title: title,
                        content: content,
                        username: username,
                    };
                    requestPromises.push(requestAPI('', 'POST', createBody));
                    break;
                case 'edit':
                    if (!id) return;
                    const editBody = {
                        title: title,
                        content: content,
                    };
                    requestPromises.push(requestAPI(`${id}/`, 'PATCH', editBody));
                    break;
                case 'delete':
                    if (!id) return;
                    requestPromises.push(requestAPI(`${id}/`, 'DELETE'));
                    break;
                default:
                    return;
            }

            await Promise.all(requestPromises);

            dispatch(ACTION_GET_LIST(10, 0));
        } catch (error) {
            console.error('Error managing post:', error);
        }
    };
};