import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogFooter, ConfirmButton } from '../FoodDialog/FoodDialog';

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

export function Order (){
  return (
    <OrderStyled>
      <OrderContent>Your Order is Looking Empty</OrderContent>
      <DialogFooter>
        <ConfirmButton>Check Out</ConfirmButton>
      </DialogFooter>
    </OrderStyled>
  )
};