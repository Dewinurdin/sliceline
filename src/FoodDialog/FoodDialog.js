import React from 'react';
import styled from 'styled-components';
import { FoodLable } from '../Menu/FoodGrid';
import { pizzaRed } from '../Styles/colors';
import { Title } from '../Styles/title';
import { formatPrice } from '../Data/FoodData';
import { QuantityInput } from '../FoodDialog/QuantityInput';
import { useQuantity } from '../Hooks/useQuantity';
import { Toppings } from './Toppings';
import { useToppings } from '../Hooks/useToppings';
import { useChoice } from '../Hooks/useChoice';
import { Choices } from './Choices';

const Dialog = styled.div`
  width: 500px;
  background-color: white;
  position: fixed;
  top: 75px;
  z-index: 5;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
`;

export const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
  padding: 0px 40px 50px 40px;
`;

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 8px 0px #9e9e9e;
  height: 60px;
  display: flex;
  justify-content: center;
`;

export const ConfirmButton = styled(Title)`
  margin: 10px;
  color: white;
  height: 20px;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: ${pizzaRed};
    // whether we pass in disable props, 
      // if we have disabled, then apply these styles
  ${({ disabled }) => disabled &&
  `
  opacity: .5;
  background-color: #9e9e9e;
  pointer-events: none;
  `}
`;

const DialogShadow = styled.div`
  position: fixed; 
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

const DialogBanner = styled.div`
  min-height: 200px;
  margin-bottom: 20px;
  // if we have image render image
    // else min-height 75px
  ${({img}) => (
    img ?
  `background-image: url(${img});` 
  : 
  'min-height: 75px;'
  )};
  background-position: center;
  background-size: cover;
`;

const DialogBannerName = styled(FoodLable)`
  top: 100px;
  font-size: 30px;
  padding: 5px 40px;
  // check if we have an image
    // if we do render top of 100px else 20px 
  top: ${({ img }) => (img ? '100px' : '20px' )};
`;

const pricePerTopping = 0.5;

export function getPrice(order){
  return (
    order.quantity + (order.price + 
      order.toppings.filter(t => t.checked).length * pricePerTopping)
  );
}

function hasToppings(food){
  return food.section === 'Pizza';
}

export function FoodDialogContainer({ openFood, setOpenFood, setOrders, orders }){
  const quantity = useQuantity(openFood && openFood.quantity);
  const toppings = useToppings(openFood.toppings)
  const choiceRadio = useChoice(openFood.choice);
  const isEditing = openFood.index > -1;

  function close(){
    setOpenFood();
  };

  function editOrder(){
    const newOrders = [...orders];
    newOrders[openFood.index] = order;
    setOrders(newOrders);
    close();
  };

  const order = { 
    ...openFood,
    quantity: quantity.value,
    toppings: toppings.toppings,
    choice: choiceRadio.value
  };
  
  function addToOrder(){
    setOrders([...orders, order]);
    close();
  };
  return (
    <>
      <DialogShadow onClick={close} />
      <Dialog>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
        <DialogContent>
          <QuantityInput quantity={quantity} />
          {/* only appears on Pizza section */}
          {hasToppings(openFood) && (
            <>
              <h3>Would you like toppings?</h3>
              <Toppings {...toppings} />
            </> 
          )}
          {/* if there is radio button choices then Render this Radio */}
          { openFood.choices && ( 
            <Choices openFood={openFood} choiceRadio={choiceRadio} /> 
          )}
        </DialogContent>
        <DialogFooter>
          <ConfirmButton 
            onClick={isEditing ? editOrder : addToOrder} 
            // if there is radio button has No value, then disable the add to order button
            disabled={openFood.choices && !choiceRadio.value}
          >
            {isEditing ? `Update order:` : `Add to order:`} 
            {formatPrice(getPrice(order))}
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export function FoodDialog(props){
  if (!props.openFood) return null ;
  return <FoodDialogContainer {...props} />
}

