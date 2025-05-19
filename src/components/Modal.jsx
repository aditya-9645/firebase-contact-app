import { CgCloseR } from "react-icons/cg";

import {createPortal} from 'react-dom';

const Modal = ({isOpen, onClose, children}) => {
  return createPortal(
    <>
        {isOpen && (
            <div className="grid place-items-center absolute top-0 left-[-1px] backdrop-blur w-screen h-screen z-20">
                <div className='relative  z-50 p-4 m-auto w-[80%] bg-white h-[345px] m-4 rounded-md' >
                  <div className="flex justify-end">
                    <CgCloseR onClick={onClose} className=" text-xl self-end"/>
                  </div>
                  {children}
                  </div>
            </div>
        )}
    </>
    , document.getElementById("modal-root")
  );
};

export default Modal