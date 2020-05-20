import React from 'react';
import styled from 'styled-components';

import { foods } from '../Data/FoodData';
import{ Food, FoodGrid, FoodLable } from './FoodGrid';

const MenuStyled = styled.div`
  height: 1000px;
  margin: 0px 400px 50px 20px;
`

export function Menu({setOpenFood}){
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
          {foods.map(food => (
            <Food img={food.img} onClick={()=> {
              setOpenFood(food);
            }}> 
              <FoodLable>
                {food.name} 
              </FoodLable>
            </Food>
          ))}
        </FoodGrid>
      </>
    )) }
  </MenuStyled>
  );
};