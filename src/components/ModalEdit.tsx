import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ThunkActionDispatch } from 'redux-thunk';

import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { Omit, BsPrefixProps } from 'react-bootstrap/esm/helpers';

import { ACTION_EDIT_POST } from '@/actions/actions';

export default function ModalEdit(props: React.JSX.IntrinsicAttributes & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {

    const [title, setTitle] = useState(props.title)
    const [content, setContent] = useState(props.content)

    const dispatch = useDispatch() as ThunkActionDispatch<any>

    const handleSave = async () => {
        try {
            dispatch(ACTION_EDIT_POST(props.id, title, content))
        } catch (error) {
            console.error(error)
        } finally {
            setTitle('')
            setContent('')
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body className='rounded-2xl'>
                <form className="h-[240px] w-[753px]   m-6 border-[#999999] rounded-2xl p-6 flex flex-col justify-center gap-3">
                    <h1 className='text-[22px] font-bold text-[#000000]'>Edit item</h1>
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
                </form>
                <div className='w-[92%] m-auto flex justify-end p-2 gap-4'>
                    <button type='button' className='w-[120px] h-[32px] border-[1px] border-[#000000] rounded-md font-bold' onClick={props.onHide}>Cancel</button>
                    <button type='button' className='w-[120px] h-[32px] rounded-md font-bold text-white bg-[#47B960]' onClick={async () => {
                        props.onHide && props.onHide()
                        await handleSave()
                    }}>Save</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}