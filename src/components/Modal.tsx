import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";

type ModalProps = {
    setShowModal: any, 
    children: any, 
    actionBar: any, 
    classes: string, 
    childClasses: string
}

const Modal: React.FC<ModalProps> = ({ setShowModal, children, classes, childClasses }) => {
    const modal = useRef(document.createElement('div'))
    useEffect(()=>{
        const root = document.querySelector('.modal');
        root?.appendChild(modal.current)
    
        // When modal being removed, need to remove the class
        return ()=>{
            root?.removeChild(modal.current)
        }
    }, [])
    
    const handleModalClose = () => {
        setShowModal(false);
    }

    return ReactDOM.createPortal(
        <div data-testid="modal" className='fixed flex left-0 top-0 h-full w-full justify-center items-center'>
            <div className="fixed bg-gray-400 opacity-80 h-full w-full" onClick={handleModalClose}></div>
            <div className={`w-fit h-fit rounded-3xl z-[1] ${classes} relative`}>
                <div className={`absolute right-1 top-0`}>
                    <button className='modalButton text-2xl mt-1' onClick={handleModalClose}><IoIosCloseCircle /></button>
                </div>
                <div className={`flex flex-col justify-between ${childClasses}`}>
                    {children}
                </div>
            </div>
        </div>,
        
        modal.current
    )
}

export default Modal;