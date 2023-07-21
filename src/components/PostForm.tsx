import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkActionDispatch } from 'redux-thunk'
import { useRouter } from 'next/router'

import { IPostFormProps } from '@/interfaces/IPostFormProps'
import { ACTION_CREATE_POST } from '@/actions/actions'

export default function PostForm({ username }: IPostFormProps) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch() as ThunkActionDispatch<any>
    const router = useRouter()

    const handleSave = async () => {
        try {
            if (username === '') return router.push('/')
            dispatch(ACTION_CREATE_POST(title, content, username))
        } catch (error) {
            console.error(error)
        } finally {
            setTitle('')
            setContent('')
        }
    }

    return (
        <section className='flex flex-col justify-start items-center bg-[#DDDDDD]'>
            <div className='w-[780px] flex flex-col items-center bg-[#ffffff]'>

                <div className=' w-[800px] h-[80px] flex justify-between items-center pl-6 bg-[#7695EC] '>
                    <h1 className='text-[22px] font-bold text-white'>CodeLeap Network</h1>
                    <span className='mr-4 text-[18px] font-bold text-white'>Welcome back, {username} :)</span>
                </div>

                <form className="border h-[334px] w-[753px]   m-6 border-[#999999] rounded-2xl p-6 flex flex-col justify-center gap-3 hover:shadow-xl transition-all">
                    <h1 className='text-[22px] font-bold text-[#000000]'>What&apos;s on your mind?</h1>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-[16px] font-normal text-[#000000] leading-4">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)} className="bg-white border border-[#777777] text-gray-900 text-sm rounded-lg block w-[704px] h-[32px] px-2 placeholder-[#CCCCCC] focus:outline-none focus:border-[#777777]"
                            placeholder="Hello World"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-[16px] font-normal text-[#000000] leading-4">Content</label>
                        <textarea
                            name="content"
                            value={content}
                            onChange={({ target }) => setContent(target.value)}
                            className="bg-white border border-[#777777] w-[704px] h-[74px] text-gray-900 text-base rounded-lg block placeholder-[#CCCCCC] focus:outline-none focus:border-[#777777] appearance-none px-2 py-1 resize-none"
                            placeholder="Content here"
                            required
                        />
                    </div>
                    <div className='flex justify-end w-full'>
                        <button
                            type="button"
                            disabled={(!title && !content)}
                            onClick={handleSave}
                            className={`font-bold w-[111px] h-[32px] hover:shadow-xl transition-all ${(title && content) ? "bg-[#2a5deb]" : "active:bg-[#2a5deb] bg-[#7695EC]"} rounded-lg text-sm text-center capitalize text-white`}
                        >create</button>
                    </div>
                </form>
            </div>
        </section>
    )
}