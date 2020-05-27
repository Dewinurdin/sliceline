import React from 'react';
import styled from 'styled-components';

import { foods } from '../Data/FoodData';
import { Food, FoodGrid, FoodLable } from './FoodGrid';
import { formatPrice } from '../Data/FoodData';

const MenuStyled = styled.div`
  height: 1000px;
  margin: 0px 400px 50px 20px;
`

export function Menu({ setOpenFood }){
  return (
    <MenuStyled>
      {/* 
        Use Object.entries function and loop over each one of the object
        which has a key the sectionName 
        and Value which is the foods
      */}
    {Object.entries(foods).map(([sectionName, foods]) => (
      <>
        <h1> {sectionName} </h1>
        <FoodGrid>
          {foods.map((food, index) => (
            <Food img={food.img} key={index} onClick={()=> {
              setOpenFood(food);
            }}> 
              <FoodLable>
                <div>{food.name}</div>
                <div>{formatPrice(food.price)}</div>
              </FoodLable>
            </Food>
          ))}
        </FoodGrid>
      </>
    )) }
  </MenuStyled>
  );
};