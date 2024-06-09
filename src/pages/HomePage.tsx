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
        <div className="fixed flex w-full h-full justify-center items-center bg-slate-950">
            <div className="flex flex-col items-center mb-24 z-[1] p-2">
                <h2 className="text-white text-[60px] font-bold text-center">Genetic Analysis Made Easy</h2>
                <p className="text-purple-300 text-center">Built on the logic of Biopython, encorporating a well designed easy to use UI and custom functions to make your analysis seamless.</p>
                <div className="flex justify-evenly w-1/2 lg:w-1/3">
                    <a href="/register" className="bg-sky-500 text-white px-3 py-1 rounded-xl mt-5">Register</a>
                    <a href="/documentation" className="bg-sky-500 text-white px-3 py-1 rounded-xl mt-5">Read docs</a>
                </div>
            </div>
            <div className="fixed z-[0] h-full w-1/2 right-0 overflo">
                <DNAAnimation />
            </div>
            <div className="fixed bottom-0 w-full sm:w-2/3 h-[170px] flex justify-evenly">
                <a href="/entrez" className="text-white p-3 w-1/2 lg:w-1/3 m-1 h-full bg-slate-800 rounded-t-xl hover:scale-y-125 hover:lg:scale-125">
                    <div>
                        <div className="flex justify-between items-end">
                            <img src="./Entrez.svg" className="w-[45px]" />
                            <h3 className="font-bold text-[25px]">Entrez Api</h3>
                        </div>
                        <p className="mt-4 text-sm">Incorporating the entrez api to easily search and find sequences for analysis.</p>
                    </div>
                </a>
                <div className="text-white p-3 w-1/2 lg:w-1/3 m-1 h-full bg-slate-800 rounded-t-xl hover:scale-y-125 hover:lg:scale-125">
                    <div className="flex justify-between items-end">
                        <img 
                            alt="By Patrick Kunzmann, Biopython - https://biopython.org/assets/images/biopython_logo_l.png, BSD, https://commons.wikimedia.org/w/index.php?curid=81681138" 
                            src="./Biopython_logo.png" 
                            className="w-[80px]" 
                        />
                        <h3 className="font-bold text-[25px]">Biopython</h3>
                    </div>
                    <p className="mt-4 text-sm">Implemented using same data found in SeqRecords and many of biopythons functions.</p>
                </div>
                {/* <div className="w-1/2 lg:w-1/3 m-1 h-full bg-slate-800 rounded-t-xl hover:scale-y-125 hover:lg:scale-125">
                <img 
                    alt="By Patrick Kunzmann, Biopython - https://biopython.org/assets/images/biopython_logo_l.png, BSD, https://commons.wikimedia.org/w/index.php?curid=81681138" 
                    src="./Biopython_logo.png" 
                    className="m-3 w-[80px]" 
                />
                </div> */}
            </div>
        </div>
    )
}