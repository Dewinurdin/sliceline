import {useState} from 'react';

export function useQuantity(defaultQuantity){
  const [value, setValue] = useState(defaultQuantity || 1);

  function onChange(e){
    // convert the value to number with + Operator
      // and if the number is Not Greater than 1
    if ( !(+e.target.value >= 1)){
      // we are setting default to value 1
      setValue(1);
      return;
    }
    setValue(+e.target.value);
  }
  return {
    value,
    setValue,
    onChange
  }
}