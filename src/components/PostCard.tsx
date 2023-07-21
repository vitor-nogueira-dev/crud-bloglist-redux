'use client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { PiNotePencilDuotone } from 'react-icons/pi';
import { TbTrashXFilled } from 'react-icons/tb';


import { IListState } from '@/interfaces/IListState';
import { IPostCardProps } from '@/interfaces/IPostCardProps';

export default function PostCard({ title, username, content, created_datetime, id }: IPostCardProps) {
    const initialLimit = 140;

    const [isExpanded, setIsExpanded] = useState(false);

    const [limit, _setLimit] = useState(initialLimit);

    const name = useSelector((state: IListState) => state.name);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const contentToShow = isExpanded ? content : content.substring(0, limit);

    return (
        <div className=' border border-[#999999] w-[752px] h-[316px] flex flex-col items-center bg-[#ffffff] m-5 rounded-2xl overflow-hidden '>
            {/* modal delete  */}
            {/* modal edit */}
            <div className=' border w-[752px] min-h-[70px] flex items-center pl-6 bg-[#7695EC] rounded-t-2xl'>
                <h1 className='text-[22px] font-bold text-white w-[80%]'>{title}</h1>
                {(username === name) && (
                    <div className='flex justify-end w-[20%] pr-4 gap-4'>
                        <button
                            type="button"
                            onClick={() => {}}
                            className="bg-transparent hover:text-[#7695EC] rounded-lg"
                        >
                            <TbTrashXFilled color='#ffffff' size={30} title='icon trash delete post' />
                        </button>
                        <button
                            type="button"
                            onClick={() => {}}
                            className="bg-transparent"
                        >
                            <PiNotePencilDuotone color='#ffffff' size={30} title='icon pencil duotone edit post' />
                        </button>
                    </div>
                )}
            </div>
            <div className='m-2 p-6 flex flex-col justify-start gap-1 w-full'>
                <div className='flex justify-between items-center w-full'>
                    <h1 className=' text-lg text-[#777777] m-0'>@{username}</h1>
                    <p className=' text-lg text-[#777777] m-0'>{"date post"}</p>
                </div>
                <div className='max-h-[140px] overflow-y-auto' >
                    <p className=' text-lg text-[#000000] font-normal m-0'>{contentToShow}</p>
                    {content.length > initialLimit && (
                        <button
                            type="button"
                            onClick={toggleExpansion}
                            className='rounded-lg text-sm text-center capitalize text-white bg-[#7695EC]  w-[70px]'
                        >
                            {isExpanded ? 'Less' : 'More...'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}