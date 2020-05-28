import React from 'react';
import styled from 'styled-components';
import { 
  DialogContent, 
  DialogFooter, 
  ConfirmButton 
} from '../FoodDialog/FoodDialog';
import { formatPrice } from '../Data/FoodData';
import { getPrice } from '../FoodDialog/FoodDialog';

const database = window.firebase.database();

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  top: 48px;
  width: 340px;
  background-color: white;
  height: calc(100% - 48px);
  z-index: 10;
  box-shadow: 4px 0px 5px 4px #9e9e9e;
  display: flex;
  flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #9e9e9e;
  ${({ editable }) => editable ?
    `&:hover {
      cursor: pointer;
      background-color: #e7e7e7;
    }
    `
    :
    `pointer-events: none;`
  }
`;

const OrderItem = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-template-columns: 20px 150px 20px 60px;
  justify-content: space-between;
`;

const DetailItem = styled.div`
  color: #9e9e9e;
  font-size: 12px;
`;

function sendOrder(orders, {email, displayName}){
  // push new oder
  const newOrderRef = database.ref('orders').push();
  // take current order and map
  const newOrders = orders.map(order => {
    // passing the key down onto the order 
    return Object.keys(order).reduce((accumulator, orderKey) => {
      // check there is no undefined keys
      if(!order[orderKey]){
        // if nothing undefined, return current accumulator
        // eg: if there is no topping or anything, there is no need to keep that in the order
        return accumulator;
      }
      // loop over each of toppings keys
        // if the keys is tooping, return current order
      if (orderKey === "toppings"){
        return {
          ...accumulator,
          // [key] and [value of that order]
          [orderKey]: order[orderKey]
          // filter the toppings to only the checked ones
          .filter(({checked}) => checked)
          // map the name of the toppings checked only
          // returning the array of map of currently checked toppings
          .map(({ name }) => name)
        };
      }
      return {
        ...accumulator,
        [orderKey]: order[orderKey]
      };
      // passing initial object as empty {}
    }, {});
  });
  // pass it to firebase database reference
  newOrderRef.set({
    displayName,
    email,
    order: newOrders
  });
}

export function Order ({ orders, setOrders, setOpenFood, login, loggedIn }){
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
    // set initial value of total set to 0
      // so initially total = 0 plus getPrice(order)
  }, 0);

  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const deleteItem = index => {
    const newOrders = [...orders];
    // adds/removes items to/from an array, and returns the removed item(s)
    newOrders.splice(index, 1);
    setOrders(newOrders)
  }

  return (
    <OrderStyled>
      {orders.length === 0 ? (
        <OrderContent>Your Order is Looking Empty</OrderContent>
        ) : (
        <OrderContent> 
          <OrderContainer> Your Order: </OrderContainer>
          {orders.map((order, index) => (
            <OrderContainer editable key={index}>
              <OrderItem 
                onClick={() => setOpenFood({ ...order, index})}
              >
                <div>{order.quantity}</div>
                <div>{order.name}</div>
                <div style={{cursor: "pointer"}}
                  onClick={(e) => {
                    // prevents Propagation means bubbling up to parent elements 
                    // or capturing down to child elements
                    e.stopPropagation();
                    deleteItem(index)
                  }}
                >
                  <span role="img" aria-label="trash bin"> 🗑️ </span>
                </div>
                <div>{formatPrice(getPrice(order))}</div>
              </OrderItem>
              <DetailItem>
                {order.toppings
                // creates a new array with all checked topping elements 
                  .filter(t => t.checked)
                  .map(topping => topping.name)
                  .join(", ")
                }
              </DetailItem>
              {/* if the order have a choice, render that choice as detail item*/}
              {order.choice && <DetailItem>{order.choice}</DetailItem>}
            </OrderContainer>
          ))}
          <OrderContainer>
            <OrderItem>
              <div />
              <div>Subtotal</div>
              <div>{formatPrice(subtotal)}</div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Tax</div>
              <div>{formatPrice(tax)}</div>
            </OrderItem>
            <OrderItem>
              <div />
              <div>Total</div>
              <div>{formatPrice(total)}</div>
            </OrderItem>

          </OrderContainer>
        </OrderContent>
        )}
      <DialogFooter>
        <ConfirmButton onClick={() => {
          if (loggedIn){
            sendOrder(orders, loggedIn)
          } else {
            login();
          }
        }}
        >
        Check Out
        </ConfirmButton>
      </DialogFooter>
    </OrderStyled>
  )
};