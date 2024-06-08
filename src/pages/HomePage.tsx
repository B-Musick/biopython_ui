import { useState } from "react";
import Modal from "../components/Modal";
import DNAAnimation from "../components/DNAAnimation";

export const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    
    let actionBar = <div><button>action button</button></div>

    let modal = <Modal 
    classes="bg-white px-2" 
    childClasses="" 
    className="z-[0]" 
    setShowModal={setShowModal} 
    actionBar={actionBar}>
        <div className="w-200 h-200">Place Modal Data Here</div>
    </Modal>;

    return (
        <>
            <div className="fixed z-[0] h-full w-1/2 right-0">
                <DNAAnimation />
            </div>
        </>
    )
}