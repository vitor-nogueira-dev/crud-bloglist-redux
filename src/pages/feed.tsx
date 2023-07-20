'use client'
import { ACTION_GET_LIST } from '@/actions/actions';
import { IListState } from '@/interfaces/IListState';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkActionDispatch } from 'redux-thunk';


export default function Pagination({ }) {
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch() as ThunkActionDispatch<any>
    const list = useSelector((state: IListState) => state.list);
    const pagination = useSelector((state: IListState) => state.pagination);

    useEffect(() => {
        dispatch(ACTION_GET_LIST(10, 0));
        setCurrentPage(1);
    }, [dispatch]);

    const handleNextPage = () => {
        if (pagination && pagination.next) {
            const url = new URL(pagination.next);
            const limit = parseInt(url.searchParams.get("limit") || "10", 10);
            const offset = parseInt(url.searchParams.get("offset") || "0", 10);
            dispatch(ACTION_GET_LIST(limit, offset));
            setCurrentPage(offset / limit + 1);
        }
    }

    const handlePreviousPage = () => {
        if (pagination && pagination.previous) {
            const url = new URL(pagination.previous);
            const limit = parseInt(url.searchParams.get("limit") || "10", 10);
            const offset = parseInt(url.searchParams.get("offset") || "0", 10);
            dispatch(ACTION_GET_LIST(limit, offset));
            setCurrentPage(currentPage - 1);

        }
    };

    return (
        <div>
            <ul>
                {list.map((item: any) => (
                    <li key={item.id}>{item.username}</li>
                ))}
            </ul>
            <nav>
                <ul className="inline-flex -space-x-px text-sm">
                    {/* pages  */}
                </ul>
            </nav>
        </div>
    );
};
