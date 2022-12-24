import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

export default function Modals({ children }) {
    const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  const modalContent = (
    <div className="z-30 absolute top-0 left-1/2 overflow-x-hidden -translate-x-1/2 flex items-center justify-center">
      <div className="flex items-center min-h-screen w-screen" >
        <div className="max-w-[950px] h-[450px] mx-auto bg-[#4ECDC4] drop-shadow-lg shadow-lg bg-contain bg-center rounded-[18px] w-full p-5">
          <div className="relative w-full h-full mx-auto">
            <div className='w-full h-full flex flex-row justify-evenly self-center items-center'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent, document.getElementById("modal-root")
    )
  } else {
    return null;
  }
}