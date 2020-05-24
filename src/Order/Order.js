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
  box-shadow: 4px 0px 5px 4px grey;
  display: flex;
  flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid grey;
`;

const OrderItem = styled.div`
  padding: 10px 0px;
  display: grid;
  grid-template-columns: 20px 150px 20px 60px;
  justify-content: space-between;
`;

const DetailItem = styled.div`
  color: gray;
  font-size: 12px;
`;

export function Order ({orders}){
  const subtotal = orders.reduce((total, order) => {
    return total + getPrice(order);
    // set initial value of total set to 0
      // so initially total = 0 plus getPrice(order)
  }, 0);

  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  return (
    <OrderStyled>
      {orders.length === 0 ? (
        <OrderContent>Your Order is Looking Empty</OrderContent>
        ) : (
        <OrderContent> 
          <OrderContainer>
            Your Order: 
          </OrderContainer>
          {orders.map(order => (
            <OrderContainer>
              <OrderItem>
                <div>{order.quantity}</div>
                <div>{order.name}</div>
                <div>{formatPrice(getPrice(order))}</div>
              </OrderItem>
              <DetailItem>
                {order.toppings
                  .filter(toppingcheckbox => toppingcheckbox.checked)
                  .map(topping => topping.name)
                  .join(", ")
                  }
              </DetailItem>
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