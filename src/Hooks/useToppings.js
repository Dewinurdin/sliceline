import {useState} from 'react';

export function useToppings(defaultTopping){
  const [toppings, setToppings] = useState(defaultTopping || getDefaultToppings())

  function checkTopping(index){
    // copy into new array of toppings
    const newToppings = [...toppings];
    // check index of array = and change check property and make it the reverse of what it is
      // a false into true
    newToppings[index].checked = !newToppings[index].checked;
    // Setter (set new array)
    setToppings(newToppings)
  }
  return {
    // Setting toppings
    checkTopping,
    // Accessing current toppings
    toppings
  }
};

const toppingsList = [
  "Extra Cheese",
  "Pepperoni",
  "Sausage",
  "Onions",
  "Peppers",
  "Pineapple",
  "Ham",
  "Spinach",
  "Artichokes",
  "Mushrooms",
  "Black Olives"
];

function getDefaultToppings(){
  return toppingsList.map(topping => ({
    name: topping,
    checked: false
  })
);}

