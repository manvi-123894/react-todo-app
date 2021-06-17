import React, { useState, useEffect, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [name, setName] = useState('');
  const [targetList, setTargetList] = useState(useLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState({ showModal: false, type: '', message: '' });
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('all');
  const [filteredList, setFilteredList] = useState([]);


  useEffect(() => {
    localStorage.setItem('target-list', JSON.stringify(targetList));
  }, [targetList]);

  useEffect(() => {
    filterHandler();
  }, [targetList, status]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showModalFunc(true, 'danger', 'Please enter a value');
    }
    else if (isEditing && name) {
      const newList = targetList.map(item => {
        if (item.id != editId)
          return item;
        return { ...item, name, type: '' };
      })
      setTargetList(newList);
      setName('');
      setIsEditing(false);
      setEditId(null);
      showModalFunc(true, 'success', 'Item Edited');
    } else {
      const newItem = { id: new Date().getTime().toString(), name, type: 'toBeDone' };
      setTargetList([...targetList, newItem]);
      setName('');
      showModalFunc(true, 'success', 'Your target is added');
    }
  }

  const showModalFunc = (showModal = false, type, message = '') => {
    setModal({ showModal, type, message });
  }

  const removeItem = (id) => {
    const newList = targetList.filter(item => item.id != id);
    setTargetList(newList);
    showModalFunc(true, 'danger', 'Item Removed');
  }

  const editItem = (id) => {
    const editableItem = targetList.find(item => item.id === id);
    setEditId(editableItem.id);
    setIsEditing(true);
    setName(editableItem.name);
  }

  const handleDoneButtonClick = (id) => {
    const newList = targetList.map(item => {
      if (item.id != id)
        return item;

      if (item.type === 'done') {
        return {
          ...item, type: 'toBeDone'
        }

      }
      showModalFunc(true, 'success', 'Congrats✨✨ Your task is done.')

      return {
        ...item, type: 'done'
      }
    })
    setTargetList(newList);
  }

  const filterHandler = () => {

    switch (status) {
      case 'done': {
        setFilteredList(targetList.filter(item => item.type.toLowerCase() === status.toLowerCase()));
        break;
      }
      case 'toBeDone': {
        setFilteredList(targetList.filter(item => item.type.toLowerCase() === status.toLowerCase()));
        break;
      }
      default: {
        setFilteredList([...targetList]);
        break;
      }
    }
  }




  return <AppContext.Provider value={{
    name, targetList, isEditing, modal, editId, status, filteredList, handleSubmit, showModalFunc, removeItem, editItem, handleDoneButtonClick, filterHandler, setStatus, setName
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppProvider };