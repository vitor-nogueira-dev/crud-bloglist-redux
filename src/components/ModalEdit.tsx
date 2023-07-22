import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ThunkActionDispatch } from 'redux-thunk';

import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { Omit, BsPrefixProps } from 'react-bootstrap/esm/helpers';

import { ACTION_EDIT_POST } from '@/actions/actions';
import CustomButton from './CustomButton';

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
            className='d-flex align-items-center justify-content-center w-100 h-100'
        >
            <Modal.Body className='rounded-2xl lg:w-[770px] md:w-[490px] w-[350px]'>
                <form className="h-[240px] lg:w-[780px] md:w-[410px] w-[300px] m-2 border-[#999999] rounded-2xl lg:p-6 md:p-6 flex flex-col justify-center gap-3 ">
                    <h1 className='text-[22px] font-bold text-[#000000]'>Edit item</h1>
                    <div className="mb-6">
                        <label htmlFor="name" className=" mb-2 text-[16px] font-normal text-[#000000] leading-4">Title</label>
                        <input
                            id='title'
                            type="text"
                            name="title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)} className="bg-white border border-[#777777] text-gray-900 text-sm rounded-lg  lg:w-[704px] md:w-[390px] w-[280px] h-[32px] lg:px-2 md:px-2 px-1 placeholder-[#CCCCCC] focus:outline-none focus:border-[#777777]"
                            placeholder="Hello World"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className=" mb-2 text-[16px] font-normal text-[#000000] leading-4">Content</label>
                        <textarea
                            id='content'
                            name="content"
                            value={content}
                            onChange={({ target }) => setContent(target.value)}
                            className="bg-white border border-[#777777] lg:w-[704px] md:w-[390px] w-[280px] lg:px-2 md:px-2 px-1 h-[74px] text-gray-900 text-base rounded-lg  placeholder-[#CCCCCC] focus:outline-none focus:border-[#777777] appearance-none py-1 resize-none"
                            placeholder="Content here"
                            required
                        />
                    </div>
                </form>
                <div className='w-[92%] lg:w-[100%] flex justify-center lg:justify-end md:justify-end gap-4'>
                    <CustomButton onClick={props.onHide || (() => { })} variant="secondary">
                        Cancel
                    </CustomButton>
                    <CustomButton onClick={async () => {
                        props.onHide && props.onHide();
                        await handleSave();
                    }} variant="success">
                        Save
                    </CustomButton>
                </div>
            </Modal.Body>
        </Modal>
    )
}