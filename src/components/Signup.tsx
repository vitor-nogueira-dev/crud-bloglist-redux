import { ACTION_SET_NAME } from '@/actions/actions'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkActionDispatch } from 'redux-thunk'

type Props = {}

export default function Signup({ }: Props) {
    const [name, setName] = useState('')
    const dispatch = useDispatch() as ThunkActionDispatch<any>
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(ACTION_SET_NAME(name))
        setName('')
        router.push('/feed')
    }
    return (
        <section className='bg-[#DDDDDD] h-screen m-auto border flex items-center justify-center'>
            <form className='bg-[#ffffff] lg:w-[500px] h-[205px] rounded-[16px] flex flex-col justify-evenly border border-[#CCCCCC]
             p-6 py-10 shadow-md'>
                <h1 className='text-2xl font-bold leading-none text-[#000000] md:text-2xl lg:text-2xl mb-4'>Welcome to CodeLeap network!</h1>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-[16px] font-normal text-[#000000] leading-4">Please enter your username</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={({ target }) => setName(target.value)} className="bg-white border border-[#777777]; text-gray-900 text-sm rounded-lg block w-full p-2.5 outline outline-1 outline-[#777777] placeholder-[#CCCCCC] focus:outline-none focus:border-[#777777]"
                        placeholder="John doe"
                        required
                    />
                </div>
                <div className='flex justify-end w-full'>
                    <button
                        type="button"
                        disabled={!name}
                        onClick={handleClick}
                        className={`font-bold w-[111px] h-[32px] ${name ? "bg-[#2a5deb]" : "active:bg-[#2a5deb] bg-[#7695EC]"} rounded-lg text-sm text-center uppercase text-white`}
                    >enter</button>
                </div>
            </form>
        </section>
    )
}