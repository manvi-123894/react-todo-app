import React from 'react';

export const useLocalStorage = () => {
   const list = JSON.parse( localStorage.getItem('target-list'));

   if(list){
    return list;
   }
   return [];
};

