'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkActionDispatch } from 'redux-thunk';
import { useRouter } from 'next/router';

import PostForm from '@/components/PostForm';

import { IListState } from '@/interfaces/IListState';
import { ACTION_GET_LIST, ACTION_SET_LOADING } from '@/actions/actions';

import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';

export default function Pagination({ }) {
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch() as ThunkActionDispatch<any>
    const router = useRouter()

    const list = useSelector((state: IListState) => state.list);
    const pagination = useSelector((state: IListState) => state.pagination);
    const username = useSelector((state: IListState) => state.name);
    const loading = useSelector((state: IListState) => state.loading);

    useEffect(() => {
        if (username === '') return;
        dispatch(ACTION_GET_LIST(10, 0));
        setCurrentPage(1);

    }, [dispatch, username]);


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

    useEffect(() => {
        if (username === '') {
            router.push('/')
        }
    }, [router, username])

    return (
        <section className='flex flex-col justify-center items-center bg-[#ffffff] border lg:w-[800px] md:w-[780px] w-[380px] m-auto'>
            <PostForm username={username} />
            {
                loading ? <Loading /> :
                    <>
                        {list.map((item: any) => (
                            <PostCard key={item.id} title={item.title} username={item.username} content={item.content} created_datetime={item.created_datetime} id={item.id} />
                        ))}
                        <nav className='lg:w-[600px] md:w-[600px] w-[360px] flex items-center justify-center mb-4 flex-shrink-0'>
                            <ul className="inline-flex -space-x-px text-sm">
                                <li>
                                    <button
                                        onClick={handlePreviousPage}
                                        className="flex items-center justify-center px-2 h-8 leading-tight border rounded-l-lg  bg-[#7695EC] border-gray-700 hover:bg-[#547cea] text-white disabled:opacity-50  "
                                        disabled={!pagination?.previous}
                                    >
                                        <BsArrowLeft />
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
                                            className={`flex items-center justify-center px-2.5 h-8 ld:w-12 md:w-12 w-7 leading-tight text-gray-500 border border-gray-300 ${page === currentPage
                                                ? "bg-[#7695EC] text-white font-bold border-gray-400"
                                                : "hover:bg-gray-100 hover:text-gray-700"
                                                }`}
                                        > {page}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={handleNextPage}
                                        className="flex items-center justify-center px-2 lg:p-4 h-8 leading-tight border rounded-r-lg  bg-[#7695EC] border-gray-700 hover:bg-[#547cea] text-white disabled:opacity-50 "
                                        disabled={!pagination?.next}
                                    >
                                        <BsArrowRight />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </>
            }
        </section>
    );
};
