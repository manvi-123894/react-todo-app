import React,{useEffect} from 'react';

const Modal = ({type,message,removeModal}) => {

 useEffect(() => {
   const timeout = setTimeout(() =>{
     removeModal();
   },3000);
   return () => clearTimeout(timeout);
 })

 return (
   <div className={`modal-container ${type}`}>
     <p>{message}</p>
   </div>
 );
}

export default Modal;