import {useEffect} from 'react';

export function useTitle({openFood, orders}){
  useEffect(() => {
    // if we have an openFood then show openfood title
    if(openFood){
      document.title = openFood.name;
    } else {
      document.title = 
        orders.length === 0 
          ? "What's for Dinner?" 
          : `[${orders.length}] items in your order`
    }
  });
}