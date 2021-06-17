import React, { useState } from 'react';
import {FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import './index.css';

const List = ({id,name,type,removeItem,editItem,handleDoneButtonClick}) => {

 return (
   <div className={`list-item ${type}`}>
     <p>{name}</p>
     <div className="buttons">
        <FaCheck className="done-btn" onClick={() => handleDoneButtonClick(id)}/>
        <FaEdit  className="edit-btn" onClick={() => editItem(id)}/> 
        <FaTrash className="dlt-btn" onClick={() => removeItem(id)}/> 
     </div> 
  </div>
 );

}

export default List;