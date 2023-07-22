import { ACTION_SET_LOADING, ACTION_SET_NAME } from '@/actions/actions'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkActionDispatch } from 'redux-thunk'
import AOS from 'aos';
import CustomButton from './CustomButton'

export default function Signup({ }) {
    const [name, setName] = useState('')
    const dispatch = useDispatch() as ThunkActionDispatch<any>
    const router = useRouter()

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(ACTION_SET_NAME(name))
        setName('')
        dispatch(ACTION_SET_LOADING(true))
        router.push('/feed')
    }

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <section className='bg-[#DDDDDD] h-screen m-auto border flex items-center justify-center' data-aos="flip-right" data-aos-duration="1000">
            <form className='bg-[#ffffff] w-[320px] lg:w-[500px] md:w-[500px] h-[230px] rounded-[16px] flex flex-col justify-evenly border border-[#CCCCCC]
             p-6 py-10 shadow-md' onSubmit={handleClick}>
                <h1 className='text-xl font-bold leading-none text-[#000000] md:text-2xl lg:text-2xl mb-4'>Welcome to CodeLeap network!</h1>
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
                    <CustomButton type='submit' disabled={!name} variant="primary">
                        enter
                    </CustomButton>
                </div>
            </form>
        </section>
    )
}