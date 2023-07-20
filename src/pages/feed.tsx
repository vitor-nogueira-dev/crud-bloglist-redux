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

    useEffect(() => {
        dispatch(ACTION_GET_LIST(10, 0));
        setCurrentPage(1);
    }, [dispatch]);

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
