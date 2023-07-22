import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkActionDispatch } from 'redux-thunk'
import { useRouter } from 'next/router'

import { IPostFormProps } from '@/interfaces/IPostFormProps'
import { ACTION_CREATE_POST, ACTION_SET_CLEAR_STATE } from '@/actions/actions'
import CustomButton from './CustomButton'


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

    const handleLogout = () => {
        dispatch(ACTION_SET_CLEAR_STATE())
        router.push('/')
    }

    return (
        <section className='flex flex-col justify-start items-center bg-[#DDDDDD]'>
            <div className='lg:w-[778px] md:w-[778px] w-[350px] flex flex-col items-center bg-[#ffffff]'>
                <div className='lg:w-[800px] md:w-[780px] w-[350px] h-[80px] flex justify-between items-center pl-6 bg-[#7695EC] '>
                    <h1 className='lg:text-[22px] md:text-[22px] text-[18px] font-bold text-white'>CodeLeap Network <br/>
                    <span className='mr-4 lg:text-[14px] md:text-[14px] text-[12px] font-bold text-white'>Welcome back, {username} :)</span></h1>
                    <div className='lg:w-[140px] md:w-[140px] w-[100px] flex items-center p-1 '>
                        
                        <button onClick={handleLogout}  className="btn-logout">

                            <div className="content-logout"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                            <div className="text-logout">Logout</div>
                        </button>
                    </div>
                </div>

                <form className="border h-[334px] lg:w-[753px] md:w-[753px] w-[350px] m-3 border-[#999999] rounded-2xl p-3 lg:p-6 md:p-6 flex flex-col justify-center gap-3 hover:shadow-xl transition-all" data-aos="fade-right">
                    <h1 className='text-[22px] font-bold text-[#000000]'>What&apos;s on your mind?</h1>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-[16px] font-normal text-[#000000] leading-4">Title</label>
                        <input
                            id='title'
                            type="text"
                            name="title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                            className="bg-white border border-[#777777] text-gray-900 text-sm rounded-lg block lg:w-[704px] md:w-[704px] w-[320px] h-[32px] px-2 placeholder-[#CCCCCC] focus:outline-none focus:border-[#777777]"
                            placeholder="Hello World"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-[16px] font-normal text-[#000000] leading-4">Content</label>
                        <textarea
                            id='content'
                            name="content"
                            value={content}
                            onChange={({ target }) => setContent(target.value)}
                            className="bg-white border border-[#777777] lg:w-[704px] md:w-[704px] w-[320px] h-[74px] text-gray-900 text-base rounded-lg block placeholder-[#CCCCCC] focus:outline-none focus:border-[#777777] appearance-none px-2 py-1 resize-none"
                            placeholder="Content here"
                            required
                        />
                    </div>
                    <div className='flex justify-end w-full'>
                        {/* <button
                            type="button"
                            disabled={!(title && content)}
                            onClick={handleSave}
                            className={`font-bold w-[111px] h-[32px] hover:shadow-xl transition-all ${(title && content) ? "bg-[#2a5deb]" : "active:bg-[#2a5deb] bg-[#7695EC]"} rounded-lg text-sm text-center capitalize text-white`}
                        >create</button> */}
                         <CustomButton onClick={handleSave} disabled={!(title && content)} variant="primary" margin>
                        create
                    </CustomButton>
                    </div>
                </form>
            </div>
        </section>
    )
}