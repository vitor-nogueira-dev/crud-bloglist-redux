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

    const getPageNumbers = useCallback(() => {
        if (pagination) {
            const totalPages = Math.ceil(pagination.count / 10);
            const maxDisplayedPages = 10;
            const halfDisplayedPages = Math.floor(maxDisplayedPages / 2);
            let startPage = currentPage - halfDisplayedPages;
            let endPage = currentPage + halfDisplayedPages;

            if (startPage < 1) {
                startPage = 1;
                endPage = maxDisplayedPages;
            }

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxDisplayedPages + 1);
            }

            return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
        }
        return [];
    }, [currentPage, pagination]);

    return (
        <div>
            <ul>
                {list.map((item: any) => (
                    <li key={item.id}>{item.username}</li>
                ))}
            </ul>
            <nav>
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <button
                            onClick={handlePreviousPage}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border rounded-l-lg   bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-50 "
                            disabled={!pagination?.previous}
                        >
                            Previous
                        </button>
                    </li>
                    {getPageNumbers().map((page: number) => (
                        <li key={page}>
                            <a
                                href="#"
                                onClick={() => {
                                    const limit = pagination?.limit || 10;
                                    const offset = (page - 1) * limit;
                                    dispatch(ACTION_GET_LIST(limit, offset));
                                    setCurrentPage(page);
                                }}
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${page === currentPage
                                    ? "text-white font-bold bg-gray-600 "
                                    : "hover:bg-gray-100 hover:text-gray-700"
                                    }`}
                            >
                                {page}
                            </a>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={handleNextPage}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border rounded-r-lg   bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white disabled:opacity-50 "
                            disabled={!pagination?.next}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
