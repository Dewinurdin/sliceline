export function formatPrice (price){
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
};

export const foodItems = [
  {
    name: 'Cheese Pizza',
    img: '/img/one-cheese-pizza.jpg',
    section: 'Pizza',
    price: 1.5
  },
  {
    name: 'Pepperoni Pizza',
    img: '/img/pepperoni-pizza.jpg',
    section: 'Pizza',
    price: 2
  },
  {
    name: 'Chicken Fingers',
    img: '/img/chicken-fingers.jpg',
    section: 'Side',
    price: 3
  },
  {
    name: 'Club Sandwiches',
    img: '/img/club-sandwich.jpg',
    section: 'Sandwich',
    price: 5
  },
  {
    name: 'French Fries',
    img: '/img/fries.jpg',
    section: 'Side',
    price: 2
  },
  {
    name: 'Gyro',
    img: '/img/gyro.jpg',
    section: 'Sandwich',
    price: 5
  },
  {
    name: 'Ham Pizza',
    img: '/img/ham-pizza.jpg',
    section: 'Pizza',
    price: 2
  },
  {
    name: 'Healthy Pizza',
    img: '/img/vegetarian-pizza.jpg',
    section: 'Pizza',
    price: 2
  },
  {
    name: 'Soda',
    section: 'Drinks',
    choices: ['Coke', 'Sprite','Root Beer'],
    price: 1
  }
];
  // reduce built in function takes res (result) as first argument
export const foods = foodItems.reduce((result, food) => {
  // if we dont have have a key on food section
  if(!result[food.section]){
    // take the result and add in food section as a key
      // put the value in an array
    result[food.section] = []
  }
  // access result data and push food section array into food
  result[food.section].push(food);
  // must use return result
  return result;
},{}
);