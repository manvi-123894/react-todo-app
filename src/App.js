import React,{useState,useEffect,useContext} from 'react';
import List from './List';
import Modal from './Modal';
import {FaPlus,FaEdit} from 'react-icons/fa'
import { AppProvider ,useGlobalContext} from './context';
import './index.css';


const App = () => {

  const {name,targetList,isEditing,modal,editId,status,filteredList,handleSubmit,showModalFunc,removeItem,editItem,handleDoneButtonClick,filterHandler,setStatus,setName} = useGlobalContext();

  const btnArray =[{id : 1, value: 'all', title: 'All'},{id : 2, value: 'done', title: 'Complete'},{id : 3, value: 'toBeDone', title: 'Incomplete'}];

  return (
  <div className="container">
      
    {modal.showModal && <Modal {...modal} removeModal={showModalFunc}/>}

    <section className="section-center">
        <h1>Todo App</h1>
        <div className="form-container">

          <div className="btn-container" onClick={(e) => setStatus(e.target.value)}>
              {btnArray.map(item => {
                const {id,value,title} = item;
                return (
                    <button value={value} className="btn" key={id} onClick={(e) => setStatus(e.target.value)}>{title}</button>
                );
              })}
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <button type="submit"> 
              { isEditing ? 'Edit'  : 'Submit'}
            </button>
          </form>

          
        </div>

        <div className="targetList">
              {filteredList.map((listItem) => {
                  const {id,name} = listItem;
                  return (
                    <List key={id} {...listItem} removeItem={removeItem} editItem={editItem} handleDoneButtonClick={handleDoneButtonClick}/>
                  );
                })}        
        </div>
      </section>
  </div>
  );
}


export default App;