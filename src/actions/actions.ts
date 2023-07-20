import { SET_LIST, SET_NAME, SET_PAGINATION } from "./constants";

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

