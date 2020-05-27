import React from 'react';
import styled from 'styled-components';
import { 
  DialogContent, 
  DialogFooter, 
  ConfirmButton 
} from '../FoodDialog/FoodDialog';
import { formatPrice } from '../Data/FoodData';
import { getPrice } from '../FoodDialog/FoodDialog';


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

export function Order ({ orders, setOrders, setOpenFood }){
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
            <OrderContainer editable>
              <OrderItem 
                onClick={() => setOpenFood({ ...order, index})}
              >
                <div>{order.quantity}</div>
                <div>{order.name}</div>
                <div style={{cursor: "pointer"}}
                  onClick={(e) => {
                    // prevents Propagation means bubbling up to parent elements or capturing down to child elements
                    e.stopPropagation();
                    deleteItem(index)
                  }}
                >
                <span role="img"> 🗑️ </span>
                </div>
                <div>{formatPrice(getPrice(order))}</div>
              </OrderItem>
              <DetailItem>
                {order.toppings
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
        <ConfirmButton>Check Out</ConfirmButton>
      </DialogFooter>
    </OrderStyled>
  )
};