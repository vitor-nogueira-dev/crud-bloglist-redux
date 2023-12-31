import React from 'react'
import { ThunkActionDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

import Modal, { ModalProps } from 'react-bootstrap/Modal';
import { Omit, BsPrefixProps } from 'react-bootstrap/esm/helpers';

import { ACTION_MANAGE_POST } from '@/actions/actions';
import CustomButton from './CustomButton';

export default function ModalDelete(props: React.JSX.IntrinsicAttributes & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {

    const dispatch = useDispatch() as ThunkActionDispatch<any>

    const handleDelete = async () => {
        try {
            dispatch(ACTION_MANAGE_POST('delete', props.id))
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            {...props}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='d-flex align-items-center justify-content-center'
        >
            <Modal.Body className='rounded-2xl'>
                <h4 className='font-bold text-xl'>Are you sure you want to delete this item?</h4>
                <div className='w-full flex justify-end p-2 gap-4'>
                    <CustomButton
                        onClick={props.onHide || (() => { })}
                        variant="secondary">
                        Cancel
                    </CustomButton>
                    <CustomButton
                        onClick={() => {
                            handleDelete();
                            props.onHide && props.onHide();
                        }}
                        variant="danger"
                        id='delete'>
                        Delete
                    </CustomButton>
                </div>
            </Modal.Body>
        </Modal>
    )
}